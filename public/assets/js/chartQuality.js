const socket = io()

var current1 = document
    .getElementById("current1")
    .getContext("2d")

var voltage1 = document
    .getElementById("voltage1")
    .getContext("2d")

if(mycurrent1) {
    mycurrent1.destroy();
}
if(myvoltage1) {
    myvoltage1.destroy();
}


var mycurrent1 = new Chart(current1, {
  type: "line",
  data: {
    datasets: [
      {
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
        data: [],
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
        data: [],
      },
      {
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
        data: [],
      },
    ],
  },
  options: {
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
  },
});

var myvoltage1 = new Chart(voltage1, {
  type: "line",
  data: {
    datasets: [
      {
        label: "R-S Phase",
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
        data: [],
      },
      {
        label: "S-T Phase",
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
        data: [],
      },
      {
        label: "T-R Phase",
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
        data: [],
      },
    ],
  },
  options: {
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
  },
});

socket.on("data", (message) => {
  
  const date = new Date().toLocaleTimeString("en-US", {
    hourCycle: "h24",
    });   
  let iaData1 = JSON.parse(localStorage.getItem('ia1')) || [];
  let ibData1 = JSON.parse(localStorage.getItem('ib1')) || [];
  let icData1 = JSON.parse(localStorage.getItem('ic1')) || [];
  let vabData1 = JSON.parse(localStorage.getItem('vab1')) || [];
  let vbcData1 = JSON.parse(localStorage.getItem('vbc1')) || [];
  let vcaData1 = JSON.parse(localStorage.getItem('vca1')) || [];
  let labels1 = JSON.parse(localStorage.getItem('timestamp1')) || [];
  let labels2 = JSON.parse(localStorage.getItem('timestamp2')) || [];

  iaData1.push(message.ia1.toFixed(2));
  ibData1.push(message.ib1.toFixed(2));
  icData1.push(message.ic1.toFixed(2));
  vabData1.push(message.vab1.toFixed(2));
  vbcData1.push(message.vbc1.toFixed(2));
  vcaData1.push(message.vca1.toFixed(2));
  labels1.push(date);
  labels2.push(date);

  if(iaData1.length >= 20) {
		iaData1.shift();
		ibData1.shift();
		icData1.shift();
		labels1.shift();
	}
  if(vabData1.length >= 20) {
		vabData1.shift();
		vbcData1.shift();
		vcaData1.shift();
		labels2.shift();
	}

  localStorage.setItem("ia1", JSON.stringify(iaData1))
  localStorage.setItem("ib1", JSON.stringify(ibData1))
  localStorage.setItem("ic1", JSON.stringify(icData1))
  localStorage.setItem("vab1", JSON.stringify(vabData1))
  localStorage.setItem("vbc1", JSON.stringify(vbcData1))
  localStorage.setItem("vca1", JSON.stringify(vcaData1))
  localStorage.setItem("timestamp1", JSON.stringify(labels1))
  localStorage.setItem("timestamp2", JSON.stringify(labels2))

  mycurrent1.data.datasets[0].data = iaData1;
  mycurrent1.data.datasets[1].data = ibData1;
  mycurrent1.data.datasets[2].data = icData1;
  myvoltage1.data.datasets[0].data = vabData1;
	myvoltage1.data.datasets[1].data = vbcData1;
	myvoltage1.data.datasets[2].data = vcaData1;
  mycurrent1.data.labels = labels1;
	myvoltage1.data.labels = labels2;

	mycurrent1.update()
	myvoltage1.update()

})