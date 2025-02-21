const socketBio = io("ws://172.25.192.50:1881/");

document.getElementById("nextButton").disabled = true;

document.getElementById("prevButton").addEventListener("click", () => {
  window.location.href = "/plant/biogas1";
});

document.getElementById("biogas-page-2-s-tspan16").textContent = "AE-402";

function conditionMotor(motor, trip, id1, id2, id3) {
  if (motor) {
    document.getElementById(id1).setAttribute("fill", "green");
    document.getElementById(id2).setAttribute("fill", "green");
    document.getElementById(id3).setAttribute("fill", "green");
    if (trip) {
      document.getElementById(id1).setAttribute("fill", "orange");
      document.getElementById(id2).setAttribute("fill", "orange");
      document.getElementById(id3).setAttribute("fill", "orange");
    } else {
      document.getElementById(id1).setAttribute("fill", "green");
      document.getElementById(id2).setAttribute("fill", "green");
      document.getElementById(id3).setAttribute("fill", "green");
    }
  } else {
    document.getElementById(id1).setAttribute("fill", "red");
    document.getElementById(id2).setAttribute("fill", "red");
    document.getElementById(id3).setAttribute("fill", "red");
  }
}
function conditionMotorOne(motor, trip, id1) {
  if (motor) {
    document.getElementById(id1).setAttribute("fill", "green");
    if (trip) {
      document.getElementById(id1).setAttribute("fill", "orange");
    } else {
      document.getElementById(id1).setAttribute("fill", "green");
    }
  } else {
    document.getElementById(id1).setAttribute("fill", "red");
  }
}

socketBio.on("dataAI", (data) => {
  document.getElementById("biogas-page-2-s-tspan33").textContent =
    data.FT_401.toFixed(2);
  document.getElementById("biogas-page-2-s-tspan8").textContent =
    data.FT_402.toFixed(2);
  document.getElementById("biogas-page-2-s-tspan12").textContent =
    data.FT_601.toFixed(2);
  document.getElementById("biogas-page-2-s-tspan29").textContent =
    data.AE_401.toFixed(2);
  document.getElementById("biogas-page-2-s-tspan17").textContent =
    data.AE_402.toFixed(2);
  document.getElementById("biogas-page-2-s-tspan25").textContent =
    data.AE_501.toFixed(2);
  document.getElementById("biogas-page-2-s-tspan15").textContent =
    data.AE_601.toFixed(2);
  levelSwitchIntermediate(
    data.LT_301,
    "biogas-page-2-u-biogasmonitoringjadistop2-u-rect65543",
    "biogas-page-2-u-biogasmonitoringjadistop2-u-rect655432",
    "biogas-page-2-u-biogasmonitoringjadistop2-u-rect655433"
  );
});

socketBio.on("dataMotor", (data) => {
  conditionMotor(
    data.tp07a,
    data.TRIPTP07A,
    "biogas-page-2-u-biogasmonitoringjadistop2-u-circle10057-1-1-5-8-2",
    "biogas-page-2-u-biogasmonitoringjadistop2-u-path10040-3-3-8-4-8",
    "biogas-page-2-u-biogasmonitoringjadistop2-u-path10067-9-2-6-1-0"
  );
  conditionMotor(
    data.tp07b,
    data.TRIPTP07B,
    "biogas-page-2-u-biogasmonitoringjadistop2-u-circle10057-1-1-5-8",
    "biogas-page-2-u-biogasmonitoringjadistop2-u-path10040-3-3-8-4",
    "biogas-page-2-u-biogasmonitoringjadistop2-u-path10067-9-2-6-1"
  );
  conditionMotor(
    data.tp08a,
    data.TRIPTP08A,
    "biogas-page-2-u-biogasmonitoringjadistop2-u-circle10057-1-1-5",
    "biogas-page-2-u-biogasmonitoringjadistop2-u-path10067-9-2-6",
    "biogas-page-2-u-biogasmonitoringjadistop2-u-path10040-3-3-8"
  );
  conditionMotor(
    data.tp08b,
    data.TRIPTP08B,
    "biogas-page-2-u-biogasmonitoringjadistop2-u-circle10057-1-1",
    "biogas-page-2-u-biogasmonitoringjadistop2-u-path10040-3-3",
    "biogas-page-2-u-biogasmonitoringjadistop2-u-path10067-9-2"
  );
  conditionMotor(
    data.dp04,
    data.TRIPTP07A,
    "biogas-page-2-u-biogasmonitoringjadistop2-u-circle10057-1-1-5-8-2-9",
    "biogas-page-2-u-biogasmonitoringjadistop2-u-path10067-9-2-6-1-0-2",
    "biogas-page-2-u-biogasmonitoringjadistop2-u-path10040-3-3-8-4-8-1"
  );
  conditionMotorOne(
    data.sm04,
    data.TRIPSM04,
    "biogas-page-2-u-biogasmonitoringjadistop2-u-rect69554"
  );
  conditionMotorOne(data.scr01, data.TRIPSCR, "biogas-page-2-s-path1");
  conditionMotorOne(data.blowa, data.TRIPBLOWA, "biogas-page-2-s-path27");
  conditionMotorOne(data.blowb, data.TRIPBLOWB, "biogas-page-2-s-path90");
});

socketBio.on("dataStatus", (data) => {
  levelSwitch(
    data.HHAERASI,
    "biogas-page-2-u-biogasmonitoringjadistop2-u-rect655435"
  );
  levelSwitch(
    data.HAERASI,
    "biogas-page-2-u-biogasmonitoringjadistop2-u-rect655436"
  );
});

function levelSwitch(data, idElement) {
  if (data) {
    document.getElementById(idElement).setAttribute("fill", "red");
  } else {
    document.getElementById(idElement).setAttribute("fill", "#d3d2d3");
  }
}

function levelSwitchIntermediate(data, idHH, idH, idL) {
  if (data.toFixed(2) >= 0 && data.toFixed(2) < 2) {
    document.getElementById(idL).setAttribute("fill", "red");
    document.getElementById(idH).setAttribute("fill", "#d3d2d3");
    document.getElementById(idHH).setAttribute("fill", "#d3d2d3");
  } else if (data.toFixed(2) >= 2 && data.toFixed(2) < 2.4) {
    document.getElementById(idL).setAttribute("fill", "#d3d2d3");
    document.getElementById(idH).setAttribute("fill", "red");
    document.getElementById(idHH).setAttribute("fill", "#d3d2d3");
  } else if (data.toFixed(2) >= 2.4) {
    document.getElementById(idL).setAttribute("fill", "#d3d2d3");
    document.getElementById(idH).setAttribute("fill", "#d3d2d3");
    document.getElementById(idHH).setAttribute("fill", "red");
  } else {
    document.getElementById(idL).setAttribute("fill", "#d3d2d3");
    document.getElementById(idH).setAttribute("fill", "#d3d2d3");
    document.getElementById(idHH).setAttribute("fill", "#d3d2d3");
  }
}
