var express = require("express");
var stocks = require("../data/stock_data");
var industries = require("../data/industry_data");
var router = express.Router();

let stockstags = ["에코프로", "삼성전자", "하나머티리얼즈", "카카오"];
let industriestags = ["2차전지", "에너지", "소재", "건설"];
/* GET home page. */
router.get("/stocks", (req, res) => {
  res.status(200).send({
    stocks: stocks,
  });
});
router.get("/industries", (req, res) => {
  res.status(200).send({
    industries: industries,
  });
});

router.post("/registerStocks", async (req, res) => {
  const userintereststocks = {
    userId: req.body.userId,
    selectedstocks: req.body.selectedstocks,
  };
  //db에 넣는거 필요 실패시 401
  if (!userintereststocks) {
    return res.status(401).send({
      message: "실패했습니다.",
    });
  }
  res.status(200).send({ userintereststocks: userintereststocks });
});

router.post("/registerIndustries", async (req, res) => {
  const userinterestindustries = {
    userId: req.body.userId,
    selectedindustries: req.body.selectedindustries,
  };
  //db에 넣는거 필요 실패시 401
  if (!userinterestindustries) {
    return res.status(401).send({
      message: "실패했습니다.",
    });
  }
  res.status(200).send({ userinterestindustries: userinterestindustries });
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
