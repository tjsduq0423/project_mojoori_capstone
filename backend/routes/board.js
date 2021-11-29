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
