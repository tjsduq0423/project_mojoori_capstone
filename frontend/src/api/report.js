import http from "@/api/http";

const report = () => http.get("/report");
const likereport = () => http.get("/report/likereport");
const likeReports = (userId, title) =>
  http.patch("/report/likeReports", { userId, title });
const unlikeReports = (userId, title) =>
  http.patch("/report/unlikeReports", { userId, title });
export { report, likereport, likeReports, unlikeReports };
