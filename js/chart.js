var dataPoints = [];
var allSums = [];
var dispChart = 0;

function initChart(data, dataIndex, deletedAmount) {
      var sum=0;
      if (data.length == 0)
        dispChart=0;
      else
        dispChart=1;
      
      for (i=0; i<data.length; i++) {
        sum += data[i].amount;
      }
      if (deletedAmount != 0) {
        for (i=dataIndex; i<data.length; i++) {
          allSums[i]=allSums[i+1]-deletedAmount;
        }
      }
      if (deletedAmount != 0) {
        allSums.splice( data.length, 1);
      }
      allSums[data.length-1]=sum;

      if (data.length == 0){
        allSums[0]=0;
        allSums[0]=sum;
      }

      /*var lengthData = data.length-1;
      var year = parseInt(data[lengthData].date.split(".")[2], 10);
      var month = parseInt(data[lengthData].date.split(".")[1], 10);
      month-=1;
      var day = parseInt(data[lengthData].date.split(".")[0], 10);
      var minuten = parseInt(data[lengthData].date.split(" ")[3], 10);*/
      
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
   //   console.log(dataPoints);
        console.log(dataPoints);
        if (dispChart != 0) {
          
          $("#chartContainer2").css("display", "none");
        }
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