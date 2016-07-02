var tplaround = require('../templates/at-around.string');

SPA.defineView('at-around', {
  html: tplaround,

  plugins: ['delegated'],
  // 绑定tab 事件
  bindActions: {
    'gotologin': function () {
    	
       SPA.open('login');
    }
  }

});
