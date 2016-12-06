;
(function ($, window, document, undefined) {

    $.fn.euroCalculator = function () {
        $('<div />', {
            "class": 'ec-container'
        }).appendTo(this);
        $('<h3 />', {
            "class": 'ec'
        }).text('Euro calculator').appendTo('.ec-container');
        $('<input />', {
            "id": 'eur-Input',
            "placeholder": 'Euro',
            "type": 'number'
        }).appendTo('.ec-container');
        $('<div />', {
            "id": 'cur-Type'
        }).appendTo('.ec-container');
        $('<input />', {
            "id": 'usd',
            "name": 'curren',
            "type": 'radio'
        }).appendTo('#cur-Type');
        $('<label />', {
            "for": 'usd'
        }).appendTo('#cur-Type');
        $('<input />', {
            "id": 'gbp',
            "name": 'curren',
            "type": 'radio'
        }).appendTo('#cur-Type');
        $('<label />', {
            "for": 'gbp'
        }).appendTo('#cur-Type');
        $('<input />', {
            "id": 'aud',
            "name": 'curren',
            "type": 'radio'
        }).appendTo('#cur-Type');
        $('<label />', {
            "for": 'aud'
        }).appendTo('#cur-Type');
        $('<input />', {
            "id": 'czk',
            "name": 'curren',
            "type": 'radio'
        }).appendTo('#cur-Type');
        $('<label />', {
            "for": 'czk'
        }).appendTo('#cur-Type');
        $('<input />', {
            "id": 'cad',
            "name": 'curren',
            "type": 'radio'
        }).appendTo('#cur-Type');
        $('<label />', {
            "for": 'cad'
        }).appendTo('#cur-Type');
        $('<input />', {
            "id": 'chf',
            "name": 'curren',
            "type": 'radio'
        }).appendTo('#cur-Type');
        $('<label />', {
            "for": 'chf'
        }).appendTo('#cur-Type');
        $('<input />', {
            "id": 'calculated',
            "type": 'text',
            "readonly": 'readonly'
        }).appendTo('.ec-container');

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
            var value = ($("#eur-Input").val())
            var type = ($('input[name=curren]:checked', '#cur-Type').attr("id"));
            if (!$.isNumeric(value) || (value.indexOf('e') > -1)) {
                output.val("");
            } else {
                output.val((value * currenclyType[type]).toFixed(2) + " " + type.toUpperCase());
            }
        }

        $("#eur-Input").on("keyup", convert);
        $("input[name=curren]:radio").on("click", convert);



        return this;
    }
})(jQuery);
