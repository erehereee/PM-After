const socketBio = io("ws://172.25.192.50:1881/");

document.getElementById("prevButton").disabled = true;

document.getElementById("nextButton").addEventListener("click", () => {
  window.location.href = "/plant/biogas2";
});

function conditionMotorValue(motor, id1, id2, id3) {
  if (motor) {
    document.getElementById(id1).setAttribute("fill", "green");
    document.getElementById(id2).setAttribute("fill", "green");
    document.getElementById(id3).setAttribute("fill", "green");
  } else {
    document.getElementById(id1).setAttribute("fill", "red");
    document.getElementById(id2).setAttribute("fill", "red");
    document.getElementById(id3).setAttribute("fill", "red");
  }
}

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
  conditionMotorValue(
    data.FT_101.toFixed(2) > 1,
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-circle10057",
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-path10067",
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-path10040"
  );

  document.getElementById("biogas-page-1-s-tspan13").textContent =
    data.LG_01.toFixed(1);
  document.getElementById("biogas-page-1-s-tspan15").textContent =
    data.LG_02.toFixed(1);
  document.getElementById("biogas-page-1-s-tspan17").textContent =
    data.LG_03.toFixed(1);
  document.getElementById("biogas-page-1-s-tspan2").textContent =
    data.FT_101.toFixed(2);
  document.getElementById("biogas-page-1-s-tspan40").textContent =
    data.FT_102.toFixed(2);
  document.getElementById("biogas-page-1-s-tspan20").textContent =
    data.FT_201.toFixed(2);
  document.getElementById("biogas-page-1-s-tspan36").textContent =
    data.FT_301.toFixed(2);
  document.getElementById("biogas-page-1-s-tspan22").textContent =
    data.AE_201.toFixed(2);
  document.getElementById("biogas-page-1-s-tspan32").textContent =
    data.AE_202.toFixed(2);
  document.getElementById("biogas-page-1-s-tspan29").textContent =
    data.AE_301.toFixed(2);
  document.getElementById("biogas-page-1-s-tspan6").textContent =
    data.PT_201.toFixed(2);
  document.getElementById("biogas-page-1-s-tspan9").textContent =
    data.LE_201.toFixed(2);
});
socketBio.on("dataMotor", (data) => {
  conditionMotor(
    data.tp02a,
    data.TRIPTP02A,
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-circle10057-1-5-6-69_",
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-path10067-9-6-4-2",
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-path10040-3-78-0-47_"
  );

  conditionMotor(
    data.tp02b,
    data.TRIPTP02B,
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-circle10057-1-7-0-9-4",
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-path10067-9-3-2-4-2",
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-path10040-3-7-3-7-3"
  );

  conditionMotor(
    data.tp03a,
    data.TRIPTP03A,
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-circle10057-1-1",
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-path10040-3-3",
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-path10067-9-2"
  );

  conditionMotor(
    data.tp03b,
    data.TRIPTP03B,
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-path10040-3-3-4",
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-path10067-9-2-6",
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-circle10057-1-1-7"
  );
  conditionMotor(
    data.tp04a,
    data.TRIPTP04A,
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-circle10057-1-5-6-6",
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-path10040-3-78-0-4",
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-path10067-9-6-4-9"
  );

  conditionMotor(
    data.tp04b,
    data.TRIPTP04B,
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-circle10057-1-7-0-9-5",
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-path10040-3-7-3-7-0",
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-path10067-9-3-2-4-50"
  );
  conditionMotor(
    data.tp05a,
    data.TRIPTP05A,
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-path10040-3-78-0",
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-circle10057-1-5-6",
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-path10067-9-6-4"
  );

  conditionMotor(
    data.tp05b,
    data.TRIPTP05B,
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-circle10057-1-7-0-9",
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-path10067-9-3-2-4",
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-path10040-3-7-3-7"
  );
  conditionMotor(
    data.tp06a,
    data.TRIPTP06A,
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-circle10057-1-5-6-9",
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-path10067-9-6-4-6",
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-path10040-3-78-0-1"
  );
  conditionMotor(
    data.tp06b,
    data.TRIPTP06B,
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-circle10057-1-7-0-9-0",
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-path10067-9-3-2-4-5",
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-path10040-3-7-3-7-7"
  );
  conditionMotor(
    data.dp01,
    data.TRIPDP01,
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-circle10057-1-0",
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-path10040-3-5",
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-path10067-9-9"
  );
  conditionMotor(
    data.dp02,
    data.TRIPDP02,
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-circle10057-1-0-6",
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-path10067-9-9-0",
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-path10040-3-5-4"
  );
  conditionMotor(
    data.dp03,
    data.TRIPDP03,
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-circle10057-1-0-1",
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-path10040-3-5-7",
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-path10067-9-9-6"
  );
  conditionMotorOne(
    data.sem01,
    data.TRIPSEM01,
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-path42159"
  );
  conditionMotorOne(
    data.sem02,
    data.TRIPSEM02,
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-path42159-5"
  );
  conditionMotorOne(
    data.sem03,
    data.TRIPSEM03,
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-path42159-5-0"
  );
  conditionMotorOne(
    data.sem04,
    data.TRIPSEM04,
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-path42159-5-0-9"
  );
  conditionMotorOne(
    data.rds01,
    data.TRIPRDS,
    "biogas-page-1-u-biogasmonitoringjadistoadsdasdasd-u-path20400"
  );
  conditionMotorOne(data.sm01, data.TRIPSM01, "biogas-page-1-s-rect1");
  conditionMotorOne(data.sm02, data.TRIPSM02, "biogas-page-1-s-rect5");
  conditionMotorOne(data.sm03, data.TRIPSM03, "biogas-page-1-s-rect9");
});

socketBio.on("dataStatus", (data) => {
  levelSwitch2(data.LS2, "biogas-page-1-s-rect13", "biogas-page-1-s-rect15");
  levelSwitch1(data.LS1, "biogas-page-1-s-rect14");
});

function levelSwitch1(data, idElement) {
  if (data) {
    document.getElementById(idElement).setAttribute("fill", "red");
  } else {
    document.getElementById(idElement).setAttribute("fill", "#d3d2d3");
  }
}

function levelSwitch2(data, id1H, id2L) {
  if (data) {
    document.getElementById(id1H).setAttribute("fill", "red");
    document.getElementById(id2L).setAttribute("fill", "#d3d2d3");
  } else {
    document.getElementById(id1H).setAttribute("fill", "#d3d2d3");
    document.getElementById(id2L).setAttribute("fill", "green");
  }
}
