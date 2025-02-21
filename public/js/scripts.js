/*!
 * Start Bootstrap - SB Admin v7.0.7 (https://startbootstrap.com/template/sb-admin)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
 */
//
// Scripts
//
// }

const socket = io();

window.addEventListener("DOMContentLoaded", (event) => {
  socket.on("dateTime", (message) => {
    const date = message.split(",")[0];
    const time = message.split(",")[1];
    document.getElementById("date").textContent = date;
    document.getElementById("time").textContent = time;
  });
  // Toggle the side navigation
  const sidebarToggle = document.body.querySelector("#sidebarToggle");
  if (sidebarToggle) {
    // Uncomment Below to persist sidebar toggle between refreshes
    // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
    //     document.body.classList.toggle('sb-sidenav-toggled');
    // }
    sidebarToggle.addEventListener("click", (event) => {
      event.preventDefault();
      document.body.classList.toggle("sb-sidenav-toggled");
      localStorage.setItem(
        "sb|sidebar-toggle",
        document.body.classList.contains("sb-sidenav-toggled")
      );
    });
  }
});

document.getElementById("tabelAlarm").addEventListener("click", () => {
  modalAlarm.show();
});

document.getElementById("logout").addEventListener("click", async () => {
  try {
    const response = await fetch("/api/auth/logout");
    if (response.ok) {
      window.location.href = "/login";
    } else {
      console.log("Error");
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
});
