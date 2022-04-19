const fs = require("fs");
const { AVATAR_PATH } = require("../constants/file");
const service = require("../service/user.service");
const { getAvatarInfoByUserId } = require("../service/file.service");
class UserController {
  async create(ctx, next) {
    //获取参数
    const user = ctx.request.body;
    //操作数据
    const result = await service.create(user);
    //返回数据
    ctx.body = {
      code: 200,
      message: "注册成功",
    };
  }
  async CheckAvatar(ctx, next) {
    const { userId } = ctx.params;
    const info = await getAvatarInfoByUserId(userId);
    //查看头像的一种方法
    ctx.response.set("content-type", info.mimetype);
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${info.filename}`);
  }
}
module.exports = new UserController();
