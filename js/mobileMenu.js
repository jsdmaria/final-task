'use strict';

window.addEventListener("load", function () {
    var item = document.getElementById('menu-item');
    var crossItem = document.getElementById('cross-icon');
    var menu = document.getElementById("wrapper-menu-box");
    item.addEventListener('click', function (event) {
        menuFunc(event.target, item, crossItem, menu);
    });
    crossItem.addEventListener('click', function (event) {
        menuFunc(event.target, item, crossItem, menu);
    });
});
//func to see the mobile menu area i tablet & mobile devices
function menuFunc(target, item, crossItem, menu) {
    if (target === item) {
        item.style.position = 'absolute';
        item.style.top = '-9999px';
        item.style.opacity = '0';
        item.parentNode.style.border = 'transparent';
        crossItem.style.opacity = '1';
        crossItem.style.top = '10px';
        crossItem.style.left = '35%';
        menu.style.top = '100%';
        if (document.body.clientWidth <= 500) {
            crossItem.style.top = '-20%';
        }
    } else {
        item.style.position = 'static';
        item.style.opacity = '1';
        item.parentNode.style.borderLeft = '1px solid #d2d2d2';
        crossItem.style.opacity = '0';
        crossItem.style.top = '-9999px';
        menu.style.top = '-9999px';
    }
}




