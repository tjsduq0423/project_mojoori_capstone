require("dotenv").config();

var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");

let users = [
  { userId: "tjsduq0423" },
  { userId: "tjsduq04231" },
  { userId: "tjsduq04232" },
];
let refreshTokens = [];

// router.get('/user',authenticateToken,(req,res) =>{
//   res.json(users.filter(post => user.userId === req.user.Id))
// })
router.delete("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStaus(204);
});

router.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return ressendStatus(401);
  if (refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStaus(403);
    const accessToken = generateAccessToken({ Id: req.body.userId });
    res.json({ accessToken: accessToken });
  });
});

router.post("/login", function (req, res, next) {
  let errors = {};
  if (req.body.userid !== "test" && req.body.password !== "test") {
    errors["user"] = "아이디 혹은 비밀번호가 맞지 않습니다.";
  }
  if (Object.keys(errors).length > 0) {
    res.status(401).send({
      result: "failed",
      data: errors,
    });
    return;
  }

  const user = { Id: req.body.userId };
  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);
  res.status(200).send({
    result: "success",
    accesstoken: accessToken,
    refreshToken: refreshToken,
  });
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = router;
