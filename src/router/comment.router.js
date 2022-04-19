const router = require("koa-router");
const { VerifyAuth } = require("../middleWare/authMiddle");
const {
  Create,
  Reply,
  Update,
  Delete,
  List,
} = require("../controller/comment.controller");
const { VerifyCurCount, CheckTheInfo } = require("../middleWare/momentMiddle");

const CommentRouter = new router({ prefix: "/comment" });

CommentRouter.post("/", VerifyAuth, CheckTheInfo, Create);
CommentRouter.post("/:commentId/reply", VerifyAuth, Reply);
CommentRouter.patch("/:commentId/update", VerifyAuth, VerifyCurCount, Update);
CommentRouter.delete("/:commentId/delete", VerifyAuth, VerifyCurCount, Delete);
CommentRouter.get("/", List);
module.exports = CommentRouter;
