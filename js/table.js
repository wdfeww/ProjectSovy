$(document).ready(function () {
    (function ($) {
        $.fn.initTable = function (options) {
            var selector = this;
            var tbody = $('<tbody/>');
            var table = $('<table/>');
            var dateIndex;
            var amountIndex;
            var dataIncomes = [];
            var dataPayments = [];
            var data = [];
            var settings = $.extend({
                cols: []
                , search: false
                , deletePicture: $('<img/>', {
                    src: 'images/x.gif'
                })
                , paginateTable: false
                , sortTable: false
            }, options);
            var sortWay;
            var sortedData = [];

            function sortData(dataType) {
                var selectorId = selector.attr('id');
                if (dataType == 'amount') {
                    if (selectorId == 'incomes-table') {
                        sortTableByAmount(dataIncomes);
                    }
                    else if (selectorId == 'payments-table') {
                        sortTableByAmount(dataPayments);
                    }
                    else {
                        sortTableByAmount(data);
                    }
                }
                else if (dataType == 'date') {
                    if (selectorId == 'incomes-table') {
                        sortTableByDate(dataIncomes);
                    }
                    else if (selectorId == 'payments-table') {
                        sortTableByDate(dataPayments);
                    }
                    else {
                        sortTableByDate(data);
                    }
                }
                else if (dataType == 'description') {
                    if (selectorId == 'incomes-table') {
                        sortTableByDescription(dataIncomes);
                    }
                    else if (selectorId == 'payments-table') {
                        sortTableByDescription(dataPayments);
                    }
                    else {
                        sortTableByDescription(data);
                    }
                }
            }

            function refillTable() {
                var k = 0;
                for (var i = 0, length1 = sortedData.length; i < length1; i++) {
                    var tbody = selector.find('tbody');
                    var row = tbody.find('tr').eq(i);
                    $.each(sortedData[i], function (name, value) {
                        if (sortedData[i].amount > 0) row.css('background-color', 'rgb(140, 217, 140)');
                        else row.css('background-color', 'rgb(255, 153, 128)');
                        var col = row.find('td').eq(k);
                        col.html(value);
                        k++;
                    });
                    k = 0;
                }
            }

            function sortTableByAmount(dataToSort) {
                var temp;
                sortedData = Object.assign([], dataToSort);
                sortedData.sort(function (a, b) {
                    var a = a.amount;
                    var b = b.amount;
                    return ((a < b) ? -1 : ((a > b) ? 1 : 0));
                });
                if (sortWay == 'asc') {
                    sortWay = 'desc';
                }
                else {
                    sortedData.reverse();
                    sortWay = 'asc';
                }
            }

            function sortTableByDate(dataToSort) {
                var j = 0;
                sortedData = Object.assign([], dataToSort);
                if (sortWay == 'asc') {
                    sortWay = 'desc';
                }
                else {
                    sortedData.reverse();
                    sortWay = 'asc';
                }
            }

            function sortTableByDescription(dataToSort) {
                sortedData = Object.assign([], dataToSort);
                sortedData.sort(function (a, b) {
                    var a = a.description;
                    var b = b.description;
                    return ((a < b) ? -1 : ((a > b) ? 1 : 0));
                });
                if (sortWay == 'asc') {
                    sortedData.reverse();
                    sortWay = 'desc';
                }
                else {
                    sortWay = 'asc';
                }
            }
            selector.getDate = function () {
                var y = new Date();
                var m = new Date();
                var d = new Date();
                var h = new Date();
                var min = new Date();
                var s = new Date();
                var zero;

                y = y.getFullYear();
                m = m.getMonth() + 1;
                d = d.getDate();
                h = h.getHours();
                s = s.getSeconds();
                min = ((parseInt(min.getMinutes()) < 10) ? '0' : '') + min.getMinutes();
                var dateString = d + "." + m + "." + y + " " + h + ":" + min + ":" + s;
                return dateString;
            }

            function createTable() {
                var thead = $('<thead/>');
                var tr = $('<tr/>');
                for (var i = 0, length1 = settings.cols.length; i < length1; i++) {
                    var th = $('<th/>')
                    th.append(settings.cols[i]);
                    tr.append(th);
                }
                table.addClass('table');
                thead.append(tr);
                table.append(thead);
                table.append(tbody);
                selector.append(table);
            }
            selector.addRow = function (rowData, rowId, rowColor) {
                var amount;
                var description;
                var object = {
                    date: null
                    , description: null
                    , amount: null
                };
                for (var i = 0, length1 = rowData.length; i < length1; i++) {
                    if (typeof (rowData[i]) == 'number') {
                        object.amount = rowData[i];
                    }
                    else if (rowData[i] == 'date') {
                        object.date = selector.getDate();
                        rowData[i] = object.date;
                    }
                    else if (rowData[i] == 'DELETE_PICTURE') {
                        rowData[i] = (settings.deletePicture).clone();
                    }
                    else if (typeof (rowData[i]) == 'string') {
                        object.description = rowData[i];
                    }
                }
                if (object.amount < 0) dataPayments.push(object);
                else dataIncomes.push(object);
                data.push(object);
                var row = $('<tr></tr>').attr('data-class', rowId).css('background-color', rowColor);
                for (var i = 0, length1 = rowData.length; i < length1; i++) {
                    var col = $('<td/>');
                    col.append(rowData[i]);
                    row.append(col);
                }
                tbody.append(row);
                table.append(tbody);
                if (settings.paginateTable == true) paginateTable();
            }
            selector.deleteRow = function (index, arrayIndex, dataIndex) {
                selector.find("[data-class='" + index + "']").remove();
                if (index.charAt(0) == 'p') {
                    dataPayments.splice(arrayIndex, 1);
                }
                else {
                    dataIncomes.splice(arrayIndex, 1);
                }
                data.splice(dataIndex, 1);
                if (settings.paginateTable == true) paginateTable();
            }
            var navCount = 0;

            function paginateTable() {
                var totalRows = 0;
                var tableId = $(table).parent().attr("id");
                var select = "select" + tableId;
                var prev = "prev" + tableId;
                var next = "next" + tableId; //because table-specific nav:D
                if (navCount == 0) {
                    $(table).parent().append("<div class='paginatedTest'><button type='button' id =" + prev + " class='pagenav btn btn-primary active'>prev</button><button type='button' id=" + next + " class='pagenav btn btn-primary active'>next</button></div>");
                    $(table).parent().prepend('<div id="pageOptions" class="pageOptions"><p class="paginationTitle">Items per page</p><select name="pageAmount" id=' + select + '><option value="5">5</option><option value="10">10</option></select></div>');
                    navCount++;
                }
                var rowsPerPage = $("#" + select).val();

                function setButtons() {
                    if (page == 1) {
                        $("#" + prev).prop("disabled", true);
                    }
                    else {
                        $("#" + prev).prop("disabled", false);
                    }
                    if ((page == pageAmount) || rowIndex == 0) {
                        $("#" + next).prop("disabled", true);
                    }
                    else {
                        $("#" + next).prop("disabled", false);
                    }
                }

                function setNumbering() {
                    $("#feedback" + tableId).remove();
                    if (rowIndex > 0) $(table).parent().append("<p id='feedback" + tableId + "' class='paginationTitle'>Page " + page + " of " + pageAmount);
                }
                totalRows = $(table).find("tr").not(".hideMe").length - 1;
                var pageAmount = Math.ceil(totalRows / rowsPerPage); //pages total
                var rowIndex = 0; //current row
                var page = 1; // current page
                $(table).find("tr").not(".hideMe").slice(1).each(function () {
                    rowIndex++;
                    if ((rowIndex > rowsPerPage) || $(this).hasClass("hideMe")) {
                        $(this).hide();
                    }
                    else if (rowIndex <= rowsPerPage) {
                        $(this).show();
                    }
                });
                setButtons();
                setNumbering();
                $("#" + prev).on("click", function () {
                    if (page > 1) {
                        page--;
                        rowIndex = 0;
                        $(table).find("tr").not(".hideMe").slice(1).each(function () {
                            rowIndex++;
                            if (rowIndex > (rowsPerPage * page) || rowIndex <= ((rowsPerPage * page) - rowsPerPage) || $(this).hasClass("hideMe")) {
                                $(this).hide();
                            }
                            else {
                                $(this).show();
                            }
                        });
                    }
                    setButtons();
                    setNumbering();
                }); //end prev
                $("#" + next).on("click", function () {
                    if (page < pageAmount) {
                        page++;
                        rowIndex = 0;
                        $(table).find("tr").not(".hideMe").slice(1).each(function () {
                            rowIndex++;
                            if (rowIndex > (rowsPerPage * page) || rowIndex <= ((rowsPerPage * page) - rowsPerPage) || $(this).hasClass("hideMe")) {
                                $(this).hide();
                            }
                            else {
                                $(this).show();
                            }
                        });
                    }
                    setButtons();
                    setNumbering();
                }); //end next
                $("#" + select).on("change", function () {
                    rowsPerPage = $(this).val();
                    pageAmount = Math.ceil(totalRows / rowsPerPage);
                    rowIndex = 0;
                    page = 1;
                    $(table).find("tr").not(".hideMe").slice(1).each(function () {
                        rowIndex++;
                        if (rowIndex > rowsPerPage) {
                            $(this).hide();
                        }
                        else if (rowIndex <= rowsPerPage) {
                            $(this).show();
                        }
                    });
                    setButtons();
                    setNumbering();
                });
            } //end pagination
            selector.getIncomesData = function () {
                return dataIncomes;
            }
            selector.getPaymentsData = function () {
                return dataPayments;
            }
            selector.getAllData = function () {
                    return data;
                }
                //search
            function createSearchPanel() {
                $('<span />', {
                    "class": 'glyphicon glyphicon-search'
                    , "id": 'searchIco'
                }).appendTo('#search-Panel');
                $('<input />', {
                    "type": 'text'
                    , "id": 'search'
                }).appendTo('#search-Panel');
                $('<p />', {
                    "id": 'countOfFound'
                }).appendTo('#search-Panel');
                $("#searchIco").on('click', function () {
                    $("#search").toggle("slow");
                    $("#countOfFound").show();
                });
                var turnoversTable = $("#turnovers-table>.table>tbody").children();
                $("#search").on('keyup', function () {
                    var countOfFound = 0;
                    var searchWord = $(this).val();
                    var searchText = $("#turnovers-table").find("span").html();
                    $("#turnovers-table").find("span").replaceWith(searchText);
                    if ($(this).val() == "") {
                        $("#turnovers-table>table>tbody").children().removeClass();
                        for (var i = 0; i <= data.length - 1; i++) {
                            $("#turnovers-table>table>tbody").children().eq(i).children().eq(1).html(data[i].description);
                            $("#turnovers-table>table>tbody").children().eq(i).children().eq(2).html(data[i].amount);
                            $("#turnovers-table>table>tbody").children().eq(i).children().eq(0).html(data[i].date);
                        }
                    }
                    else {
                        $("#turnovers-table>table>tbody").children().addClass("hideMe");
                        for (var i = 0; i <= data.length - 1; i++) {
                            var reg = new RegExp(searchWord, 'gi');
                            if (data[i].description.match(reg)) {
                                $("#turnovers-table>table>tbody").children().eq(i).removeClass();
                                var highlightedString = (data[i].description).replace(reg, function (str) {
                                    return '<span class="highlight">' + str + '</span>'
                                });
                                $("#turnovers-table>table>tbody").children().eq(i).children().eq(1).html(highlightedString);
                                countOfFound++;
                            }
                            if (String(data[i].amount).match(reg)) {
                                $("#turnovers-table>table>tbody").children().eq(i).removeClass();
                                var highlightedString = String(data[i].amount).replace(reg, function (str) {
                                    return '<span class="highlight">' + str + '</span>'
                                });
                                $("#turnovers-table>table>tbody").children().eq(i).children().eq(2).html(highlightedString);
                                countOfFound++;
                            }
                            if (data[i].date.match(reg)) {
                                $("#turnovers-table>table>tbody").children().eq(i).removeClass();
                                var highlightedString = (data[i].date).replace(reg, function (str) {
                                    return '<span class="highlight">' + str + '</span>'
                                });
                                $("#turnovers-table>table>tbody").children().eq(i).children().eq(0).html(highlightedString);
                                countOfFound++;
                            }
                        }
                    }
                    parseFloat(searchWord);
                    if ($(this).val() == "") {
                        $("#countOfFound").text("");
                    }
                    else if (countOfFound == 1) {
                        $("#countOfFound").text("Found: " + (countOfFound) + " result");
                    }
                    else {
                        $("#countOfFound").text("Found: " + (countOfFound) + " results");
                    }
                    if (settings.paginateTable == true) paginateTable();
                });
            }
            //search
            if (settings.search == true) createSearchPanel();
            createTable();
            if (settings.paginateTable == true) paginateTable();
            if (settings.sortTable == true) {
                selector.find('th').css('cursor', 'pointer');
                var upCaret = $('<span class="dropup"><span class="caret"></span></span>');
                var caret = $('<span class="caret"></span>');
                selector.find('th').eq(0).on('click', function () {
                    if (sortWay == 'asc') {
                        caret.remove();
                        $(this).append(upCaret);
                    }
                    else {
                        upCaret.remove();
                        $(this).append(caret);
                    }
                    sortData('date');
                    refillTable();
                });
                selector.find('th').eq(2).on('click', function () {
                    if (sortWay == 'asc') {
                        caret.remove();
                        $(this).append(upCaret);
                    }
                    else {
                        upCaret.remove();
                        $(this).append(caret);
                    }
                    sortData('amount');
                    refillTable();
                });
                selector.find('th').eq(1).on('click', function () {
                    if (sortWay == 'asc') {
                        caret.remove();
                        $(this).append(upCaret);
                    }
                    else {
                        upCaret.remove();
                        $(this).append(caret);
                    }
                    sortData('description');
                    refillTable();
                });
            }
            return selector;
        }
    })(jQuery);
});