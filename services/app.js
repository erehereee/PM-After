const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const { isAuthenToken } = require("../controller/controller");
const router = require("../router/router");

app.set("view engine", "ejs");
app.set("layout extractScripts", true);

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(router);
app.use(expressLayouts);

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

// app.get("/energy", isAuthenToken, (req, res) => {
//   res.render("energy", {
//     layout: "layouts/main-layout",
//     title: "EMon Genset",
//     user: req.user.name[0].toUpperCase() + req.user.name.slice(1).toLowerCase(),
//   });
// });

app.get("/report", isAuthenToken, (req, res) => {
  res.render("report", {
    layout: "layouts/main-layout",
    title: "Report",
    user: req.user.name[0].toUpperCase() + req.user.name.slice(1).toLowerCase(),
  });
});

app.use((req, res) => {
  res.status(404).render("404", {
    layout: false,
    title: "404 Not Found",
  });
});

module.exports = { server };
