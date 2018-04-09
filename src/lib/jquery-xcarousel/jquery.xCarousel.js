;(function($){
	$.fn.xCarousel = function(options){
		// this指向$(.box元素)
		// console.log(this)

		let defaults = {
			width:800,
			height:320,
			index:0,
			duration:3000,
			autoPlay:true,
			type:'vertical',//horizontal,fade
			seamless:false,
			page:true,
			// imgs:[],保存图片路径
		}

		return this.each(function(){
			// 这里的this指向
			console.log(this);

			let $self = $(this);

			// let opt = Object.assign({},defaults,options);
			let opt = $.extend(true,{},defaults,options);//深复制

			opt.len = opt.imgs.length;


			let $ul;

			// 上一张图处索引值
			let lastIndex = opt.index;


			// 获取/创建元素
			// 绑定事件
			let init = ()=>{
				// 应用插件样式
				$self.addClass('xcarousel');
				$self.width(opt.width);
				$self.height(opt.height);


				$ul = $('<ul/>');

				let $res = $.map(opt.imgs,function(url){
					let $li = $('<li/>');
					let $img = $('<img/>');
					$img.attr('src',url).appendTo($li);

					return $li;
				});//[$li,$li,$li]

				$ul.append($res);

				$ul.appendTo($self);

				// 水平滚动必须设置ul的宽度
				if(opt.type === 'horizontal'){
					$ul.width(opt.width*opt.len);
					$ul.addClass('horizontal');
				}

				// 淡入淡出必须设置定位
				else if(opt.type === 'fade'){
					$ul.addClass('fade');
					$ul.css({
						width:opt.width,
						height:opt.height
					});

					$ul.children('li').eq(opt.index).siblings('li').css('opacity',0);
				}

				// 移入移出
				$self.on('mouseenter',()=>{
					clearInterval($self.timer);
				}).on('mouseleave',()=>{
					move();
				})

				// 点击页码
				.on('click','.page span',function(){

				});

				move();
			}

			// 运动
			let move = ()=>{
				$self.timer = setInterval(()=>{
					opt.index++;

					show();
				},opt.duration);
			};


			let show = function(){
				if(opt.index >= opt.len){
					opt.index = 0;
				}else if(opt.index < 0){
					opt.index = opt.len-1
				}

				let obj = {};
				if(opt.type === 'vertical'){
					obj.top = -opt.height*opt.index;
					$ul.animate(obj)
				}else if(opt.type === 'horizontal'){
					obj.left = -opt.width*opt.index;
					$ul.animate(obj)
				}else if(opt.type === 'fade'){
					// 改变li的opacity
					$ul.children('li').eq(opt.index).animate({opacity:1},function(){
						lastIndex = opt.index;
					});
					$ul.children('li').eq(lastIndex).animate({opacity:0},function(){
						lastIndex = opt.index;
					});

				}
				

			}

			init();
		});

		// return this;
	}

	$.fn.extend({
		xPopover(){},
		xAjax(){},
		xAjax(){},
		xAjax(){},
		xAjax(){}
	})

})(jQuery);
