var express = require('express');  
 var reports = require('../data/report_data');

var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.status(200).send({
    data:reports
  });
});


module.exports = router;
