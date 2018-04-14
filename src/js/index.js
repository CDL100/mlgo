
require(['config'],function(){
    require(['jquery','zBanner'],function($){

        //生成页面结构
        let $type = $('.ml_main .type');
        $.ajax({
            url:"api/index.php",
            success:function(data){
                data=JSON.parse(data);
                $type[0].innerHTML = data.map(function(item,idx){
                    return `<article class="clearfix">
                                <section class="leftCon fl">
                                    <header>
                                        <span>${item.type_id}F</span>
                                        ${item.title}
                                    </header>
                                    <footer>
                                        <div class="kind">
                                            <a class="active">${item.kind1}</a>
                                            <a>${item.kind2}</a>
                                            <a>${item.kind3}</a>
                                            <a class="active">${item.kind4}</a>
                                            <a class="active">${item.kind5}</a>
                                            <a>${item.kind6}</a>
                                            <a>${item.kind7}</a>
                                            <a >${item.kind8}</a>
                                            <a>${item.kind9}</a>
                                            <a>${item.kind10}</a>
                                            <a>${item.kind11}</a>
                                            <a>${item.kind12}</a>
                                        </div>
                                        <div class="brand">   
                                            <div class="brand_ban brand_ban${idx}"></div>
                                            <i class="iconfont icon-jiantou1 left"></i>
                                            <i class="iconfont icon-jiantou right"></i>
                                        </div>
                                    </footer>
                                </section>
                                <aside class="midCon fl">
                                    <a><img src="${item.imgurl1}"></a>
                                    <a><img src="${item.imgurl2}"></a>   
                                </aside>
                                <aside class="midSec fl">
                                    <a><img src="${item.imgurl3}"></a>
                                    <a><img src="${item.imgurl4}"></a>
                                </aside>
                                <aside class="rightCon fl">
                                    <a><img src="${item.imgurl5}"></a>
                                    <a><img src="${item.imgurl6}"></a>
                                    <a><img src="${item.imgurl7}"></a>
                                </aside>
                            </article>`
                }).join('')
                    //左侧小banner图
                    for(var i=0;i<data.length;i++){
                        $('.brand_ban'+i).banner({
                            img:[data[i].brand1,data[i].brand2],
                            width:80,
                            height:200,
                            page:false,
                            type:'horizontal'
                        })
                    }
                    //左右滑动
                    //点击左右按钮时清除定时器，在封装好的轮播图插件里

            }//success
        })

        //关掉头部固定广告
        let $header_t = $('.header_t');
        let $btn_hide = $('.btn_hide');
        $btn_hide.on('click',function(){
            $header_t.stop().fadeOut();
        })

        //导航动画
        let $menu_d = $('.menu_detail'); 
        let $menu_li = $menu_d.parent('li');
        
        $menu_li.on('mouseover',function(){
            //显示隐藏
            $(this).children('.menu_detail').css('display','block').stop().animate({left:180},200);
            //左右滑动
            $(this).children('span').stop().animate({marginLeft:10},200);
            //字体颜色
            $(this).children('p').children('a').css('color','#fff');
            //背景颜色
            $(this).css('backgroundColor','#CC1D00');
        }).on('mouseout',function(){
            $(this).children('.menu_detail').css('display','none').stop().animate({left:170},200);
            $(this).children('span').stop().animate({marginLeft:0},200);
            $(this).children('p').children('a').css('color','#ECA598');
            $(this).css('backgroundColor','#CB3E25');
        })


        let body_width = $('body').width();
        // banner图
        let $ml_banner = $('.ml_banner');
        $ml_banner.banner({
            img:['img/banner1.jpg','img/banner2.jpg','img/banner3.jpg','img/banner4.jpg'],
            width:body_width,
            height:486,
            type:'fade'
        })

        //改变窗口大小时改变banner宽度
        document.body.onresize = function(){
            body_width = $('body').width();
            $ml_banner.html('');
                $ml_banner.banner({
                img:['img/banner1.jpg','img/banner2.jpg','img/banner3.jpg','img/banner4.jpg'],
                width:body_width,
                height:486,
                type:'fade'
            })
        }
        

        //搜索框吸顶
        let fix_header = $('.fix_header')[0];
        window.onscroll = function(){
        // 获取滚动条滚动过的距离
        var scrollTop = window.scrollY;
        if(scrollTop >= 300){
            fix_header.style.display='block';
        }else{
             fix_header.style.display='none';
        }
        }



        //右边固定购物车
        let $fix_right = $('.fix_right');
        let $btn_cart = $('.btn_cart');     
        let $menu = $('.cart_list .menu');
        let $main = $('.menu .main')
        let $total_qty = $('.total_qty');
        let $total_price = $('.total_price');

        $.ajax({
        url:'api/ml_cart.php',
        data:{
            type:'get'
        },
        success:function(data){
            data = JSON.parse(data);
            if(data.length===0){
                $menu[0].innerHTML=
                        `
                        <img src="img/fix_cart.png">
                        <p>亲，你还没有添加过任何商品哦！<a href="html/ml_list.html">去逛逛</a></p>
                        `          
                return;
            }else{
                //商品数量
                let single_q = [];
                //商品总价
                let single_p = [];

                $main[0].outerHTML = data.map(function(item){
                    //得到单个数量
                    single_q.push(item.count*1);
                    //得到单个商品总价
                    single_p.push(item.count*item.special);

                    return `<li class="clearfix">
                                <img src="${item.img.slice(3)}" class="fl"/>
                                <h5 class="fl">${item.mlname}</h5>
                                <h6 class="fr">
                                    <span class="special">${item.special}</span>
                                    ×<span class="qty">${item.count}</span>
                                </h6>
                            </li>`
                }).join('')


                //初始化商品总数
                let total_qty = single_q.reduce(function(a,b){
                    return a+b;
                })
                $total_qty.html(total_qty);

                //初始化总价
                let total_price = single_p.reduce(function(a,b){
                        return a+b;
                })
                $total_price.html(total_price);
            }//else
        }
    })
        

        //点击购物车时出现购物车menu
        $btn_cart.on('click',function(){
                $(this).toggleClass('haha');
            if($(this).hasClass('haha')){
                $fix_right.stop().animate({right:292})
            }else{
                $fix_right.stop().animate({right:0})
            }
        });





    });
    
});
