require("dotenv").config();

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const pool = require("../db/pool");
const mailSender = require("./mail");

// router.post("/", async (req, res) => {});

router.post("/signUp", async (req, res) => {
  const token = await crypto.randomBytes(16).toString("hex");
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const queryString =
      "INSERT INTO member_ SET member_email = ?, member_pwd = ?, member_nickname = ? , member_authToken = ?";
    const queryParams = [
      req.body.userId,
      req.body.password,
      req.body.nickname,
      token,
    ];
    const [rows, fields] = await conn.execute(queryString, queryParams);

    const sendData = {
      subject: "이메일 인증 요청 메일입니다.",
      html: `<p> Mojuri에 회원가입 해주셔서 감사합니다. </p> <a href = "http://ec2-13-124-134-15.ap-northeast-2.compute.amazonaws.com/email-authentication-done/${token}">Mojuri 인증 링크(클릭)</a>`,
    };
    const info = await mailSender(req.body.userId, sendData);

    await conn.commit();
    res.sendStatus(200);
  } catch (err) {
    await conn.rollback();
    // sqlMessage : "Duplicate entry 'test2@gmail.com' for key 'member_.member_email_UNIQUE'"
    if (err.sqlMessage && err.sqlMessage.includes("member_email")) {
      return res.status(500).send({
        message: "중복된 email 입니다.",
      });
    }
    if (err.sqlMessage && err.sqlMessage.includes("member_nickname")) {
      return res.status(500).send({
        message: "중복된 nickname 입니다.",
      });
    }
    res
      .status(500)
      .send({ message: "서버 오류 입니다. 시간이 지난후 다시 시도해 주세요." });
  } finally {
    conn.release();
  }
});

router.post("/emailAuth", async (req, res) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const queryString =
      "SELECT member_authToken FROM member_ WHERE member_authToken = ?";
    const queryParams = [req.body.token];
    const [rows, fields] = await conn.execute(queryString, queryParams);

    //ex) rows : [ { member_authToken: 'da7c1e38cb3c1d8ba61ad13f58e4e228' } ] 있다면...
    if (Array.isArray(rows) && rows.length !== 0) {
      const queryString02 =
        "UPDATE member_ SET member_authToken = ? WHERE member_authToken = ?";
      const queryParams02 = ["", req.body.token];
      const [rows, fields] = await conn.execute(queryString02, queryParams02);
    }

    await conn.commit();
    res.sendStatus(200);
  } catch (err) {
    await conn.rollback();
    if (err.sqlMessage) {
      return res.status(500).send({ message: err.sqlMessage });
    }
    res.status(500).send({ err });
  } finally {
    conn.release();
  }
});

router.post("/login", async (req, res, next) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const queryString = "SELECT * FROM member_ WHERE member_email = ?";
    const queryParams = [req.body.userId];
    const [rows, fields] = await conn.execute(queryString, queryParams);

    await conn.commit();

    if (Array.isArray(rows) && rows.length === 0)
      return res.status(500).send({ message: "ID를 찾을 수 없습니다." });

    if (rows[0].member_pwd !== req.body.password)
      return res.status(500).send({ message: "PASSWORD를 확인해주세요." });

    if (rows[0].member_authToken !== "")
      return res.status(500).send({ message: "이메일 인증이 필요합니다." });

    const accessToken = req.body.stateMaintain
      ? jwt.sign(
          { userId: rows[0].member_email, nickname: rows[0].member_nickname },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "1d",
          }
        )
      : jwt.sign(
          { userId: rows[0].member_email, nickname: rows[0].member_nickname },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "30m",
          }
        );

    res.cookie("jwt", accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 쿠키 수명 하루
    }); // 쿠키에 토큰 저장

    res.sendStatus(200);
  } catch (err) {
    await conn.rollback();
    if (err.sqlMessage) {
      return res.status(500).send({ message: err.sqlMessage });
    }
    res.status(500).send({ err });
  } finally {
    conn.release();
  }
});

router.get("/user", async (req, res) => {
  try {
    const jwtToken = req.cookies["jwt"];
    const payload = jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET);
    res.status(200).send(payload);
  } catch (err) {
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
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const queryString =
      "SELECT * FROM member_ WHERE member_email = ? AND member_pwd = ?";
    const queryParams = [req.body.userId, req.body.password];
    const [rows, fields] = await conn.execute(queryString, queryParams);

    if (Array.isArray(rows) && rows.length === 0) {
      await conn.commit();
      return res.status(500).send({ message: "비밀번호를 다시 확인해주세요." });
    }

    const queryString02 =
      "UPDATE member_ SET member_pwd = ? WHERE member_email = ? AND member_pwd = ?";
    const queryParams02 = [
      req.body.newPassword,
      req.body.userId,
      req.body.password,
    ];
    const [rows02, fields02] = await conn.execute(queryString02, queryParams02);

    await conn.commit();
    res.status(200).send({ message: "비밀번호 변경 완료" });
  } catch (err) {
    await conn.rollback();
    if (err.sqlMessage) {
      return res.status(500).send({ message: err.sqlMessage });
    }
    res.status(500).send({ err });
  } finally {
    conn.release();
  }
});

router.post("/findPassword", async (req, res) => {
  const tempPassword = await crypto.randomBytes(8).toString("hex");
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const queryString = "SELECT * FROM member_ WHERE member_email = ?";
    const queryParams = [req.body.email];
    const [rows, fields] = await conn.execute(queryString, queryParams);

    if (Array.isArray(rows) && rows.length === 0) {
      await conn.commit();
      return res.status(500).send({
        message: "이메일을 다시 확인해주세요.",
      });
    }

    const queryString02 =
      "UPDATE member_ SET member_pwd = ? WHERE member_email = ?";
    const queryParams02 = [tempPassword, req.body.email];
    const [rows02, fields02] = await conn.execute(queryString02, queryParams02);

    const sendData = {
      subject: "임시비밀번호 발급메일입니다.",
      html: `<p> 임시비밀번호 : ${tempPassword} </p> <a href = "http://ec2-13-124-134-15.ap-northeast-2.compute.amazonaws.com/user-authentication">Mojuri 로그인 바로가기</a>`,
    };
    const info = await mailSender(req.body.email, sendData);

    await conn.commit();
    res.sendStatus(200);
  } catch (err) {
    await conn.rollback();
    if (err.sqlMessage) {
      return res.status(500).send({ message: err.sqlMessage });
    }
    res.status(500).send({ err });
  } finally {
    conn.release();
  }
  res.status(200).send({}); //test
});

module.exports = router;
