import http from "@/api/http";

const stock = () => http.get("/interest/stocks");
const industry = () => http.get("/interest/industries");

export { stock, industry };
