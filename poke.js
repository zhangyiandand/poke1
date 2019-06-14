$(function(){
    let poke=[];
    let colorArray=['s','h','d','c'];
    let flag=[];
    let box=$('.box');

    for(let i=0;i<52;i++){
        let index=Math.floor(Math.random()*colorArray.length);
        var color=colorArray[index];
        var number =Math.round(Math.random()*12+1);

        while(flag[color+'_'+number]){
            index=Math.floor(Math.random()*colorArray.length);
            color=colorArray[index];
            number =Math.round(Math.random()*12+1);
        }
        poke.push({color,number});
        flag[color+'_'+number]=true;
    }

    // console.log(poke);

    let index=-1;
    for(let i=0;i<5;i++){
        for(let j=0;j<=i;j++){
            index++;
            let obj=poke[index];
            let lefts=350-50*i+100*j,tops=80*i;
            $('<div>').addClass('poke')
                .css({backgroundImage:`url(./imgs/${obj.number}${obj.color}.jpg)`})
                .attr('id',i+"_"+j)
                .appendTo('.box')
                .data('number',obj.number)
                .animate({left:lefts,top:tops,opacity:1})
                .delay(index*10)

        }
    }
    for(;index<52;index++){
        let obj=poke[index];
        let lefts=0;
        $('<div>').addClass('poke')
            .addClass('left')
            .css({backgroundImage:`url(./imgs/${obj.number}${obj.color}.jpg)`})
            .attr('id','-2_-2')
            .appendTo('.box')
            .animate({left:0,top:476,opacity:1})
            .delay(index*30).data('number',obj.number)

    }

    let first=null;
    $(".box").on('click','.poke',function () {
        let _this = $(this);
        let [i, j] = _this.attr('id').split('_');
        let id1 = i * 1 + 1 + '-' + j, id2 = i * 1 + 1 + '_' + (j * 1 + 1);
        if ($('#' + id1).length || $('#' + id2).length) {
            return;
        }
        if(_this.hasClass("active")){
            $(this).removeClass("active").animate({top:"+=30px"})
        }else{
            $(this).addClass("active").animate({top:"-=30px"})
        }

        if (!first) {
            first = _this;
        } else {
            let number1 = first.data('number'), number2 = _this.data('number');
            if (number1 + number2 === 14) {
                $('.active').animate({top: 0, right: 0, opacity: 0},function(){
                    $('.active').remove();
                })
            } else {
                $('.active').animate({top: '+=20px'},function(){
                    $(this).removeClass('active');
                })
            }
            first=null;
        }

    })

    let n=0;
    $(`.rightbtn`).on(`click`,function(){
        $(`.left`).last().css(`zIndex`,n++).animate({left:707},function(){
            $(this).removeClass(`left`).addClass(`right`)
        })
    });
    $(`.leftbtn`).on(`click`,function(){
        $(`.right`).last().css(`zIndex`,n++).animate({left:0},function(){
            $(this).removeClass(`right`).addClass(`left`)
        })
    })



})