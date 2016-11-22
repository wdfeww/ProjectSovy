/**
* @author Martin Pach
* @description script for controlling form inputs
*/

$(document).ready(function () {

	(function ($) {
		
		var objects = [];
		var button = $('.submit-button');

		var input = {

			getTab : function () {
				var tab = $('.active').attr('id');
				return tab;
			},

			getDescription : function () {
				var description = (input.getTab() == "incomes-tab") ? $('#income-description').val() : $('#payment-description').val();
				return description;
			},

			getAmount : function () {
				var amount = (input.getTab() == "incomes-tab") ? $('#income-amount').val() : $('#payment-amount').val();
				if(amount.indexOf('e') != -1){ 
					amount = 'error';
				}
				else{
					if(amount.includes(',')) amount.indexOf(',') = '.';	//this is because when user enters , instead of . then stored number was int
					amount = parseFloat(amount);
				}

				return amount;				
			},

			test : function (d, a) {
				if( d.length>0 && a>=1 && (a*100)%1 == 0 && typeof(a)=='number') return true;
				else return false;
			},

			createObject: function (d, a) {
				if( input.test(d, a) ) {
					objects.push({description: d, amount: (input.getTab() == "incomes-tab")?a:-a});
					table.addRow(); //if object was successfully created then add row with data from object
				}
			}
		};

		var table = {

			getDate: function () {
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
			},

			addRow: function () {

				var row = '<tr><td>' + table.getDate() + '</td><td>' + objects[objects.length-1].description + '</td><td>' 
						+ objects[objects.length-1].amount + '</td></tr>';

				if(input.getTab() == "incomes-tab"){
					var incomesTable = $('#incomes-table tbody');
					// style row here using addClass()
					incomesTable.append(row);
				}
				else if(input.getTab() == "payments-tab"){
					var paymentsTable = $('#payments-table tbody');
					// style row here using addClass()
					paymentsTable.append(row);
				}

				var turnoversTable = $('#turnovers-table tbody');
				turnoversTable.append(row);

			},
		};

		var balance = {

			setValue : function () {
				var sum = 0, i;
				for (i = 0; i < objects.length; i++) {
					sum += (objects[i].amount)*100;
				}
				$('#balance-value').text(sum/100);
			}

			//style : 
		};

		button.on('click', function () {
			input.createObject(input.getDescription(), input.getAmount());
			balance.setValue();
			//balance.style();
		});

	})(jQuery);


});