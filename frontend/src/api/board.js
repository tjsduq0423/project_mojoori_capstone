import http from "@/api/http";

const board = (theme) => http.post("/board/articles", { theme });

const write = (writer, title, content, theme) =>
  http.post("/board/write", { writer, title, content, theme });

const content = (id) => http.post("/board/content", { id });

const like = (id, status, likeCount, nickname) =>
  http.post("/board/like", { id, status, likeCount, nickname });

export { board, write, content, like };
