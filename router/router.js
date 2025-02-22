const { Router } = require("express");
const router = Router();
const {
  register,
  login,
  testData,
  isAuthen,
  isAuthor,
  logout,
  admin,
  isAuthenToken,
} = require("../controller/controller");

const { dataTest } = require("./../helper/dataHandler")


router.post("/api/auth/register", register);
router.post("/api/auth/login", login);
router.get("/api/auth/logout", isAuthenToken, logout);
router.get("/api/getdata", dataTest)
// router.get("/api/user/test", isAuthenToken, testData);
// router.get("/api/user/admin", isAuthen, isAuthor(["admin"]), admin);

module.exports = router;
