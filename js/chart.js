/**
 * @author Rastislav Ruščák
 * @description function for filling chart with data
 */
var dataPoints = [];
var allSums = [];
var dispChart = 0;

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
      var chart = new CanvasJS.Chart("chartContainer",
      {
        title:{
        text: "Turnovers"
        },
        
         data: [
        {
          type: "line",
            dataPoints : dataPoints
        }
        ]
      }); 
      if(allSums.length < 4){
        for (i=4; i>allSums.length; i--){
          dataPoints[i]={
            y : null
          };
        }
      }
      for (i=0; i<allSums.length; i++) {
        dataPoints[allSums.length]=
        {
          y : null
        };
        dataPoints[i]={
          y : allSums[i]
        };
      }
      chart.render();
}

window.onload = function() {
    var chart = new CanvasJS.Chart("chartContainer2", {
      title: {
        text: "Turnovers"
      },
      data: [{
        type: "line",
        dataPoints: [
        {  y: 0 },
        {  y: null},
        {  y: null },
        {  y: null }
        ]
      }]
    });
    chart.render();
}