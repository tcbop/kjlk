var tplservice = require('../templates/service.string');

SPA.defineView('service', {
  html: tplservice,

  plugins: ['delegated']

});
