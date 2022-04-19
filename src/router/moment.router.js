const Router = require("koa-router");
const { VerifyAuth } = require("../middleWare/authMiddle");
const { VerifyCurCount, CheckTheInfo } = require("../middleWare/momentMiddle");
const { VerifyLabelsExists } = require("../middleWare/labelMiddle");
const {
  Create,
  detail,
  list,
  Delete,
  Update,
  addLabels,
  checkFile,
} = require("../controller/moment.controller");

const MomentRouter = new Router({ prefix: "/momment" });

MomentRouter.post("/", VerifyAuth, Create);
MomentRouter.get("/list", list);
MomentRouter.get("/:momentId", CheckTheInfo, detail);
MomentRouter.delete(
  "/delete/:momentId",
  VerifyAuth,
  CheckTheInfo,
  VerifyCurCount,
  Delete
);
MomentRouter.get("/images/:filename", checkFile);
MomentRouter.patch(
  "/updata/:momentId",
  VerifyAuth,
  CheckTheInfo,
  VerifyCurCount,
  Update
);
MomentRouter.post(
  "/:momentId/labels",
  VerifyAuth,
  CheckTheInfo,
  VerifyCurCount,
  VerifyLabelsExists,
  addLabels
);
module.exports = MomentRouter;
