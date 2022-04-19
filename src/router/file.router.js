const Router = require("koa-router");
const { VerifyAuth } = require("../middleWare/authMiddle");

const {
  avatarHandler,
  picturesHandler,
  pictureResize,
} = require("../middleWare/fileMiddle");
const {
  SaveAvaterInfo,
  SavePicturesInfo,
} = require("../controller/file.controller");
const { VerifyCurCount } = require("../middleWare/momentMiddle");
const FileRouter = new Router({ prefix: "/upload" });

FileRouter.post("/avatar", VerifyAuth, avatarHandler, SaveAvaterInfo);
FileRouter.post(
  "/:momentId/pictures",
  VerifyAuth,
  VerifyCurCount,
  picturesHandler,
  pictureResize,
  SavePicturesInfo
);

module.exports = FileRouter;
