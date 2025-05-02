/**
 * Scrolling Utilities
 * Handles synchronized scrolling and drag-and-drop functionality
 */

// Function to set up synchronized scrolling between containers
export function setupScrolling() {
  const storesScrollContainer = document.getElementById('stores-scroll-container');
  const scrollableHeader = document.getElementById('scrollable-header');
  
  if (storesScrollContainer && scrollableHeader) {
    // Sync horizontal scrolling between header and content
    storesScrollContainer.addEventListener('scroll', () => {
      scrollableHeader.scrollLeft = storesScrollContainer.scrollLeft;
    });
  }
  
  // Add touch scrolling for mobile
  setupTouchScrolling();
}

// Function to set up touch scrolling for mobile devices
function setupTouchScrolling() {
  const scrollContainer = document.getElementById('stores-scroll-container');
  
  if (!scrollContainer) return;
  
  let isDown = false;
  let startX;
  let scrollLeft;
  
  // Touch events for mobile
  scrollContainer.addEventListener('touchstart', (e) => {
    isDown = true;
    scrollContainer.classList.add('active');
    startX = e.touches[0].pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
  });
  
  scrollContainer.addEventListener('touchend', () => {
    isDown = false;
    scrollContainer.classList.remove('active');
  });
  
  scrollContainer.addEventListener('touchcancel', () => {
    isDown = false;
    scrollContainer.classList.remove('active');
  });
  
  scrollContainer.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.touches[0].pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollContainer.scrollLeft = scrollLeft - walk;
  });
  
  // Mouse events for desktop
  scrollContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    scrollContainer.classList.add('active');
    startX = e.pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
  });
  
  scrollContainer.addEventListener('mouseleave', () => {
    isDown = false;
    scrollContainer.classList.remove('active');
  });
  
  scrollContainer.addEventListener('mouseup', () => {
    isDown = false;
    scrollContainer.classList.remove('active');
  });
  
  scrollContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollContainer.scrollLeft = scrollLeft - walk;
  });
}

// Function to set up drag and drop for store headers
export function setupDragAndDrop(appInstance) {
  // Check if Sortable is available (dynamically load if needed)
  if (typeof Sortable === 'undefined') {
    // Create script element to load Sortable.js
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js';
    script.async = true;
    
    script.onload = () => {
      // Once loaded, initialize drag and drop
      initializeDragAndDrop(appInstance);
    };
    
    document.head.appendChild(script);
  } else {
    // Sortable is already available, initialize directly
    initializeDragAndDrop(appInstance);
  }
}

// Initialize drag and drop functionality
function initializeDragAndDrop(appInstance) {
  const scrollableHeader = document.getElementById('scrollable-header');
  
  if (!scrollableHeader || !window.Sortable) {
    console.error('Required elements or Sortable library not found');
    return;
  }
  
  // Create Sortable instance for the header
  const sortable = new Sortable(scrollableHeader, {
    animation: 150,
    handle: '.store-header',
    ghostClass: 'sortable-ghost',
    chosenClass: 'sortable-chosen',
    dragClass: 'sortable-drag',
    onEnd: function(evt) {
      // Get the new order of store names
      const newOrder = Array.from(scrollableHeader.children)
        .map(el => el.getAttribute('data-store-name'));
      
      // Save the new order to localStorage
      localStorage.setItem('storeOrder', JSON.stringify(newOrder));
      
      // Update the application's store order and re-render
      if (appInstance && typeof appInstance.reorderStores === 'function') {
        appInstance.reorderStores(newOrder);
      }
    }
  });
  
  return sortable;
}

// Add a function to handle mobile-specific behavior
export function setupMobileView() {
  // Check if we're on a mobile device
  const isMobile = window.innerWidth < 768;
  
  if (isMobile) {
    // Add mobile-specific classes
    document.body.classList.add('mobile-view');
    
    // Adjust container heights for better mobile viewing
    const productRows = document.querySelectorAll('#fixed-products-container > div, #scrollable-products-container > div');
    productRows.forEach(row => {
      row.style.height = 'auto';
    });
  } else {
    document.body.classList.remove('mobile-view');
  }
  
  // Listen for orientation changes
  window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
      document.body.classList.add('mobile-view');
    } else {
      document.body.classList.remove('mobile-view');
    }
  });
}
