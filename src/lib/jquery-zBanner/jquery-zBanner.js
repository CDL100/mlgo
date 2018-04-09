;jQuery(function($){
    // this指向的是$box()
    $.fn.banner = function(options){
        let defaults = {
            width:600,
            height:600,
            index:0,
            duration:3000,
            type:'vertical'//vertical,horizontal,fade
        }

        //这里的this是每个dom节点
        return this.each(function(){
            let $self = $(this);
            let opt = Object.assign({},defaults,options);
            let $ul;
            let $page;
            let $span;
            /* let init = ()=>{
                    console.log(this);
                    这里不用箭头函数的话会指向window
            }*/
            function init(){
                //创建元素，绑定事件
                // 这种写法没有箭头函数,使用this只能用jQuery对象存起来
                //创建ul
                $self.width(opt.width);
                $self.height(opt.height);
                $ul = $('<ul/>');
                $page = $('<div/>');
                $page.addClass('page');
                let $res = opt.img.map(function(url,idx){
                    //创建图片
                    let $li = $('<li/>');
                    let $img = $('<img/>');
                    $img.attr('src',url);
                    $li.append($img);

                    //创建分页
                    $span = $('<span/>');
                    console.log($span)
                    $span.html(idx+1);
                    if(idx==0){
                        $span.addClass('active');
                    }
                    $span.appendTo($page)
                    return $li;
                })
                
                $ul.append($res);
                $self.append($ul);
                $self.append($page);
                $self.addClass('banner');

                opt.len = opt.img.length;//这里为4


                //类型初始化
                if(opt.type=='horizontal'){
                   $ul.addClass('horizontal');
                   $ul.children().eq(0).clone().appendTo($ul);
                   //这是因为复制之后len会加一
                   opt.len++;
                   $ul.width(opt.len*opt.width); 
                }
                else if(opt.type=='vertical'){
                    $ul.children().eq(0).clone().appendTo($ul);
                    opt.len++;
                }
                else if(opt.type=='fade'){
                    $ul.css({
                        width:opt.width,
                        height:opt.height
                    })
                    $ul.addClass('fade');
                    $ul.children('li').eq(opt.index).siblings('li').css('opacity',0);
                }

                //移入移出
                $self.on('mouseenter',function(){
                    clearInterval($self.timer);
                }).on('mouseleave',function(){
                    move();
                })
                
                // 点击分页切换
                $page[0].onclick = function(e){
                        for(let i=0;i<$page[0].children.length;i++){
                            if(e.target == $page[0].children[i]){
                                opt.index = i;
                            }
                        }
                        show();
                }
                move();
            }


            function move(){
                clearInterval($self.timer);
                $self.timer = setInterval(function(){
                    opt.index++;
                    show();
                },opt.duration);
            }

            function show(){
                let obj = {};
                if(opt.type=='horizontal'){
                    //淡入淡出不需要复制，所以index=0;
                    if(opt.index>=opt.len){
                        $ul.css('left',0);
                        opt.index = 1;
                    }
                    obj.left = -opt.width*opt.index;
                    $ul.animate(obj);
                }

                else if(opt.type=='vertical'){
                    if(opt.index>=opt.len){
                        $ul.css('top',0);
                        opt.index = 1;
                    }
                    obj.top = -opt.height*opt.index;
                    $ul.animate(obj);
                }

                else if(opt.type == 'fade'){
                    if(opt.index >= opt.len){
                        opt.index = 0;
                    }
                    $ul.children('li').eq(opt.index).animate({opacity:1});
                    $ul.children('li').eq(opt.index).siblings('li').animate({opacity:0});
                }

                //分页切换
                if(opt.index==opt.len-1){
                    $page.children('span').eq(0).addClass('active');
                    $page.children('span').eq(-1).removeClass('active');
                }
                $page.children('span').eq(opt.index).addClass('active');
                $page.children('span').eq(opt.index).siblings('span').removeClass('active');
            }

            init();
        })




    }
})