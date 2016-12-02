$(document).ready(function () {
    (function ($) {
function collapseNav() {
    document.getElementById("my_navbar").className = "navbar-collapse collapse";
}

function activateHome() {
    var i = 1;
    document.getElementById("my_navbar").getElementsByTagName('li')[0].className = "active";
    for (i = 1; i <= 4; i++) {
        document.getElementById("my_navbar").getElementsByTagName('li')[i].className = "";
    }
}

    })(jQuery);

});