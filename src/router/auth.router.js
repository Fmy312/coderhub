const Router = require("koa-router");
const publicVerify = require("../middleWare/publicMiddle");
const { VerifyLogin, VerifyAuth } = require("../middleWare/authMiddle");
const { Login, success } = require("../controller/auth.controller");

const AuthRouter = new Router();

AuthRouter.post("/login", publicVerify, VerifyLogin, Login);

//测试接口
/* AuthRouter.get("/test",VerifyAuth,success); */

module.exports = AuthRouter;
