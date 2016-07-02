var tplIndex = require('../templates/index.string');
// 引用公共方法
var util = require('../utils/fn.js');
SPA.defineView('index', {
  html: tplIndex,
 // 定义子视图
  modules: [{
    name: 'content', // 子视图的名字，用作后边引用的句柄
    views: ['home', 'at-around', 'service','shoppingcart','market'], // 定义子视图的列表数组
    defaultTag: 'home', // 定义默认视图
    container: '.box' // 子视图的容器
  }],
  plugins: ['delegated'],
  // 绑定tab 事件
  bindActions: {
    'switch.tabs': function (e, data) {
      // 设置当前 tab 高亮
      util.setFocus(e.el);

      // 切换子视图
      //console.log(data.tag);
      this.modules.content.launch(data.tag);
    }
  },
  bindEvents: {
     show: function () {
			 var myScroll = new IScroll(".myhome");
       var swiper=new Swiper(".swiper-container");
     }
  }
});

