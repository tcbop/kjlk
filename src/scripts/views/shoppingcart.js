var tplshoppingcart = require('../templates/shoppingcart.string');

SPA.defineView('shoppingcart', {
  html: tplshoppingcart,

  plugins: ['delegated']

});
