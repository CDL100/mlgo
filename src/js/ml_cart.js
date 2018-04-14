require(['config'],function(){
    require(['jquery'],function($){

        //生成数据
        let $menu = $('.ml_menu .menu');
        $.ajax({
            url:'../api/ml_cart.php',
            data:{
                type:'get'
            },
            success:function(data){
                data = JSON.parse(data);
                let $total_md = $('.total_md');
                let $total_save = $('.total_save');
                let $total_qty = $('.total_qty');
                let $total_price = $('.total_price');
                let $form = $('.ml_menu form')
                //判断购物车是否为空
                if(data.length===0){
                    $form[0].innerHTML=
                            `<a class="empty" href="../html/ml_list.html">
                                <img src="../img/cart.png">
                            </a>`
                    return;
                }else{

                //麦豆数
                let total_m = [];
                let single_m = [];
                //节省数
                let total_s = [];
                let single_s = [];
                //商品数量
                let single_q = [];
                //商品总价
                let single_p = [];

                $menu[0].outerHTML = data.map(function(item){
                    
                    //得到总麦豆数
                    total_m.push(item.md*item.count);
                    //得到单个麦豆数
                    single_m.push(item.md); 

                    //得到总节省数
                    total_s.push((item.market-item.special)*item.count)
                    //得到单个节省总数
                    single_s.push(item.market-item.special); 

                    //得到单个数量
                    single_q.push(item.count*1);

                    //得到单个商品总价
                    single_p.push(item.count*item.special);


                    return `<tr class="menu" data-mlid="${item.ml_id}">
                                <td>
                                    <input type="checkbox" checked>
                                    <img src=${item.img}>
                                    <span>${item.mlname}</span>                                
                                </td>
                                <td>
                                    <h3 class="red strong">
                                        ￥<span class="special">${item.special}</span>
                                    </h3>
                                    <del class="market">￥${item.market}</del>
                                </td>
                                <td>
                                    <p class="clearfix">
                                        <img src="../img/jian.png" class="btn_jian fl">
                                        <input type="text" class="qty fl" value=${item.count}>
                                        <img src="../img/jia.png" class="btn_jia fl">
                                    </p>
                                </td>
                                <td>
                                    <h3 class="red strong">
                                        ￥<span class="single_t">${item.count*item.special}</span>
                                    </h3>
                                </td>
                                <td>
                                    <a class="btn_delete">删除</a>
                                </td>
                            </tr>`
                }).join('');


                //初始化麦豆总数
                let total_md = total_m.reduce(function(a,b){
                        return a+b;
                })
                $total_md.html(total_md);

                //初始化总节省数
                let total_save = total_s.reduce(function(a,b){
                        return a+b;
                })
                $total_save.html(total_save.toFixed(2));

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


                //点击加改变数量
                let val;
                $('.btn_jia').on('mousedown',function(){

                    let $currentTr = $(this).closest('tr');
                    let $single_t = $currentTr.find('.single_t');
                    let special = $currentTr.find('.special').text();

                    //商品数量
                    val = $(this).prev('.qty').val();
                    val++;
                    $(this).prev('.qty').val(val);

                    //改变单个商品总价
                    $single_t.text(special*val);

                    //改变总商品数量              
                    for(i=0;i<$('.menu').length;i++){
                        if($('.menu')[i]==$currentTr[0]){
                            let idx = i;
                            //删除对应总商品数量并添加总商品数量
                            single_q.splice(idx,1,val);
                            total_qty = single_q.reduce(function(a,b){
                                    return a+b;
                            })
                            $total_qty.html(total_qty);


                            //删除对应总商品总价并添加总商品总价
                            single_p.splice(idx,1,special*val);
                            total_price = single_p.reduce(function(a,b){
                                    return a+b;
                            })
                            $total_price.html(total_price);


                            //删除对应麦豆总数并添加对应麦豆总数
                            total_m.splice(idx,1,single_m[idx]*val);
                            total_md = total_m.reduce(function(a,b){
                                    return a+b;
                            })
                            $total_md.html(total_md);

                            //删除对应麦豆总数并添加对应麦豆总数
                            total_s.splice(idx,1,single_s[idx]*val);
                            total_save = total_s.reduce(function(a,b){
                                    return a+b;
                            })
                            $total_save.html(total_save.toFixed(2));

                        }             
                    }

                    //改变数据库数据
                    $.ajax({
                        url:'../api/ml_cart.php',
                        data:{
                            mlid:$(this).closest('tr').data('mlid'),
                            qty:val,
                            type:'change'
                        }
                    })
                })


                //点击减改变数量
                $('.btn_jian').on('mousedown',function(){

                    let $currentTr = $(this).closest('tr');
                    let $single_t = $currentTr.find('.single_t');
                    let special = $currentTr.find('.special').text();

                    val = $(this).next('.qty').val();             
                    val--;
                    if(val<=1){
                        val=1
                    }
                    $(this).next('.qty').val(val);
                    //改变单个商品总价
                    $single_t.text(special*val);

                    //改变总商品数量              
                    for(i=0;i<$('.menu').length;i++){
                        if($('.menu')[i]==$currentTr[0]){
                            let idx = i;
                            //删除对应总商品数量并添加总商品数量
                            single_q.splice(idx,1,val);
                            total_qty = single_q.reduce(function(a,b){
                                    return a+b;
                            })
                            $total_qty.html(total_qty);

                            //删除对应总商品总价并添加总商品总价
                            single_p.splice(idx,1,special*val);
                            total_price = single_p.reduce(function(a,b){
                                    return a+b;
                            })
                            $total_price.html(total_price);

                            // 删除对应麦豆总数并添加对应麦豆总数
                            total_m.splice(idx,1,single_m[idx]*val);
                            total_md = total_m.reduce(function(a,b){
                                    return a+b;
                            })
                            $total_md.html(total_md);

                            //删除对应节省总数并添加对应节省总数
                            total_s.splice(idx,1,single_s[idx]*val);
                            total_save = total_s.reduce(function(a,b){
                                    return a+b;
                            })
                            $total_save.html(total_save.toFixed(2));
                        }             
                    }

                    //改变数据库数据
                    $.ajax({
                        url:'../api/ml_cart.php',
                        data:{
                            mlid:$(this).closest('tr').data('mlid'),
                            qty:val,
                            type:'change'
                        }
                    })
                })


                //按下键盘改变购买数量
                $('.qty').on('keydown',function(e){

                    let $currentTr = $(this).closest('tr');
                    let $single_t = $currentTr.find('.single_t');
                    let special = $currentTr.find('.special').text();                    
                    val = $(this).val();
                    if(e.keyCode==38){
                        val++
                    }else if(e.keyCode==40){
                        val--
                        if(val<=1){
                            val=1
                        }
                    }
                    $(this).val(val);
                    //改变单个商品总价
                    $single_t.text(special*val);

                    //改变总商品数量              
                    for(i=0;i<$('.menu').length;i++){
                        if($('.menu')[i]==$currentTr[0]){
                            let idx = i;
                            //删除对应总商品数量并添加总商品数量
                            single_q.splice(idx,1,val);
                            total_qty = single_q.reduce(function(a,b){
                                    return a+b;
                            })
                            $total_qty.html(total_qty);

                            //删除对应总商品总价并添加总商品总价
                            single_p.splice(idx,1,special*val);
                            total_price = single_p.reduce(function(a,b){
                                    return a+b;
                            })
                            $total_price.html(total_price);


                            //删除对应节省总数并添加对应节省总数
                            total_m.splice(idx,1,single_m[idx]*val);
                            total_md = total_m.reduce(function(a,b){
                                    return a+b;
                            })
                            $total_md.html(total_md);


                            //删除对应节省总数并添加对节省豆总数
                            total_s.splice(idx,1,single_s[idx]*val);
                            total_save = total_s.reduce(function(a,b){
                                    return a+b;
                            })
                            $total_save.html(total_save.toFixed(2));
                        }             
                    }
                    //改变数据库数据
                    $.ajax({
                        url:'../api/ml_cart.php',
                        data:{
                            mlid:$(this).closest('tr').data('mlid'),
                            qty:val,
                            type:'change'
                        }
                    })
                })
                


                //键盘弹起时将数据存入数据库
                $('.qty').on('keyup',function(){
                    val = $(this).val();
                    $.ajax({
                        url:'../api/ml_cart.php',
                        data:{
                            mlid:$(this).closest('tr').data('mlid'),
                            qty:val,
                            type:'change'
                        }
                    })

                })



              
                //点击删除按钮删除对应商品
                $('.btn_delete').on('click',function(){
                    let $currentTr = $(this).closest('tr');
                    let $single_t = $currentTr.find('.single_t');

                    //改变麦豆总数                
                    for(i=0;i<$('.menu').length;i++){
                        if($('.menu')[i]==$currentTr[0]){
                            let idx = i;
                            //删除对应麦豆总数
                            total_m.splice(idx,1);
                            if(total_m.length>0){
                                total_md = total_m.reduce(function(a,b){
                                    return a+b;
                            })
                            }else{
                                total_md=0;
                            }  
                            $total_md.html(total_md);

                            //删除对应节省总数
                            total_s.splice(idx,1);
                            if(total_save.length>0){
                                total_save = total_s.reduce(function(a,b){
                                    return a+b;
                            })
                            }else{
                                total_save=0;
                            }
                            $total_save.html(total_save.toFixed(2));

                            //删除对应商品数量
                            single_q.splice(idx,1);
                            if(single_q.length>0){
                                total_qty = single_q.reduce(function(a,b){
                                    return a+b;
                            })
                            }else{
                                total_qty=0;
                            }
                            $total_qty.html(total_qty);

                            //删除对应总商品总价
                            single_p.splice(idx,1);
                            if(single_p.length>0){
                                total_price = single_p.reduce(function(a,b){
                                    return a+b;
                            })
                            }else{
                                total_price=0;
                            }
                            $total_price.html(total_price);

                        }             
                    }

                    $.ajax({
                        url:'../api/ml_cart.php',
                        data:{
                            mlid:$currentTr.data('mlid'),
                            type:'del'
                        },
                        success:function(data){
                            if(data=='success'){
                                $currentTr.remove();
                                if($('.ml_menu tbody tr').length== 1){
                                    $form[0].innerHTML=
                                                `<a class="empty" href="../html/ml_list.html">
                                                    <img src="../img/cart.png">
                                                </a>`
                                    return;
                                }
                            }
                        }
                    })
                })


                //删除全部商品
                $('.btn_clear').on('click',function(){
                    $.ajax({
                    url:'../api/ml_cart.php',
                    data:{
                        type:'clear'
                    },
                    success:function(data){
                        if(data==="success"){
                            $form[0].innerHTML=
                                    `<a class="empty" href="../html/ml_list.html">
                                        <img src="../img/cart.png">
                                    </a>`
                            return;
                        }
                    }
                    })
                })


                //全选
                let $btnAll = $('.btn_all');
                //全选外的勾选框
                let $checkboxs = $('.ml_menu').find(':checkbox').not('.all');
                //tbody的勾选框
                let $check = $('tbody').find(':checkbox');

                $btnAll.on('click',function(){
                    $checkboxs.prop('checked',this.checked);
                })

                //检查全选状态
                function checkall(){
                    // 获取选中的复选框
                    let $checkeds = $check.filter(':checked');
                    // 判断勾选数量与checkbox的数量是否相等
                    $btnAll.prop('checked',$check.length===$checkeds.length);
                }

                //保存checked时的数组;
                let total_m1 = JSON.parse(JSON.stringify(total_m))
                let total_s1 = JSON.parse(JSON.stringify(total_s))
                let single_q1 = JSON.parse(JSON.stringify(single_q))
                let single_p1 = JSON.parse(JSON.stringify(single_p))


                //判断勾选改变相应数据
                $('table').on('click','tbody :checkbox',function(){
                    let $currentTr = $(this).closest('tr');
                    let $single_t = $currentTr.find('.single_t');
                    checkall();   
                    console.log(total_m1)                 
                    if(this.checked){  
                        //麦豆数
                        //清空数组
                        let $currentTr = $(this).closest('tr');
                        console.log($currentTr)
                        for(i=0;i<$('.menu').length;i++){
                            if($('.menu')[i]==$currentTr[0]){
                                let idx = i;
                                //往total_m1添加对应数组数据
                                total_m1.splice(idx,1,total_m[idx]);
                                total_md = total_m1.reduce(function(a,b){
                                    return a+b;
                                })
                                $total_md.html(total_md);

                                //改变节省数
                                total_s1.splice(idx,1,total_s[idx]);
                                total_save = total_s1.reduce(function(a,b){
                                    return a+b;
                                })
                                $total_save.html(total_save.toFixed(2));

                                //改变商品数量
                                single_q1.splice(idx,1,single_q[idx]);
                                total_qty = single_q1.reduce(function(a,b){
                                    return a+b;
                                })
                                $total_qty.html(total_qty);

                                //改变商品总价
                                single_p1.splice(idx,1,single_p[idx]);
                                total_price = single_p1.reduce(function(a,b){
                                    return a+b;
                                })
                                $total_price.html(total_price);
                                
                            }             
                        }
                        
                    }else{
                        //改变麦豆总数                
                        for(i=0;i<$('.menu').length;i++){
                            if($('.menu')[i]==$currentTr[0]){
                                let idx = i;
                                //删除对应麦豆总数
                                total_m1.splice(idx,1,0);
                                if(total_m1.length>0){
                                    total_md = total_m1.reduce(function(a,b){
                                        return a+b;
                                    })
                                }else{
                                    total_md = 0;
                                }
                                $total_md.html(total_md);

                                //删除对应节省总数
                                total_s1.splice(idx,1,0);
                                if(total_s1.length>0){
                                    total_save = total_s1.reduce(function(a,b){
                                        return a+b;
                                })
                                }else{
                                    total_save=0;
                                }
                                $total_save.html(total_save.toFixed(2));

                                //删除对应商品数量
                                single_q1.splice(idx,1,0);
                                if(single_q1.length>0){
                                    total_qty = single_q1.reduce(function(a,b){
                                        return a+b;
                                })
                                }else{
                                    total_qty=0;
                                }            
                                $total_qty.html(total_qty);


                                //删除对应总商品总价
                                single_p1.splice(idx,1,0);
                                if(single_p1.length>0){
                                    total_price = single_p1.reduce(function(a,b){
                                        return a+b;
                                })
                                }else{
                                    total_price=0;
                                }
                                $total_price.html(total_price);


                            }             
                        }
                    }//第二个else               
                })


                }//第一个else

            }//第一个success
        })//第一个ajax
    })
})