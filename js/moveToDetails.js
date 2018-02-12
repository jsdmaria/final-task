'use strict';

window.addEventListener("load", function () {
    //initializing the necessary array
    var goodsArr = Array.prototype.slice.call(document.getElementsByClassName('img-container'));
    for (var a = 0; a < goodsArr.length; a++ ) {
        goodsArr[a].addEventListener('click', moveToDetails);
    }
});

function moveToDetails() {
    if (this.children[0].children[0].style.transform === 'scale(1.5)') {//if img is open, it's active to follow the link
        location.href = 'item.html';
    } else {
        Array.prototype.slice.call(document.getElementsByClassName('img-container')).forEach(function (item) {
            //checking for open img in the iml list to resize it back
            if (item.children[0].children[0].style.transform === 'scale(1.5)') {
                item.children[0].children[0].style.transform = 'scale(1, 1)';
                item.children[0].children[0].style.zIndex = '2';
                item.children[0].children[1].style.display = 'inline';
                item.children[1].style.display = 'inline';
            }
        });
        //setting the props to the clicked img
        this.children[0].children[0].style.transform = 'scale(1.5)';
        this.children[0].children[0].style.transition = '1s';
        this.children[0].children[0].style.zIndex = '3';
        this.children[0].children[1].style.display = 'none';
        this.children[1].style.display = 'none';
    }
}