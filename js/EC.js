$(document).ready(function () {
    (function ($) {
    var convert = function () {
        var output = $("#calculated");
        var currenclyType = { usd: 1.08887, gbp: 0.87344, aud: 1.43688, czk: 27.0220, cad: 1.46707, chf: 1.07414 };
        var value = ($("#eurInput").val())
        var type = ($('input[name=curren]:checked', '#curType').attr("id"));
        if (!$.isNumeric(value) ||  (value.indexOf('e') > -1)) {
            output.val("Bad input!");
            output.addClass("text-danger");
        }

        else {
            output.removeClass();
            output.val((value * currenclyType[type]).toFixed(2) + " " + type.toUpperCase());
        }
      }
    $("#eurInput").on("keyup", convert);
    $("input[name=curren]:radio").on("click", convert);
    		
})(jQuery);

});