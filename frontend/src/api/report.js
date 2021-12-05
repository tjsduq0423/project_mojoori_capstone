import http from "@/api/http";

const report = () => http.get("/report");
const likereport = () => http.get("/report/likereport");
const likeReports = (userId, report_no) =>
  http.patch("/report/likeReports", { userId, report_no });
const unlikeReports = (userId, title) =>
  http.patch("/report/unlikeReports", { userId, title });
export { report, likereport, likeReports, unlikeReports };
