const {
  CreateComment,
  CreateCommentToComment,
  UpdateComment,
  DeleteComment,
  getCommentByMomentId,
} = require("../service/comment.service");

class CommentControeller {
  async Create(ctx, next) {
    const { momentId, content } = ctx.request.body;
    const { id } = ctx.user;
    await CreateComment(content, id, momentId);
    ctx.body = "创建成功~";
  }
  async Reply(ctx, next) {
    const { momentId, content } = ctx.request.body;
    const { commentId } = ctx.params;
    const { id } = ctx.user;
    await CreateCommentToComment(content, id, momentId, commentId);
    ctx.body = "创建成功~";
  }
  async Update(ctx, next) {
    const { commentId } = ctx.params;
    const { content } = ctx.request.body;
    await UpdateComment(commentId, content);
    ctx.body = "修改成功!";
  }
  async Delete(ctx, next) {
    const { commentId } = ctx.params;
    await DeleteComment(commentId);
    ctx.body = "删除成功~";
  }
  async List(ctx, next) {
    const { momentId } = ctx.query;
    const result = await getCommentByMomentId(momentId);
    ctx.body = result;
  }
}
module.exports = new CommentControeller();
