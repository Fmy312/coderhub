const service = require("../service/user.service");
const md5Password = require("../utils/password-handle");

//检验账号密码
const UserVerify = async (ctx, next) => {
  //获取账号和密码
  const { name, password } = ctx.request.body;
  //判断数据库里是否已经有了这个数据
  const result = await service.getNameUser(name);
  if (result.length) {
    const error = new Error("user_already_registered");
    return ctx.app.emit("Error", error, ctx);
  }
  //执行下一个中间件
  await next();
};
//给密码加密
const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = md5Password(password);
  await next();
};
module.exports = {
  UserVerify,
  handlePassword,
};
