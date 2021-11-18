require("dotenv").config();

var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var crypto = require("crypto");

let users = [
  { userId: "test", password: "test", nickname: "test", authToken: true },
];

router.post("/signUp", async (req, res) => {
  //검증 절차 필요함 userId 중복 nickname 중복 -> 401 err 리턴
  const auth = await users.some((ele) => ele.userId === req.body.userId); // user Authentication -> DB 쿼리 작성으로 수정
  const token = await crypto.randomBytes(32).toString("hex");
  const user = {
    userId: req.body.userId,
    password: req.body.password,
    nickname: req.body.nickname,
    authToken: token,
  };
  users.push(user); //DB 에 SQL user 추가로 수정
  // 이메일로 인증메일 전송. nodemailer `http://example.com/email-authentication-done/${token}` 발송

  console.log(users);
  res.status(200).send(users);
});

router.post("/emailAuth", async (req, res) => {
  const auth = await users.some((ele) => ele.authToken === req.body.token); // user Authentication -> DB 쿼리 작성으로 수정
  //이메일 인증 요청 토큰과 같은 요청의 토큰 값이 있는지 확인 하고 있으면 true 로 변형.
  //토큰 값이 있음녀 res.status(200).send({message: "인증 성공"})
  //토큰 값이 없으면 res.status(404).send({message: "Not Found"})
});

router.post("/login", async (req, res, next) => {
  const auth = await users.some(
    (ele) =>
      ele.userId === req.body.userId && ele.password === req.body.password
  ); // user Authentication -> DB 쿼리 작성으로 수정
  // Id password가 일치하는 사용자가 있으면 사용자의 authToken(이메일 인증여부) 검증
  if (!auth) {
    return res.status(401).send({
      message: "ID Password를 다시 확인해주세요.",
    });
  }

  // jwt 생성
  const maintainLoginState = await req.body.stateMaintain;
  const accessToken = maintainLoginState
    ? jwt.sign({ userId: req.body.userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
      })
    : jwt.sign({ userId: req.body.userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
      }); //  로그인 유지 할 지 말지.

  res.cookie("jwt", accessToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 쿠키 수명 하루
  }); // 쿠키에 토큰 저장

  res.status(200).send({
    message: "로그인 성공",
  });
});

router.get("/user", async (req, res) => {
  try {
    const cookie = req.cookies["jwt"];
    const payload = jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET);

    if (!payload) {
      return res.status(401).send({
        message: "인증 실패",
      });
    }

    const { password, ...data } = await users.filter(
      (user) => user.userId === payload.userId
    )[0];

    res.status(200).send(data);
  } catch (e) {
    res.status(401).send({
      message: "인증 실패",
    });
  }
});

router.post("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 }); // remove cookie
  res.status(200).send({
    message: "로그아웃 성공",
  });
});

router.post("/changePassword", async (req, res) => {
  const auth = await users.some(
    (ele) =>
      ele.userId === req.body.userId && ele.password === req.body.password
  );
  //DB -> 있는지 검증

  if (!auth) {
    return res.status(401).send({
      message: "Password를 다시 확인해주세요.",
    });
  }

  users.some((item) => {
    if (item.userId === req.body.userId) item.password = req.body.newPassword;
    return item.userId === req.body.userId;
  });
  //DB -> password 변경

  res.status(200).send({
    message: "비밀번호 변경 성공",
  });
});

router.post("/password", async (req, res) => {
  // req.body.email 이 user Id 중 있는지 검색 -> 있으면 16길이의 임시비번으로 비빌번호 변경후 이메일로 비밀번호 발송.
  res.status(200).send({}); //test
});

module.exports = router;
