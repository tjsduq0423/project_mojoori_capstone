const express = require("express");
const router = express.Router();
const pool = require("../db/pool");

/* GET home page. */
router.post("/articles", async (req, res) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const queryString =
      req.body.theme === "home"
        ? "SELECT * FROM board"
        : "SELECT * FROM board WHERE board_theme = ?";
    const queryParams = req.body.theme === "home" ? [] : [req.body.theme];
    const [rows, fields] = await conn.execute(queryString, queryParams);

    await conn.commit();
    res.status(200).send({
      data: rows,
    });
  } catch (err) {
    await conn.rollback();
    if (err.sqlMessage) {
      return res.status(500).send({ message: err.sqlMessage });
    }
    console.log(err);
    res.status(500).send({ err });
  } finally {
    conn.release();
  }
});

router.post("/myboard", async (req, res) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const querystring="SELECT member_nickname FROM member_ WHERE member_email=?";
    const queryParams=[req.body.id];
    const [rows,fields]=await conn.execute(querystring,queryParams);
     member_nickname=rows[0].member_nickname;
      const querystring02="SELECT * FROM board WHERE board_writer=?";
      const queryParams02=[member_nickname];
      const [rows2,fields2]=await conn.execute(querystring02,queryParams02);
    await conn.commit();
    res.status(200).send({
      member_nickname,data:rows2,fields2,
    });
    
    
  } catch (err) {
    await conn.rollback();
    if (err.sqlMessage) {
      return res.status(500).send({
        message: err.sqlMessage,
      });
    }
    res.status(500).send({ err });
  } finally {
    conn.release();
  }
});

router.post("/getboard", async(req, res) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const querystring="SELECT * FROM board WHERE board_id=?";
    const queryParams=[req.body.Id];
    const [rows,fields]=await conn.execute(querystring,queryParams);
    await conn.commit();
    res.status(200).send({
      rows,fields
    });
  } catch (err) {
    await conn.rollback();
    if (err.sqlMessage) {
      return res.status(500).send({
        message: err.sqlMessage,
      });
    }
    res.status(500).send({ err });
  } finally {
    conn.release();
  }
});

router.post("/deletearticle", async (req, res) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const querystring="DELETE FROM board WHERE board_id=?";
    const queryParams=[req.body.boardId];
    const [rows,fields]=await conn.execute(querystring,queryParams);
    await conn.commit();
    res.status(200).send({
    rows,fields,
    });
    
    
  } catch (err) {
    await conn.rollback();
    if (err.sqlMessage) {
      return res.status(500).send({
        message: err.sqlMessage,
      });
    }
    res.status(500).send({ err });
  } finally {
    conn.release();
  }
});

router.post("/modify", async (req, res) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const queryString =
      "UPDATE board SET board_title=?,board_content=?,board_theme=? WHERE board_id=?";
    const queryParams = [
      req.body.title,
      req.body.content,
      req.body.theme,
      req.body.id,
    ];
    const [rows, fields] = await conn.execute(queryString, queryParams);
    await conn.commit();
    res.sendStatus(200);
  } catch (err) {
    await conn.rollback();
    if (err.sqlMessage) {
      return res.status(500).send({ message: err.sqlMessage });
    }
    console.log(err);
    res.status(500).send({ err });
  } finally {
    conn.release();
  }
});

router.post("/write", async (req, res) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const queryString =
      "INSERT INTO board SET board_writer = ?, board_title = ?,board_content = ? , board_theme = ?";
    const queryParams = [
      req.body.writer,
      req.body.title,
      req.body.content,
      req.body.theme,
    ];
    const [rows, fields] = await conn.execute(queryString, queryParams);
    await conn.commit();
    res.sendStatus(200);
  } catch (err) {
    await conn.rollback();
    if (err.sqlMessage) {
      return res.status(500).send({ message: err.sqlMessage });
    }
    console.log(err);
    res.status(500).send({ err });
  } finally {
    conn.release();
  }
});

router.post("/content", async (req, res) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const queryString = "SELECT * FROM board WHERE board_id = ?";
    const queryParams = [req.body.id];
    const [rows, fields] = await conn.execute(queryString, queryParams);

    const queryString02 = "SELECT * FROM board_like WHERE board_id = ?";
    const queryParams02 = [req.body.id];
    const [rows02, fields02] = await conn.execute(queryString02, queryParams02);

    await conn.commit();
    if (Array.isArray(rows) && rows.length === 0) {
      return res.sendStatus(404);
    }
    if (Array.isArray(rows02) && rows02.length === 0) {
      return res.status(200).send({
        data: rows[0],
        likeStatus: false,
      });
    }
    res.status(200).send({
      data: rows[0],
      likeStatus: true,
    });
  } catch (err) {
    await conn.rollback();
    if (err.sqlMessage) {
      return res.status(500).send({ message: err.sqlMessage });
    }
    console.log(err);
    res.status(500).send({ err });
  } finally {
    conn.release();
  }
});

router.post("/like", async (req, res) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const likeCount = req.body.status
      ? req.body.likeCount - 1
      : req.body.likeCount + 1;
    const queryString = "UPDATE board SET board_like = ? WHERE board_id = ?";
    const queryParams = [likeCount, req.body.id];
    const [rows, fields] = await conn.execute(queryString, queryParams);

    const queryString02 = req.body.status
      ? "DELETE FROM board_like WHERE board_id = ?"
      : "INSERT INTO board_like SET board_id = ? ,board_writer = ?";
    const queryParams02 = req.body.status
      ? [req.body.id]
      : [req.body.id, req.body.nickname];
    const [rows02, fields02] = await conn.execute(queryString02, queryParams02);

    await conn.commit();
    res.sendStatus(200);
  } catch (err) {
    await conn.rollback();
    if (err.sqlMessage) {
      return res.status(500).send({ message: err.sqlMessage });
    }
    console.log(err);
    res.status(500).send({ err });
  } finally {
    conn.release();
  }
});

module.exports = router;
