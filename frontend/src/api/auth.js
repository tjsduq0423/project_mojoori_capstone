import http from "@/api/http";

const login = (userid, password, stateMaintain) =>
  http.post("/auth/login", { userid, password, stateMaintain });

const logout = () => {
  http.post("/auth/logout");
};
export { login, logout };
