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

    const queryString03 = "SELECT * FROM reply WHERE board_id = ?";
    const queryParams03 = [req.body.id];
    const [rows03, fields03] = await conn.execute(queryString03, queryParams03);

    await conn.commit();
    if (Array.isArray(rows) && rows.length === 0) {
      return res.sendStatus(404);
    }
    if (Array.isArray(rows02) && rows02.length === 0) {
      return res.status(200).send({
        data: rows[0],
        likeStatus: false,
        likeCount: 0,
        comment: rows03,
      });
    }
    res.status(200).send({
      data: rows[0],
      likeStatus: rows02[0].some(
        (ele) => ele.board_nickname === req.body.nickname
      ),
      likeCount: rows02[0].length,
      comment: rows03,
    });
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

router.post("/replyWrite", async (req, res) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const queryString =
      "INSERT INTO reply SET board_id = ?, reply_writer = ? , reply_content = ?";
    const queryParams = [req.body.id, req.body.nickname, req.body.content];
    const [rows, fields] = await conn.execute(queryString, queryParams);

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

router.post("/like", async (req, res) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const queryString = req.body.status
      ? "DELETE FROM board_like WHERE board_id = ? AND board_nickname = ?"
      : "INSERT INTO board_like SET board_id = ? ,board_nickname = ?";
    const queryParams = [req.body.id, req.body.nickname];
    const [rows, fields] = await conn.execute(queryString, queryParams);

    await conn.commit();
    res.sendStatus(200);
  } catch (err) {
    await conn.rollback();
    console.log(err);
    if (err.sqlMessage) {
      return res.status(500).send({ message: err.sqlMessage });
    }
    res.status(500).send({ err });
  } finally {
    conn.release();
  }
});

module.exports = router;
