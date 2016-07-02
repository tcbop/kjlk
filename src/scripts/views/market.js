var tplmarket = require('../templates/market.string');

SPA.defineView('market', {
  html: tplmarket,

  plugins: ['delegated']

});
