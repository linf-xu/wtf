/**
 * Created by linfon on 2017/5/27.
 */
$(function(){
    var transQ='你确定要将此病毒一键传播到局域网内所有手机吗？';
    var transA='你这个人心理怎么可以这么阴暗？!呸!我是不会让你得逞的!哼!';
    var clearQ='你想一键清除此病毒吗？';
    var clearA='想得美!你似不似傻？你似不似觉得我跟你一样傻？!';
    var leftH='我的微信怎么了？';
    var rightH='怎样才能恢复？';
    var lang='cn';
    var leftT,rightT,transQend,transAend,clearAend,clearQend;
    //是否首次登陆
    if (!localStorage.firstDate) {
        firstDate1 = new Date().getTime();//第一次打开时间
        window.localStorage.setItem("firstDate", firstDate1);
        setTimeout(function(){$('.boxWrap').show();},3000);
    }else {
        firstDate1=Number(localStorage.firstDate);
        $('.boxWrap').show();
    }
    //是否有自定义设置
    if(!localStorage.leftT){
        leftT='您的微信被我加密了.因此无法打开,无法登陆也无法使用像摇一摇,漂流瓶,附近的人等重要功能.';
        rightT='请在三天内支付30万欢乐豆外加一个瑞文兔女郎皮肤.我以我同桌王二蛋的人格担保,能提供安全有效的恢复服务. ';
        changeLang();
    }else{
        leftT=localStorage.leftT;
        rightT=localStorage.rightT;
        changeLang();
    }
    var jinggao = $("#jinggao")[0];//警告提示金
    $('#setLeft').val(leftT);
    $('#setRight').val(rightT);
    //function init(){
        threeL=firstDate1+3*24*3600*1000;//锁定时间
        now = new Date().getTime();
        second_time = parseInt((threeL-now)/1000);//精确到秒
        dieDate=dateInit(new Date(threeL));
        $('.date').text(dieDate);
        timeStamp();
        setInterval(timeStamp,1000);

        function dateInit(firstDate) {
            firstDateY=firstDate.getFullYear();
            firstDateM=firstDate.getMonth()+1>9?firstDate.getMonth()+1:'0'+(firstDate.getMonth()+1);
            firstDateD=firstDate.getDate()>9?firstDate.getDate():'0'+firstDate.getDate();
            firstDateH=firstDate.getHours()>9?firstDate.getHours():'0'+firstDate.getHours();
            firstDateMin=firstDate.getMinutes()>9?firstDate.getMinutes():'0'+firstDate.getMinutes();
            firstDateS=firstDate.getSeconds()>9?firstDate.getSeconds():'0'+firstDate.getSeconds();
            datestring=firstDateY+'/'+firstDateM+'/'+firstDateD+'  '+firstDateH+':'+firstDateMin+':'+firstDateS;
            return datestring;
        }
        function timeStamp(){
            var time = "00:00:00"+parseInt(second_time);
            if(parseInt(second_time )<0){
                time = "00:00:00:00"
            };
            if( parseInt(second_time )> 60){
                var second = parseInt(second_time) % 60;
                second=second>9?second:"0"+second;
                var min = parseInt(second_time / 60);
                time = "00:00"+min + ":" + second;
                if( min > 60 ){
                    min = parseInt(second_time / 60) % 60;
                    min=min>9?min:"0"+min;
                    var hour = parseInt( parseInt(second_time / 60) /60 );
                    hour=hour>9?hour:"0"+hour;
                    time = "00:"+hour + ":" + min + ":" + second;
                    if( hour > 24 ){
                        hour = parseInt( parseInt(second_time / 60) /60 ) % 24;
                        hour=hour>9?hour:"0"+hour;
                        var day = parseInt( parseInt( parseInt(second_time / 60) /60 ) / 24 );
                        day=day>9?day:"0"+day;
                        time = day + ":" + hour + ":" + min + ":" + second;
                    }
                }
            }
            leftPresen=parseInt(second_time/(3*24*36));
            $('.timeLeft').text(time);
            $('.leftpW').css('height',100-leftPresen+'%');
            second_time--;
        }
        function copyBox() {
            jinggao.play();
            var box='<div class="boxWrap"></div>';
            $('#bodyInner').append(box);
            var boxInner=$('.boxWrap').eq(0).html();
            $('.boxWrap').last().append(boxInner);
            var secLastT=$('.boxWrap').last().prev().css('top').split('px')[0];
            secLastT= Number(secLastT)+10;
            var secLastL=$('.boxWrap').last().prev().css('left').split('px')[0];
            secLastL=Number(secLastL)+10;
            $('.boxWrap').last().css('top',secLastT+'px');
            $('.boxWrap').last().css('left',secLastL+'px');
            $('body').css('width',$(window).width());
            $('body').css('height',$(window).height());
            $('.buttons button').on('click',copyBox);
            $('.twoBtn .trans').on('click',transThis);
            $('.twoBtn .clear').on('click',clearThis);
            $('#lan').change(function(){
                lang=$('#lan').val();
                changeLang();
            })
        }
        function transThis(){
            if(confirm(transQend)){
                alert(transAend);
            }
        }
        function clearThis(){
            if(confirm(clearQend)){
                alert(clearAend);
            }
        }
        function changeLang(){
            if(lang=='cn'){
                $('.leftText h2').text(leftH);
                $('.leftText p').text(leftT);
                $('.rightText h2').text(rightH);
                $('.rightText p').text(rightT);
                $('.twoBtn .trans').text('一键传播');
                $('.twoBtn .clear').text('一键破解');
                transAend=transA;
                transQend=transQ;
                clearAend=clearA;
                clearQend=clearQ;
                localStorage.setItem('lang','cn');
            }else{
                $('.leftText h2').text(pinyin.getFullChars(leftH));
                $('.leftText p').text(pinyin.getFullChars(leftT));
                $('.rightText h2').text(pinyin.getFullChars(rightH));
                $('.rightText p').text(pinyin.getFullChars(rightT));
                $('.twoBtn .trans').text('ToTrans');
                $('.twoBtn .clear').text('ToClear');
                transAend=pinyin.getFullChars(transA);
                transQend=pinyin.getFullChars(transQ);
                clearAend=pinyin.getFullChars(clearA);
                clearQend=pinyin.getFullChars(clearQ);
                localStorage.setItem('lang','en');
            }
        }
        $('.buttons button').on('click',copyBox);
        $('.twoBtn .trans').on('click',transThis);
        $('.twoBtn .clear').on('click',clearThis);
        $('#lan').change(function(){
            lang=$('#lan').val();
            changeLang();
        })
        $('.save').on('click',function(){
            $('.setbox').removeClass('active');
            console.log($('#setLeft').text());
            console.log($('#setLeft').val());
            localStorage.setItem('leftT',$('#setLeft').val());
            localStorage.setItem('rightT',$('#setRight').val());
            leftT=$('#setLeft').val();
            rightT=$('#setRight').val();
            changeLang();
        })
        $('.setbox textarea').on('keyup',function(){
            console.log($(this).val().length)
            if($(this).val().length>60) {
                var tolong=$(this).val();
                $(this).val(tolong.substr(0,60));
            };
        })
    
});