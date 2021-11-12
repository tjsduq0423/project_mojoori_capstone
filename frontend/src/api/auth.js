import http from "@/api/http";

export function login(userid, password, stateMaintain) {
  return http.post("/auth/login", { userid, password, stateMaintain });
}
