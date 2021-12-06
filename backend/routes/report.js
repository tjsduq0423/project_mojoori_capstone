const express = require("express");
const reports = require("../data/report_data");
const pool = require("../db/pool");
const router = express.Router();

/* GET home page. */
router.get("/", async (req, res) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const queryString =
      "SELECT * FROM report LEFT OUTER JOIN company ON report.company_no=company.company_no LEFT OUTER JOIN industry ON report.industry_no=industry.industry_no LEFT OUTER JOIN report_anal ON report_anal.report_no=report.report_no LEFT OUTER JOIN analyst ON analyst.anal_no=report_anal.anal_no";
    const [rows, fields] = await conn.query(queryString);
    await conn.commit();
    res.status(200).send({
      data: rows,
      fields,
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

router.post("/likeReport", async(req, res) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const querystring="SELECT member_no FROM member_ WHERE member_email=?";
    const queryParams=[req.body.userId];
    const [rows,fields]=await conn.execute(querystring,queryParams);
     member_number=rows[0].member_no;
     const querystring02="SELECT report_no FROM member_report WHERE member_no=?";
     const queryParams02=[member_number];
     const [rows02,fields02]=await conn.execute(querystring02,queryParams02);
    await conn.commit();
    res.status(200).send({
      data:rows02,
      fields02,
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

router.post("/callInterestCorporationData", async(req, res) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    //내일 여기부터 시작하면됨 tags는 가지고 왔음
    const k=req.body.tags// const querystring="SELECT member_no FROM member_ WHERE member_email=?";
    // const queryParams=[req.body.userId];
    // const [rows,fields]=await conn.execute(querystring,queryParams);
    //  member_number=rows[0].member_no;
    //  const querystring02="SELECT report_no FROM member_report WHERE member_no=?";
    //  const queryParams02=[member_number];
    //  const [rows02,fields02]=await conn.execute(querystring02,queryParams02);
    await conn.commit();
    res.status(200).send({
      k,
      
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

router.post("/callLikeReport", async(req, res) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const querystring="SELECT member_no FROM member_ WHERE member_email=?";
    const queryParams=[req.body.userId];
    const [rows,fields]=await conn.execute(querystring,queryParams);
     member_number=rows[0].member_no;
      const querystring02="SELECT * FROM member_report LEFT OUTER JOIN report ON member_report.report_no=report.report_no LEFT OUTER JOIN company ON report.company_no=company.company_no LEFT OUTER JOIN industry ON report.industry_no=industry.industry_no LEFT OUTER JOIN report_anal ON report_anal.report_no=report.report_no LEFT OUTER JOIN analyst ON analyst.anal_no=report_anal.anal_no WHERE member_report.member_no=?";
      const queryParams02=[member_number];
      const [rows02,fields02]=await conn.execute(querystring02,queryParams02);
    await conn.commit();
    res.status(200).send({
      rows02,
      fields02,
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

router.patch("/likeReports", async(req, res) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const querystring="SELECT member_no FROM member_ WHERE member_email=?";
    const queryParams=[req.body.userId];
    const [rows,fields]=await conn.execute(querystring,queryParams);
     member_number=rows[0].member_no;
     const querystring02="SELECT * FROM member_report WHERE member_no=? AND report_no=?";
     const queryParams02=[member_number,req.body.report_no];
     const [rows02,fields02]=await conn.execute(querystring02,queryParams02);
      if(Array.isArray(rows02)&&rows02.length===0)
      {
       const querystring03="INSERT INTO member_report SET member_no=?,report_no=?";
       const queryParams03=[member_number,req.body.report_no];
       const [rows03,fields03]=await conn.execute(querystring03,queryParams03);

      }
    await conn.commit();
    res.status(200).send({
      data: rows02,
      fields,
    });
  } catch (err) {
    await conn.rollback();
    // sqlMessage : "Duplicate entry 'test2@gmail.com' for key 'member_.member_email_UNIQUE'"
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
router.patch("/unlikeReports", async(req, res) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const querystring="SELECT member_no FROM member_ WHERE member_email=?";
    const queryParams=[req.body.userId];
    const [rows,fields]=await conn.execute(querystring,queryParams);
     member_number=rows[0].member_no;
     const querystring02="DELETE FROM member_report WHERE member_no=? AND report_no=?";
     const queryParams02=[member_number,req.body.report_no];
     const [rows02,fields02]=await conn.execute(querystring02,queryParams02);
    await conn.commit();
    res.status(200).send({
      data: rows02,
      fields,
    });
  } catch (err) {
    await conn.rollback();
    // sqlMessage : "Duplicate entry 'test2@gmail.com' for key 'member_.member_email_UNIQUE'"
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
module.exports = router;
