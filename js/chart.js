/**
* @author Rastislav Ruščák
* @description function for filling chart with data
*/
var dataPoints = [];
var allSums = [];

function initChart(data, dataIndex, deletedAmount) {
    var sum=0;

    for (i=0; i<data.length; i++) {
        sum += data[i].amount;
    }
    if (deletedAmount != 0) {
        for (i=dataIndex; i<data.length; i++) {
            allSums[i]=allSums[i+1]-deletedAmount;
        }
        allSums.splice( data.length, 1);
    }
    allSums[data.length-1]=sum;

    if (data.length == 0){
        allSums[0]=sum;
    }
    else {
        $("#chartContainer2").css("display", "none");
    }

    var year = [];
    var month = [];
    var day = [];
    var seconds = [];
    var minutes = [];
    var hours = [];

    for (i=0; i<data.length; i++) {
        year[i] = parseInt(data[i].date.split(".")[2], 10);
        month[i] = parseInt(data[i].date.split(".")[1], 10);
        month[i]-=1;
        day[i] = parseInt(data[i].date.split(".")[0], 10);
        hours[i] = parseInt(data[i].date.split(" ")[1], 10);
        minutes[i] = parseInt(data[i].date.split(":")[1], 10);
        seconds[i] = parseInt(data[i].date.split(":")[2], 10);
    }

    var chart = new CanvasJS.Chart("chartContainer",
    {
        title:{
            text: "Turnovers"
        },
        toolTip: {
            contentFormatter: function (e) {
                var content = "";
                for (var i = 0; i < e.entries.length; i++){
                    var i = e.entries.length-1;
                    content = "Date: "+CanvasJS.formatDate(e.entries[i].dataPoint.z, "DD.MM.YYYY <br>'T'i'm'e: HH:mm:ss")+"<br><strong>Balance: "+e.entries[i].dataPoint.y+"</strong>";       
                }       
                return content;
            }
        },  
        axisX:{
            title: "Index",  
            titleFontColor: "#5CA7A7",
        },
        axisZ:{
            title: "Date",
            valueFormatString: "DD.MM.YY",
            titleFontColor: "#5CA7A7",
        },
        axisY: {
            title: "Amount",
            titleFontColor: "#5CA7A7",
        },
        data: [
        {
            type: "line",
            valueFormatString: "",
            dataPoints : dataPoints
        }
        ]
    }); 
    for (i=0; i<allSums.length; i++) {
        dataPoints[i]={
            x: i+1, y : allSums[i], z: new Date(year[i], month[i], day[i], hours[i], minutes[i], seconds[i], 0)
        };
    }
    dataPoints[allSums.length]={
        y : null
    };
    if(allSums.length<4) {
        for( i=4; i>allSums.length; i--) {
            dataPoints[i]={
                x: i+1, y : null
            };
        }
    }
    chart.render();
}

window.onload = function() {
    var chart = new CanvasJS.Chart("chartContainer2", {
        title: {
            text: "Turnovers"
        },
        toolTip: {
            content: "{y}",
        },
        axisX:{
            title: "Index",
            titleFontColor: "#5CA7A7",
        },
        axisY: {
            title: "Amount",
            titleFontColor: "#5CA7A7",
        },
        data: [{
            type: "line",
            dataPoints: [
            {  x: 1, y: 0 },
            {  x: 2, y: null},
            {  x: 3, y: null },
            {  x: 4, y: null }
            ]
        }]
    });
    chart.render();
}