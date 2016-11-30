/**
* @author Martin Pach
* @description script for controlling form inputs
*/

//$(document).ready(function () {

	//(function ($) {
		
		var incomeObjects = [];
		var paymentObjects = [];
		var button = $('.submit-button');

		var countIncome = (function () {
			var count = -1;
			return function () {
				return count+=1;
			}
		})();

		var countPayment = (function () {
			var count = -1;
			return function () {
				return count+=1;
			}
		})();

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
				if( d.length>0 && a>=1 && (a*100)%1 == 0 && typeof(a)=='number' && d.indexOf('<')==-1) return true;
				else return false;
			},

			createObject: function (d, a) {
				if( input.test(d, a) ) {
					if( input.getTab() == "incomes-tab") incomeObjects.push({description: d, amount: (input.getTab() == "incomes-tab")?a:-a});
					else paymentObjects.push({description: d, amount: (input.getTab() == "incomes-tab")?a:-a});
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
				if(input.getTab() == "incomes-tab"){
					var incomesTable = $('#incomes-table tbody');
					var row = '<tr class="'+countIncome()+' bg-success"><td>' + table.getDate() + '</td><td>' + 
							incomeObjects[incomeObjects.length-1].description +  
							'</td><td>' + incomeObjects[incomeObjects.length-1].amount + '</td><td><img src="images\\x.gif" alt="x"></td></tr>';

					incomesTable.append(row);	
				}
				else if(input.getTab() == "payments-tab"){
					var paymentsTable = $('#payments-table tbody');

					var row = '<tr class="'+countPayment()+' bg-danger"><td>' + table.getDate() + '</td><td>' + 
							paymentObjects[paymentObjects.length-1].description +
							'</td><td>' + paymentObjects[paymentObjects.length-1].amount + '</td><td><img src="images\\x.gif" alt="x"></td></tr>';

					paymentsTable.append(row);
				}

				var turnOverRow = row.substring(0, row.indexOf("<td><img"));
				var turnoversTable = $('#turnovers-table tbody');
				turnoversTable.append(turnOverRow);		
			},

			deleteRow: function (r) {
				var index = r.index();
				var firstClass = r.attr('class').split(' ')[0];
				var secondClass = r.attr('class').split(' ')[1];
				if(input.getTab() == "incomes-tab") incomeObjects.splice(index, 1);
				else paymentObjects.splice(index, 1);
				$('.'+firstClass+''+'.'+secondClass+'').remove();
			}
		};

		var balance = {

			setValue : function () {
				var sum = 0, i;
				for (i = 0; i < incomeObjects.length; i++) {
					sum += (incomeObjects[i].amount)*100;
				}
				for(i = 0; i < paymentObjects.length; i++){
					sum += (paymentObjects[i].amount)*100;
				}
				$('#balance-value').text(sum/100);
			}
			//style : 
		};

		button.on('click', function () {
			input.createObject(input.getDescription(), input.getAmount());
			balance.setValue();
			
			//balance.style();
			var bal = $("#balance-value").text();
			var bal = parseInt(bal);
			if(bal>0){
			$(".balance-value").addClass("success");
			}
			else{
				$(".balance-value").removeClass("success");
				$(".balance-value").addClass("error");
			}
			
			
			
			
		});

		$('tbody').on('click', 'img', function () {
			var row = $(this).parent().parent();
			table.deleteRow(row);
			balance.setValue();
	
		
		})
		
		
	//})(jQuery);


//});