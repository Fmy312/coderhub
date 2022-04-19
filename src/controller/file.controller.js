const {
  uploadAvatar,
  updateAvatarUrl,
  uploadFiles,
} = require("../service/file.service");
const { APP_HOST, APP_PORT } = require("../app/config");
class FileController {
  async SaveAvaterInfo(ctx, next) {
    const { mimetype, size, filename } = ctx.req.file;
    const { id } = ctx.user;
    //在avatar表里保存头像信息
    const result = await uploadAvatar(mimetype, size, filename, id);
    const Url = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`;
    //在user里加上头像的地址
    await updateAvatarUrl(Url, id);
    ctx.body = result;
  }
  async SavePicturesInfo(ctx, next) {
    const files = ctx.req.files;
    const { id } = ctx.user;
    const { momentId } = ctx.params;
    for (const file of files) {
      const { mimetype, size, filename } = file;
      await uploadFiles(mimetype, size, filename, id, momentId);
    }
    ctx.body = "上传成功~";
  }
}
module.exports = new FileController();
