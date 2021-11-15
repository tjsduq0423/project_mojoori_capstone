require("dotenv").config();

var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");

let users = [{ userId: "test", password: "test", nickname: "test" }];

router.post("/signUp", async (req, res) => {
  //검증 절차 필요함 userId 중복 nickname 중복 -> 401 err 리턴
  const auth = await users.some((ele) => ele.userId === req.body.userId); // user Authentication -> DB 쿼리 작성으로 수정
  const user = {
    userId: req.body.userId,
    password: req.body.password,
    nickname: req.body.nickname,
    // authToken: null, 이메일 인증시 true 모든 로그인시 토큰 발행 절차에 확인
  };
  users.push(user); //DB 에 SQL user 추가로 수정
  // 이메일로 인증메일 전송.
  console.log(users);
  res.status(200).send(users);
});

router.post("/login", async (req, res, next) => {
  const auth = await users.some(
    (ele) =>
      ele.userId === req.body.userId && ele.password === req.body.password
  ); // user Authentication -> DB 쿼리 작성으로 수정

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

module.exports = router;
