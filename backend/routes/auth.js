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
  const valId = await users.some((ele) => ele.userId === req.body.userId); // user Authentication -> DB 쿼리 작성으로 수정
  if (valId) {
    return res.status(400).send({
      message: "Id 중복",
    });
  }
  const valNickname = await users.some(
    (ele) => ele.nickname === req.body.nickname
  );
  if (valNickname) {
    return res.status(400).send({
      message: "닉네임 중복",
    });
  }
  const token = await crypto.randomBytes(32).toString("hex");
  const user = {
    userId: req.body.userId,
    password: req.body.password,
    nickname: req.body.nickname,
    authToken: token,
  };
  users.push(user); //DB 에 SQL user 추가로 수정
  // 이메일로 인증메일 전송.

  res.status(200).send({
    message: "인증메일이 발송되었습니다.",
  });
});

router.post("/login", async (req, res, next) => {
  const auth = await users.some(
    (ele) =>
      ele.userId === req.body.userId &&
      ele.password === req.body.password &&
      ele.authToken === true
  ); // user Authentication -> DB 쿼리 작성으로 수정 + authToken === null 실패

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
  console.log(users);

  return res.status(200).send({
    message: "비밀번호 변경 성공",
  });
});

router.post("/emailAuth", async (req, res) => {
  const result = await users.some((item) => item.authToken === req.body.token);

  if (!result) {
    return res.status(404).send({
      message: "404 not Found",
    });
  }

  users.some((item) => {
    if (item.authToken === req.body.token) item.authToken = true;
    return item.authToken === req.body.token;
  });

  res.status(200).send({
    message: "인증 완료",
  });
});
module.exports = router;
