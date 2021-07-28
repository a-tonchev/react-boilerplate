const path = require('path');

// WEBPACK CONFIG IS ONLY FOR WEBSTORM ALIASES, no more, no less
module.exports = {
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
};
