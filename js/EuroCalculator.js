;
(function ($, window, document, undefined) {

    $.fn.euroCalculator = function () {
        $('<div />', {
            "class": 'ec_container'
        }).appendTo(this);
        $('<h3 />', {
            "class": 'ec'
        }).text('Euro calculator').appendTo('.ec_container');
        $('<input />', {
            "id": 'eurInput',
            "placeholder": 'Euro',
            "type": 'number'
        }).appendTo('.ec_container');
        $('<div />', {
            "id": 'curType'
        }).appendTo('.ec_container');
        $('<input />', {
            "id": 'usd',
            "name": 'curren',
            "type": 'radio'
        }).appendTo('#curType');
        $('<label />', {
            "for": 'usd'
        }).appendTo('#curType');
        $('<input />', {
            "id": 'gbp',
            "name": 'curren',
            "type": 'radio'
        }).appendTo('#curType');
        $('<label />', {
            "for": 'gbp'
        }).appendTo('#curType');
        $('<input />', {
            "id": 'aud',
            "name": 'curren',
            "type": 'radio'
        }).appendTo('#curType');
        $('<label />', {
            "for": 'aud'
        }).appendTo('#curType');
        $('<input />', {
            "id": 'czk',
            "name": 'curren',
            "type": 'radio'
        }).appendTo('#curType');
        $('<label />', {
            "for": 'czk'
        }).appendTo('#curType');
        $('<input />', {
            "id": 'cad',
            "name": 'curren',
            "type": 'radio'
        }).appendTo('#curType');
        $('<label />', {
            "for": 'cad'
        }).appendTo('#curType');
        $('<input />', {
            "id": 'chf',
            "name": 'curren',
            "type": 'radio'
        }).appendTo('#curType');
        $('<label />', {
            "for": 'chf'
        }).appendTo('#curType');
        $('<input />', {
            "id": 'calculated',
            "type": 'text',
            "readonly": 'readonly'
        }).appendTo('.ec_container');

        var convert = function () {
            var output = $("#calculated");
            var currenclyType = {
                usd: 1.08887,
                gbp: 0.87344,
                aud: 1.43688,
                czk: 27.0220,
                cad: 1.46707,
                chf: 1.07414
            };
            var value = ($("#eurInput").val())
            var type = ($('input[name=curren]:checked', '#curType').attr("id"));
            if (!$.isNumeric(value) || (value.indexOf('e') > -1)) {
                output.val("Bad input!");
                output.addClass("text-danger");
            } else {
                output.removeClass();
                output.val((value * currenclyType[type]).toFixed(2) + " " + type.toUpperCase());
            }
        }

        $("#eurInput").on("keyup", convert);
        $("input[name=curren]:radio").on("click", convert);



        return this;
    }
})(jQuery);
