var express = require('express');  
var report =require('../data/report_data');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(report);
});
module.exports = router;
