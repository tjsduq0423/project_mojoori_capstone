import http from "@/api/http";

const signUp = (userId, password, nickname) =>
  http.post("/auth/signUp", { userId, password, nickname });

const login = (userId, password, stateMaintain) =>
  http.post("/auth/login", { userId, password, stateMaintain });

const logout = () => http.post("/auth/logout");

const getUser = () => http.get("/auth/user");

const changePassword = (userId, password, newPassword) =>
  http.post("/auth/changePassword", { userId, password, newPassword });

const emailAuth = (token) => http.post("/auth/emailAuth", { token });

const passwordTransport = (email) => http.post("/auth/findPassword", { email });

export {
  signUp,
  login,
  logout,
  getUser,
  changePassword,
  emailAuth,
  passwordTransport,
};
