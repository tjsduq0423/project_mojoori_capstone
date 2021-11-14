import http from "@/api/http";

const login = (userId, password, stateMaintain) =>
  http.post("/auth/login", { userId, password, stateMaintain });

const logout = () => http.post("/auth/logout");

const getUser = () => http.get("/auth/user");

export { login, logout, getUser };
