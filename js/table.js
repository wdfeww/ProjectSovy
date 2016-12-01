(function ($) {
	$.fn.initTable = function (options) {
		var selector = this;
		var tbody = $('<tbody/>');
		var table = $('<table/>');

		var settings = $.extend({
			cols : [],
		}, options);

		function getDate () {
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

		selector.addRow = function (rowData, rowClass) {
			setCol(rowData);
			var row = $('<tr></tr>').addClass(rowClass);
			for(var i = 0, length1 = rowData.length; i < length1; i++){
				var col = $('<td/>');
				col = col.append(rowData[i]);
				row.append(col);
			}
			tbody.append(row);
			table.append(tbody);
		}

		selector.deleteRow = function (index) {
			index = '.'+index;
			console.log(index);
			selector.find(index).remove();
		}

		function setCol (rowData) {
			for(var i = 0, length1 = settings.cols.length; i < length1; i++){
				if (settings.cols[i] == 'Date' && rowData[i] == true) {
					rowData[i] = getDate();
				}
			}
		}
		
		createTable();
		return selector;
	}
})(jQuery);