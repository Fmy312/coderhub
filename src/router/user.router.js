const router = require("koa-router");
const { create, CheckAvatar } = require("../controller/user.controller");
const publicVerify = require("../middleWare/publicMiddle");
const { UserVerify, handlePassword } = require("../middleWare/userMiddle");

const Router = new router({ prefix: "/users" });
Router.post("/", publicVerify, UserVerify, handlePassword, create);
Router.get("/:userId/avatar", CheckAvatar);

module.exports = Router;
