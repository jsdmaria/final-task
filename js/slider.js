var arrowRight = document.getElementById('arrow-right');
var arrowLeft = document.getElementById('arrow-left');
var slider = document.getElementById('slider-area');
var sliderCollection = slider.children;
var sliderArr = Array.prototype.slice.call(sliderCollection);
var radioButtons = document.getElementById('radio-indicators');
var radioCollection = radioButtons.children;
var radioArr = Array.prototype.slice.call(radioCollection);
var counter = 0;
var interval;

function Slider(time) {
    this.time = time;
    this.resetInterval = function (click) {
        if ( click.type === 'click' || click.type === 'touchend') {
            clearInterval(interval);
            interval = setInterval("sliderWork.goRight('none')", sliderWork.time);
        }
    };
    this.goRight = function (click) {
        sliderWork.resetInterval(click);
        if (sliderArr[counter].style.display = 'block') {
            sliderArr[counter].style.display = 'none';
            radioArr[counter].style.backgroundColor = '#d2d2d2';
            if (counter === sliderArr.length - 1) {
                counter = sliderArr.length - sliderArr.length;
                sliderArr[counter].style.display = 'block';
                radioArr[counter].style.backgroundColor = '#f14a58';
            }
            else {
                sliderArr[counter + 1].style.display = 'block';
                radioArr[counter + 1].style.backgroundColor = '#f14a58';
                counter++;
            }
        }
    };
    this.goLeft = function(click) {
        sliderWork.resetInterval(click);
        if (sliderArr[counter].style.display = 'block') {
            sliderArr[counter].style.display = 'none';
            radioArr[counter].style.backgroundColor = '#d2d2d2';
            if (counter === sliderArr.length - sliderArr.length) {
                counter = sliderArr.length - 1;
                sliderArr[counter].style.display = 'block';
                radioArr[counter].style.backgroundColor = '#f14a58';
            }
            else {
                sliderArr[counter - 1].style.display = 'block';
                radioArr[counter - 1].style.backgroundColor = '#f14a58';
                counter--;
            }
        }
    };
    this.radioClicker = function (click) {
        sliderWork.resetInterval(click);
        target = event.target;
        for (var i = 0; i < radioArr.length; i++ ){
            if (radioArr[i] === target) {
                counter = i;
                for (var a = 0; a < radioArr.length; a++ ){
                    sliderArr[a].style.display = 'none';
                    radioArr[a].style.backgroundColor = '#d2d2d2';
                }
                sliderArr[counter].style.display = 'block';
                radioArr[counter].style.backgroundColor = '#f14a58';
            }
        }
    };
    this.startMove = function (click) {
        sliderWork.resetInterval(click);
        sliderWork.startPoint = click.changedTouches[0].pageX;
        click.preventDefault();
    };

    this.endMove = function (click) {
        sliderWork.endPoint = click.changedTouches[0].pageX;
        click.preventDefault();
        sliderWork.compare(click);
    };

    this.compare = function (click) {
        if (sliderWork.startPoint > sliderWork.endPoint) {
            sliderWork.goRight(click);
        }
        else {
            sliderWork.goLeft(click);
        }
    }
}
var sliderWork = new Slider(10000);
    interval = setInterval("sliderWork.goRight('none')", sliderWork.time);
    arrowRight.addEventListener('click', sliderWork.goRight);
    arrowLeft.addEventListener('click', sliderWork.goLeft);
    slider.addEventListener('touchstart', sliderWork.startMove);
    slider.addEventListener('touchend', sliderWork.endMove );
    for (var b = 0; b < radioArr.length; b++ ){
        radioArr[b].addEventListener('click', sliderWork.radioClicker);
    }




