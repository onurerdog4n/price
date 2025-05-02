/**
 * Main Application
 * Initializes the product comparison widget
 */
import { setupScrolling } from './utils/scrolling.js';
import ProductRow from './components/ProductRow.js';
import { mockProducts, defaultStoreOrder } from './data/mockData.js';

export default class ProductComparisonWidget {
  constructor() {
    this.data = []; // Start with empty data
    this.storeOrder = []; // Will be populated from API
    this.page = 1;
    this.lastPage = 1;
    this.loading = false;
    this.apiWork = 0; // Flag to prevent multiple API calls
    this.apiUrl = 'http://128.251.133.20:8080/api/product-attribute-summary/comparison-data';
    this.productsPerPage = 10; // Default products per page
    this.isMobile = window.innerWidth < 768; // Track mobile state
  }

  initialize() {
    // Check if there's a saved order in localStorage
    const savedOrder = localStorage.getItem('storeOrder');
    if (savedOrder) {
      try {
        this.storeOrder = JSON.parse(savedOrder);
      } catch (error) {
        console.error('Error parsing saved store order:', error);
        this.storeOrder = defaultStoreOrder;
      }
    } else {
      this.storeOrder = defaultStoreOrder;
    }
    
    // Set up scrolling behavior
    setupScrolling();
    
    // Set up infinite scrolling with Intersection Observer
    this.setupInfiniteScroll();
    
    // For development, use mock data if API is not available
    try {
      this.fetchProducts(this.page);
    } catch (error) {
      this.setData(mockProducts);
      this.renderStoreHeaders();
      this.setupDragAndDrop();
    }
    
    // Listen for orientation changes
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  handleResize() {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth < 768;
    
    // If mobile state changed, re-render
    if (wasMobile !== this.isMobile) {
      this.render();
    }
  }

  setupDragAndDrop() {
    // Import Sortable dynamically to avoid issues
    import('./utils/scrolling.js').then(module => {
      const { setupDragAndDrop } = module;
      setupDragAndDrop(this);
    });
  }

  setupInfiniteScroll() {
    // Create a loading indicator element
    this.loadingIndicator = document.createElement('div');
    this.loadingIndicator.className = 'text-center p-4 hidden';
    this.loadingIndicator.innerHTML = `
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      <p class="mt-2 text-gray-600">Loading more products...</p>
    `;
    document.querySelector('.container').appendChild(this.loadingIndicator);
    
    // Create a sentinel element to observe
    this.sentinel = document.createElement('div');
    this.sentinel.id = 'infinite-scroll-sentinel';
    this.sentinel.className = 'load-more-trigger';
    this.sentinel.style.height = '20px';
    this.sentinel.style.width = '100%';
    this.sentinel.style.marginTop = '20px';
    this.sentinel.style.marginBottom = '20px';
    this.sentinel.style.flex = '1';
    
    // Add the sentinel to the DOM
    document.querySelector('.flex').appendChild(this.sentinel);
    
    // Create and configure the Intersection Observer
    this.observer = new IntersectionObserver(this.handleIntersection.bind(this), {
      root: null, // Use viewport as root
      rootMargin: '0px 0px 200px 0px', // Trigger earlier
      threshold: 0.1 // Trigger when at least 10% is visible
    });
    
    // Start observing the sentinel
    this.observer.observe(this.sentinel);
    
    // Check immediately if sentinel is visible (for large screens)
    setTimeout(() => {
      this.checkSentinelVisibility();
    }, 500);
  }
  
  // New method to handle intersection events
  handleIntersection(entries) {
    const entry = entries[0];
    
    if (entry.isIntersecting && this.apiWork === 0 && this.page < this.lastPage) {
      this.apiWork = 1; // Set flag to prevent multiple calls
      this.page++;
      this.fetchProducts(this.page);
    }
  }
  
  // New method to manually check if sentinel is visible
  checkSentinelVisibility() {
    if (!this.sentinel) return;
    
    const rect = this.sentinel.getBoundingClientRect();
    const isVisible = (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
    
    if (isVisible && this.apiWork === 0 && this.page < this.lastPage) {
      this.apiWork = 1;
      this.page++;
      this.fetchProducts(this.page);
    }
  }

  async fetchProducts(page) {
    if (this.loading) return;
    
    this.loading = true;
    this.showLoadingIndicator();
    
    try {
     
      
      const url = `${this.apiUrl}?limit=${this.productsPerPage}&page=${page}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();

      
      // Update pagination info
      this.lastPage = data.pagination.last_page;
      this.productsPerPage = data.pagination.per_page || this.productsPerPage;
      
      // Update store order if needed (only on first load)
      if (page === 1 && !localStorage.getItem('storeOrder') && data.storeOrder) {
        this.storeOrder = data.storeOrder;
        console.log('HEY')
        this.renderStoreHeaders();
      }
      
      // Process the new products - check different possible property names
      let newProducts = [];
      if (data.productsData) {
        newProducts = data.productsData;
      } else if (data.products) {
        newProducts = data.products;
      } else if (data.data) {
        newProducts = data.data;
      } else {
        console.error('Could not find products data in API response:', data);
        this.showErrorMessage('API response format is unexpected. Please check console for details.');
        return;
      }
      
      // Update data
      if (page === 1) {
        this.data = newProducts;
        this.render(); // Full render for first page
      } else {
        // Add new products to existing data
        this.data = [...this.data, ...newProducts];
        
        // Ensure all products have all stores (even if as NO DATA)
        this.ensureAllStoresExist();
        
        // Render only the new products
        this.renderNewProducts(newProducts);
      }
      
      // Set up drag and drop on first load
      if (page === 1) {
        this.setupDragAndDrop();
      }
      
      // Reposition the sentinel after adding new content
      this.repositionSentinel();
      
      // Check if sentinel is visible after adding new content
      setTimeout(() => {
        this.checkSentinelVisibility();
      }, 500);
      
    } catch (error) {
      console.error('Error fetching products:', error);
      this.showErrorMessage('Failed to load products. Please try again later.');
      
      // For development, use mock data if API fails
      if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
        this.setData(mockProducts);
        this.renderStoreHeaders();
        this.setupDragAndDrop();
      }
    } finally {
      this.loading = false;
      this.apiWork = 0; // Reset API work flag
      this.hideLoadingIndicator();
    }
  }

  // New method to ensure all products have all stores
  ensureAllStoresExist() {
    // For each product, ensure it has all stores in storeOrder
    this.data.forEach(product => {
      // Create a map of existing stores for quick lookup
      const existingStores = {};
      product.stores.forEach(store => {
        existingStores[store.name] = store;
      });
      
      // Create a new array with all stores in the correct order
      const completeStores = [];
      
      this.storeOrder.forEach(storeName => {
        if (existingStores[storeName]) {
          // Store exists, add it to the array
          completeStores.push(existingStores[storeName]);
        } else {
          // Store doesn't exist, create a NO DATA store
          completeStores.push({
            name: storeName,
            price: "NO DATA",
            date: product.date || new Date().toLocaleDateString(),
            noData: true,
            errorMessage: "Veri bulunamadı",
            hasUrl: false
          });
        }
      });
      
      // Replace the product's stores with the complete list
      product.stores = completeStores;
    });
  }

  // Reposition the sentinel element to the bottom of the content
  repositionSentinel() {
    if (this.sentinel && this.sentinel.parentNode) {
      // Remove from current position
      this.sentinel.parentNode.removeChild(this.sentinel);
      
      // Add to the end of the flex container
      document.querySelector('.flex').appendChild(this.sentinel);
      
      // Re-observe the sentinel after repositioning
      if (this.observer) {
        this.observer.observe(this.sentinel);
      }
    }
  }

  showLoadingIndicator() {
    if (this.loadingIndicator) {
      this.loadingIndicator.classList.remove('hidden');
    }
  }

  hideLoadingIndicator() {
    if (this.loadingIndicator) {
      this.loadingIndicator.classList.add('hidden');
    }
  }

  showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded fixed bottom-4 right-4 flex items-center';
    errorDiv.innerHTML = `
      <i class="fa-solid fa-circle-exclamation mr-2"></i>
      <span>${message}</span>
      <button class="ml-4 text-red-700 hover:text-red-900">
        <i class="fa-solid fa-xmark"></i>
      </button>
    `;
    
    // Add click handler to close button
    errorDiv.querySelector('button').addEventListener('click', () => {
      errorDiv.remove();
    });
    
    // Auto-remove after 5 seconds
    document.body.appendChild(errorDiv);
    setTimeout(() => {
      if (document.body.contains(errorDiv)) {
        errorDiv.remove();
      }
    }, 5000);
  }

  setData(newData) {
    this.data = newData;
    this.render();
  }

  renderStoreHeaders() {
    const scrollableHeader = document.getElementById('scrollable-header');
    
    if (!scrollableHeader) {
      console.error('Scrollable header container not found');
      return;
    }
    
    // Clear any existing headers
    scrollableHeader.innerHTML = '';
    
    // Render store headers in the current order
    console.log(this.storeOrder)

    this.storeOrder.forEach(storeName => {
      const storeHeader = document.createElement('div');
      storeHeader.className = 'w-[230px] min-w-[230px] flex-shrink-0 flex items-center justify-center p-2 mr-2 store-header';
      storeHeader.setAttribute('data-store-name', storeName);
      
      // Add the drag handle
      const dragIconHTML = `<div class="drag-handle"><i class="fa-solid fa-grip-lines"></i></div>`;
      
      // Add the store logo
      const logoUrl = this.storeLogos[storeName] || '';
      
      storeHeader.innerHTML = `
        ${dragIconHTML}
        <img src="${logoUrl}" alt="${storeName}" class="h-8">
      `;
      
      scrollableHeader.appendChild(storeHeader);
    });
  }

  render() {
    const fixedContainer = document.getElementById('fixed-products-container');
    const scrollableContainer = document.getElementById('scrollable-products-container');
    
    if (!fixedContainer || !scrollableContainer) {
      console.error('Container elements not found.');
      return;
    }
    
    // Clear only if this is the first page
    if (this.page === 1) {
      fixedContainer.innerHTML = '';
      scrollableContainer.innerHTML = '';
    }
    
    // Ensure all products have all stores (even if as NO DATA)
    this.ensureAllStoresExist();
    
    // Reorder stores in data according to current storeOrder
    this.reorderProductStores();
    
    // Render all products
    this.data.forEach(product => {
      const productRow = new ProductRow(product);
      productRow.render();
    });
  }

  // Render only the newly loaded products
  renderNewProducts(newProducts) {
    if (!newProducts || newProducts.length === 0) {
      return;
    }
    
    
    // Ensure all new products have all stores
    newProducts.forEach(product => {
      // Create a map of existing stores for quick lookup
      const existingStores = {};
      product.stores.forEach(store => {
        existingStores[store.name] = store;
      });
      
      // Create a new array with all stores in the correct order
      const completeStores = [];
      
      this.storeOrder.forEach(storeName => {
        if (existingStores[storeName]) {
          // Store exists, add it to the array
          completeStores.push(existingStores[storeName]);
        } else {
          // Store doesn't exist, create a NO DATA store
          completeStores.push({
            name: storeName,
            price: "NO DATA",
            date: product.date || new Date().toLocaleDateString(),
            noData: true,
            errorMessage: "Veri bulunamadı",
            hasUrl: false
          });
        }
      });
      
      // Replace the product's stores with the complete list
      product.stores = completeStores;
    });
    
    // Reorder stores in new products according to current storeOrder
    newProducts.forEach(product => {
      // Create a mapping of store names to store objects
      const storeMap = {};
      product.stores.forEach(store => {
        storeMap[store.name] = store;
      });
      
      // Create a new array of stores in the current order
      const reorderedStores = [];
      this.storeOrder.forEach(storeName => {
        if (storeMap[storeName]) {
          reorderedStores.push(storeMap[storeName]);
        }
      });
      
      // Replace the stores array with the reordered one
      product.stores = reorderedStores;
    });
    
    // Render each new product
    newProducts.forEach(product => {
      const productRow = new ProductRow(product);
      productRow.render();
    });
  }

  // Reorder the stores in the product data to match the current storeOrder
  reorderProductStores() {
    this.data.forEach(product => {
      // Create a mapping of store names to store objects
      const storeMap = {};
      product.stores.forEach(store => {
        storeMap[store.name] = store;
      });
      
      // Create a new array of stores in the current order
      const reorderedStores = [];
      this.storeOrder.forEach(storeName => {
        if (storeMap[storeName]) {
          reorderedStores.push(storeMap[storeName]);
        }
      });
      
      // Replace the stores array with the reordered one
      product.stores = reorderedStores;
    });
  }

  // Used when store headers are reordered by drag & drop
  reorderStores(newOrder) {
    this.storeOrder = newOrder;
    
    // Save to localStorage
    localStorage.setItem('storeOrder', JSON.stringify(newOrder));
    
    // Re-render the headers with the new order
    this.renderStoreHeaders();
    
    // Re-render all product rows with stores in the new order
    this.render();
  }
}
