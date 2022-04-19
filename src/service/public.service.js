const Connection = require("../app/database");
class PublicService {
  async PublicCreate(TableName, props, qmCount, ...value) {
    const statement = `
    INSERT INTO ${TableName}(${props})VALUES${qmCount}
    `;
    await Connection.execute(statement, value);
  }
}
module.exports = new PublicService();
