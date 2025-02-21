const { pool } = require("../helper/pg");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const register = async (req, res) => {
  try {
    const { name, role, username, password } = req.body;
    const userExist = await pool.query(
      "SELECT username from users where username = $1 limit 1",
      [username]
    );
    if (!name || !role || !username || !password) {
      console.log("Registration not complete. Please fill the form.");
      return res
        .status(422)
        .json({ message: "Registration not complete. Please fill the form." });
    }
    if (userExist.rowCount != 0) {
      console.log("Username " + username + " Already registered.");
      return res
        .status(409)
        .json({ message: "Username " + username + " Already registered." });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    pool
      .query(
        "INSERT INTO users (name, role, username, password) values ($1, $2, $3, $4)",
        [name, role, username, hashPassword]
      )
      .then(() => {
        console.log("Registration for user : " + name + " Successfully");
        return res.status(201).json({
          message: "Registration for user : " + name + " Successfully",
        });
      })
      .catch((error) => {
        console.log("Registration failed : " + error.message);
        return res.status(500).json({ message: "Registration failed." });
      });
  } catch (error) {
    console.log("Registration failed : " + error.message);
    res.status(500).json({ message: "Registration failed" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      console.log(`Login Failed for user "${username}". Fill the form.`);
      return res.status(422).json({ message: "Login Failed. Fill the form." });
    }

    if (password.length < 8) {
      console.log(
        `Password for user "${username}" must be greater or equal then 8 characters.`
      );
      return res.status(422).json({
        message: "Password must be greater or equal then 8 characters.",
      });
    }
    const userExist = await pool.query(
      "SELECT name, role, username, password from users where username = $1 limit 1",
      [username]
    );
    if (!userExist.rowCount) {
      return res
        .status(401)
        .json({ message: "Username and Password not registered." });
    }
    const hashPassword = await bcrypt.compare(
      password,
      userExist.rows[0].password
    );
    if (!hashPassword) {
      return res
        .status(401)
        .json({ message: "Username and Password not registered." });
    }
    const accessToken = jwt.sign(
      { userId: userExist.rows[0].name, role: userExist.rows[0].role },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { subject: "accessApi", expiresIn: process.env.ACCESS_TOKEN_EXP }
    );

    console.log("Login Success from user : " + userExist.rows[0].name);

    res.cookie("accessToken", accessToken, {
      httpOnly: false, // Cookie hanya bisa diakses dari server, bukan JavaScript client
      secure: false, // Gunakan secure hanya jika di HTTPS
      maxAge: 3600000, // Waktu habis (1 jam)
      sameSite: "strict", // Proteksi CSRF
    });

    return res.status(200).json({
      name: userExist.rows[0].name,
      role: userExist.rows[0].role,
      username: userExist.rows[0].username,
      accessToken,
    });
  } catch (error) {
    console.log("Gagal melakukan login : " + error.message);
    res.status(500).json({ message: "Gagal melakukan login" });
  }
};

const logout = async (req, res) => {
  try {
    const { name } = req.user;
    console.log("Logout Success from user : " + name);
    return res.status(204).clearCookie("accessToken").send();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// const logout = async (req, res) => {
//   try {
//     const { name, exp } = req.user;
//     const accessToken = req.headers.authentication;
//     await pool.query(
//       "INSERT INTO tokeninvalid (name, token, exp) values ($1, $2, $3)",
//       [name, accessToken, exp]
//     );
//     console.log("Logout Success from user : " + name);
//     return res.status(204).send();
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

async function isAuthenToken(req, res, next) {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    console.log("Access Token not found");
    // return res.status(401).json({ message: "Access Token not found" });
    return res.redirect("/login");
  }

  try {
    const decodeAccessToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET_KEY
    );
    req.user = {
      name: decodeAccessToken.userId,
      role: decodeAccessToken.role,
      exp: decodeAccessToken.exp,
    };
    next();
  } catch (error) {
    if (
      error instanceof jwt.TokenExpiredError ||
      error instanceof jwt.JsonWebTokenError
    ) {
      console.log("Access Token not valid or expired");
      // return res.status(401).json({
      //   message: "Access Token not valid or expired",
      // });
      return res.redirect("/login");
    } else {
      console.log(error.message);
      return res.status(500).json({ message: error.message });
    }
  }
}

async function isAuthen(req, res, next) {
  const accessToken = req.headers.authentication;
  if (!accessToken) {
    console.log("Access Token not found");
    return res.status(401).json({ message: "Access Token not found" });
  }
  const checkToken = await pool.query(
    "SELECT token from tokeninvalid where token = $1",
    [accessToken]
  );
  if (checkToken.rowCount) {
    console.log("Access Token not valid or expired");
    return res.status(401).json({
      message: "Access Token not valid or expired",
    });
  }
  try {
    const decodeAccessToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET_KEY
    );
    req.user = {
      name: decodeAccessToken.userId,
      role: decodeAccessToken.role,
      exp: decodeAccessToken.exp,
    };
    next();
  } catch (error) {
    if (
      error instanceof jwt.TokenExpiredError ||
      error instanceof jwt.JsonWebTokenError
    ) {
      console.log("Access Token not valid or expired");
      return res.status(401).json({
        message: "Access Token not valid or expired",
      });
    } else {
      console.log(error.message);
      return res.status(500).json({ message: error.message });
    }
  }
}

function isAuthor(roles = []) {
  return async function (req, res, next) {
    const checkCredential = await pool.query(
      "SELECT role from users where name = $1 limit 1",
      [req.user.name]
    );
    const checkRole = roles.includes(checkCredential.rows[0].role);

    if (!checkCredential || !checkRole) {
      return res.status(403).json({ message: "Access Denied" });
    }
    next();
  };
}

const testData = async (req, res) => {
  return res.status(200).json({
    message: {
      name: req.user.name,
      role: req.user.role,
    },
  });
};

function admin(req, res) {
  return res.status(200).json("Admin Zone");
}

module.exports = {
  register,
  login,
  testData,
  isAuthen,
  isAuthor,
  logout,
  isAuthenToken,
  admin,
};
