$(document).ready(function () {
    (function ($) {
        $.fn.initTable = function (options) {
            var selector = this;
            var tbody = $('<tbody/>');
            var table = $('<table/>');
            var dataIncomes = [];
            var dataPayments = [];
            var data = [];
            var settings = $.extend({
                cols: [],
                search: false
            }, options);

            selector.getDate = function () {
                var y = new Date();
                var m = new Date();
                var d = new Date();
                var h = new Date();
                var min = new Date();
                var zero;

                y = y.getUTCFullYear();
                m = m.getUTCMonth() + 1;
                d = d.getUTCDate();
                h = h.getUTCHours() + 1;
                min = ((parseInt(min.getUTCMinutes()) < 10) ? '0' : '') + min.getUTCMinutes();


                var dateString = d + "." + m + "." + y + " " + h + ":" + min;
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
                    description: null,
                    amount: null,
                    date: null
                };
                // setCol(rowData);
                for (var i = 0, length1 = rowData.length; i < length1; i++) {
                    if (typeof (rowData[i]) == 'number') {
                        object.amount = rowData[i];
                    } else if (typeof (rowData[i]) == 'string' && rowData[i] != 'date') {
                        object.description = rowData[i];
                    } else if (rowData[i] == 'date') {
                        object.date = selector.getDate();
                        rowData[i] = object.date;
                    }
                }
                console.log(object.amount);
                if (object.amount < 0) {
                    dataPayments.push(object);

                } else {
                    dataIncomes.push(object);

                }
                data.push(object);
                var row = $('<tr></tr>').attr('data-class', rowId).css('background-color', rowColor);
                for (var i = 0, length1 = rowData.length; i < length1; i++) {
                    var col = $('<td/>');
                    col = col.append(rowData[i]);
                    row.append(col);
                }
                tbody.append(row);
                table.append(tbody);
            }

            selector.deleteRow = function (index, arrayIndex, dataIndex) {
                    selector.find("[data-class='" + index + "']").remove();
                    if (index.charAt(0) == 'p') {
                        dataPayments.splice(arrayIndex, 1);
                    } else {
                        dataIncomes.splice(arrayIndex, 1);
                    }
                    data.splice(dataIndex, 1);
                }
                /*
                            function setCol(rowData) {
                                for (var i = 0, length1 = settings.cols.length; i < length1; i++) {
                                    if (settings.cols[i] == 'Date' && rowData[i] == 'date') {
                                        rowData[i] = selector.getDate();
                                    }
                                }
                            }*/

            selector.sortTableByAmount = function (tableName) {
                selector.find('tr').eq(0);
            }

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
                    "class": 'glyphicon glyphicon-search',
                    "id": 'searchIco'
                }).appendTo('#search-Panel');
                $('<input />', {
                    "type": 'text',
                    "id": 'search'
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

                    if ($(this).val() == "") {
                        $("#turnovers-table>table>tbody").children().show();
                        for (var i = 0; i <= data.length - 1; i++) {
                            $("#turnovers-table>table>tbody").children().eq(i).children().eq(1).html(data[i].description);
                            $("#turnovers-table>table>tbody").children().eq(i).children().eq(2).html(data[i].amount);
                            $("#turnovers-table>table>tbody").children().eq(i).children().eq(0).html(data[i].date);
                        }
                    } else {


                        $("#turnovers-table>table>tbody").children().hide();
                        for (var i = 0; i <= data.length - 1; i++) {
                            var reg = new RegExp(searchWord, 'gi');
                            if (data[i].description.match(reg)) {
                                $("#turnovers-table>table>tbody").children().eq(i).show();
                                var highlightedString = (data[i].description).replace(reg, function (str) {
                                    return '<span class="highlight">' + str + '</span>'
                                });
                                $("#turnovers-table>table>tbody").children().eq(i).children().eq(1).html(highlightedString);
                                countOfFound++;
                            } else if (parseFloat(data[i].amount) == parseFloat(searchWord)) {
                                $("#turnovers-table>table>tbody").children().eq(i).show();
                                var highlightedString = '<span class="highlight">' + data[i].amount + '</span>';
                                $("#turnovers-table>table>tbody").children().eq(i).children().eq(2).html(highlightedString);
                                countOfFound++;
                            } else if (data[i].date.match(reg)) {
                                $("#turnovers-table>table>tbody").children().eq(i).show();
                                var highlightedString = (data[i].date).replace(reg, function (str) {
                                    return '<span class="highlight">' + str + '</span>'
                                });
                                $("#turnovers-table>table>tbody").children().eq(i).children().eq(0).html(highlightedString);
                                countOfFound++;
                            }
                        }
                    }
                    parseFloat(searchWord);
                    $("#countOfFound").text("Founded: " + (countOfFound) + " results");
                });
            }
            //search
            if (settings.search == true)
                createSearchPanel();
            createTable();
            return selector;
        }
    })(jQuery);

});
