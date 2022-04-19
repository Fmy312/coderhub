const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../app/config");
class AuthController {
  async Login(ctx, next) {
    const { id, name } = ctx.user;
    //生成token并返回给用户
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: "RS256",
    });
    ctx.status = 200;
    ctx.body = {
      id,
      name,
      token,
    };
  }
  async success(ctx, next) {
    ctx.body = "授权成功~";
  }
}
module.exports = new AuthController();
