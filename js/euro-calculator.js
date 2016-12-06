;
(function ($, window, document, undefined) {

    $.fn.euroCalculator = function () {
        var currency;
        var currenclyType = {
            usd: 0,
            gbp: 0,
            aud: 0,
            czk: 0,
            cad: 0,
            chf: 0,
            getRate: function(response){
                     var currency = JSON.parse(response);
            currenclyType.usd = currency.query.results.rate[0].Rate;
            currenclyType.gbp = currency.query.results.rate[1].Rate;
            currenclyType.aud = currency.query.results.rate[2].Rate;
            currenclyType.czk = currency.query.results.rate[3].Rate;
            currenclyType.cad = currency.query.results.rate[4].Rate;
            currenclyType.chf = currency.query.results.rate[5].Rate;
            }
        };
        var xmlhttp = new XMLHttpRequest();
        var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20(%22EURUSD%22%2C%20%22EURGBP%22%20%2C%20%22EURAUD%22%20%2C%20%22EURCZK%22%20%2C%20%22EURCAD%22%20%2C%20%22EURCHF%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                currenclyType.getRate(this.responseText);
            }
        }


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
