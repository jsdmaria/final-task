'use strict';

window.addEventListener("load", function () {
    var itemsRow = document.getElementById('image-row');
    itemsRow.addEventListener('click', function (event) {
        gallery(event.target,itemsRow);
    });
});

function gallery(target, itemsRow) {
    var row = target.parentNode.parentNode.children;
    for (var i = 0; i < row.length; i++ ) {
        row[i].children[1].style.opacity = '0';
    }
    target.style.opacity = '1';
    itemsRow.parentNode.children[0].children[0].src = target.parentNode.children[0].src;
}



