const express = require("express");
const reports = require("../data/report_data");
const pool = require("../db/pool");
const router = express.Router();

function getUserIP(req) {
  const addr = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  return addr;
}

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

router.post("/IncreaseViews", async (req, res) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const report_no = req.body.report_no;
    if (req.cookies[report_no] == undefined) {
      res.cookie(report_no, getUserIP(req), {
        maxAge: 24 * 60 * 60 * 1000,
      });
      const queryString =
        "UPDATE report SET report_view_count=report_view_count+1 WHERE report_no=?";
      const queryParams = [report_no];
      const [rows, fields] = await conn.execute(queryString, queryParams);
      await conn.commit();
    }
    res.status(200).send();
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

router.post("/SearchReport", async (req, res) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    if (req.body.search.selection == "종목") {
      const queryString =
        "SELECT * FROM report LEFT OUTER JOIN company ON report.company_no=company.company_no LEFT OUTER JOIN industry ON report.industry_no=industry.industry_no LEFT OUTER JOIN report_anal ON report_anal.report_no=report.report_no LEFT OUTER JOIN analyst ON analyst.anal_no=report_anal.anal_no WHERE company.company_name=?";
      const queryParams = [req.body.search.magnify];
      const [rows, fields] = await conn.execute(queryString, queryParams);
      await conn.commit();
      return res.status(200).send({
        data: rows,
        fields,
      });
    } else if (req.body.search.selection == "산업") {
      const queryString =
        "SELECT * FROM report LEFT OUTER JOIN company ON report.company_no=company.company_no LEFT OUTER JOIN industry ON report.industry_no=industry.industry_no LEFT OUTER JOIN report_anal ON report_anal.report_no=report.report_no LEFT OUTER JOIN analyst ON analyst.anal_no=report_anal.anal_no WHERE industry.industry_type=?";
      const queryParams = [req.body.search.magnify];
      const [rows, fields] = await conn.execute(queryString, queryParams);
      await conn.commit();
      return res.status(200).send({
        data: rows,
        fields,
      });
    } else {
      const queryString =
        "SELECT * FROM report LEFT OUTER JOIN company ON report.company_no=company.company_no LEFT OUTER JOIN industry ON report.industry_no=industry.industry_no LEFT OUTER JOIN report_anal ON report_anal.report_no=report.report_no LEFT OUTER JOIN analyst ON analyst.anal_no=report_anal.anal_no WHERE analyst.anal_name=?";
      const queryParams = [req.body.search.magnify];
      const [rows, fields] = await conn.execute(queryString, queryParams);
      await conn.commit();
      return res.status(200).send({
        data: rows,
        fields,
      });
    }
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

router.post("/likeReport", async (req, res) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const querystring = "SELECT member_no FROM member_ WHERE member_email=?";
    const queryParams = [req.body.userId];
    const [rows, fields] = await conn.execute(querystring, queryParams);
    member_number = rows[0].member_no;
    const querystring02 =
      "SELECT report_no FROM member_report WHERE member_no=?";
    const queryParams02 = [member_number];
    const [rows02, fields02] = await conn.execute(querystring02, queryParams02);
    await conn.commit();
    res.status(200).send({
      data: rows02,
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

router.post("/callInterestCorporationData", async (req, res) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    //내일 여기부터 시작하면됨 tags는 가지고 왔음
    const k = req.body.tags;
    rows3 = [];
    for (var i = 0; i < k.length; i++) {
      const querystring =
        "SELECT * FROM report LEFT OUTER JOIN company ON report.company_no=company.company_no LEFT OUTER JOIN industry ON report.industry_no=industry.industry_no LEFT OUTER JOIN report_anal ON report_anal.report_no=report.report_no LEFT OUTER JOIN analyst ON analyst.anal_no=report_anal.anal_no WHERE company.company_name=?";
      const queryParams = [k[i].company_name];
      const [rows, fields] = await conn.execute(querystring, queryParams);
      rows3 = rows3.concat(rows);
    }
    await conn.commit();
    res.status(200).send({
      rows3,
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

router.post("/callInterestIndustryData", async (req, res) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const k = req.body.tags;
    rows3 = [];
    for (var i = 0; i < k.length; i++) {
      const querystring =
        "SELECT * FROM report LEFT OUTER JOIN company ON report.company_no=company.company_no LEFT OUTER JOIN industry ON report.industry_no=industry.industry_no LEFT OUTER JOIN report_anal ON report_anal.report_no=report.report_no LEFT OUTER JOIN analyst ON analyst.anal_no=report_anal.anal_no WHERE industry.industry_type=?";
      const queryParams = [k[i].industry_type];
      const [rows, fields] = await conn.execute(querystring, queryParams);
      rows3 = rows3.concat(rows);
    }
    await conn.commit();
    res.status(200).send({
      rows3,
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

router.post("/callLikeReport", async (req, res) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const querystring = "SELECT member_no FROM member_ WHERE member_email=?";
    const queryParams = [req.body.userId];
    const [rows, fields] = await conn.execute(querystring, queryParams);
    member_number = rows[0].member_no;
    const querystring02 =
      "SELECT * FROM member_report LEFT OUTER JOIN report ON member_report.report_no=report.report_no LEFT OUTER JOIN company ON report.company_no=company.company_no LEFT OUTER JOIN industry ON report.industry_no=industry.industry_no LEFT OUTER JOIN report_anal ON report_anal.report_no=report.report_no LEFT OUTER JOIN analyst ON analyst.anal_no=report_anal.anal_no WHERE member_report.member_no=?";
    const queryParams02 = [member_number];
    const [rows02, fields02] = await conn.execute(querystring02, queryParams02);
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

router.patch("/likeReports", async (req, res) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const querystring = "SELECT member_no FROM member_ WHERE member_email=?";
    const queryParams = [req.body.userId];
    const [rows, fields] = await conn.execute(querystring, queryParams);
    member_number = rows[0].member_no;
    const querystring02 =
      "SELECT * FROM member_report WHERE member_no=? AND report_no=?";
    const queryParams02 = [member_number, req.body.report_no];
    const [rows02, fields02] = await conn.execute(querystring02, queryParams02);
    if (Array.isArray(rows02) && rows02.length === 0) {
      const querystring03 =
        "INSERT INTO member_report SET member_no=?,report_no=?";
      const queryParams03 = [member_number, req.body.report_no];
      const [rows03, fields03] = await conn.execute(
        querystring03,
        queryParams03
      );
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

router.patch("/unlikeReports", async (req, res) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const querystring = "SELECT member_no FROM member_ WHERE member_email=?";
    const queryParams = [req.body.userId];
    const [rows, fields] = await conn.execute(querystring, queryParams);
    member_number = rows[0].member_no;
    const querystring02 =
      "DELETE FROM member_report WHERE member_no=? AND report_no=?";
    const queryParams02 = [member_number, req.body.report_no];
    const [rows02, fields02] = await conn.execute(querystring02, queryParams02);
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
