const service = require("../service/moment.service");
const { PICTURE_PATH } = require("../constants/file");
const fs = require("fs");
const { getFileInfoByFilename } = require("../service/file.service");
const { DONT_QUERY } = require("../constants/error-type");
class MomentController {
  async Create(ctx, next) {
    //获取用户id和发表的内容
    const userid = ctx.user.id;
    const content = ctx.request.body.content;
    const result = await service.createMoment(userid, content);
    ctx.body = result;
  }
  async detail(ctx, next) {
    const momentid = ctx.params.momentId;
    const [result] = await service.getMomentInfoById(momentid);
    return (ctx.body = result);
  }
  async list(ctx, next) {
    const { offest, size } = ctx.query;
    const result = await service.getMomentList(offest, size);
    ctx.body = result;
  }
  async Delete(ctx, next) {
    const id = ctx.params.momentId;
    const result = await service.deleteMomentById(id);
    ctx.body = result;
  }
  async Update(ctx, next) {
    const { content } = ctx.request.body;
    const { momentId } = ctx.params;
    await service.UpdateMomentById(momentId, content);
    ctx.body = "已修改~";
  }
  async addLabels(ctx, next) {
    const { labels } = ctx;
    const { momentId } = ctx.params;
    for (const label of labels) {
      //判断当前动态是否有这个标签若是没有则加上这个标签
      const flag = await service.haveLabel(momentId, label.id);
      if (!flag) await service.addLabel(momentId, label.id);
    }
    ctx.body = "添加标签成功~";
  }
  async checkFile(ctx, next) {
    let { filename } = ctx.params;
    const file = await getFileInfoByFilename(filename);
    const type = ctx.query?.type;
    const types = ["large", "middle", "small"];
    if (types.includes(type)) {
      filename = filename + "-" + type;
    }
    ctx.response.set("content-type", file.mimetype);
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`);
  }
}
module.exports = new MomentController();
