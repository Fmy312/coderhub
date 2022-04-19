const ErrorTypes = require("../constants/error-type");
//公共检验逻辑
const publicVerify = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  //判断账号和密码是否符合规范
  if (!name || !password) {
    const error = new Error(ErrorTypes.NAME_OR_PASSWORED_REQUIRED);
    return ctx.app.emit("Error", error, ctx);
  }
  await next();
};
module.exports = publicVerify;
