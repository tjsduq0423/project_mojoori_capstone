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

const content = (id, nickname) => http.post("/board/content", { id, nickname });

const like = (id, status, nickname) =>
  http.post("/board/like", { id, status, nickname });

const reply = (id, nickname, content) =>
  http.post("/board/replyWrite", { id, nickname, content });

const searchBoard = (searchData, theme) =>
  http.post("/board/searchBoard", { searchData, theme });

const classification = (text, theme) =>
  http.post("/board/classification", { text, theme });

export {
  board,
  write,
  modify,
  content,
  like,
  reply,
  myboard,
  deletearticle,
  getboard,
  searchBoard,
  classification,
};
