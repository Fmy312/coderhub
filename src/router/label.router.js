const Router = require("koa-router");
const { VerifyAuth } = require("../middleWare/authMiddle");
const { Create,Limit } = require("../controller/label.controller");
const LabelRouter = new Router({ prefix: "/label" });

LabelRouter.post("/create", VerifyAuth, Create);
LabelRouter.get("/",Limit)

module.exports = LabelRouter;
