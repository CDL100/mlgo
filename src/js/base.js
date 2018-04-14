require(['config'],function(){
    require(['jquery'],function($){

        
        //关掉头部固定广告
        let $header_t = $('.header_t');
        let $btn_hide = $('.btn_hide');
        $btn_hide.on('click',function(){
            $header_t.stop().fadeOut();
        })
        let $nav_open = $('.nav_open');
        let $menu_cont = $('.menu_cont');
        //hover时显示菜单栏
        $nav_open.on('mouseover',function(){
           $menu_cont.stop().fadeIn(300);
        }).on('mouseout',function(){
           $menu_cont.stop().fadeOut(300);
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


        //点击购物车时出现购物车menu
        $btn_cart.on('click',function(){
                $(this).toggleClass('haha');
            if($(this).hasClass('haha')){
                $fix_right.stop().animate({right:292})
            }else{
                $fix_right.stop().animate({right:0})
            }
        });


        //生成购物车
        $.ajax({
            url:'../api/ml_cart.php',
            data:{
                type:'get'
            },
            success:function(data){
                data = JSON.parse(data);
                if(data.length===0){
                    $menu[0].innerHTML=
                            `
                            <img src="../img/fix_cart.png">
                            <p>亲，你还没有添加过任何商品哦！<a href="../html/ml_list.html">去逛逛</a></p>
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

                        return `<li class="clearfix" data-mlid="${item.ml_id}">
                                    <img src="${item.img}" class="fl"/>
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

                    $('.goods_list .btn_gou').on('click',function(){
                        //点击改变右边固定列表数量        
                        let $curentLi = $(this).closest('li');          
                        total_qty++;
                        $total_qty.html(total_qty);
                        let data_mlid = $curentLi.data('mlid');
                        $('.menu li').map(function(i,item){
                            if(item.dataset.mlid==data_mlid){
                                let val = $(item).find('.qty').text();
                                val++;
                                $(item).find('.qty').text(val);
                            }
                        })
                    })






                }//else
            }//function
        })//ajax
        











        



    });
});