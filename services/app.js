const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const { isAuthenToken } = require("../controller/controller");
const router = require("../router/router");
const { socketServices } = require("./websocket");
// require("../controller/opc");

app.set("view engine", "ejs");
app.set("layout extractScripts", true);

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(router);
app.use(expressLayouts);

// const socket = new socketServices(server);

// setInterval(() => {
//   const date = new Date().toLocaleString(["en-GB"], {
//     timeZone: "Asia/Makassar",
//     hour12: false,
//   });
//   socket.emit("dateTime", date);
// }, 1000);

app.get("/login", (req, res) => {
  if (req.cookies.accessToken) {
    return res.redirect("/dashboard");
  }
  res.render("login", {
    layout: false,
    title: "Login",
  });
});

app.get("/", isAuthenToken, (req, res) => {
  if (req.user.name) {
    return res.redirect("/dashboard");
  }
  return res.redirect("/login");
});

app.get("/dashboard", isAuthenToken, (req, res) => {
  res.render("index", {
    layout: "layouts/main-layout",
    title: "Dashboard",
    user: req.user.name[0].toUpperCase() + req.user.name.slice(1).toLowerCase(),
  });
});

app.get("/power", isAuthenToken, (req, res) => {
  res.render("power", {
    layout: "layouts/main-layout",
    title: "EMon PLN",
    user: req.user.name[0].toUpperCase() + req.user.name.slice(1).toLowerCase(),
  });
});

app.get("/energy", isAuthenToken, (req, res) => {
  res.render("energy", {
    layout: "layouts/main-layout",
    title: "EMon Genset",
    user: req.user.name[0].toUpperCase() + req.user.name.slice(1).toLowerCase(),
  });
});

app.get("/report", isAuthenToken, (req, res) => {
  res.render("report", {
    layout: "layouts/main-layout",
    title: "Report",
    user: req.user.name[0].toUpperCase() + req.user.name.slice(1).toLowerCase(),
  });
});

app.get("/plant/biogas1", isAuthenToken, (req, res) => {
  res.render("biogas1", {
    layout: "layouts/main-layout",
    title: "Biogas Page 1",
    user: req.user.name[0].toUpperCase() + req.user.name.slice(1).toLowerCase(),
  });
});

app.get("/plant/biogas2", isAuthenToken, (req, res) => {
  res.render("biogas2", {
    layout: "layouts/main-layout",
    title: "Biogas Page 2",
    user: req.user.name[0].toUpperCase() + req.user.name.slice(1).toLowerCase(),
  });
});

app.use((req, res) => {
  res.status(404).render("404", {
    layout: false,
    title: "404 Not Found",
  });
});

module.exports = server;
