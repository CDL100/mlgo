jQuery(function($){
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
    // banner图
    let $ml_banner = $('.ml_banner');
    $ml_banner.banner({
        img:['https://res.m6go.com/content/images/white.gif','https://file3.m6go.com/47kJwuulRkaofk5S2xKxOs/50'],
        width:1000,
        height:480,
        type:'fade'
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

})