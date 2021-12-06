import http from "@/api/http";

const board = (theme) => http.post("/board/articles", { theme });

const write = (writer, title, content, theme) =>
  http.post("/board/write", { writer, title, content, theme });

const content = (id, nickname) => http.post("/board/content", { id, nickname });

const like = (id, status, nickname) =>
  http.post("/board/like", { id, status, nickname });

const reply = (id, nickname, content) =>
  http.post("/board/replyWrite", { id, nickname, content });

export { board, write, content, like, reply };
