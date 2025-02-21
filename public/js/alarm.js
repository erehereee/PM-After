const alarmSocket = io("ws://172.25.192.50:1881/");

const tabelAlarm = document.getElementById("alarmBody");
const alarmList = document.querySelectorAll("#alarmList > tbody > tr");
const modalAlarm = new bootstrap.Modal(document.getElementById("alarmModal"));
const dotNotif = document.getElementById("dot-notif");
const alarmToggle = document.getElementById("alarmToggle");

let alarmStorage = JSON.parse(localStorage.getItem("data")) || [];
let intervalId;

const alarmData = [
  {
    id: "tp01a",
    detail: "TRIP TP-01A",
    statusAlarm: "Error",
    description: `TRIP TP-01A inspect the pump in the inlet tank, Then riset the thermal
    overload relay`,
    create_at: new Date().toLocaleString(["en-GB"], {
      timeZone: "Asia/Makassar",
      hour12: false,
    }),
  },
  {
    id: "tp01b",
    detail: "TRIP TP-01B",
    statusAlarm: "Error",
    description: `TRIP TP-01B inspect the pump in the inlet tank, Then riset the thermal
overload relay`,
    create_at: new Date().toLocaleString(["en-GB"], {
      timeZone: "Asia/Makassar",
      hour12: false,
    }),
  },
  {
    id: "tp02a",
    detail: "TRIP VFD TP-02A",
    statusAlarm: "Error",
    description: `Trip VFD TP-02A Verify the transfer pump VFD, look up the eror code in
the instruction manual.`,
    create_at: new Date().toLocaleString(["en-GB"], {
      timeZone: "Asia/Makassar",
      hour12: false,
    }),
  },
  {
    id: "tp02b",
    detail: "TRIP VFD TP-02B",
    statusAlarm: "Error",
    description: `Trip VFD TP-02B Verify the transfer pump VFD, look up the eror code in
the instruction manual.`,
    create_at: new Date().toLocaleString(["en-GB"], {
      timeZone: "Asia/Makassar",
      hour12: false,
    }),
  },
  {
    id: "tp03a",
    detail: "TRIP VFD TP-03A",
    statusAlarm: "Error",
    description: `TRIP VFD TP-03A Verify the transfer pump VFD, TRIP VFD TP-03A look up
the eror code in the instruction manual.`,
    create_at: new Date().toLocaleString(["en-GB"], {
      timeZone: "Asia/Makassar",
      hour12: false,
    }),
  },
  {
    id: "tp03b",
    detail: "TRIP VFD TP-03B",
    statusAlarm: "Error",
    description: `TRIP VFD TP-03B Verify the transfer pump VFD, TRIP VFD TP-03A look up
the eror code in the instruction manual.`,
    create_at: new Date().toLocaleString(["en-GB"], {
      timeZone: "Asia/Makassar",
      hour12: false,
    }),
  },
  {
    id: "tp04a",
    detail: "TRIP TP-04A",
    statusAlarm: "Error",
    description: `TRIP TP-04A Verify the transfer pump, Then riset the thermal overload
relay`,
    create_at: new Date().toLocaleString(["en-GB"], {
      timeZone: "Asia/Makassar",
      hour12: false,
    }),
  },
  {
    id: "tp04b",
    detail: "TRIP TP-04B",
    statusAlarm: "Error",
    description: `TRIP TP-04A Verify the transfer pump, Then riset the thermal overload
relay`,
    create_at: new Date().toLocaleString(["en-GB"], {
      timeZone: "Asia/Makassar",
      hour12: false,
    }),
  },
  {
    id: "tp05a",
    detail: "TRIP VFD TP-05A",
    statusAlarm: "Error",
    description: `TRIP VFD TP-05A Verify the transfer pump VFD, look up the eror code in
the instruction manual.
`,
    create_at: new Date().toLocaleString(["en-GB"], {
      timeZone: "Asia/Makassar",
      hour12: false,
    }),
  },
  {
    id: "tp05b",
    detail: "TRIP VFD TP-05B",
    statusAlarm: "Error",
    description: `TRIP VFD TP-05B Verify the transfer pump VFD, look up the eror code in
the instruction manual.`,
    create_at: new Date().toLocaleString(["en-GB"], {
      timeZone: "Asia/Makassar",
      hour12: false,
    }),
  },
  {
    id: "tp06a",
    detail: "TRIP TP-06A OVER LOAD",
    statusAlarm: "Error",
    description: `TRIP TP-06A Verify the transfer pump, Then riset the thermal overload
relay`,
    create_at: new Date().toLocaleString(["en-GB"], {
      timeZone: "Asia/Makassar",
      hour12: false,
    }),
  },
  {
    id: "tp06b",
    detail: "TRIP TP-06B OVER LOAD",
    statusAlarm: "Error",
    description: `TRIP TP-06B Verify the transfer pump, Then riset the thermal overload
relay`,
    create_at: new Date().toLocaleString(["en-GB"], {
      timeZone: "Asia/Makassar",
      hour12: false,
    }),
  },
  {
    id: "tp07a",
    detail: "TRIP VFD TP-07A",
    statusAlarm: "Error",
    description: `TRIP VFD TP-07A Verify the transfer pump VFD, look up the eror code in
the instruction manual.`,
    create_at: new Date().toLocaleString(["en-GB"], {
      timeZone: "Asia/Makassar",
      hour12: false,
    }),
  },
  {
    id: "tp07b",
    detail: "TRIP VFD TP-07B",
    statusAlarm: "Error",
    description: `TRIP VFD TP-07B Verify the transfer pump VFD, look up the eror code in
the instruction manual.`,
    create_at: new Date().toLocaleString(["en-GB"], {
      timeZone: "Asia/Makassar",
      hour12: false,
    }),
  },
  {
    id: "tp08a",
    detail: "TRIP TP-08A OVER LOAD",
    statusAlarm: "Error",
    description: `TRIP TP-08A Verify the transfer pump, Then riset the thermal overload
relay`,
    create_at: new Date().toLocaleString(["en-GB"], {
      timeZone: "Asia/Makassar",
      hour12: false,
    }),
  },
  {
    id: "tp08b",
    detail: "TRIP TP-08B OVER LOAD",
    statusAlarm: "Error",
    description: `TRIP TP-08B Verify the transfer pump, Then riset the thermal overload
relay`,
    create_at: new Date().toLocaleString(["en-GB"], {
      timeZone: "Asia/Makassar",
      hour12: false,
    }),
  },
  {
    id: "tp10a",
    detail: "TRIP TP-10A OVER LOAD",
    statusAlarm: "Error",
    description: `TRIP TP-10A Verify the transfer pump, Then riset the thermal overload
relay`,
    create_at: new Date().toLocaleString(["en-GB"], {
      timeZone: "Asia/Makassar",
      hour12: false,
    }),
  },
  {
    id: "tp10b",
    detail: "TRIP TP-10B OVER LOAD",
    statusAlarm: "Error",
    description: `TRIP TP-10B Verify the transfer pump, Then riset the thermal overload
relay`,
    create_at: new Date().toLocaleString(["en-GB"], {
      timeZone: "Asia/Makassar",
      hour12: false,
    }),
  },
  {
    id: "sm01",
    detail: "TRIP SM-01 OVER LOAD",
    statusAlarm: "Error",
    description: `TRIP SM-01 Verify the submersible mixer, Then riset the thermal overload
relay`,
    create_at: new Date().toLocaleString(["en-GB"], {
      timeZone: "Asia/Makassar",
      hour12: false,
    }),
  },
  {
    id: "sm02",
    detail: "TRIP SM-02 OVER LOAD",
    statusAlarm: "Error",
    description: `TRIP SM-02 Verify the submersible mixer, Then riset the thermal overload
relay`,
    create_at: new Date().toLocaleString(["en-GB"], {
      timeZone: "Asia/Makassar",
      hour12: false,
    }),
  },
  {
    id: "sm03",
    detail: "TRIP SM-03 OVER LOAD",
    statusAlarm: "Error",
    description: `TRIP SM-03 Verify the submersible mixer, Then riset the thermal overload
relay`,
    create_at: new Date().toLocaleString(["en-GB"], {
      timeZone: "Asia/Makassar",
      hour12: false,
    }),
  },
  {
    id: "sem01",
    detail: "TRIP SEM-01 OVER LOAD",
    statusAlarm: "Error",
    description: `TRIP SEM-01 Verify the submersible mixer, Then riset the thermal
overload relay`,
    create_at: new Date().toLocaleString(["en-GB"], {
      timeZone: "Asia/Makassar",
      hour12: false,
    }),
  },
  {
    id: "sem02",
    detail: "TRIP SEM-02 OVER LOAD",
    statusAlarm: "Error",
    description: `TRIP SEM-02 Verify the submersible mixer, Then riset the thermal
overload relay`,
    create_at: new Date().toLocaleString(["en-GB"], {
      timeZone: "Asia/Makassar",
      hour12: false,
    }),
  },
  {
    id: "sem03",
    detail: "TRIP SEM-03 OVER LOAD",
    statusAlarm: "Error",
    description: `TRIP SEM-03 Verify the submersible mixer, Then riset the thermal
overload relay`,
    create_at: new Date().toLocaleString(["en-GB"], {
      timeZone: "Asia/Makassar",
      hour12: false,
    }),
  },
  {
    id: "sem04",
    detail: "TRIP SEM-04 OVER LOAD",
    statusAlarm: "Error",
    description: `TRIP SEM-04 Verify the submersible mixer, Then riset the thermal
overload relay`,
    create_at: new Date().toLocaleString(["en-GB"], {
      timeZone: "Asia/Makassar",
      hour12: false,
    }),
  },
  {
    id: "blowa",
    detail: "TRIP VFD BL-A",
    statusAlarm: "Error",
    description: `TRIP VFD BL-A Verify the Blower A VFD, look up the eror code in the
instruction manual.`,
    create_at: new Date().toLocaleString(["en-GB"], {
      timeZone: "Asia/Makassar",
      hour12: false,
    }),
  },
  {
    id: "blowb",
    detail: "TRIP VFD BL-B",
    statusAlarm: "Error",
    description: `TRIP VFD BL-B Verify the Blower B VFD, look up the eror code in the
instruction manual.`,
    create_at: new Date().toLocaleString(["en-GB"], {
      timeZone: "Asia/Makassar",
      hour12: false,
    }),
  },
  {
    id: "rds01",
    detail: "TRIP VFD BL-B",
    statusAlarm: "Error",
    description: `TRIP RDS-01 Verify the submersible mixer, Then riset the thermal
overload relay`,
    create_at: new Date().toLocaleString(["en-GB"], {
      timeZone: "Asia/Makassar",
      hour12: false,
    }),
  },
  {
    id: "scr01",
    detail: "TRIP VFD BL-B",
    statusAlarm: "Error",
    description: `TRIP SCR-01 PLEASE CICULATION ALL SYSTEM, Then riset the thermal
overload relay`,
    create_at: new Date().toLocaleString(["en-GB"], {
      timeZone: "Asia/Makassar",
      hour12: false,
    }),
  },
  {
    id: "dp01",
    detail: "TRIP DP-01",
    statusAlarm: "Error",
    description: `TRIP DP-02 Verify the dsoing pump, Then riset the thermal overload relay`,
    create_at: new Date().toLocaleString(["en-GB"], {
      timeZone: "Asia/Makassar",
      hour12: false,
    }),
  },
  {
    id: "dp02",
    detail: "TRIP DP-02",
    statusAlarm: "Error",
    description: `TRIP DP-02 Verify the dsoing pump, Then riset the thermal overload relay`,
    create_at: new Date().toLocaleString(["en-GB"], {
      timeZone: "Asia/Makassar",
      hour12: false,
    }),
  },
  {
    id: "dp03",
    detail: "TRIP VFD DP-03",
    statusAlarm: "Error",
    description: `TRIP VFD DP-03 Verify the dosing pump 03 VFD, look up the eror code in
the instruction manual.`,
    create_at: new Date().toLocaleString(["en-GB"], {
      timeZone: "Asia/Makassar",
      hour12: false,
    }),
  },
  {
    id: "dp04",
    detail: "TRIP VFP DP-04",
    statusAlarm: "Error",
    description: `TRIP VFD DP-04 Verify the dosing pump 04 VFD, look up the eror code in
the instruction manual.`,
    create_at: new Date().toLocaleString(["en-GB"], {
      timeZone: "Asia/Makassar",
      hour12: false,
    }),
  },
  {
    id: "agt01",
    detail: "TRIP AGT-01",
    statusAlarm: "Error",
    description: `TRIP AGT-01 Verify the Agitator mixer chemical tank, Then riset the
thermal overload relay`,
    create_at: new Date().toLocaleString(["en-GB"], {
      timeZone: "Asia/Makassar",
      hour12: false,
    }),
  },
  {
    id: "agt02",
    detail: "TRIP AGT-02",
    statusAlarm: "Error",
    description: `TRIP AGT-02 Verify the Agitator mixer chemical tank, Then riset the
thermal overload relay`,
    create_at: new Date().toLocaleString(["en-GB"], {
      timeZone: "Asia/Makassar",
      hour12: false,
    }),
  },
  {
    id: "agt03",
    detail: "TRIP AGT-03",
    statusAlarm: "Error",
    description: `TRIP AGT-03 Verify the Agitator mixer chemical tank, Then riset the
thermal overload relay`,
    create_at: new Date().toLocaleString(["en-GB"], {
      timeZone: "Asia/Makassar",
      hour12: false,
    }),
  },
  {
    id: "lt301",
    detail: "HH_ALARMS LT-301",
    statusAlarm: "Error",
    description: `Please Check intermediate
tank`,
    create_at: new Date().toLocaleString(["en-GB"], {
      timeZone: "Asia/Makassar",
      hour12: false,
    }),
  },
];

function renderAlarmTable() {
  $(tabelAlarm).empty();
  alarmStorage.forEach((e) => {
    const alarmRow = `
      <tr>
        <td>${e.create_at}</td>
        <td>${e.detail}</td>
        <td>${e.statusAlarm}</td>
        <td>${e.description}</td>
      </tr>`;
    $(tabelAlarm).append(alarmRow);
  });
}

function alarmIndicator() {
  if (alarmStorage.length > 0) {
    dotNotif?.classList.remove("d-none");
    if (!intervalId) {
      intervalId = setInterval(() => {
        alarmToggle?.classList.toggle("text-danger");
        alarmToggle?.classList.add("text-warning");
      }, 1000);
    }
  } else {
    dotNotif?.classList.add("d-none");
    alarmToggle?.classList.remove("text-danger", "text-warning");
    clearInterval(intervalId);
    intervalId = null;
  }
}

function printAlarmHeader() {
  const lastRow = document.querySelector("#alarmBody tr:last-child");
  if (lastRow) {
    $(document.querySelector("#tabelAlarm tbody")).empty();
    document
      .querySelector("#tabelAlarm tbody")
      .appendChild(lastRow.cloneNode(true));
  }
}

function checkAlarm(id) {
  return alarmStorage.some(
    (e) => e.id === id && e.statusAlarm === e.statusAlarm
  );
}

function addOrUpdateAlarm(id, detail, statusAlarm, description, create_at) {
  const alarmExists = checkAlarm(id);
  if (!alarmExists) {
    alarmStorage.push({ id, detail, statusAlarm, description, create_at });
  } else {
    alarmStorage = alarmStorage.map((e) =>
      e.id === id ? { ...e, statusAlarm } : e
    );
  }
  localStorage.setItem("data", JSON.stringify(alarmStorage));
  renderAlarmTable();
}

function handleAlarmValue(data, id, threshold) {
  const alarmCondition = data >= threshold;
  const alarm = alarmData.find((e) => e.id === id);
  const currentAlarm = alarmStorage.find((e) => e.id === id);

  if (alarmCondition) {
    const status = currentAlarm ? "Error" : alarm.statusAlarm;
    addOrUpdateAlarm(
      alarm.id,
      alarm.detail,
      status,
      alarm.description,
      alarm.create_at
    );
  } else {
    if (!currentAlarm) {
      return;
    }
    addOrUpdateAlarm(
      currentAlarm.id,
      currentAlarm.detail,
      "Complete",
      currentAlarm.description,
      currentAlarm.create_at
    );
  }

  // modalAlarm.show();
  printAlarmHeader();
}

function handleAlarmTrip(data, id) {
  const alarm = alarmData.find((e) => e.id === id);
  const currentAlarm = alarmStorage.find((e) => e.id === id);

  if (data) {
    const status = currentAlarm ? "Error" : alarm.statusAlarm;
    addOrUpdateAlarm(
      alarm.id,
      alarm.detail,
      status,
      alarm.description,
      alarm.create_at
    );
  } else {
    if (!currentAlarm) {
      return;
    }
    addOrUpdateAlarm(
      currentAlarm.id,
      currentAlarm.detail,
      "Complete",
      currentAlarm.description,
      currentAlarm.create_at
    );
  }

  // modalAlarm.show();
  printAlarmHeader();
}

alarmSocket.on("dataMotor", (data) => {
  handleAlarmTrip(data.TRIPTP02A, "tp02a");
  handleAlarmTrip(data.TRIPTP02B, "tp02b");
  handleAlarmTrip(data.TRIPTP03A, "tp03a");
  handleAlarmTrip(data.TRIPTP03B, "tp03b");
  handleAlarmTrip(data.TRIPTP04A, "tp04a");
  handleAlarmTrip(data.TRIPTP04B, "tp04b");
  handleAlarmTrip(data.TRIPTP05A, "tp05a");
  handleAlarmTrip(data.TRIPTP05B, "tp05b");
  handleAlarmTrip(data.TRIPTP06B, "tp06a");
  handleAlarmTrip(data.TRIPTP06B, "tp06b");
  handleAlarmTrip(data.TRIPTP07B, "tp07a");
  handleAlarmTrip(data.TRIPTP07B, "tp07b");
  handleAlarmTrip(data.TRIPTP08B, "tp08a");
  handleAlarmTrip(data.TRIPTP08B, "tp08b");
  handleAlarmTrip(data.TRIPSM01, "sm01");
  handleAlarmTrip(data.TRIPSM02, "sm02");
  handleAlarmTrip(data.TRIPSM03, "sm03");
  handleAlarmTrip(data.TRIPSEM01, "sem01");
  handleAlarmTrip(data.TRIPSEM02, "sem02");
  handleAlarmTrip(data.TRIPSEM03, "sem03");
  handleAlarmTrip(data.TRIPDP01, "dp01");
  handleAlarmTrip(data.TRIPDP02, "dp02");
  handleAlarmTrip(data.TRIPDP03, "dp03");
  handleAlarmTrip(data.TRIPDP04, "dp04");
  handleAlarmTrip(data.TRIPBLOWA, "blowa");
  handleAlarmTrip(data.TRIPBLOWB, "blowb");
  handleAlarmTrip(data.TRIPRDS, "rds01");
  handleAlarmTrip(data.TRIPSCR, "scr01");
  alarmIndicator();
});

alarmSocket.on("dataAI", (data) => {
  handleAlarmValue(data.LT_301, "lt301", 2.4);
  alarmIndicator();
});

document.getElementById("clearAlarm").addEventListener("click", () => {
  alarmStorage = alarmStorage.filter((e) => e.statusAlarm !== "Complete");
  localStorage.setItem("data", JSON.stringify(alarmStorage));
  $(document.querySelector("#tabelAlarm tbody")).empty();
  renderAlarmTable();
  printAlarmHeader();
  alarmIndicator();
});

renderAlarmTable();
alarmIndicator();
printAlarmHeader();
