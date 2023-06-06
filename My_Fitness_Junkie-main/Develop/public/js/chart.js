////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

// Variable declarations //
// x axis is a weekly prerecorded set of data//
const xValues = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
// y axis is a heart rate data set in beats per minute //
const yValues = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200];

// week heart rate // 
window.onload = function populateHeartChart() {

  var dataPoints = [];
  
  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Weekly Heart Rate per Exercise"
    },
    axisY: {
      title: "Beats per Minute",
      titleFontSize: 24,
      includeZero: true
    },
      axisX: {
      title: "Weekdays",
      titleFontSize: 24,
      includeZero: true
    },
    data: [{
      type: "column",
      yValueFormatString: "#,### Units",
      dataPoints: dataPoints
    }]
  });



  // adds the data to the chart from JSON //
  function addData(data) {
    for (var i = 0; i < data.length; i++) {
      dataPoints.push({
        x: new Date(data[i].date),
        y: data[i].units
      });
    }
    chart.render();
  }


fetch("/api/users/heartbeatData")
  .then(response => response.json())
  .then(data => {
    // Call the addData function with the parsed data
    console.log(data);
    addData(data);
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });
}

// // Heart Rate Chart Functionality //
// new Chart("myChart", {
//   type: "line",
//   data: {
//     // Labels for X & Y Axes //
//     labels: xValues, yValues,
//     datasets: [
//       // Each exercise is a different colored line //
//       // Strength //
//     {
//       data: [],
//       borderColor: "red",
//       fill: false
//     },
//     // Cardio //
//     {
//       data: [],
//       borderColor: "green",
//       fill: false
//     },
//     // Endurance //
//     {
//       data: [],
//       borderColor: "blue",
//       fill: false
//     },
//   ]
//   },
//   options: {
//     legend: {display: false}
//   }
// });
// */

// // My_Fitness_Junkie-main\Develop\seeds\heartRate.json