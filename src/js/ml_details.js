require(['config'],function(){
    require(['jquery','xZoom','base'],function($){

        
        let $ml_guide = $('.ml_guide');
        let $zoom = $('.ml_zoom');
        //根据id获取商品信息
        let id = location.search.slice(1);
        $.ajax({
            url:'../api/ml_details.php',
            data:{
                id:id
            },
            success:function(data){
                data = JSON.parse(data);
                //指导
                $ml_guide[0].innerHTML = data.map(function(item){
                    return `<a>首页</a><i class="iconfont icon-jiantou"></i>
                            <a>满额送豪礼</a><i class="iconfont icon-jiantou"></i>
                            <a>${item.mlname}></a><i class="iconfont icon-jiantou"></i`
                })

                //放大镜结构
                $zoom[0].innerHTML= data.map(function(item){        
                    return  `<div class="goods">
                                <img src="${item.Bimgurl1}" data-big="${item.Bimgurl1}">
                            </div>
                            <div class="smallList">
                                <ul>
                                    <li><img src="${item.Bimgurl1}" alt=""></li>
                                    <li><img src="${item.Bimgurl2}" alt=""></li>
                                    <li><img src="${item.Bimgurl3}" alt=""></li>
                                    <li><img src="${item.Bimgurl4}" alt=""></li>
                                    <li><img src="${item.Bimgurl5}" alt=""></li>
                                    <li><img src="${item.Bimgurl6}" alt=""></li>
                                </ul>
                                <i class="iconfont icon-jiantou1 left"></i>
                                <i class="iconfont icon-jiantou right"></i>
                            </div>`
                }).join('');

                //放大镜
                $('.goods').xZoom({
                    width:400,
                    height:414,
                    position:'right',
                    gap:28
                })

                let length = $('.smallList li').length;
                // 一定要用outerWidth
                let width = $('.smallList li').outerWidth();
                $('.smallList ul').width(length*width);
                let $right = $('.right');
                let $left = $('.left');
                //左右切换
                let target = 0;
                $right[0].onclick=function(){
                        target = target - width*5;
                        //是4不是5
                            if(target <= -length*width + width){
                                target = -length*width + width
                            }
                        $('.smallList ul').animate({'left':target})
                        $left[0].onclick=function(){
                            target += width*5;   
                            if(target>=0){
                                target = 0;
                            }
                            $('.smallList ul').animate({'left':target})
                        }
                    }

                //切换图片,高亮列表图片
                $('.smallList').on('mouseover','img',function(){
                    
                    for(var i=0;i<length;i++){
                        $('.smallList img').removeClass('active');
                    }
                    $(this).addClass('active');
                    $('.goods img').attr('src',$(this).attr('src'))
                    .data('big',$(this).attr('src'))
                })

                //商品详细信息   
                let $ml_message = $('.ml_message');
                $ml_message[0].innerHTML = data.map(function(item){
                    return `<h2>${item.mlname}</h2>
                            <p>${item.introduce}</p>
                            <section>
                                <p>特卖价：<strong>￥${item.special}</strong></p>
                                <p>麦乐购价：<del>￥${item.price}</del></p>
                                <p>市场价：￥${item.market}</p>
                                <p>促销信息：<a class="selected">登录</a>查看更多优惠</p>
                            </section>
                            <h3>
                                <a>累计销量：</a><span>${item.sale}</span>
                                <a>累计评论：</a><span>${item.comment}</span>
                                <a>赠送麦豆：</a><span>${item.md}</span>
                            </h3>
                            <h4>
                                <span>规&nbsp;&nbsp;&nbsp;&nbsp;格:</span>
                                <a class="choose">1段（0-6个月）</a>
                                <a>2段（6-10个月）</a>
                                <a>3段（10个月以上）</a>
                                <a>4段（1-2岁）</a>
                                <a>4段（2/1限定期）</a>
                                <a>5段（2-7岁）</a>
                                <a>6段（3岁以上）</a>
                            </h4>
                            <h5>
                                <span>组合套装：</span>
                                <a class="save_7">1罐</a>
                                <a class="save_10">2罐</a>
                                <a class="save_14">3罐</a>
                                <a class="save_20">4罐</a>
                            </h5>
                            <h6 class="clearfix">
                                <span class="fl">购买数量：</span>
                                    <img class="btn_jian fl" src="../img/jian.png"/>
                                    <input type="text" class="count fl" autofocus placeholder="1"/>
                                    <img class="btn_jia fl" src="../img/jia.png"/>
                            </h6>
                            <button class="btn_join selected">加入购物车</button>
                            <span>温馨提示：由麦乐购（香港）有限公司负责配送</span>`

                }).join('')
                
                //点击高亮规格
                $('.ml_message').on('click','h5 a',function(){
                    $('.ml_message h5 a').removeClass('choose');
                    $(this).addClass('choose');
                })



            }

        })











    })
})