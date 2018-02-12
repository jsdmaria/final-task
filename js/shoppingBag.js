'use strict';

window.addEventListener("load", function () {
    //initializing the data and getting the necessary elems
    var shoppingBag = new ShoppingBag();
    var price = document.getElementById('total-bag-price');
    var total = document.getElementById('total-price-box');
    var linkToEmpty = document.getElementById('empty-button');
        linkToEmpty.addEventListener('click', function (event) {
            shoppingBag.makeEmpty(event.target, price, bagStatus, message, goodsBag, total, goodsBox, buying);
        });
    var buying = document.getElementById('buy');
        buying.addEventListener('click', function (event) {
            shoppingBag.makeEmpty(event.target, price, bagStatus, message, goodsBag, total, goodsBox, buying);
        });
    var bagStatus = document.getElementById('status-indicator');
    var message = document.getElementById('message-block');
    var goodsBag = document.getElementById('bag-goods-block');
    var goodsBox = Array.prototype.slice.call(goodsBag.children);

    var inputArr = Array.prototype.slice.call(document.getElementsByClassName('remove-block'));
    var inputMinArr = Array.prototype.slice.call(document.getElementsByClassName('minus-button'));
    var inputPlusArr = Array.prototype.slice.call(document.getElementsByClassName('plus-button'));
    for (var a = 0; a < inputArr.length; a++ ) {
        inputArr[a].addEventListener('click', function (event) {
            shoppingBag.removeItem(event.target, price, bagStatus, total, message);
        });
        inputMinArr[a].addEventListener('click', function (event) {
            shoppingBag.quantity(event.target, price, bagStatus, total);
        });
        inputPlusArr[a].addEventListener('click', function (event) {
            shoppingBag.quantity(event.target, price, bagStatus, total);
        });
    }
    //*Local Storadge chicking*/

    if (localStorage.getItem('totalPrice') !== null) {
        price.children[1].innerText = +(localStorage.getItem('totalPrice'));
        total.children[1].innerText = +(localStorage.getItem('totalPrice'));
    }
    if (localStorage.getItem('goodsAmount') !== null) {
        bagStatus.children[1].innerText = +(localStorage.getItem('goodsAmount'));
    }
    if (localStorage.getItem('defQuanBox') !== null) {
        var infoToSet = JSON.parse(localStorage.getItem('defQuanBox'));
        for (var i = 0; i < infoToSet.length; i++) {
            goodsBox[i].children[1].children[4].children[2].innerText = infoToSet[i];
        }
    }
    if (localStorage.getItem('defDelBox') !== null) {
        var infoToDel = JSON.parse(localStorage.getItem('defDelBox'));
        for (var c = 0; c < infoToDel.length; c++) {
            goodsBox[infoToDel[c]].style.display = 'none';
        }
        if (goodsBox.every(function (item) {
                return item.style.display === 'none';})){
            message.children[0].style.display = 'block';
            bagStatus.children[1].innerText = '0';
            price.children[0].innerText = '';
            price.children[1].innerText = '';
            total.children[1].innerText = '0.00';
        }
    }
});

function ShoppingBag() {
    //make shopping bag empty method by the 'buy all' and 'empty bag' buttons
    this.makeEmpty = function (target, price, bagStatus, message, goodsBag, total, goodsBox, buTBuy) {
        if (target.tagName === 'INPUT' && bagStatus.children[1].innerText !== '0') {
            message.children[0].innerText = 'Thank you for your purchase';
        }
        var arrDelAll = [];
        for (var b = 0; b < goodsBox.length; b++) {
            arrDelAll.push(b);
        }
        goodsBag.style.display = 'none';
        message.children[0].style.display = 'block';
        bagStatus.children[1].innerText = '0';
        price.children[0].innerText = '';
        price.children[1].innerText = '';
        total.children[1].innerText = '0.00';
        buTBuy.style.display = 'none';
        this.saveMainBagInfo(price, bagStatus);
        localStorage.setItem('defDelBox',JSON.stringify(arrDelAll));
    };
    this.tempTotal = '';
    //method to delete necessary items
    this.removeItem = function (target, price, bagStatus, total, message) {
        var removeGoal = target.parentNode.parentNode;
        removeGoal.style.display = 'none';
        var removeChecking = removeGoal.parentNode;
        var bagCounter = 0;
        Array.prototype.slice.call(removeChecking.children).forEach(function (item) {
            if (item.style.display === '' || item.style.display === 'block') {
                bagCounter += +(item.children[1].children[4].children[2].innerText)
            }});

        bagStatus.children[1].innerText = bagCounter;
        if (Array.prototype.slice.call(removeChecking.children).every(function (item) {
                return item.style.display === 'none';})) {
            message.children[0].style.display = 'block';
        }
        var totalNum = +(total.children[1].innerText);
        var priceNum = +(target.parentNode.children[1].children[1].innerText);
            priceNum *= +(target.parentNode.children[4].children[2].innerText)
        var finalPrice = totalNum - priceNum;
        if (finalPrice === 0) {
            total.children[1].innerText = '0.00';
            price.children[0].innerText = '';
            price.children[1].innerText = '';
        }
        else {
            total.children[1].innerText = finalPrice;
            price.children[1].innerText = total.children[1].innerText;
        }
        this.tempTotal = finalPrice;
        this.saveDeletedItem(target);
        this.saveMainBagInfo(price, bagStatus);
    };
    //method to count the items' amount
    this.quantity = function (target, price, bagStatus, total) {
        var priceForOne = +(target.parentNode.parentNode.children[1].children[1].innerText);
        var counter = +(target.parentNode.children[2].innerText);
        if (target.className === 'plus-button') {
            if (target.parentNode.children[2].innerText === "1") {
                counter = 1;
            }
            counter++;
            bagStatus.children[1].innerText = +(bagStatus.children[1].innerText) + 1;
            this.tempTotal = +(total.children[1].innerText) + priceForOne;
        } else {
            while (counter >= 1) {
                if (counter === 1) {
                    counter = 1;
                }
                else {
                    counter--;
                    bagStatus.children[1].innerText = +(bagStatus.children[1].innerText) - 1;
                    this.tempTotal = (total.children[1].innerText) - priceForOne;
                }
                break;
            }
        }
        total.children[1].innerText = this.tempTotal;
        price.children[1].innerText = this.tempTotal;
        target.parentNode.children[2].innerText = counter;
        this.saveQuant(target);
        this.saveMainBagInfo(price, bagStatus);
    };
    //Local Storage method to save info
    this.saveQuant = function (objDOM) {
        var quanArr = [];
        var point = objDOM.parentNode.parentNode.parentNode;
        Array.prototype.slice.call(point.parentNode.children).forEach(function (item, num) {
            quanArr.push(point.parentNode.children[num].children[1].children[4].children[2].innerText);
        });
        localStorage.setItem('defQuanBox', JSON.stringify(quanArr));
    };
    //Local Storage method to save info
    this.saveDeletedItem = function (objDOM) {
        var delIndexArr;
        if (localStorage.getItem('defDelBox') !== null) {
            delIndexArr = JSON.parse(localStorage.getItem('defDelBox'));
        } else {
            delIndexArr = [];
        }
        var point = objDOM.parentNode.parentNode.parentNode;
        Array.prototype.slice.call(point.children).forEach(function (item, num) {
            if (item === objDOM.parentNode.parentNode){
                delIndexArr.push(num);
            }});
        localStorage.setItem('defDelBox', JSON.stringify(delIndexArr));
    };
    //Local Storage method to save info
    this.saveMainBagInfo = function (price, bagStatus) {
        localStorage.setItem('totalPrice', price.children[1].innerText);
        localStorage.setItem('goodsAmount', bagStatus.children[1].innerText);
    };
}





