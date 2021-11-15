var express = require('express');  
var stocks = require('../data/stock_data');
var industries=require('../data/industry_data');
var router = express.Router();

/* GET home page. */
router.get('/stocks', (req, res) => {
  res.status(200).send({
    stocks:stocks
  });
});
router.get('/industries', (req, res) => {
    res.status(200).send({
      industries:industries
    });
  });


module.exports = router;
