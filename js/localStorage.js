'use strict';

window.onload = function () {
    var bagStatus = document.getElementById('status-indicator');
    var price = document.getElementById('total-bag-price');
    if (localStorage.getItem('totalPrice') !== null) {
        if (localStorage.getItem('totalPrice') === 0 || localStorage.getItem('totalPrice') === ''){
            price.children[0].innerText = '';
            price.children[1].innerText = '';
        }
        else {
            price.children[1].innerText = +(localStorage.getItem('totalPrice'));
        }
    }
    if (localStorage.getItem('goodsAmount') !== null) {
        bagStatus.children[1].innerText = +(localStorage.getItem('goodsAmount'));
    }
};

