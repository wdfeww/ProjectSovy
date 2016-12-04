/**
* @author Martin Pach
* @description script for controlling form inputs
*/

$(document).ready(function () {

	(function ($) {
		
		var incomeObjects = [];
		var paymentObjects = [];
		var button = $('.submit-button');
		var incomesTable = $('#incomes-table').initTable({cols : ['Date', 'Description', 'Amount', 'Delete']});
		var paymentsTable = $('#payments-table').initTable({cols : ['Date', 'Description', 'Amount', 'Delete']});
		var turnoversTable = $('#turnovers-table').initTable({cols : ['Date', 'Description', 'Amount']});

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
				if (amount.indexOf('e') != -1 || amount.indexOf('E') != -1) {
					amount = 'error';
				}
				else{
				    if (amount.includes(',')) amount.replace(/,/g, '.');	//this is because when user enters , instead of . then stored number was int
					amount = parseFloat(amount);
				}

				return amount;				
			},

		
			testDescription : function (d) {
				if( d.length>0 && d.indexOf('<')==-1) return true;
				else return false;
			},

			testAmount : function (a) {
			    if (a >= 1 && ((a * 1000) % 10) == 0 && $.isNumeric(a)) return true;
				else return false;
			},

			createObject: function (d, a) {
				if( input.testDescription(d)&& input.testAmount(a) ) {
					if( input.getTab() == "incomes-tab"){
						var rowClass = 'i'+countIncome();
						incomeObjects.push({description: d, amount: a});
						incomesTable.addRow([true, incomeObjects[incomeObjects.length-1].description, 
											incomeObjects[incomeObjects.length-1].amount, $('<img>', { src : 'images/x.gif', alt : 'x'})], rowClass, '#00cc66');
						turnoversTable.addRow([true, incomeObjects[incomeObjects.length-1].description, 
											incomeObjects[incomeObjects.length-1].amount], rowClass, '#00cc66');
					}
					else {
						var rowClass = 'p'+countPayment();
						paymentObjects.push({description: d, amount: -a});
						paymentsTable.addRow([true, paymentObjects[paymentObjects.length-1].description, 
											paymentObjects[paymentObjects.length-1].amount, $('<img>', { src : 'images/x.gif', alt : 'x'})], rowClass, '#ff5050');
						turnoversTable.addRow([true, paymentObjects[paymentObjects.length-1].description, 
											paymentObjects[paymentObjects.length-1].amount], rowClass, '#ff5050');
					}
				}
			},


			setIncomeStyle: function () {

			    var incomeAmount = input.testAmount(input.getAmount());
			    var incomeDescription = input.testDescription(input.getDescription());

			    if (incomeDescription==false && incomeAmount==false) {
			        $("#incomeDesc").addClass("has-error form-control-error");
			        $('<div>Incorrect input.</div>').attr("id", "feedback").addClass("error").appendTo("#incomeDesc");
			        $("#incomeAmount").addClass("has-error form-control-error");
			        $('<div>Incorrect input.</div>').attr("id", "feedback2").addClass("error").appendTo("#incomeAmount");
			    
			    }
			    else {
			        if (incomeDescription == true && incomeAmount ==false) {
			            $("#incomeDesc").removeClass("has-error form-control-error");
			            $("#incomeAmount").addClass("has-error form-control-error");
			            $('<div>Incorrect input.</div>').attr("id", "feedback2").addClass("error").appendTo("#incomeAmount");
			      
			            }
			        else {
			            if (incomeDescription==false && incomeAmount==true) {
			                $("#incomeAmount").removeClass("has-error form-control-error");
			                $("#incomeDesc").addClass("has-error form-control-error");
			                $('<div>Incorrect input.</div>').attr("id", "feedback").addClass("error").appendTo("#incomeDesc");
			            
			            }
			        }
			    }

			},

			setPaymentStyle: function () {
			    var paymentAmount = input.testAmount(input.getAmount());
			    var paymentDescription = input.testDescription(input.getDescription());


			    if (paymentDescription==false && paymentAmount==false) {
			        $("#paymentDesc").addClass("has-error form-control-error");
			        $('<div>Incorrect input.</div>').attr("id", "feedback3").addClass("error").appendTo("#paymentDesc");
			        $("#paymentAmount").addClass("has-error form-control-error");
			        $('<div>Incorrect input.</div>').attr("id", "feedback4").addClass("error").appendTo("#paymentAmount");
			        

			    }
			    else {
			        if (paymentDescription==true && paymentAmount==false) {
			            $("#paymentDesc").removeClass("has-error form-control-error");
			            $("#paymentAmount").addClass("has-error form-control-error");
			            $('<div>Incorrect input.</div>').attr("id", "feedback4").addClass("error").appendTo("#paymentAmount");
			           
			        }
			        else {
			            if (paymentDescription==false && paymentAmount==true) {
			                $("#paymentAmount").removeClass("has-error form-control-error");
			                $("#paymentDesc").addClass("has-error form-control-error");
			                $('<div>Incorrect input.</div>').attr("id", "feedback3").addClass("error").appendTo("#paymentDesc");
			                
			            }
			        }
			    }

			},

			clearInputStyle: function () {
			    $("#incomeAmount").removeClass("has-error error");
			    $("#incomeDesc").removeClass("has-error error");
			    $("#paymentAmount").removeClass("has-error error ");
			    $("#paymentDesc").removeClass("has-error error");
			},

			toggleFeedback: function () {
			    if ($("#incomeAmount").has("#feedback")) {
			        $("#feedback").remove();
			    }
			    if ($("#incomeDesc").has("#feedback2")) {
			        $("#feedback2").remove();
			    }
			    if ($("#paymentAmount").has("#feedback3")) {
			        $("#feedback3").remove();
			    }
			    if ($("#paymentDesc").has("#feedback4")) {
			        $("#feedback4").remove();
			    }
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
				$('#balance-value').text((sum / 100).toFixed(2));
			},

			setStyle: function () {
			    var bal = $("#balance-value").text();
			    var bal = parseFloat(bal);
			    if (bal > 0) {
			        $(".balance-value").addClass("success");

			    }
			    else {
			        $(".balance-value").removeClass("success");
			        $(".balance-value").addClass("error");
			    }
			}
		};

		button.on('click', function () {

		    input.toggleFeedback();
		    input.clearInputStyle();
		        if (input.getTab() == "incomes-tab")
		            input.setIncomeStyle();
		        else {
		            input.setPaymentStyle();
		        }
		        
		    input.createObject(input.getDescription(), input.getAmount());
		    balance.setValue();
		    balance.setStyle();
			$("input").val(" ");
		});
		

		incomesTable.on('click', 'img', function () {
			var index = $(this).parent().parent().index();
			var rowIndex = $(this).parent().parent().attr('class');
			incomesTable.deleteRow(rowIndex);
			turnoversTable.deleteRow(rowIndex);
			incomeObjects.splice(index, 1);
			balance.setValue();
		});

		paymentsTable.on('click', 'img', function () {
			var index = $(this).parent().parent().index();
			var rowIndex = $(this).parent().parent().attr('class');
			paymentsTable.deleteRow(rowIndex);
			turnoversTable.deleteRow(rowIndex);
			paymentObjects.splice(index, 1);
			balance.setValue();
		});
		
		
})(jQuery);


});