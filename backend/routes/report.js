var express = require('express');  
var reports = require('../data/report_data');
const { report } = require('./auth');

var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.status(200).send({
    data:reports
  });
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
