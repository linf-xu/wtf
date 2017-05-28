/**
 * Created by linfon on 2017/5/27.
 */
$(function(){
    var jinggao = $("#jinggao")[0];
    if (!localStorage.firstDate) {
        firstDate1 = new Date().getTime();//第一次打开时间
        window.localStorage.setItem("firstDate", firstDate1);
    }else {
        firstDate1=Number(localStorage.firstDate);
    }
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
        var time = parseInt(second_time) + "秒";
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
                time = "00"+hour + ":" + min + ":" + second;
                if( hour > 24 ){
                    hour = parseInt( parseInt(second_time / 60) /60 ) % 24;
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
        $('body').append(box);
        var boxInner=$('.boxWrap').eq(0).html();
        $('.boxWrap').last().append(boxInner);
        var secLastT=$('.boxWrap').last().prev().css('top').split('px')[0];
        secLastT= Number(secLastT)+10;
        var secLastL=$('.boxWrap').last().prev().css('left').split('px')[0];
        secLastL=Number(secLastL)+10;
        $('.boxWrap').last().css('top',secLastT+'px');
        $('.boxWrap').last().css('left',secLastL+'px');
        $('.buttons button').on('click',copyBox);
    }
    $('.buttons button').on('click',copyBox);
});