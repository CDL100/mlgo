require(['config'],function(){
    require(['jquery','base'],function($){

        //右边固定购物车
        let $fix_right = $('.fix_right');
        let $btn_cart = $('.btn_cart');     
        let $menu = $('.cart_list .menu');
        let $main = $('.menu .main')
        let $total_qty = $('.total_qty');
        let $total_price = $('.total_price');
        
        //点击时，更新购物车列表
        function update(){
                $.ajax({
                    url:'../api/ml_getCart.php',
                    data:{
                        type:'get'
                    },
                    success:function(data){
                        data = JSON.parse(data);
                            //商品数量
                            let single_q = [];
                            //商品总价
                            let single_p = [];
                            $main[0].innerHTML = data.map(function(item){
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
                            }).join('');

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
                    }//function
                })//ajax
        }

        //手风琴
        let $type_open = $('.type_open');
        $type_open.on('click',function(){
            $(this).toggleClass('icon-jia');
            $(this).toggleClass('icon-iconset0187');

            let $target = $(this).parent('h4').next('li')
            $target.toggleClass('block');
            if($target.hasClass('block')){
                $target.stop().slideDown(300);
            }else{
                $target.stop().slideUp(300);
            }
        })

        //热卖商品
        let $hot_sale = $('.hot_sale');
        let $sell_con = $('.sell_con');
        let $ul = $('<ul/>');
        let $left = $('.left')
        let $right =  $('.right')
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
                    let $img = $('<a><img src="'+item.imgurl1+'"></img>');
                    let $h3 = $('<h3>'+item.mlname+'</h3>');
                    let $h4 = $('<h4>￥'+item.special+'(7.8折)</h4>');
                    let $h5 = $('<h5>'+item.sale+'位用户购买</h5>');

                    $p.append($img).append($h3).append($h4).append($h5);
                    $hot_sale.append($p);


                    //右边热销推荐
                    let $li = $('<li/>');
                    $li.attr('data-mlid',item.id);
                    $img = $('<a><img src="'+item.imgurl1+'"></img>');
                    $h3 = $('<h3>'+item.mlname+'</h3>');
                    $h4 = $('<h4>￥'+item.special+'(7.8折)</h4>');
                    $h5 = $('<del>￥'+item.market+'</del>');
                    $button = $('<button class="selected btn_gou">立刻抢购</button>');

                    $li.append($img).append($h3).append($h4).append($h5).append($button);
                    $ul.append($li);
                    $sell_con.append($ul);

                    let length = $ul.children('li').length;
                    //一定要用outerWidth
                    let width = $ul.children('li').outerWidth();
                    $ul.width(length*width)
                    //左右切换
                    let target = 0;
                    $right[0].onclick=function(){
                        target -= width*4;
                        let qty = length%4;
                        if(qty==0){
                            qty=4;
                        }
                        //最后一个列表有几个width就乘以几
                        if(target <= -length*width + width*qty){
                            target = -length*width + width*qty;
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
                    $p.attr('data-mlid',item.id);
                    let $img = $('<a><img src="'+item.imgurl1+'"></img>');
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
        let $listChild = $('.list').children('a');
        let page = $('.page')[0];
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
                                <a class="goodsImg"><img src = "${item.Bimgurl1}"/></a>
                                <h3>${item.mlname}</h3>  
                                <h4>
                                    <strong>￥${item.special}</strong><del>￥${item.market}</del><span>特卖<span/>
                                </h4>
                                <h5>
                                    <a>销量：${item.sale}</a><a>评价：${item.comment}</a>
                                </h5>
                                <h6>
                                    <a class="btn_gou selected">加入购物车</a>
                                </h6>  
                            </li>`
                }).join('');
                //第一次不用清空页面
                $goods_list.append(ul);
                //书写记录
                let $record = $('.record')
                $record[0].innerHTML='共有<i>'+res.total+'</i>条记录';
                //创建分页
                let pageLen = Math.ceil(res.total/res.qty);
                page.innerHTML = '';
                for(let i=0;i<pageLen;i++){
                    let a = document.createElement('a');
                    a.innerText = i+1;
                    // 高亮分页
                    if(i === res.page-1){
                        a.className = 'selected';
                    }
                    page.appendChild(a);
                }
                //hover时出现加入购物车
                $goods_list.find('li').on('mouseover',function(){
                    $(this).find('h5').css('display','none');
                    $(this).find('h6').css('display','block');
                }).on('mouseout',function(){
                    $(this).find('h5').css('display','block');
                    $(this).find('h6').css('display','none');
                })
                //点击时加入购物车
                $('.goods_list .btn_gou').on('click',function(){
                    let $currentLi = $(this).closest('li');
                    let $goodsImg = $currentLi.find('.goodsImg');
                    let $img = $currentLi.find('.goodsImg img');
                    let $cloneImg = $img.clone(true);

                    $goodsImg.append($cloneImg)
                    $cloneImg.css({
                        position: 'absolute',
                        zIndex:'40',
                        left:0,
                        top:0
                    })
                    let targetL = $('.btn_cart').offset().left-$cloneImg.offset().left;
                    let targetT = $('.btn_cart').offset().top-$cloneImg.offset().top;
                    $cloneImg.stop().animate({width:50,height:50,left:targetL,top:targetT},1000,function(){
                        $cloneImg.remove();
                    });

                    $.ajax({
                        url:'../api/ml_cart.php',
                        data:{
                            mlid:$(this).closest('li').data('mlid'),
                            val:1,
                            type:'add'
                        },
                        success:function(data){
                            update();
                        }
                    })
                })
            }   
        });
        
        //点击切换成综合排序
        let $zonghe = $('.synthesize');
        $zonghe.on('click',function(){
            //高亮按钮
            $listChild.removeClass('selected');
            $(this).addClass('selected');
            judge ='synthesize';
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
                                <a class="goodsImg"><img src = "${item.Bimgurl1}"/></a>
                                <h3>${item.mlname}</h3>  
                                <h4>
                                    <strong>￥${item.special}</strong><del>￥${item.market}</del><span>特卖<span/>
                                </h4>
                                <h5>
                                    <a>销量：${item.sale}</a><a>评价：${item.comment}</a>
                                </h5>
                                <h6>
                                    <a class="btn_gou selected">加入购物车</a>
                                </h6>  
                            </li>`
                }).join('');
                $goods_list.html('');
                $goods_list.append(ul);
                //书写记录
                let $record = $('.record')
                $record[0].innerHTML='共有<i>'+res.total+'</i>条记录';
                //创建分页
                let pageLen = Math.ceil(res.total/res.qty);
                page.innerHTML = '';
                for(let i=0;i<pageLen;i++){
                    let a = document.createElement('a');
                    a.innerText = i+1;
                    // 高亮分页
                    if(i === res.page-1){
                        a.className = 'selected';
                    }
                    page.appendChild(a);
                }
                //hover时出现加入购物车
                $goods_list.find('li').on('mouseover',function(){
                    $(this).find('h5').css('display','none');
                    $(this).find('h6').css('display','block');
                }).on('mouseout',function(){
                    $(this).find('h5').css('display','block');
                    $(this).find('h6').css('display','none');
                })
                //点击时加入购物车
                $('.goods_list .btn_gou').on('click',function(){
                    let $currentLi = $(this).closest('li');
                    let $goodsImg = $currentLi.find('.goodsImg');
                    let $img = $currentLi.find('.goodsImg img');
                    let $cloneImg = $img.clone(true);

                    $goodsImg.append($cloneImg)
                    $cloneImg.css({
                        position: 'absolute',
                        zIndex:'40',
                        left:0,
                        top:0
                    })
                    let targetL = $('.btn_cart').offset().left-$cloneImg.offset().left;
                    let targetT = $('.btn_cart').offset().top-$cloneImg.offset().top;
                    $cloneImg.stop().animate({width:50,height:50,left:targetL,top:targetT},1000,function(){
                        $cloneImg.remove();
                    });
                    $.ajax({
                        url:'../api/ml_cart.php',
                        data:{
                            mlid:$(this).closest('li').data('mlid'),
                            val:1,
                            type:'add'
                        },
                        success:function(data){
                            update();
                        }
                    })
                })
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
                                    <a class="goodsImg"><img src = "${item.Bimgurl1}"/></a>
                                    <h3>${item.mlname}</h3>  
                                    <h4>
                                        <strong>￥${item.special}</strong><del>￥${item.market}</del><span>特卖<span/>
                                    </h4>
                                    <h5>
                                        <a>销量：${item.sale}</a><a>评价：${item.comment}</a>
                                    </h5>
                                    <h6>
                                        <a class="btn_gou selected">加入购物车</a>
                                    </h6>  
                                </li>`
                    }).join('');
                    $goods_list.html('');
                    $goods_list.append(ul);
                    //书写记录
                    let $record = $('.record')
                    $record[0].innerHTML='共有<i>'+res.total+'</i>条记录';
                    //创建分页
                    let pageLen = Math.ceil(res.total/res.qty);
                    page.innerHTML = '';
                    for(let i=0;i<pageLen;i++){
                        let a = document.createElement('a');
                        a.innerText = i+1;
                        // 高亮分页
                        if(i === res.page-1){
                            a.className = 'selected';
                        }
                        page.appendChild(a);
                    }
                    //hover时出现加入购物车
                    $goods_list.find('li').on('mouseover',function(){
                        $(this).find('h5').css('display','none');
                        $(this).find('h6').css('display','block');
                    }).on('mouseout',function(){
                        $(this).find('h5').css('display','block');
                        $(this).find('h6').css('display','none');
                    })
                    //点击时加入购物车
                    $('.goods_list .btn_gou').on('click',function(){
                        let $currentLi = $(this).closest('li');
                        let $goodsImg = $currentLi.find('.goodsImg');
                        let $img = $currentLi.find('.goodsImg img');
                        let $cloneImg = $img.clone(true);

                        $goodsImg.append($cloneImg)
                        $cloneImg.css({
                            position: 'absolute',
                            zIndex:'40',
                            left:0,
                            top:0
                        })
                        let targetL = $('.btn_cart').offset().left-$cloneImg.offset().left;
                        let targetT = $('.btn_cart').offset().top-$cloneImg.offset().top;
                        $cloneImg.stop().animate({width:50,height:50,left:targetL,top:targetT},1000,function(){
                            $cloneImg.remove();
                        });
                        $.ajax({
                            url:'../api/ml_cart.php',
                            data:{
                                mlid:$(this).closest('li').data('mlid'),
                                val:1,
                                type:'add'
                            },
                            success:function(data){
                                update();
                            }
                        })
                    })

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
                                    <a class="goodsImg"><img src = "${item.Bimgurl1}"/></a>
                                    <h3>${item.mlname}</h3>  
                                    <h4>
                                        <strong>￥${item.special}</strong><del>￥${item.market}</del><span>特卖<span/>
                                    </h4>
                                    <h5>
                                        <a>销量：${item.sale}</a><a>评价：${item.comment}</a>
                                    </h5>
                                    <h6>
                                        <a class="btn_gou selected">加入购物车</a>
                                    </h6>  
                                </li>`
                    }).join('');
                    $goods_list.html('');
                    $goods_list.append(ul);
                    //书写记录
                    let $record = $('.record')
                    $record[0].innerHTML='共有<i>'+res.total+'</i>条记录';
                    //创建分页
                    let pageLen = Math.ceil(res.total/res.qty);
                    page.innerHTML = '';
                    for(let i=0;i<pageLen;i++){
                        let a = document.createElement('a');
                        a.innerText = i+1;
                        // 高亮分页
                        if(i === res.page-1){
                            a.className = 'selected';
                        }
                        page.appendChild(a);
                    }
                    //hover时出现加入购物车
                    $goods_list.find('li').on('mouseover',function(){
                        $(this).find('h5').css('display','none');
                        $(this).find('h6').css('display','block');
                    }).on('mouseout',function(){
                        $(this).find('h5').css('display','block');
                        $(this).find('h6').css('display','none');
                    })
                    //点击时加入购物车
                    $('.goods_list .btn_gou').on('click',function(){
                        let $currentLi = $(this).closest('li');
                        let $goodsImg = $currentLi.find('.goodsImg');
                        let $img = $currentLi.find('.goodsImg img');
                        let $cloneImg = $img.clone(true);

                        $goodsImg.append($cloneImg)
                        $cloneImg.css({
                            position: 'absolute',
                            zIndex:'40',
                            left:0,
                            top:0
                        })
                        let targetL = $('.btn_cart').offset().left-$cloneImg.offset().left;
                        let targetT = $('.btn_cart').offset().top-$cloneImg.offset().top;
                        $cloneImg.stop().animate({width:50,height:50,left:targetL,top:targetT},1000,function(){
                            $cloneImg.remove();
                        });
                        $.ajax({
                            url:'../api/ml_cart.php',
                            data:{
                                mlid:$(this).closest('li').data('mlid'),
                                val:1,
                                type:'add'
                            },
                            success:function(data){
                                update();
                            }
                        })
                    })

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
                                    <a class="goodsImg"><img src = "${item.Bimgurl1}"/></a>
                                    <h3>${item.mlname}</h3>  
                                    <h4>
                                        <strong>￥${item.special}</strong><del>￥${item.market}</del><span>特卖<span/>
                                    </h4>
                                    <h5>
                                        <a>销量：${item.sale}</a><a>评价：${item.comment}</a>
                                    </h5>
                                    <h6>
                                        <a class="btn_gou selected">加入购物车</a>
                                    </h6>  
                                </li>`
                    }).join('');
                    $goods_list.html('');
                    $goods_list.append(ul);
                    //书写记录
                    let $record = $('.record')
                    $record[0].innerHTML='共有<i>'+res.total+'</i>条记录';
                    //创建分页
                    let pageLen = Math.ceil(res.total/res.qty);
                    page.innerHTML = '';
                    for(let i=0;i<pageLen;i++){
                        let a = document.createElement('a');
                        a.innerText = i+1;
                        // 高亮分页
                        if(i === res.page-1){
                            a.className = 'selected';
                        }
                        page.appendChild(a);
                    }
                    //hover时出现加入购物车
                    $goods_list.find('li').on('mouseover',function(){
                        $(this).find('h5').css('display','none');
                        $(this).find('h6').css('display','block');
                    }).on('mouseout',function(){
                        $(this).find('h5').css('display','block');
                        $(this).find('h6').css('display','none');
                    })
                    //点击时加入购物车
                    $('.goods_list .btn_gou').on('click',function(){
                        let $currentLi = $(this).closest('li');
                        let $goodsImg = $currentLi.find('.goodsImg');
                        let $img = $currentLi.find('.goodsImg img');
                        let $cloneImg = $img.clone(true);

                        $goodsImg.append($cloneImg)
                        $cloneImg.css({
                            position: 'absolute',
                            zIndex:'40',
                            left:0,
                            top:0
                        })
                        let targetL = $('.btn_cart').offset().left-$cloneImg.offset().left;
                        let targetT = $('.btn_cart').offset().top-$cloneImg.offset().top;
                        $cloneImg.stop().animate({width:50,height:50,left:targetL,top:targetT},1000,function(){
                            $cloneImg.remove();
                        });
                        $.ajax({
                            url:'../api/ml_cart.php',
                            data:{
                                mlid:$(this).closest('li').data('mlid'),
                                val:1,
                                type:'add',
                                success:function(data){
                                    update();
                                }
                            }
                        })
                    })

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
                                    <a class="goodsImg"><img src = "${item.Bimgurl1}"/></a>
                                    <h3>${item.mlname}</h3>  
                                    <h4>
                                        <strong>￥${item.special}</strong><del>￥${item.market}</del><span>特卖<span/>
                                    </h4>
                                    <h5>
                                        <a>销量：${item.sale}</a><a>评价：${item.comment}</a>
                                    </h5>
                                    <h6>
                                        <a class="btn_gou selected">加入购物车</a>
                                    </h6>  
                                </li>`
                    }).join('');
                    $goods_list.html('');
                    $goods_list.append(ul);
                    //书写记录
                    let $record = $('.record')
                    $record[0].innerHTML='共有<i>'+res.total+'</i>条记录';
                    //创建分页
                    let pageLen = Math.ceil(res.total/res.qty);
                    page.innerHTML = '';
                    for(let i=0;i<pageLen;i++){
                        let a = document.createElement('a');
                        a.innerText = i+1;
                        // 高亮分页
                        if(i === res.page-1){
                            a.className = 'selected';
                        }
                        page.appendChild(a);
                    }
                    //hover时出现加入购物车
                    $goods_list.find('li').on('mouseover',function(){
                        $(this).find('h5').css('display','none');
                        $(this).find('h6').css('display','block');
                    }).on('mouseout',function(){
                        $(this).find('h5').css('display','block');
                        $(this).find('h6').css('display','none');
                    })
                    //点击时加入购物车
                    $('.goods_list .btn_gou').on('click',function(){
                        let $currentLi = $(this).closest('li');
                        let $goodsImg = $currentLi.find('.goodsImg');
                        let $img = $currentLi.find('.goodsImg img');
                        let $cloneImg = $img.clone(true);

                        $goodsImg.append($cloneImg)
                        $cloneImg.css({
                            position: 'absolute',
                            zIndex:'40',
                            left:0,
                            top:0
                        })
                        let targetL = $('.btn_cart').offset().left-$cloneImg.offset().left;
                        let targetT = $('.btn_cart').offset().top-$cloneImg.offset().top;
                        $cloneImg.stop().animate({width:50,height:50,left:targetL,top:targetT},1000,function(){
                            $cloneImg.remove();
                        });
                        $.ajax({
                            url:'../api/ml_cart.php',
                            data:{
                                mlid:$(this).closest('li').data('mlid'),
                                val:1,
                                type:'add',
                                success:function(data){
                                    update();
                                }
                            }
                        })
                    })
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
                        res = JSON.parse(res);
                        let ul = $('<ul/>')[0];
                        ul.classList.add('clearfix');
                        ul.innerHTML = res.data.map(function(item,i){
                                //return不能跨行
                                return  `<li data-mlid = ${item.id}>
                                        <a class="goodsImg"><img src = "${item.Bimgurl1}"/></a>
                                        <h3>${item.mlname}</h3>  
                                        <h4>
                                            <strong>￥${item.special}</strong><del>￥${item.market}</del><span>特卖<span/>
                                        </h4>
                                        <h5>
                                            <a>销量：${item.sale}</a><a>评价：${item.comment}</a>
                                        </h5>
                                        <h6>
                                            <a class="btn_gou selected">加入购物车</a>
                                        </h6>  
                                    </li>`
                        }).join('');
                        $goods_list.html('');
                        $goods_list.append(ul);
                        //书写记录
                        let $record = $('.record')
                        $record[0].innerHTML='共有<i>'+res.total+'</i>条记录';
                        //创建分页
                        let pageLen = Math.ceil(res.total/res.qty);
                        page.innerHTML = '';
                        for(let i=0;i<pageLen;i++){
                            let a = document.createElement('a');
                            a.innerText = i+1;
                            // 高亮分页
                            if(i === res.page-1){
                                a.className = 'selected';
                            }
                            page.appendChild(a);
                        }
                        //hover时出现加入购物车
                        $goods_list.find('li').on('mouseover',function(){
                            $(this).find('h5').css('display','none');
                            $(this).find('h6').css('display','block');
                        }).on('mouseout',function(){
                            $(this).find('h5').css('display','block');
                            $(this).find('h6').css('display','none');
                        })
                        //点击时加入购物车
                        $('.goods_list .btn_gou').on('click',function(){
                            let $currentLi = $(this).closest('li');
                            let $goodsImg = $currentLi.find('.goodsImg');
                            let $img = $currentLi.find('.goodsImg img');
                            let $cloneImg = $img.clone(true);

                            $goodsImg.append($cloneImg)
                            $cloneImg.css({
                                position: 'absolute',
                                zIndex:'40',
                                left:0,
                                top:0
                            })
                            let targetL = $('.btn_cart').offset().left-$cloneImg.offset().left;
                            let targetT = $('.btn_cart').offset().top-$cloneImg.offset().top;
                            $cloneImg.stop().animate({width:50,height:50,left:targetL,top:targetT},1000,function(){
                                $cloneImg.remove();
                            });
                            $.ajax({
                                url:'../api/ml_cart.php',
                                data:{
                                    mlid:$(this).closest('li').data('mlid'),
                                    val:1,
                                    type:'add',
                                    success:function(data){
                                        update();
                                    }
                                }
                            })

                        })

                    }  
                })
            }
        }

        //点击传递参数并生成浏览记录
        $sell_con.on('click','a',function(){
            //传递参数
            let id = $(this).closest('li').attr('data-mlid');
            $.ajax({
                url:'../api/ml_record.php',
                data:{
                    mlid:id,
                    type:'add'
                }
            })
            $(this)[0].href = "ml_details.html?" + id;

        })
        $hot_sale.on('click','a',function(){
            //传递参数
            let id = $(this).closest('p').attr('data-mlid');
            $.ajax({
                url:'../api/ml_record.php',
                data:{
                    mlid:id,
                    type:'add'
                }
            })
            $(this)[0].href = "ml_details.html?" + id;
        })
        $hot_com.on('click','a',function(){  
            //传递参数
            let id = $(this).closest('p').attr('data-mlid');
            $.ajax({
                url:'../api/ml_record.php',
                data:{
                    mlid:id,
                    type:'add'
                }
            })
            $(this)[0].href = "ml_details.html?" + id;
        })
        $goods_list.on('click','.goodsImg',function(){          
            //传递参数
            let id = $(this).closest('li').attr('data-mlid');
            $.ajax({
                url:'../api/ml_record.php',
                data:{
                    mlid:id,
                    type:'add'
                }
            })
            $(this)[0].href = "ml_details.html?" + id;
        })
        

    });
});