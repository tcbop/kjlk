var tplregister = require('../templates/register.string');

SPA.defineView('register', {
  html: tplregister,

  plugins: ['delegated'],
   bindActions: {
    'gotologin': function () {
      // SPA.open('login');
      this.hide();
    }

  }

});
