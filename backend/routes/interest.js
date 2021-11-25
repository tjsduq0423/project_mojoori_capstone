var express = require("express");
var stocks = require("../data/stock_data");
var industries = require("../data/industry_data");
var router = express.Router();
const pool=require("../db/pool");

let stockstags = ["에코프로", "삼성전자", "하나머티리얼즈", "카카오"];
let industriestags = ["2차전지", "에너지", "소재", "건설"];
/* GET home page. */
router.get("/stocks", async(req, res) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const queryString=
    "SELECT * FROM company";
    const [rows,fields] = await conn.query(queryString );
    await conn.commit();
    res.status(200).send({
      stocks:rows,
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
router.get("/industries", async(req, res) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const queryString=
    "SELECT * FROM industry";
    const [rows,fields] = await conn.query(queryString );
    await conn.commit();
    res.status(200).send({
      industries:rows,
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

router.post("/registerStocks", async (req, res) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const querystring02="SELECT member_no FROM member_ WHERE member_email=?"
    const queryParams02=[req.body.userId]
    const [rows,fields]=await conn.execute(querystring02,queryParams02);
    member_number=rows[0].member_no;
      for(var i=0; i< req.body.selectedstocks.length; i++){
        const queryString=
        "INSERT INTO member_company SET member_no=?,company_no=?";
       const queryParams=[member_number,req.body.selectedstocks[i]];
       const [rows,fields] = await conn.execute(queryString,queryParams );
      }
    await conn.commit();
    res.status(200).send({
      member_number,
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

router.post("/registerIndustries", async (req, res) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const querystring02="SELECT member_no FROM member_ WHERE member_email=?"
    const queryParams02=[req.body.userId]
    const [rows,fields]=await conn.execute(querystring02,queryParams02);
    member_number=rows[0].member_no;
      for(var i=0; i< req.body.selectedindustries.length; i++){
        const queryString=
        "INSERT INTO member_industry SET member_no=?,industry_no=?";
       const queryParams=[member_number,req.body.selectedindustries[i]];
       const [rows,fields] = await conn.execute(queryString,queryParams );
      }
    await conn.commit();
    res.status(200).send({
      member_number,
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
//관심종목 태그만들기 userid필요한가?
router.get("/getInterestStocks", (req, res) => {
  if (!stockstags) {
    return res.status(401).send({
      message: "실패했습니다.",
    });
  }
  res.status(200).send({ stockstags: stockstags });
});

router.get("/getInterestIndustries", (req, res) => {
  if (!industriestags) {
    return res.status(401).send({
      message: "실패했습니다.",
    });
  }
  res.status(200).send({ industriestags: industriestags });
});

router.patch("/deleteInterestStocks", (req, res) => {
  const deleteInterestStocks = {
    stock: req.body.stock,
  };
  stockstags = stockstags.filter((tag) => tag !== deleteInterestStocks.stock);
  res.status(200).send({ deleteInterestStocks: deleteInterestStocks });
});
router.patch("/deleteInterestIndustries", (req, res) => {
  const deleteInterestIndustries = {
    industry: req.body.industry,
  };
  industriestags = industriestags.filter(
    (tag) => tag !== deleteInterestIndustries.industry
  );
  res.status(200).send({ deleteInterestIndustries: deleteInterestIndustries });
});

module.exports = router;
