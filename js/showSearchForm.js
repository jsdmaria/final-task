'use strict';

window.addEventListener("load", function () {
    var form = document.getElementById('search-block');
    var loupe = document.getElementById('loupe')
    loupe.addEventListener('click', function (event) {
        showForm(event.target, form);
    });
});

function showForm(target, form) {
    if (target.style.opacity !== '0') {
        form.style.top = '25%';
        target.style.top = '37%';
        target.style.opacity = '0';
        target.style.zIndex = '3';
    }
    else {
        form.style.top = '-9999px';
        target.style.top = '37%';
        target.style.opacity = '1';
    }

}




