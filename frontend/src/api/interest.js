import http from "@/api/http";

const stock = () => http.get("/interest/stocks", {});

const industry = () => http.get("/interest/industries", {});

const registerStocks = (userId, selectedstocks) =>
  http.post("/interest/registerStocks", { userId, selectedstocks });

const registerIndustries = (userId, selectedindustries) =>
  http.post("/interest/registerIndustries", { userId, selectedindustries });

const getInterestStocks = (userId) =>
  http.get("/interest/getInterestStocks", { userId });

const getInterestIndustries = (userId) =>
  http.get("/interest/getInterestIndustries", { userId });

const deleteInterestStocks = (userId, stock) =>
  http.patch("/interest/deleteInterestStocks", { userId, stock });

const deleteInterestIndustries = (userId, industry) =>
  http.patch("/interest/deleteInterestIndustries", { userId, industry });
export {
  stock,
  industry,
  registerStocks,
  registerIndustries,
  getInterestStocks,
  getInterestIndustries,
  deleteInterestStocks,
  deleteInterestIndustries,
};
