require(['config'],function(){
    require(['jquery','car'],function($,car){

        let $login_name = $('#login_name');
        let $login_word = $('#login_word');
        let $login_code = $('#login_code');
        let $btn_login = $('#btn_login');
        let $code_img = $('.code_img');
        let $change_code = $('.change_code');

        //验证用户名是否存在
        $login_name.on('blur',function(){
            $.ajax({
            url:'../api/ml_login.php',
            data:{
                username:$login_name.val(),
            },
            success:function(data){
                if(data == 'fail'){
                    $login_name.next('h3').html('不存在这个用户名');
                }else{
                    $login_name.next('h3').html('');
                }
            }
            }) 
        })
        
        // 登录验证
        $btn_login.on('click',function(){
            ajax({
            url:'../api/ml_login.php',
            data:{
                username:$login_name.val(),
                password:$login_word.val(),
                type:'login'
            },
            success:function(data){
                if(data=='success'){
                    console.log(data);
                    $login_word.next('h3').html('');
                    location.href="../index.html"
                }else{
                    console.log(data);
                    $login_word.next('h3').html('密码错误');
                }
            }
        })
    })

        //随机验证码
        function randomCode(){
            $code_img.html(car.randomNumber(1000,9999))
        }
        randomCode();
        $code_img.on('click',function(){
            randomCode();
        })
           
        $change_code.on('click',function(){
            randomCode();
        })

        $login_code.on('blur',function(){
            if($login_code.val() != $code_img.html()){
                $change_code.next('h3').html('验证码错误');
                $change_code.next('h3').css('color','red');
                return false;
            }else{
                $change_code.next('h3').html('');
            }
        })




        
    });
    
});

