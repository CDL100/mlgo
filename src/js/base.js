require(['config'],function(){
    require(['jquery'],function($){

        
        //关掉头部固定广告
        let $header_t = $('.header_t');
        let $btn_hide = $('.btn_hide');
        $btn_hide.on('click',function(){
            $header_t.stop().fadeOut();
        })

        //导航动画
        let $menu_d = $('.menu_detail'); 
        let $menu_li = $menu_d.parent('li');
        let $menu_cont = $('.menu_cont');
        let $nav_open = $('.nav_open');

        //hover时显示菜单栏
        $nav_open.on('mouseover',function(){
           $menu_cont.stop().fadeIn(300);
        }).on('mouseout',function(){
           $menu_cont.stop().fadeOut(300);
        })
        
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

        //搜索框吸顶
        let fix_header = $('.fix_header')[0];
        window.onscroll = function(){
        // 获取滚动条滚动过的距离
        var scrollTop = window.scrollY;
        if(scrollTop >= 400){
            fix_header.style.display='block';
        }else{
             fix_header.style.display='none';
        }
        }





    });
});