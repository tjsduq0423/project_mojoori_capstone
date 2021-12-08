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

router.get("/authors", async(req, res) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const queryString=
    "SELECT anal_name FROM analyst";
    const [rows,fields] = await conn.query(queryString );
    await conn.commit();
    res.status(200).send({
      authors:rows,
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

router.get("/getSearchStocks", async(req, res) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const querystring="SELECT * FROM company WHERE company_name LIKE ?";
    const queryParams=[`%${req.query.key1}%`];
    const [rows,fields]=await conn.execute(querystring,queryParams);
    await conn.commit();
    res.status(200).send({
      querystring,
      queryParams,
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

router.post("/registerStocks", async (req, res) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const querystring="SELECT member_no FROM member_ WHERE member_email=?";
    const queryParams=[req.body.userId];
    const [rows,fields]=await conn.execute(querystring,queryParams);
     member_number=rows[0].member_no;
     const querystring02="DELETE FROM member_company WHERE member_no=?";
     const queryParams02=[member_number];
     const [rows2,fields2]=await conn.execute(querystring02,queryParams02);
       for(var i=0; i< req.body.selectedstocks.length; i++){
         const queryString03=
         "SELECT * FROM member_company WHERE member_no=? AND company_no=?";
        const queryParams03=[member_number,req.body.selectedstocks[i]];
        const [rows,fields] = await conn.execute(queryString03,queryParams03 );
      
         if(Array.isArray(rows) && rows.length === 0)
         {const queryString04="INSERT INTO member_company SET member_no=?,company_no=?";
         const queryParams04=[member_number,req.body.selectedstocks[i]];
         const[rows,fields]=await conn.execute(queryString04,queryParams04);}
        await conn.commit();
     
    }
    await conn.commit();
    res.status(200).send({
      rows,fields
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
    const querystring="SELECT member_no FROM member_ WHERE member_email=?";
    const queryParams=[req.body.userId];
    const [rows,fields]=await conn.execute(querystring,queryParams);
     member_number=rows[0].member_no;
     const querystring02="DELETE FROM member_industry WHERE member_no=?";
     const queryParams02=[member_number];
     const [rows2,fields2]=await conn.execute(querystring02,queryParams02);
    
       for(var i=0; i< req.body.selectedindustries.length; i++){
         const queryString03=
         "SELECT * FROM member_industry WHERE member_no=? AND industry_no=?";
        const queryParams03=[member_number,req.body.selectedindustries[i]];
        const [rows,fields] = await conn.execute(queryString03,queryParams03 );
      
         if(Array.isArray(rows) && rows.length === 0)
         {const queryString04="INSERT INTO member_industry SET member_no=?,industry_no=?";
         const queryParams04=[member_number,req.body.selectedindustries[i]];
         const[rows,fields]=await conn.execute(queryString04,queryParams04);}
      
     
    }
    await conn.commit();
    res.status(200).send({
      rows,fields
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

router.get("/getselectedStocks/:id", async(req, res) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const querystring="SELECT member_no FROM member_ WHERE member_email=?";
    const queryParams=[req.params.id];
    const [rows,fields]=await conn.execute(querystring,queryParams);
     member_number=rows[0].member_no;
    const querystring02="SELECT company_no FROM member_company WHERE member_no=?";
    const queryParams02=[member_number];
    const [rows2,fields2]=await conn.execute(querystring02,queryParams02);
    await conn.commit();
    res.status(200).send({
      rows2,fields2
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

router.get("/getselectedIndustries/:id", async(req, res) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const querystring="SELECT member_no FROM member_ WHERE member_email=?";
    const queryParams=[req.params.id];
    const [rows,fields]=await conn.execute(querystring,queryParams);
     member_number=rows[0].member_no;
    const querystring02="SELECT industry_no FROM member_industry WHERE member_no=?";
    const queryParams02=[member_number];
    const [rows2,fields2]=await conn.execute(querystring02,queryParams02);
    await conn.commit();
    res.status(200).send({
      rows2,fields2
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
router.get("/getInterestStocks/:id", async(req, res) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const querystring="SELECT member_no FROM member_ WHERE member_email=?";
    const queryParams=[req.params.id];
    const [rows,fields]=await conn.execute(querystring,queryParams);
     member_number=rows[0].member_no;
    const querystring02="SELECT company_name FROM member_company LEFT OUTER JOIN company ON member_company.company_no=company.company_no WHERE member_no=?;";
    const queryParams02=[member_number];
    const [rows2,fields2]=await conn.execute(querystring02,queryParams02);
    await conn.commit();
    res.status(200).send({
      rows2,fields2
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

router.get("/getInterestIndustries/:id", async(req, res) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const querystring="SELECT member_no FROM member_ WHERE member_email=?";
    const queryParams=[req.params.id];
    const [rows,fields]=await conn.execute(querystring,queryParams);
     member_number=rows[0].member_no;
    const querystring02="SELECT industry_type FROM member_industry LEFT OUTER JOIN industry ON member_industry.industry_no=industry.industry_no WHERE member_no=?;";
    const queryParams02=[member_number];
    const [rows2,fields2]=await conn.execute(querystring02,queryParams02);
    await conn.commit();
    res.status(200).send({
      rows2,fields2
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

router.patch("/deleteInterestStocks", async(req, res) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const querystring="SELECT member_no FROM member_ WHERE member_email=?";
    const queryParams=[req.body.userId];
    const [rows,fields]=await conn.execute(querystring,queryParams);
     member_number=rows[0].member_no;
     const querystring02="SELECT company_no FROM company WHERE company_name=?";
    const queryParams02=[req.body.stock];
    const [rows2,fields2]=await conn.execute(querystring02,queryParams02);
     company_number=rows2[0].company_no;
     const querystring03="DELETE FROM member_company WHERE member_no=? AND company_no=?";
    const queryParams03=[member_number,company_number];
    const [rows3,fields3]=await conn.execute(querystring03,queryParams03);
    await conn.commit();
    res.status(200).send({
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
router.patch("/deleteInterestIndustries", async(req, res) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const querystring="SELECT member_no FROM member_ WHERE member_email=?";
    const queryParams=[req.body.userId];
    const [rows,fields]=await conn.execute(querystring,queryParams);
     member_number=rows[0].member_no;
     const querystring02="SELECT industry_no FROM industry WHERE industry_type=?";
    const queryParams02=[req.body.industry];
    const [rows2,fields2]=await conn.execute(querystring02,queryParams02);
     industry_number=rows2[0].industry_no;
     const querystring03="DELETE FROM member_industry WHERE member_no=? AND industry_no=?";
    const queryParams03=[member_number,industry_number];
    const [rows3,fields3]=await conn.execute(querystring03,queryParams03);
    await conn.commit();
    res.status(200).send({
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

module.exports = router;
