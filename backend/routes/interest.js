var express = require('express');  
var stocks = require('../data/stock_data');
var industries=require('../data/industry_data');
var router = express.Router();


let stockstags = ['에코프로','삼성전자','하나머티리얼즈','카카오'];
let industriestags=['2차전지','에너지','소재','건설'];
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

router.post('/registerStocks', async(req,res)=>{
  const userintereststocks={
    userId:req.body.userId,
    selectedstocks: req.body.selectedstocks,
  };
  //db에 넣는거 필요 실패시 401
  if(!userintereststocks){
    return res.status(401).send({
      message:"실패했습니다.",
    })
  }
  res.status(200).send({userintereststocks:userintereststocks});
});

router.post('/registerIndustries', async(req,res)=>{
  const userinterestindustries={
    userId:req.body.userId,
    selectedindustries: req.body.selectedindustries,
  };
  //db에 넣는거 필요 실패시 401
  if(!userinterestindustries){
    return res.status(401).send({
      message:"실패했습니다.",
    })
  }
  res.status(200).send({userinterestindustries:userinterestindustries});
});
//관심종목 태그만들기 userid필요한가?
router.get('/getinterestStocks', (req,res)=>{
  if(!stockstags){
    return res.status(401).send({
      message:"실패했습니다.",
    })
  }
  res.status(200).send({stockstags:stockstags});
});

router.get('/getinterestIndustries', (req,res)=>{
  if(!industriestags){
    return res.status(401).send({
      message:"실패했습니다.",
    })
  }
  res.status(200).send({industriestags:industriestags});
});

router.patch('/deleteinterestStocks',(req,res)=>{
  const deleteintereststocks={
    stock: req.body.stock,
  };
  stockstags=stockstags.filter(tag=>tag!==deleteintereststocks.stock);
  res.status(200).send({deleteintereststocks:deleteintereststocks});
});
module.exports = router;
