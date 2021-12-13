const express = require("express");
const pool = require("../db/pool");
const router = express.Router();

router.get("/PopularStock", async (req, res) => {
    const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const queryString =
      "SELECT company_name,sum(report_view_count) AS viewcount FROM report LEFT JOIN company ON report.company_no=company.company_no GROUP BY report.company_no Having report.company_no IS NOT NULL AND viewcount!=0 ORDER BY viewcount DESC LIMIT 8;";
    const [rows, fields] = await conn.query(queryString);
    await conn.commit();
    // const queryString02="SELECT company_name,COUNT(member_no) AS likecount FROM member_company LEFT JOIN company ON member_company.company_no=company.company_no GROUP BY member_company.company_no;";
    // const[rows2,fields2]=await conn.query(queryString02);
    res.status(200).send({rows,fields});
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

router.get("/PopularIndustry", async (req, res) => {
    const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const queryString =
      "SELECT industry_type,sum(report_view_count) AS viewcount FROM report LEFT JOIN industry ON report.industry_no=industry.industry_no GROUP BY report.industry_no Having report.industry_no IS NOT NULL AND viewcount!=0 ORDER BY viewcount DESC LIMIT 8;";
    const [rows, fields] = await conn.query(queryString);
    await conn.commit();
    // const queryString02="SELECT company_name,COUNT(member_no) AS likecount FROM member_company LEFT JOIN company ON member_company.company_no=company.company_no GROUP BY member_company.company_no;";
    // const[rows2,fields2]=await conn.query(queryString02);
    res.status(200).send({rows,fields});
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

router.get("/PopularAuthor", async (req, res) => {
    const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const queryString =
      "SELECT anal_name FROM analyst ORDER BY anal_score DESC LIMIT  8;";
    const [rows, fields] = await conn.query(queryString);
    await conn.commit();
    // const queryString02="SELECT company_name,COUNT(member_no) AS likecount FROM member_company LEFT JOIN company ON member_company.company_no=company.company_no GROUP BY member_company.company_no;";
    // const[rows2,fields2]=await conn.query(queryString02);
    res.status(200).send({rows,fields});
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

module.exports = router;
