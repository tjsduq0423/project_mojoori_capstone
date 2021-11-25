var express = require('express');  
var reports = require('../data/report_data');
const { report } = require('./auth');
const pool = require("../db/pool");
var router = express.Router();

/* GET home page. */
router.get('/', async(req, res) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const queryString=
    "SELECT * FROM report LEFT OUTER JOIN company ON report.company_no=company.company_no LEFT OUTER JOIN industry ON company.industry_no=industry.industry_no";
    const [rows,fields] = await conn.query(queryString );
    await conn.commit();
    res.status(200).send({
      data:rows,
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

router.get('/likereport', (req, res) => {
  likereports=reports.reports.filter(element=>element.likes===true);
  res.status(200).send({
    data:likereports
  });
});

router.patch('/likeReports',(req,res)=>{
  try{
  likereport=reports.reports.find(element=>element.title===req.body.title);
  likereport.likes=true;
  res.status(200).send({likereport});
  }catch(e){
    res.status(401).send({
      message: "찜하기 실패",
    });
  }
});
router.patch('/unlikeReports',(req,res)=>{
  try{
  unlikereport=reports.reports.find(element=>element.title===req.body.title);
  unlikereport.likes=false;
  res.status(200).send({unlikereport});
  }catch(e){
    res.status(401).send({
      message: "찜하기 삭제 실패",
    });
  }
});
module.exports = router;
