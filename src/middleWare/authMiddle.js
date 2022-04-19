const jwt = require("jsonwebtoken");

const service = require("../service/user.service");
const ErrorTypes = require("../constants/error-type");
const md5Password = require("../utils/password-handle");
const { PUBLIC_KEY } = require("../app/config");

const VerifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  //判断账号是否存在
  const result = await service.getNameUser(name);
  const user = result[0];
  if (!user) {
    const error = new Error(ErrorTypes.USER_NOT_EXISTS);
    return ctx.app.emit("Error", error, ctx);
  }
  //判断密码是否一致
  if (md5Password(password) !== user.password) {
    const error = new Error(ErrorTypes.USER_PASSWORD_ERROR);
    return ctx.app.emit("Error", error, ctx);
  }
  ctx.user = user;
  await next();
};
const VerifyAuth = async (ctx, next) => {
  try {
    const authorization = ctx.headers.authorization;
    const token = authorization.replace("Bearer ", "");
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    ctx.user = result;
    await next();
  } catch (err) {
    const error = new Error(ErrorTypes.UNAUTHORIZATION);
    ctx.app.emit("Error", error, ctx);
  }
};
module.exports = {
  VerifyLogin,
  VerifyAuth,
};
