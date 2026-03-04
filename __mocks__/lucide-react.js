const React = require('react');

// Create a Proxy that returns a mock React component for any icon
module.exports = new Proxy({}, {
  get: (target, prop) => {
    // Handle special cases
    if (prop === '__esModule') return true;
    if (prop === 'default') return undefined;
    
    // Return a mock component for any icon
    return function MockIcon(props) {
      return React.createElement('div', { 
        'data-testid': `${prop.toLowerCase()}-icon`,
        ...props 
      });
    };
  }
});
