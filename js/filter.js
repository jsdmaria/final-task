'use strict';

window.addEventListener("load", function () {
    var arrLi = Array.prototype.slice.call(document.querySelectorAll('li > ul > li'));
    for (var a = 0; a < arrLi.length; a++ ) {
        arrLi[a].addEventListener('click', function (event) {
            myFilter.choiceItem(event.target, filter);
        });
    }
    var filter = document.getElementById('filters-block');
    filter.addEventListener('click', function (event) {
        myFilter.showFilter(event.target, filter);
    });
    var myFilter = new Filter();

});

function Filter() {
    //method to see the filter's area in tablet & mobile devices
    this.showFilter = function (target, filter) {
        if (document.documentElement.clientWidth < 1024) {
            var allowToShow = 0;
            Array.prototype.slice.call(filter.children[0].children).forEach(function (item) {
                if (target === item || target === item.children[1] || target === item.children[2]) {
                    allowToShow = 1;
                }
            });
            if (target === filter || target === filter.children[0] || target === filter.children[1] || target === filter.children[1].children[0] || allowToShow ){
                if (filter.children[0].children[0].children[4].className === 'ul-hover') {
                    filter.children[2].style.display = 'block';
                    for (var c = 0; c < filter.children[0].children.length; c++ ) {
                        filter.children[0].children[c].children[0].style.display = 'block';
                        filter.children[0].children[c].children[4].setAttribute('class', 'ul-tab');
                    }
                    var arrLiFilter = Array.prototype.slice.call(document.querySelectorAll('li > ul > li'));
                    for (var l = 0; l < arrLiFilter.length; l++ ) {
                        arrLiFilter[l].addEventListener('click', this.choiceItem);
                    }
                } else {
                    filter.children[2].style.display = 'none';
                    for (var d = 0; d < filter.children[0].children.length; d++ ) {
                        filter.children[0].children[d].children[0].style.display = 'none';
                        filter.children[0].children[d].children[4].setAttribute('class', 'ul-hover');
                    }
                }
            }
        }
    };
    //method to choose the needed setting
    this.choiceItem = function (target, filter) {
        var value = target.innerText;
        var targetParent = target.parentNode;
        if (filter.children[0].children[0].children[4].className === 'ul-hover') {
            for (var b = 0; b < targetParent.children.length; b++ ){
                targetParent.children[b].style.color = '#000'
            }
        } else {
            for (var c = 0; c < targetParent.children.length; c++ ){
                targetParent.children[c].style.color = '#a8a8a8'
            }
        }
        var li = targetParent.parentNode;
        var upperDiv = li.children[0];
        var spanText = li.children[1];
        if (value === 'Not selected') {
            if (filter.children[0].children[0].children[4].className === 'ul-hover') {
                upperDiv.style.opacity = '0';
                spanText.innerText = upperDiv.innerText;
                spanText.style.color = '#000';
                li.style.paddingTop = '1.2em';
                li.style.paddingBottom = '1.2em';
                li.style.backgroundColor = '#fff';
            } else {
                spanText.style.color = '#000';
                spanText.innerText = target.parentNode.parentNode.children[0].innerText;
                target.style.color = '#000';
            }
        }
        else {
            if (filter.children[0].children[0].children[4].className === 'ul-hover') {
                upperDiv.style.opacity = '1';
                spanText.innerText = value;
                spanText.style.color = '#f14a58';
                li.style.paddingTop = '1.6em';
                li.style.paddingBottom = '0.8em';
                li.style.backgroundColor = '#f7f7f7';
                target.style.color = '#f14a58';
            } else {
                spanText.innerText = value;
                spanText.style.color = '#f14a58';
                target.style.color = '#f14a58';
            }
        }
    }
}

