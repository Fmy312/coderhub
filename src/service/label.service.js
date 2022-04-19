const Connection = require("../app/database");
class LabelService {
  async CreateLabel(name) {
    const statement = `
      INSERT INTO label (name) VALUES(?)
      `;
    const result = await Connection.execute(statement, [name]);
    return result[0];
  }
  async getLabelInfo(name) {
    const statement = `
      SELECT * FROM label WHERE name=?`;
    const [result] = await Connection.execute(statement, [name]);
    return result[0];
  }
  async getLabelList(limit, offest) {
    const statement = `SELECT * FROM label LIMIT ?,?;`;
    const result = await Connection.execute(statement, [offest, limit]);
    return result[0];
  }
}
module.exports = new LabelService();
