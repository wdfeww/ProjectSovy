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
                search: false,
                deletePicture: $('<img/>', {src: 'images/x.gif'}),
                paginateTable:false
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

                for (var i = 0, length1 = rowData.length; i < length1; i++) {
                    if (typeof (rowData[i]) == 'number') {
                        object.amount = rowData[i];
                    } else if (rowData[i] == 'date') {
                        object.date = selector.getDate();
                        rowData[i] = object.date;
                    } else if (rowData[i] == 'DELETE_PICTURE'){
                        rowData[i] = (settings.deletePicture).clone();
                    } else if (typeof (rowData[i]) == 'string') {
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
                if (settings.paginateTable == true)
                paginateTable();
            }

            selector.deleteRow = function (index, arrayIndex, dataIndex) {
                    selector.find("[data-class='" + index + "']").remove();
                    if (index.charAt(0) == 'p') {
                        dataPayments.splice(arrayIndex, 1);
                    } else {
                        dataIncomes.splice(arrayIndex, 1);
                    }
                    data.splice(dataIndex, 1);
                    if (settings.paginateTable == true)
                		paginateTable();
                }


            var navCount=0;
            function paginateTable() {
            var totalRows=0;
            var tableId=$(table).parent().attr("id");
            var select="select"+tableId;
            var prev="prev"+tableId;
            var next="next"+tableId;//because table-specific nav:D
            	if(navCount==0){
            	$(table).parent().append("<div class='paginatedTest'><button type='button' id ="+prev+" class='pagenav btn btn-primary active'>prev</button><button type='button' id="+next+" class='pagenav btn btn-primary active'>next</button></div>");
            	$(table).parent().prepend('<div id="pageOptions" class="pageOptions"><p class="paginationTitle">Items per page</p><select name="pageAmount" id='+select+'><option value="5">5</option><option value="10">10</option></select></div>');
            	navCount++;
            }
            var rowsPerPage=$("#"+select).val();

            $(table).find("tr").slice(1).each(function(){
                totalRows++;
            });//determines row count

            var pageAmount = Math.ceil(totalRows/rowsPerPage); //pages total
            var rowIndex=0; //current row
            var page=1; // current page

            $(table).find("tr").slice(1).each(function () {
                rowIndex++;
                if(rowIndex>rowsPerPage){
                    $(this).hide();
                }
                else if(rowIndex<=rowsPerPage){
                    $(this).show();
                }

            });

            if(page==1){
                $("#"+prev).prop("disabled", true);
            }
            else{
                $("#"+prev).prop("disabled", false);                
            }

            if($(tbody).find("tr:last-child").is(":visible")||rowIndex==0){
                $("#"+next).prop("disabled", true);
            }
            else{
                $("#"+next).prop("disabled", false);
            }
            $("#feedback"+tableId).remove();
            $(table).parent().append("<p id='feedback"+tableId+"' class='paginationTitle'>Page "+page);
            
            $("#"+prev).on("click",function() {
                if(page>1){
                page--;
                    rowIndex=0;
                    $(table).find("tr").slice(1).each(function () {
                        rowIndex++;
                        if(rowIndex>(rowsPerPage*page)||rowIndex<=((rowsPerPage*page)-rowsPerPage)){
                            $(this).hide();
                	}
                        else{
                            $(this).show();
                	}
                
            	});
                }

                if(page==1){
                    $("#"+prev).prop("disabled", true);
                }
                else{
                    $("#"+prev).prop("disabled", false);                
                }

                if($(tbody).find("tr:last-child").is(":visible")||rowIndex==0){
                    $("#"+next).prop("disabled", true);
                }
                else{
                    $("#"+next).prop("disabled", false);
                } // end button enable/disable

                $("#feedback"+tableId).remove();
                $(table).parent().append("<p id='feedback"+tableId+"' class='paginationTitle'>Page "+page);

            });//end prev

            $("#"+next).on("click",function() {
                if(page<pageAmount){
                    page++;
                    rowIndex=0;
                    $(table).find("tr").slice(1).each(function () {
                        rowIndex++;
                        if(rowIndex>(rowsPerPage*page)||rowIndex<=((rowsPerPage*page)-rowsPerPage)){
                            $(this).hide();
                }
                        else{
                            $(this).show();
                }
            });
            }

            if(page==1){
                $("#"+prev).prop("disabled", true);
            }
            else{
                $("#"+prev).prop("disabled", false);                
            }

                if($(tbody).find("tr:last-child").is(":visible")||rowIndex==0){
                    $("#"+next).prop("disabled", true);
                }
                else{
                    $("#"+next).prop("disabled", false);
                }

                $("#feedback"+tableId).remove();
                $(table).parent().append("<p id='feedback"+tableId+"' class='paginationTitle'>Page "+page);
        });//end next

            $("#"+select).on("change",function(){
            	rowsPerPage=$(this).val();
            	pageAmount = Math.ceil(totalRows/rowsPerPage);
            	rowIndex=0;
            	page=1;
            	$(table).find("tr").slice(1).each(function () {
                	rowIndex++;
                	if(rowIndex>rowsPerPage){
                    	$(this).hide();
                	}
                	else if(rowIndex<=rowsPerPage){
                    	$(this).show();
                	}

            	});

                $("#feedback"+tableId).remove();
                $(table).parent().append("<p id='feedback"+tableId+"' class='paginationTitle'>Page "+page);
            });
        }//end pagination



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
                    var searchText = $("#turnovers-table").find("span").html();

                        $("#turnovers-table").find("span").replaceWith(searchText);


                    if ($(this).val() == "") {
                        $("#turnovers-table>table>tbody").children().removeClass();
                        for (var i = 0; i <= data.length - 1; i++) {
                            $("#turnovers-table>table>tbody").children().eq(i).children().eq(1).html(data[i].description);
                            $("#turnovers-table>table>tbody").children().eq(i).children().eq(2).html(data[i].amount);
                            $("#turnovers-table>table>tbody").children().eq(i).children().eq(0).html(data[i].date);
                        }
                    } else {


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
                            } if (parseFloat(data[i].amount) == parseFloat(searchWord)) {
                                $("#turnovers-table>table>tbody").children().eq(i).removeClass();
                                var highlightedString = '<span class="highlight">' + data[i].amount + '</span>';
                                $("#turnovers-table>table>tbody").children().eq(i).children().eq(2).html(highlightedString);
                                countOfFound++;
                            }  if (data[i].date.match(reg)) {
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
                    if($(this).val() == ""){
                        $("#countOfFound").text("");
                    }
                    else if(countOfFound==1){
                    $("#countOfFound").text("Found: " + (countOfFound) + " result");
                    }
                    else{$("#countOfFound").text("Found: " + (countOfFound) + " results");
                    }
                });
            }
            //search
            if (settings.search == true)
                createSearchPanel();
            

            createTable();

             if (settings.paginateTable == true)
                paginateTable();

            return selector;

        }
    })(jQuery);

});
