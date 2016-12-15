$(document).ready(function () {
(function ($) {
	$.fn.initTable = function (options) {
		var selector = this;
		var tbody = $('<tbody/>');
		var table = $('<table/>');
		var dataIncomes = [];
		var dataPayments = [];

		var settings = $.extend({
			cols : [],
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

		    
		    var dateString = d + "." + m +"." + y + " " + h + ":" + min;
			return dateString;
		}

		function createTable () {
			var thead = $('<thead/>');
			var tr = $('<tr/>');

			for(var i = 0, length1 = settings.cols.length; i < length1; i++){
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
			var object = { description : null, amount : null, date : null};
			setCol(rowData);
			for(var i = 0, length1 = rowData.length; i < length1; i++){
				if (typeof(rowData[i]) == 'number') {
					object.amount = rowData[i];
				}
				else if (typeof(rowData[i]) == 'string' && rowData[i] != 'date') {
					object.description = rowData[i];
				}
				else if (rowData[i] == 'date'){
					object.date = selector.getDate();
				}
			}
			console.log(object.amount);
			if (object.amount < 0) {				
				dataPayments.push(object);
			}
			else{
				dataIncomes.push(object);
			}
			var row = $('<tr></tr>').attr('data-class', rowId).css('background-color', rowColor);
			for(var i = 0, length1 = rowData.length; i < length1; i++){
				var col = $('<td/>');
				col = col.append(rowData[i]);
				row.append(col);
			}
			tbody.append(row);
			table.append(tbody);
		}

		selector.deleteRow = function (index, arrayIndex) {
			selector.find("[data-class='" + index + "']").remove();
			if (index.charAt(0) == 'p') {
				dataPayments.splice(arrayIndex, 1);
			}
			else {
				dataIncomes.splice(arrayIndex, 1);
			}
		}

		function setCol (rowData) {
			for(var i = 0, length1 = settings.cols.length; i < length1; i++){
				if (settings.cols[i] == 'Date' && rowData[i] == 'date') {
					rowData[i] = selector.getDate();
				}
			}
		}

		selector.sortTableByAmount = function (tableName) {
			selector.find('tr').eq(0); 
		}

		selector.getIncomesData = function () {
			return dataIncomes;
		}

		selector.getPaymentsData = function () {
			return dataPayments;
		}
		
		createTable();
		return selector;
	}
})(jQuery);

});