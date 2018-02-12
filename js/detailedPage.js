'use strict';

window.addEventListener("load", function () {
    //getting necessary elems & info
    var addButton = document.getElementById('addToBag');
        addButton.addEventListener('click', function (event) {
            itemInfo.add(event.target, bagStatus, price);
        });
    var bagStatus = document.getElementById('status-indicator');
    var price = document.getElementById('total-bag-price');
    var size = document.getElementById('size');
        size.addEventListener('click', function (event) {
            itemInfo.choiceButton(event.target);
        });
    var color = document.getElementById('color');
        color.addEventListener('click', function (event) {
            itemInfo.choiceButton(event.target)});
    var itemInfo = new ItemInfo();
});

function ItemInfo () {
    //method to choose the purchase settings
    this.choiceButton = function (target) {
        if (target.localName === 'input') {
            var buttonsCounter = 0;
            var delBorder;
            Array.prototype.slice.call(target.parentNode.children).forEach(function (item, num) {
                if (item.style.border !== '') {
                    buttonsCounter++;
                    delBorder = num;
                }
            });
            if (buttonsCounter === 0) {
                target.style.border = '1px solid #d2d2d2';
            }
            else {
                target.style.border = '1px solid #d2d2d2';
                target.parentNode.children[delBorder].style.border = '';
            }
        }
    };
    //method to add the item to the shopping bag
    this.add = function (target, bagStatus, price) {
        bagStatus.children[1].innerText = +(bagStatus.children[1].innerText) + 1;
        var allPriceBefore = +(price.children[1].innerText);
        var plusPrice = +(target.parentNode.parentNode.children[1].children[1].children[1].innerText);
        price.children[1].innerText = allPriceBefore + plusPrice;
    }
}

