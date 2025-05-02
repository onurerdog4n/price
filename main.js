import './style.css';
import ProductComparisonWidget from './js/app.js';
import { setupMobileView } from './js/utils/scrolling.js';

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Create and initialize the widget
  const widget = new ProductComparisonWidget();
  widget.initialize();
  
  // Set up mobile-specific view adjustments
  setupMobileView();
  
  // Make widget available globally for debugging
  window.productWidget = widget;
  
  // Add a resize listener to handle responsive adjustments
  window.addEventListener('resize', () => {
    setupMobileView();
  });
});
