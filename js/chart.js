var dataPoints = [];
var allSums = [];

function initChart(data, dataIndex, deletedAmount) {
      var sum=0;
      
      for (i=0; i<data.length; i++) {
        sum += data[i].amount;
      }
      if (dataIndex != 0) {
        for (i=dataIndex; i<data.length; i++) {
          allSums[i]=allSums[i+1]-deletedAmount;
        }
      }
      if (dataIndex != 0) {
        allSums.splice( data.length, 1);
      }
      allSums[data.length-1]=sum;

      var lengthData = data.length-1;
      var year = parseInt(data[lengthData].date.split(".")[2], 10);
      var month = parseInt(data[lengthData].date.split(".")[1], 10);
      month-=1;
      var day = parseInt(data[lengthData].date.split(".")[0], 10);
      var minuten = parseInt(data[lengthData].date.split(" ")[3], 10);
      
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
      chart.render();
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
   //   console.log(dataPoints);
}

$(document).ready(function () {
  $(".balance-click").on("click", function () {
     if (dataPoints.length != 0){
      $("#chartWindow").css("display", "block");
     }
  });
  $(".closeChart").on("click", function () {
    $("#chartWindow").css("display", "none");
  });
  $("#chartWindow").click(function (event) {
    $("#chartWindow").css("display", "none");
  });
});