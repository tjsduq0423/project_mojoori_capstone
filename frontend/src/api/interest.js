import http from "@/api/http";

const stock = () => http.get("/interest/stocks", {});

const industry = () => http.get("/interest/industries", {});

const author = () => http.get("/interest/authors", {});

const registerStocks = (userId, selectedstocks) =>
  http.post("/interest/registerStocks", { userId, selectedstocks });

const registerIndustries = (userId, selectedindustries) =>
  http.post("/interest/registerIndustries", { userId, selectedindustries });

const getselectedStocks = (userId) =>
  http.get("/interest/getselectedStocks/" + userId);

const getSearchStocks = (search) =>
  http.get("/interest/getSearchStocks?key1=" + search);

const getselectedIndustries = (userId) =>
  http.get("/interest/getselectedIndustries/" + userId);

const getInterestStocks = (userId) =>
  http.get("/interest/getInterestStocks/" + userId);
// const getInterestStocks = (userId) =>
// http.get("/interest/getInterestStocks?key1=" + userId);

const getInterestIndustries = (userId) =>
  http.get("/interest/getInterestIndustries/" + userId);

const deleteInterestStocks = (userId, stock) =>
  http.patch("/interest/deleteInterestStocks", { userId, stock });

const deleteInterestIndustries = (userId, industry) =>
  http.patch("/interest/deleteInterestIndustries", { userId, industry });
export {
  stock,
  industry,
  author,
  registerStocks,
  registerIndustries,
  getInterestStocks,
  getInterestIndustries,
  deleteInterestStocks,
  deleteInterestIndustries,
  getselectedStocks,
  getselectedIndustries,
  getSearchStocks,
};
