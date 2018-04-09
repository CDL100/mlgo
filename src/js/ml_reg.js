jQuery(function($){
    //表单验证
    let $reg_name = $('#reg_name');
    let $reg_word = $('#reg_word');
    let $reg_word2 = $('#reg_word2');
    let $reg_code = $('#reg_code');

    let $reg_check = $('#reg_check');
    let $btn_reg = $('#btn_reg');
    let $code_img = $('.code_img');
    let $change_code = $('.change_code');
    //用户名验证
    $reg_name.on('blur',function(){

    //验证用户名是否存在数据库中
        $.ajax({
            url:'../api/ml_reg.php',
            data:{username:$reg_name.val()},
            success:function(data){
                console.log(data)
                if($reg_name.val()==''){
                    $reg_name.next('h3').html('请输入手机号码');
                    $reg_name.next('h3').css('color','red');
                }else if(!/^1[3-8]\d{9}$/i.test($reg_name[0].value)){
                    $reg_name.next('h3').html('您输入的手机号码格式错误，请重新输入!');
                    $reg_name.next('h3').css('color','red');
                }else if(data === 'success'){
                    console.log(data);
                    $reg_name.next('h3').css('color','#58bc58');
                    $reg_name.next('h3').html('可以使用');
                }else{
                    $reg_name.next('h3').html('用户名已注册');
                    $reg_name.next('h3').css('color','red');
                }
            }
        })

    })
    //确认密码
    $reg_word.on('blur',function(){
        if($reg_word.val()==''){
            $reg_word.next('h3').html('请输入密码');
            $reg_word.next('h3').css('color','red');
            return false;
        }else{
           $reg_word.next('h3').html('');
        }
    })

    $reg_word2.on('blur',function(){
        if($reg_word2.val()==''){
            $reg_word2.next('h3').html('请再次输入密码');
            $reg_word2.next('h3').css('color','red');
            return false;
        }else if($reg_word.val()!=$reg_word2.val()){
            $reg_word2.next('h3').html('两次输入的密码不一致，请重新输入');
            $reg_word2.next('h3').css('color','red');
            return false;
        }else{
           $reg_word2.next('h3').html('');
        }
    })

    //随机验证码
    function randomCode(){
        $code_img.html(randomNumber(1000,9999))
    }
    randomCode();
    $code_img.on('click',function(){
        randomCode();
    })
       
    $change_code.on('click',function(){
        randomCode();
    })
    //验证码验证
    reg_code.onblur=function(){
        if($reg_code.val() != $code_img.html()){
            $change_code.next('h3').html('验证码错误');
            $change_code.next('h3').css('color','red');
            return false;
        }else{
            $change_code.next('h3').html('');
        }
    }
    // 注册
    $btn_reg.on('click',function(){
        $.ajax({
            url:'../api/ml_reg.php',
            data:{
                username:$reg_name.val(),
                password:$reg_word.val(),
                type:'reg'
            },
            success:function(data){
                if(!$reg_check[0].checked){
                    $btn_reg.next('h3').html('请同意注册');
                }else{
                    location.href="../index.html";
                }
            }
        })
    })
    







    
})