import http from "@/api/http";

const report = () => http.get("/report");
const CorporationReport = () => http.get("/report/CorporationReport");
const IndustryReport = () => http.get("/report/IndustryReport");
const MarketReport = () => http.get("/report/MarketReport");
const likeReport = (userId) => http.post("/report/likeReport", { userId });

const SearchReport = (search) => http.post("/report/SearchReport", { search });

const callLikeReport = (userId) =>
  http.post("/report/callLikeReport", { userId });
const callInterestCorporationData = (tags) =>
  http.post("/report/callInterestCorporationData", { tags });
const callInterestIndustryData = (tags) =>
  http.post("/report/callInterestIndustryData", { tags });
const likeReports = (userId, report_no) =>
  http.patch("/report/likeReports", { userId, report_no });
const unlikeReports = (userId, report_no) =>
  http.patch("/report/unlikeReports", { userId, report_no });
export {
  report,
  CorporationReport,
  SearchReport,
  IndustryReport,
  MarketReport,
  likeReport,
  callLikeReport,
  callInterestCorporationData,
  callInterestIndustryData,
  likeReports,
  unlikeReports,
};
