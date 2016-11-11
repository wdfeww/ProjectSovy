/**
* @author Martin Pach, Vladimir Uram
* @description Javascript to controll forms
*/

/** counting variable */
var incomesRowCount = 0;
var paymentsRowCount = 0;
var estimatesRowCount = 0;
var accBal = 0;

/** 
* @input current date
* @output current date format
*/
function date() {
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

/**
* @input type of transaction, transaction value
* @output form visual style
* @description setting form style if inputs were NOT valid
*/
function falseStyle(type, amount) {
    if (amount.value < 10) {
        amount.placeholder = "bad input!";
        amount.style.borderColor = "red";
        amount.value = "";
    }
    else {
        amount.style.border = "1px solid #ccc";
    }
    if (type.value == "") {
        type.placeholder = "bad input!";
        type.style.borderColor = "red";
    }
    else {
        type.style.border = "1px solid #ccc";
    }
}

/**
* @input type of transaction, transaction value
* @output form visual style
* @description setting form style if inputs were valid
*/
function trueStyle(type, amount) {
    type.style.border = "1px solid #ccc";
    amount.style.border = "1px solid #ccc";
    type.placeholder = "";
    amount.placeholder = "";
    type.value = "";
    amount.value = "";
}

/**
* @input row in incomes table, row in estimates table
* @output rows style
*/
function incomeColor(row1, row2) {
    row1.className += "success";
    row2.className += "success";
}

/**
* @input row in payments table, row in estimates table
* @output rows style
*/
function paymentColor(row1, row2) {
    row1.className += "danger";
    row2.className += "danger";
}

/**
* @input account balance value
* @output account balance style
*/
function balanceColor() {
    if (accBal == 0) document.getElementById("balance_value").style.color = "#337ab7";
    if (accBal > 0) document.getElementById("balance_value").style.color = "#78db6f";
    if (accBal < 0) document.getElementById("balance_value").style.color = "#db6f6f";
}

/**
* @input transaction value
* @output value added to balance
*/
function plusBalance(amount) {
    accBal += Number(amount);
    document.getElementById("balance_value").innerText = accBal / 100;
    balanceColor();
}

/**
* @input transaction value
* @output value taken from balance
*/
function minusBalance(amount) {
    accBal -= Number(amount);
    document.getElementById("balance_value").innerText = accBal / 100;
    balanceColor();
}

/**
* @input INCOME row number, estimate row number
* @output removed rows from both tables and account balance DECREASED by value in deleted row
* @description function is called whenever X is clicked
*/
function deleteIncomeRow(id1, id2) {
    var value = document.getElementById("incomeValue" + id1).innerText;
    value = parseFloat(value.match(/[\d\.]+/));
    value *= 100;
    minusBalance(value);
    document.getElementById("incomeRow" + id1).remove();
    document.getElementById("estimateRow" + id2).remove();
    incomesRowCount--;
    estimatesRowCount--;
}

/**
* @input PAYMENT row number, estimate row number
* @output removed rows from both tables and account balance INCREASED by value in deleted row
* @description function is called whenever X is clicked
*/
function deletePaymentRow(id1, id2) {
    var value = document.getElementById("paymentValue" + id1).innerText;
    value = parseFloat(value.match(/[\d\.]+/));
    value *= 100;
    plusBalance(value);
    document.getElementById("paymentRow" + id1).remove();
    document.getElementById("estimateRow" + id2).remove();
    paymentsRowCount--;
    estimatesRowCount--;
}

/**
* @input transaction type, transaction value
* @output added rows to incomes and estimates table
* @description this function is "main" function - it calls other functions
*/
function addIncome() {
    var value = document.getElementById("income_amount");
    var type = document.getElementById("income_type");
    var temp;
    if (value.value >= 10 && value.value<=10000000000 && type.checkValidity()) {
        var num = value.value;
        num = Math.round(num * 100) / 100;
        num *= 100;

        var table = document.getElementById("incomes_table").getElementsByTagName('tbody')[0];
        var estimatesTable = document.getElementById("estimates_table").getElementsByTagName('tbody')[0];

        var estimateRow = estimatesTable.insertRow(estimatesRowCount);
        var row = table.insertRow(incomesRowCount);

        var estimateCell1 = estimateRow.insertCell(0); //adding cells to estimate table
        var estimateCell2 = estimateRow.insertCell(1);
        var estimateCell3 = estimateRow.insertCell(2);

        var cell1 = row.insertCell(0); //adding cells to income table
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);

        estimateRow.id = ("estimateRow" + estimatesRowCount); //setting all needed ids
        row.id = ("incomeRow" + incomesRowCount);
        cell3.id = ("incomeValue" + incomesRowCount);

        cell1.innerHTML = date(); //setting values of income table cells
        cell2.innerHTML = type.value;
        cell3.innerHTML = "+ " + num / 100 + " Eur";
        cell4.innerHTML = "<a onclick=\"deleteIncomeRow(" + incomesRowCount + "," + estimatesRowCount + ")\"><img src=\"images\\x.gif\" alt=\"Delete row\"></a>";

        estimateCell1.innerHTML = cell1.innerHTML; //setting values of estimate table
        estimateCell2.innerHTML = cell2.innerHTML;
        estimateCell3.innerHTML = cell3.innerHTML;

        plusBalance(num);
        trueStyle(type, value);
        incomeColor(row, estimateRow);

        incomesRowCount++;
        estimatesRowCount++;
    }
    else {
        falseStyle(type, value);
    }
}

/**
* @input transaction type, transaction value
* @output added rows to payments and estimates table
* @description this function is "main" function - it calls other functions
*/
function addPayment() {
    var value = document.getElementById("payment_amount");
    var type = document.getElementById("payment_type");
    if (value.value >= 10 && value.value<= 10000000000 && type.checkValidity()) {
        var num = value.value;
        num = Math.round(num * 100) / 100;
        num *= 100;

        var table = document.getElementById("payments_table").getElementsByTagName('tbody')[0];
        var estimatesTable = document.getElementById("estimates_table").getElementsByTagName('tbody')[0];

        var estimateRow = estimatesTable.insertRow(estimatesRowCount);
        var row = table.insertRow(paymentsRowCount);

        var estimateCell1 = estimateRow.insertCell(0);  
        var estimateCell2 = estimateRow.insertCell(1);
        var estimateCell3 = estimateRow.insertCell(2);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);

        row.id = ("paymentRow" + paymentsRowCount);
        estimateRow.id = ("estimateRow" + estimatesRowCount);
        cell3.id = ("paymentValue" + paymentsRowCount);

        cell1.innerHTML = date();
        cell2.innerHTML = type.value;
        cell3.innerHTML = "- " + num / 100 + " Eur";
        cell4.innerHTML = "<a onclick=\"deletePaymentRow(" + paymentsRowCount + "," + estimatesRowCount + ")\"><img src=\"images\\x.gif\" alt=\"Delete row\"></a>";

        estimateCell1.innerHTML = cell1.innerHTML;
        estimateCell2.innerHTML = cell2.innerHTML;
        estimateCell3.innerHTML = cell3.innerHTML;

        minusBalance(num);
        trueStyle(type, value, row);
        paymentColor(row, estimateRow);

        paymentsRowCount++;
        estimatesRowCount++;
    }
    else {
        falseStyle(type, value);
    }
}

// adding event listeners to forms buttons
document.getElementById("submit_income").addEventListener("click", addIncome);
document.getElementById("submit_payment").addEventListener("click", addPayment);
