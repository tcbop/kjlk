var tplHome = require('../templates/home.string');

SPA.defineView('home', {
  html: tplHome,

   plugins: ['delegated', {
    name: 'avalon',
    options: function (vm) {
      vm.livelist = [];
      vm.self = [];
       vm.beauty = [];
       vm.fashion = [];
    }
  }],

  init: {
    vm: null,
    livelistArray:[],
    selfArry: [],
    beautyArry:[],
    fashionArry:[]
  },

   bindEvents: {
   	'beforeShow': function () {
      var that = this;

      // 获得vm对象
      that.vm = that.getVM();

      $.ajax({
        url: 'mock/index.json',
        type: 'get',
        data:{
          rtype: 'origin'
        },
        success: function (rs) {
        	
          that.livelistArray = rs.data.lunbo;
          that.vm.livelist =rs.data.lunbo;

          that.selfArray = rs.data.sout;
          that.vm.self =rs.data.sout;

		  		that.beautyArry = rs.data.beut;
          that.vm.beauty =rs.data.beut;

          that.fashionArry = rs.data.fash;
          that.vm.fashion =rs.data.fash;
         
           var myScroll = new IScroll(".myhome");
			 var swiper=new Swiper(".swiper-container",{
			 	autoplay : 1000,
			 	loop:true,
			 	 autoplayDisableOnInteraction : false
			 });
        },
        error:function(rs){
        	//alert(111);
        }
      });
    },
    show: function () {
      var that=this;
      // 获得vm对象
      that.vm = that.getVM();
			// 下拉刷新，上拉加载更多
      var scrollSize = 30;
      var myScroll = this.widgets.homeHotScroll;
      console.log(this.widgets.homeHotScroll);
      myScroll.scrollBy(0, -scrollSize);

      var head = $('.head img'),
          topImgHasClass = head.hasClass('up');
      var foot = $('.foot img'),
          bottomImgHasClass = head.hasClass('down');
      myScroll.on('scroll', function () {
          var y = this.y,
              maxY = this.maxScrollY - y;
          if (y >= 0) {
              !topImgHasClass && head.addClass('up');
              return '';
          }
          if (maxY >= 0) {
              !bottomImgHasClass && foot.addClass('down');
              return '';
          }
      });

      myScroll.on('scrollEnd', function () {
          if (this.y >= -scrollSize && this.y < 0) {
              myScroll.scrollTo(0, -scrollSize);
              head.removeClass('up');
          } else if (this.y >= 0) {
              head.attr('src', '/yidejia/images/ajax-loader.gif');
              // ajax下拉刷新数据

              $.ajax({
                url: '/yidejia/mock/index.json',
                data: {
                  rtype: 'refresh'
                },
                success: function (rs) {
          				that.selfArray = rs.data.sout.concat(that.selfArray);
                 	//console.log(that.selfArray);
                 	that.livelistArray=that.selfArray;
    		    			that.vm.self =that.selfArray;
    		          
                  myScroll.scrollTo(0, -scrollSize);
                  head.removeClass('up');
                  head.attr('src', '/yidejia/images/arrow.png');
                }
              })

          }
          //上拉加载
          var maxY = this.maxScrollY - this.y;
          var self = this;
          if (maxY > -scrollSize && maxY < 0) {
              myScroll.scrollTo(0, self.maxScrollY + scrollSize);
              foot.removeClass('down')
          } else if (maxY >= 0) {
              foot.attr('src', '/yidejia/images/ajax-loader.gif');
              // ajax上拉加载数据

              $.ajax({
                url: '/yidejia/mock/index.json',
                data: {
                  rtype: 'more'
                },
                success: function (rs) {
                	that.selfArray = rs.data.sout.concat(that.selfArray);
                 	//console.log(that.selfArray);
                 	that.livelistArray=that.selfArray;
    		    			that.vm.self =that.selfArray;
                	
                  myScroll.refresh();
                  myScroll.scrollTo(0, self.y + scrollSize);
                  foot.removeClass('down');
                  foot.attr('src', '/yidejia/images/jiantou.png');
                }
              });
          }
     })
   }
  }
});