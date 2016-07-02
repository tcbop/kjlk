var tpllogin = require('../templates/login.string');

SPA.defineView('login', {
  html: tpllogin,

  plugins: ['delegated'],
   bindActions: {
    'gotoregister': function () {
       SPA.open('register');

    },
    'goindex': function () {
       //SPA.open('login');
       this.hide();
    }

  }

});