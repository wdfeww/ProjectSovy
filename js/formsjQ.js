/**
 * @author Martin Pach
 * @description script for controlling form inputs
 */

$(document).ready(function () {

    (function ($) {

        $("#calc").euroCalculator();

        var button = $('.submit-button');
        var incomesTable = $('#incomes-table').initTable({
            cols: ['Date', 'Description', 'Amount', 'Delete'],
        });
        var paymentsTable = $('#payments-table').initTable({
            cols: ['Date', 'Description', 'Amount', 'Delete']
        });
        var turnoversTable = $('#turnovers-table').initTable({
            cols: ['Date', 'Description', 'Amount'],
            search: true
        });
        var data = turnoversTable.getAllData();
        
        var countIncome = (function () {
            var count = -1;
            return function () {
                return count += 1;
            }
        })();

        var countPayment = (function () {
            var count = -1;
            return function () {
                return count += 1;
            }
        })();

        var input = {

            getTab: function () {
                var tab = $('.active').attr('id');
                return tab;
            },

            getDescription: function () {
                var description = (input.getTab() == "incomes-tab") ? $('#income-description').val() : $('#payment-description').val();
                return description;
            },

            getAmount: function () {
                var amount = (input.getTab() == "incomes-tab") ? $('#income-amount').val() : $('#payment-amount').val();
                if (amount.indexOf('e') != -1 || amount.indexOf('E') != -1) {
                    amount = 'error';
                } else {
                    amount = parseFloat(amount);
                }

                return amount;
            },


            testDescription: function (desc) {
                if (desc.length > 0 && desc.indexOf('<') == -1) return true;
                else return false;
            },

            testAmount: function (amount) {
                if (amount >= 1 && ((amount * 1000) % 10) == 0 && $.isNumeric(amount)) return true;
                else return false;
            },

            createObject: function (desc, amount) {
                if (input.testDescription(desc) && input.testAmount(amount)) {
                    if (input.getTab() == "incomes-tab") {
                        var rowIdentifier = 'i' + countIncome();
                        incomesTable.addRow(['date', desc, amount, 'DELETE_PICTURE'], rowIdentifier, '#8cd98c');
                        turnoversTable.addRow(['date', desc, amount], rowIdentifier, '#8cd98c');
                    } else {
                        var rowIdentifier = 'p' + countPayment();
                        paymentsTable.addRow(['date', desc, -amount, 'DELETE_PICTURE'], rowIdentifier, '#ff9980');
                        turnoversTable.addRow(['date', desc, -amount], rowIdentifier, '#ff9980');
                    }
                }
            },


            setIncomeStyle: function () {

                var incomeAmount = input.testAmount(input.getAmount());
                var incomeDescription = input.testDescription(input.getDescription());

                if (incomeDescription == false && incomeAmount == false) {
                    $("#incomeDesc").addClass("has-error form-control-error");
                    $('<div>Incorrect input.</div>').attr("id", "feedback").addClass("error").appendTo("#incomeDesc");
                    $("#incomeAmount").addClass("has-error form-control-error");
                    $('<div>Incorrect input.</div>').attr("id", "feedback2").addClass("error").appendTo("#incomeAmount");

                } else {
                    if (incomeDescription == true && incomeAmount == false) {
                        $("#incomeDesc").removeClass("has-error form-control-error");
                        $("#incomeAmount").addClass("has-error form-control-error");
                        $('<div>Incorrect input.</div>').attr("id", "feedback2").addClass("error").appendTo("#incomeAmount");

                    } else {
                        if (incomeDescription == false && incomeAmount == true) {
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


                if (paymentDescription == false && paymentAmount == false) {
                    $("#paymentDesc").addClass("has-error form-control-error");
                    $('<div>Incorrect input.</div>').attr("id", "feedback3").addClass("error").appendTo("#paymentDesc");
                    $("#paymentAmount").addClass("has-error form-control-error");
                    $('<div>Incorrect input.</div>').attr("id", "feedback4").addClass("error").appendTo("#paymentAmount");

                } else {
                    if (paymentDescription == true && paymentAmount == false) {
                        $("#paymentDesc").removeClass("has-error form-control-error");
                        $("#paymentAmount").addClass("has-error form-control-error");
                        $('<div>Incorrect input.</div>').attr("id", "feedback4").addClass("error").appendTo("#paymentAmount");

                    } else {
                        if (paymentDescription == false && paymentAmount == true) {
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
            },

            clearInputFields: function () {
                if (input.testAmount(input.getAmount()) == true && input.testDescription(input.getDescription()) == true) {
                    $("#income-amount").val(null);
                    $("#payment-amount").val(null);
                    $("#income-description").val(null);
                    $("#payment-description").val(null);
                } else {
                    if (input.testAmount(input.getAmount()) == true && input.testDescription(input.getDescription()) == false) {
                        $("#income-description").val(null);
                        $("#payment-description").val(null);
                    } else {
                        if (input.testAmount(input.getAmount()) == false && input.testDescription(input.getDescription()) == true) {
                            $("#income-amount").val(null);
                            $("#payment-amount").val(null);
                        }
                    }
                }
            }

        };

        var balance = {

            incomesData: incomesTable.getIncomesData(),
            paymentsData: paymentsTable.getPaymentsData(),
            setValue: function () {
                var sum = 0,
                    i;
                for (i = 0; i < this.incomesData.length; i++) {
                    sum += (this.incomesData[i].amount) * 100;
                }
                for (i = 0; i < this.paymentsData.length; i++) {
                    sum += (this.paymentsData[i].amount) * 100;
                }
                /*console.log(this.incomesData[0])
                console.log(this.paymentsData[0]);*/
                $('#balance-value').text((sum / 100).toFixed(2));
            },

            setStyle: function () {
                var bal = $("#balance-value").text();
                var bal = parseFloat(bal);
                if (bal > 0) {
                    $(".balance-value").addClass("success");

                } else {
                    if (bal < 0) {
                        $(".balance-value").removeClass("success");
                        $(".balance-value").addClass("error");
                    } else {
                        $(".balance-value").removeClass("success");
                        $(".balance-value").removeClass("error");
                    }
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
            input.clearInputFields();
            //$("input").val("");
            initChart(data, 0, 0);
        });


        incomesTable.on('click', 'img', function () {
            var index = $(this).parent().parent().index();
            var rowIndex = $(this).parent().parent().data('class');
            var allData = turnoversTable.getAllData();
            var dataIndex = turnoversTable.find("[data-class='" + rowIndex + "']").index();
            var deletedAmount = allData[dataIndex].amount;
            incomesTable.deleteRow(rowIndex, index,dataIndex);
            turnoversTable.deleteRow(rowIndex, index,dataIndex);
            balance.setValue();
            balance.setStyle();
            initChart(allData, dataIndex, deletedAmount);
        });

        paymentsTable.on('click', 'img', function () {
            var index = $(this).parent().parent().index();
            var rowIndex = $(this).parent().parent().data('class');
            var allData = turnoversTable.getAllData();
            var dataIndex = turnoversTable.find("[data-class='" + rowIndex + "']").index();
            var deletedAmount = allData[dataIndex].amount;
            paymentsTable.deleteRow(rowIndex, index, dataIndex);
            turnoversTable.deleteRow(rowIndex, index, dataIndex);
            balance.setValue();
            balance.setStyle();
            initChart(allData, dataIndex, deletedAmount);
        });

        $("#pagesPayments").on("change", function () {
            var rowsPerPage= $(this).val();
            var rowCount = $('#payments-table>table >tbody >tr').length;
            var prevPayments= $('#prevPayments');
            var nextPayments= $('#nextPayments');

            paymentsTable.paginateTable(rowCount,rowsPerPage,prevPayments,nextPayments);

        });

        $("#pagesIncomes").on("change", function () {
            var rowsPerPage= $(this).val();
            var rowCount = $('#incomes-table>table >tbody >tr').length;
            var prevIncomes= $('#prevIncomes');
            var nextIncomes= $('#nextIncomes');

            incomesTable.paginateTable(rowCount,rowsPerPage,prevIncomes,nextIncomes);

        });

        $("#pagesTurnovers").on("change", function () {
            var rowsPerPage= $(this).val();
            var rowCount = $('#turnovers-table>table >tbody >tr').length;
            var prevTurnovers= $('#prevTurnovers');
            var nextTurnovers= $('#nextTurnovers');
            turnoversTable.paginateTable(rowCount,rowsPerPage,prevTurnovers,nextTurnovers);

        });



    })(jQuery);


});
