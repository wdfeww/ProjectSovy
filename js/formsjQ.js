/**
* @author Martin Pach
* @description script for controlling form inputs
*/

//$(document).ready(function () {

	//(function ($) {
		
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
					if( input.getTab() == "incomes-tab"){
						var rowClass = 'i'+countIncome();
						incomeObjects.push({description: d, amount: a});
						incomesTable.addRow([true, incomeObjects[incomeObjects.length-1].description, 
											incomeObjects[incomeObjects.length-1].amount, $('<img>', { src : 'images/x.gif', alt : 'x'})], rowClass);
						turnoversTable.addRow([true, incomeObjects[incomeObjects.length-1].description, 
											incomeObjects[incomeObjects.length-1].amount], rowClass);
					}
					else {
						var rowClass = 'p'+countPayment();
						paymentObjects.push({description: d, amount: -a});
						paymentsTable.addRow([true, paymentObjects[paymentObjects.length-1].description, 
											paymentObjects[paymentObjects.length-1].amount, $('<img>', { src : 'images/x.gif', alt : 'x'})], rowClass);
						turnoversTable.addRow([true, paymentObjects[paymentObjects.length-1].description, 
											paymentObjects[paymentObjects.length-1].amount], rowClass);
					}
				}
			},


			setIncomeStyle: function () {

			    //add style by ID
			    //#payment-description #payment-amount #income-description #income-amount
			    var incomeAmount = $("#income-amount").val();
			    var incomeDescription = $("#income-description").val();

			    if (incomeDescription.length < 1 && incomeAmount <= 0) {
			        $("#incomeDesc").addClass("has-error form-control-error");
			        $('<div>Incorrect input.</div>').attr("id", "feedback").appendTo("#incomeDesc");
			        $("#feedback").addClass("error");
			        //add incomeamount errors here
			        $("#incomeAmount").addClass("has-error form-control-error");
			        $('<div>Incorrect input.</div>').attr("id", "feedback2").appendTo("#incomeAmount");
			        $("#feedback2").addClass("error");

			    }
			    else {
			        if (incomeDescription.length > 0 && incomeAmount <= 0) {
			            $("#incomeDesc").removeClass("has-error form-control-error");
			            //obsolete classes removed
			            $("#incomeAmount").addClass("has-error form-control-error");
			            $('<div>Incorrect input.</div>').attr("id", "feedback2").appendTo("#incomeAmount");
			            $("#feedback2").addClass("error");
			        }
			        else {
			            if (incomeDescription.length < 1 && incomeAmount > 0) {
			                $("#incomeAmount").removeClass("has-error form-control-error");
			                //removing finished
			                $("#incomeDesc").addClass("has-error form-control-error");
			                $('<div>Incorrect input.</div>').attr("id", "feedback").appendTo("#incomeDesc");
			                $("#feedback").addClass("error");
			            }
			        }
			    }

			},

			setPaymentStyle: function () {
			    var paymentAmount = $("#payment-amount").val();
			    var paymentDescription = $("#payment-description").val();


			    if (paymentDescription.length < 1 && paymentAmount <= 0) {
			        $("#paymentDesc").addClass("has-error form-control-error");
			        $('<div>Incorrect input.</div>').attr("id", "feedback3").appendTo("#paymentDesc");
			        $("#feedback3").addClass("error");
			        //add incomeamount errors here
			        $("#paymentAmount").addClass("has-error form-control-error");
			        $('<div>Incorrect input.</div>').attr("id", "feedback4").appendTo("#paymentAmount");
			        $("#feedback4").addClass("error");

			    }
			    else {
			        if (paymentDescription.length > 0 && paymentAmount <= 0) {
			            $("#paymentDesc").removeClass("has-error form-control-error");
			            //obsolete classes removed
			            $("#paymentAmount").addClass("has-error form-control-error");
			            $('<div>Incorrect input.</div>').attr("id", "feedback4").appendTo("#paymentAmount");
			            $("#feedback4").addClass("error");
			        }
			        else {
			            if (paymentDescription.length < 1 && paymentAmount > 0) {
			                $("#paymentAmount").removeClass("has-error form-control-error");
			                //removing finished
			                $("#paymentDesc").addClass("has-error form-control-error");
			                $('<div>Incorrect input.</div>').attr("id", "feedback3").appendTo("#paymentDesc");
			                $("#feedback3").addClass("error");
			            }
			        }
			    }
			},

			clearInputStyle: function () {
			    $(".form-group").removeClass("has-error error");
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
				$('#balance-value').text(sum/100);
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
		    if (input.test(input.getDescription(), input.getAmount())) {
		        input.clearInputStyle();
		    }
		    else {
		        if (input.getTab() == "incomes-tab")
		            input.setIncomeStyle();
		        else {
		            input.setPaymentStyle();
		        }

		    } //gives feedbacks to input fields 
		    input.createObject(input.getDescription(), input.getAmount());
		    balance.setValue();
		    balance.setStyle();
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
		
		
	//})(jQuery);


//});