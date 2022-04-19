const Connection = require("../app/database");
const { PublicCreate } = require("./public.service");
class CommentService {
  async CreateComment(content, userid, momentId) {
    await PublicCreate(
      "comment",
      "content,user_id,moment_id",
      "(?,?,?)",
      content,
      userid,
      momentId
    );
  }
  async CreateCommentToComment(content, userid, momentId, commentId) {
    await PublicCreate(
      "comment",
      "content,user_id,moment_id,comment_id",
      "(?,?,?,?)",
      content,
      userid,
      momentId,
      commentId
    );
  }
  async UpdateComment(commentId, content) {
    const statement = `UPDATE comment SET content=? WHERE id=?`;
    await Connection.execute(statement, [content, commentId]);
  }
  async DeleteComment(commentId) {
    const statement = `DELETE FROM comment WHERE id=?`;
    await Connection.execute(statement, [commentId]);
  }
  async getCommentByMomentId(momentId) {
    const statement = `
    SELECT c.id id,
    c.content content,
    c.moment_id momentId,
    c.comment_id commentId,
    JSON_OBJECT( 'id', u.id, 'name', u.NAME ) author
    FROM comment c LEFT JOIN user u ON c.user_id=u.id
    WHERE
    c.moment_id=?`;
    const result = await Connection.execute(statement, [momentId]);
    return result[0];
  }
}
module.exports = new CommentService();
