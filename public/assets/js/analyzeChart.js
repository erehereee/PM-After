var ctx = document.getElementById('analyzeChart').getContext('2d');

var statisticsChart = new Chart(ctx, {
	type: 'line',
	data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		datasets: [ {
			label: "R Phase",
            borderColor: "#ff0000 ",
            pointBorderColor: "#FFF",
            pointBackgroundColor: "#ff0000 ",
            pointBorderWidth: 2,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 1,
            pointRadius: 4,
            backgroundColor: "transparent",
            fill: true,
            borderWidth: 2,
			data: [1, 1, 1, 203, 210, 231, 240, 278, 252, 312, 320, 374]
		}, 
		{
			label: "S Phase",
            borderColor: "#ffb900",
            pointBorderColor: "#FFF",
            pointBackgroundColor: "#ffb900",
            pointBorderWidth: 2,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 1,
            pointRadius: 4,
            backgroundColor: "transparent",
            fill: true,
            borderWidth: 2,
			data: [256, 230, 245, 287, 240, 250, 230, 295, 331, 431, 456, 521]
		}, {
			label: "T Phase",
            borderColor: "#1bff00",
            pointBorderColor: "#FFF",
            pointBackgroundColor: "#1bff00",
            pointBorderWidth: 2,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 1,
            pointRadius: 4,
            backgroundColor: "transparent",
            fill: true,
            borderWidth: 2,
			data: [542, 480, 430, 550, 530, 453, 380, 434, 568, 610, 700, 900]
		},
		]
	},
	options : {
		responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: "top",
    },
    tooltips: {
      bodySpacing: 4,
      mode: "nearest",
      intersect: 0,
      position: "nearest",
      xPadding: 10,
      yPadding: 10,
      caretPadding: 10,
    },
    layout: {
      padding: { left: 15, right: 15, top: 15, bottom: 15 },
    },
	}
});

