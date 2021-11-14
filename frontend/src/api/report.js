import http from "@/api/http";

const report = () => http.get("/report");

export { report };
