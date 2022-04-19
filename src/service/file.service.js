const Connection = require("../app/database");
class FileService {
  async uploadAvatar(mimetype, size, filename, id) {
    const statement = `INSERT INTO avatar (mimetype,size,filename,user_id) VALUES(?,?,?,?)`;
    const [result] = await Connection.execute(statement, [
      mimetype,
      size,
      filename,
      id,
    ]);
    return result;
  }
  async getAvatarInfoByUserId(userId) {
    const statement = `SELECT * FROM avatar WHERE user_id=?`;
    const [result] = await Connection.execute(statement, [userId]);
    return result[0];
  }
  async updateAvatarUrl(url, id) {
    const statement = `	UPDATE user SET avatar_url=? WHERE id=?`;
    const result = await Connection.execute(statement, [url, id]);
    return;
  }
  async uploadFiles(mimetype, size, filename, userId, momentId) {
    const statement = `
    INSERT INTO files (mimetype,size,filename,moment_id,user_id) VALUES(?,?,?,?,?)
    `;
    await Connection.execute(statement, [
      mimetype,
      size,
      filename,
      momentId,
      userId,
    ]);
    return;
  }
  async getFileInfoByFilename(filename) {
    const statement = `SELECT * FROM files WHERE filename=?`;
    const [result] = await Connection.query(statement, filename);
    return result[0];
  }
}
module.exports = new FileService();
