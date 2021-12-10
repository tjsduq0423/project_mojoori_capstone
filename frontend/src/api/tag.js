import http from "@/api/http";

const PopularStock = () => http.get("/tag/PopularStock");
const PopularIndustry = () => http.get("/tag/PopularIndustry");
const PopularAuthor = () => http.get("/tag/PopularAuthor");
export { PopularStock, PopularIndustry, PopularAuthor };
