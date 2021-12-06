import http from "@/api/http";

const report = () => http.get("/report");
const likeReport = (userId) => http.post("/report/likeReport", { userId });
const callLikeReport = (userId) =>
  http.post("/report/callLikeReport", { userId });
const callInterestCorporationData = (tags) =>
  http.post("/report/callInterestCorporationData", { tags });
const likeReports = (userId, report_no) =>
  http.patch("/report/likeReports", { userId, report_no });
const unlikeReports = (userId, report_no) =>
  http.patch("/report/unlikeReports", { userId, report_no });
export {
  report,
  likeReport,
  callLikeReport,
  callInterestCorporationData,
  likeReports,
  unlikeReports,
};
