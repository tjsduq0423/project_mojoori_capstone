import http from "@/api/http";

const stock = () => http.get("/interest/stocks", {});

const industry = () => http.get("/interest/industries", {});

const registerStocks = (userId, selectedstocks) =>
  http.post("/interest/registerStocks", { userId, selectedstocks });

const registerIndustries = (userId, selectedindustries) =>
  http.post("/interest/registerIndustries", { userId, selectedindustries });

const getinterestStocks = (userId) =>
  http.get("/interest/getinterestStocks", { userId });

const getinterestIndustries = (userId) =>
  http.get("/interest/getinterestIndustries", { userId });

export {
  stock,
  industry,
  registerStocks,
  registerIndustries,
  getinterestStocks,
  getinterestIndustries,
};
