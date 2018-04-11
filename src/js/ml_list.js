require(['config'],function(){
    require(['jquery','xZoom'],function($){

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
           $menu_cont.css('display','block');
        }).on('mouseout',function(){
            $menu_cont.css('display','none');
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

        //手风琴
        let $type_open = $('.type_open');
        $type_open.on('click',function(){
            $(this).toggleClass('icon-jia');
            $(this).toggleClass('icon-iconset0187');
            $(this).parent('h4').next('li').toggleClass('block');
        })

        //热卖商品
        let $hot_sale = $('.hot_sale');
        let $hot_sell = $('.hot_sell');
        let $ul = $('<ul/>');
        let $left = $('<i class="iconfont icon-jiantou1 left"></i>')
        let $right =  $('<i class="iconfont icon-jiantou right"></i>')
        $.ajax({
            url:'../api/ml_list.php',
            data:{
                type:'hot_sale'
            },
            success:function(data){
                data = JSON.parse(data);
                data.map(function(item,idx){
                    //左边热销推荐
                    let $p = $('<p/>');
                    $p.attr('data-mlid',item.id);
                    let $img = $('<img src="'+item.imgurl1+'"></img>');
                    let $h3 = $('<h3>'+item.mlname+'</h3>');
                    let $h4 = $('<h4>￥'+item.special+'(7.8折)</h4>');
                    let $h5 = $('<h5>'+item.sale+'位用户购买</h5>');
                    $p.append($img).append($h3).append($h4).append($h5);
                    $hot_sale.append($p);
                    //右边热销推荐
                    let $li = $('<li/>');
                    $li.attr('data-mlid',item.id);
                    $img = $('<img src="'+item.imgurl1+'"></img>');
                    $h3 = $('<h3>'+item.mlname+'</h3>');
                    $h4 = $('<h4>￥'+item.special+'(7.8折)</h4>');
                    $h5 = $('<del>￥'+item.market+'</del>');
                    $li.append($img).append($h3).append($h4).append($h5);
                    $ul.append($li);
                    $hot_sell.append($ul).append($left).append($right);
                    let length = $ul.children('li').length;
                    let width = $ul.children('li').width();
                    $ul.width(length*width)
                    //左右切换
                    let target = 0;
                    $right[0].onclick=function(){
                            target -= width*4;
                            if(target <= -length*width + width*4){
                                target = -length*width + width*4;
                            }
                                $ul.animate({'left':target})

                            $left[0].onclick=function(){
                                target += width*4;   
                                if(target>=0){
                                    target = 0;
                                }
                                $ul.animate({'left':target})
                            }
                        }
                    })
                }
            })


        //热评商品
        let $hot_com = $('.hot_com');
        $.ajax({
            url:'../api/ml_list.php',
            data:{
                type:'hot_com'
            },
            success:function(data){
                data = JSON.parse(data);
                data.map(function(item){
                    let $p = $('<p></p>');
                    $p.attr('data-mlid'+item.id);
                    let $img = $('<img src="'+item.imgurl1+'"></img>');
                    let $h3 = $('<h3>'+item.mlname+'</h3>');
                    let $h4 = $('<h4>￥'+item.special+'(7.8折)</h4>');
                    let $h5 = $('<h5>'+item.comment+'位用户评论</h5>');
                    $p.append($img).append($h3).append($h4).append($h5);
                    $hot_com.append($p);
                })
            }
        })
        // tab标签切换
        let $items = $('.hot_tab').children('li');
        let $contents = $('.hot_content').children('li');
        $items[0].classList.add('active');
        $contents[0].classList.add('show');
        for(var i=0;i<$items.length;i++){
            var idx;     
            $items[i].onmouseover=function(){
                //切换时隐藏其他   
                for(var i=0;i<$items.length;i++){
                    $items[i].classList.remove('active');
                    $contents[i].classList.remove('show');
                    //这个要写在循环里
                    if($items[i]==this){
                        idx = i;
                    }
                }
                this.classList.add('active');
                $contents[idx].classList.add('show');
            }
        }





        //商品列表
        //创建分页
        let page = $('.page')[0];
        let $listChild = $('.list').children('a');
        let pageLen;
        let respage;
        function creatPage(){
            page.innerHTML = '';
            for(let i=0;i<pageLen;i++){
                let a = document.createElement('a');
                a.innerText = i+1;
                // 高亮分页
                if(i === respage-1){
                    a.className = 'selected';
                }
                page.appendChild(a);
            } 
        }
  
        //用于判断哪种分页切换
        let judge;
        // 默认综合排序
        judge = 'synthesize';
        // 默认综合排序
        let qty = 12;
        let $goods_list = $('.goods_list');                
        $.ajax({
            url:'../api/ml_list.php',
            data:{
                qty:qty,
                type:'list',
                acording:judge
            },
            success:function(res){
                res = JSON.parse(res);
                let ul = $('<ul/>')[0];
                ul.classList.add('clearfix');
                ul.innerHTML = res.data.map(function(item,i){
                        //return不能跨行
                        return  `<li data-mlid = ${item.id}>
                                <img src = "${item.Bimgurl1}"/>
                                <h3>${item.mlname}</h3>  
                                <h4>
                                    <strong>￥${item.special}</strong><del>￥${item.market}</del><span>特卖<span/>
                                <h4/>
                                <a>销量：${item.sale}</a><a>评价：${item.comment}</a>
                            </li>`
                }).join('');
                //第一次不用清空页面
                $goods_list.append(ul);
                pageLen = Math.ceil(res.total/res.qty);
                respage = res.page;
                creatPage();
            }   
        });
        
        //点击切换成综合排序
        let $zonghe = $('.synthesize');
        $zonghe.on('click',function(){
            //高亮按钮
            $listChild.removeClass('selected');
            $(this).addClass('selected');
            judge ='synthesize';
            console.log(judge)
            $.ajax({
            url:'../api/ml_list.php',
            data:{
                qty:qty,
                type:'list',
                acording:judge
            },
            success:function(res){
                res = JSON.parse(res);
                let ul = $('<ul/>')[0];
                ul.classList.add('clearfix');
                ul.innerHTML = res.data.map(function(item,i){
                        //return不能跨行
                        return  `<li data-mlid = ${item.id}>
                                <img src = "${item.Bimgurl1}"/>
                                <h3>${item.mlname}</h3>  
                                <h4>
                                    <strong>￥${item.special}</strong><del>￥${item.market}</del><span>特卖<span/>
                                <h4/>
                                <a>销量：${item.sale}</a><a>评价：${item.comment}</a>
                            </li>`
                }).join(''); 
                $goods_list.html('');               
                $goods_list.append(ul);
                pageLen = Math.ceil(res.total/res.qty);
                respage = res.page;
                creatPage();
            }   
        });
    })



        // 点击切换成销量排序                
        let $btn_sell = $('.btn_sell');
        $btn_sell.on('click',function(){
            //高亮按钮
            $listChild.removeClass('selected');
            $(this).addClass('selected');

            $btn_sell.toggleClass('asc');
            if($btn_sell.hasClass('asc')){
                judge = 'sell_asc';
            }else{
                judge = 'sell_desc';
            } 
            $.ajax({
                url:'../api/ml_list.php',
                data:{
                    qty:qty,
                    type:'list',
                    acording:judge
                },
                success:function(res){
                    res = JSON.parse(res);
                    let ul = $('<ul/>')[0];
                    ul.classList.add('clearfix');
                    ul.innerHTML = res.data.map(function(item,i){
                        //return不能跨行
                        return  `<li data-mlid = ${item.id}>
                                <img src = "${item.Bimgurl1}"/>
                                <h3>${item.mlname}</h3>  
                                <h4>
                                    <strong>￥${item.special}</strong><del>￥${item.market}</del><span>特卖<span/>
                                <h4/>
                                <a>销量：${item.sale}</a><a>评价：${item.comment}</a>
                            </li>`
                    }).join('');
                    $goods_list.html('');                    
                    $goods_list.append(ul);
                    pageLen = Math.ceil(res.total/res.qty);
                    respage = res.page;
                    creatPage();
                }   
            })           
        })
        
        //点击切换成价格排序
        let $btn_price = $('.btn_price');
        $btn_price.on('click',function(){
            //高亮按钮
            $listChild.removeClass('selected');
            $(this).addClass('selected');

            $btn_price.toggleClass('asc');
            if($btn_price.hasClass('asc')){
                judge = 'price_asc';
            }else{
                judge = 'price_desc';
            } 
            $.ajax({
                url:'../api/ml_list.php',
                data:{
                    qty:qty,
                    type:'list',
                    acording:judge
                },
                success:function(res){
                    res = JSON.parse(res);
                    let ul = $('<ul/>')[0];
                    ul.classList.add('clearfix');
                    ul.innerHTML = res.data.map(function(item,i){
                        //return不能跨行
                        return  `<li data-mlid = ${item.id}>
                                <img src = "${item.Bimgurl1}"/>
                                <h3>${item.mlname}</h3>  
                                <h4>
                                    <strong>￥${item.special}</strong><del>￥${item.market}</del><span>特卖<span/>
                                <h4/>
                                <a>销量：${item.sale}</a><a>评价：${item.comment}</a>
                            </li>`
                    }).join('');
                    $goods_list.html('');                    
                    $goods_list.append(ul);
                    pageLen = Math.ceil(res.total/res.qty);
                    respage = res.page;
                    creatPage();
                }   
            })           
        })

        //点击切换成评论排序
        let $btn_comment = $('.btn_comment');
        $btn_comment.on('click',function(){
            //高亮按钮
            $listChild.removeClass('selected');
            $(this).addClass('selected');
            
            $btn_comment.toggleClass('asc');
            if($btn_comment.hasClass('asc')){
                judge = 'comment_asc';
            }else{
                judge = 'comment_desc';
            } 
            $.ajax({
                url:'../api/ml_list.php',
                data:{
                    qty:qty,
                    type:'list',
                    acording:judge
                },
                success:function(res){
                    res = JSON.parse(res);
                    let ul = $('<ul/>')[0];
                    ul.classList.add('clearfix');
                    ul.innerHTML = res.data.map(function(item,i){
                        //return不能跨行
                        return  `<li data-mlid = ${item.id}>
                                <img src = "${item.Bimgurl1}"/>
                                <h3>${item.mlname}</h3>  
                                <h4>
                                    <strong>￥${item.special}</strong><del>￥${item.market}</del><span>特卖<span/>
                                <h4/>
                                <a>销量：${item.sale}</a><a>评价：${item.comment}</a>
                            </li>`
                    }).join('');
                    $goods_list.html('');                    
                    $goods_list.append(ul);
                    pageLen = Math.ceil(res.total/res.qty);
                    respage = res.page;
                    creatPage();
                }   
            })           
        })


        //点击切换成价格区间排序
        let $low_p = $('.low_p');
        let $upper_p = $('.upper_p');
        let $search = $('.search');
        //不能直接用$('.upper_p').val();
        $search.on('click',function(){
            judge = 'search';
            $.ajax({
                url:'../api/ml_list.php',
                data:{
                    qty:qty,
                    low:$low_p.val(),
                    upper:$upper_p.val(),
                    type:'list',
                    acording:judge
                },
                success:function(res){
                    res = JSON.parse(res);
                    let ul = $('<ul/>')[0];
                    ul.classList.add('clearfix');
                    ul.innerHTML = res.data.map(function(item,i){
                        //return不能跨行
                        return  `<li data-mlid = ${item.id}>
                                <img src = "${item.Bimgurl1}"/>
                                <h3>${item.mlname}</h3>  
                                <h4>
                                    <strong>￥${item.special}</strong><del>￥${item.market}</del><span>特卖<span/>
                                <h4/>
                                <a>销量：${item.sale}</a><a>评价：${item.comment}</a>
                            </li>`
                    }).join('');
                    $goods_list.html('');                    
                    $goods_list.append(ul);
                    pageLen = Math.ceil(res.total/res.qty);
                    respage = res.page;
                    creatPage();
                }   
            })           
        })



        // 点击切换分页
        page.onclick = function(e){
            if(e.target.tagName.toLowerCase() === 'a'){
                let pageNo = e.target.innerText;
                // 高亮分页
                for(var i = 0;i<page.children.length;i++){
                    page.children[i].classList.remove('selected');
                }
                e.target.classList.add('selected');
                $.ajax({
                    url:'../api/ml_list.php',
                    data:{
                        qty:qty,
                        page:pageNo,
                        type:'list',
                        acording:judge
                    },
                    success:function(res){
                        $goods_list.html('');
                        res = JSON.parse(res);
                        let ul = $('<ul/>')[0];
                        ul.classList.add('clearfix');
                        ul.innerHTML = res.data.map(function(item,i){
                                //return不能跨行
                                return  `<li data-mlid = ${item.id}>
                                        <img src = "${item.Bimgurl1}"/>
                                        <h3>${item.mlname}</h3>  
                                        <h4>
                                            <strong>￥${item.special}</strong><del>￥${item.market}</del><span>特卖<span/>
                                        <h4/>
                                        <a>销量：${item.sale}</a><a>评价：${item.comment}</a>
                                    </li>`
                        }).join('');
                        $goods_list.append(ul);
                    }
                })
            }
        }


    });
    
});