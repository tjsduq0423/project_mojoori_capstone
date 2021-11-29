import http from "@/api/http";

const board = (theme) => http.post("/board/articles", { theme });

const myboard = (id) => http.post("/board/myboard", { id });

const deletearticle = (boardId) =>
  http.post("/board/deletearticle", { boardId });

const getboard = (Id) => http.post("/board/getboard", { Id });

const modify = (title, content, theme, id) =>
  http.post("/board/modify", { title, content, theme, id });

const write = (writer, title, content, theme) =>
  http.post("/board/write", { writer, title, content, theme });

const content = (id) => http.post("/board/content", { id });

const like = (id, status, likeCount, nickname) =>
  http.post("/board/like", { id, status, likeCount, nickname });

export {
  board,
  write,
  modify,
  content,
  like,
  myboard,
  deletearticle,
  getboard,
};
