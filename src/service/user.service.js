//根据数据库有关的操作
const connection = require("../app/database");
class UserService {
  async create(user) {
    const { name, password } = user;
    const statement = `INSERT INTO user (name,password) VALUE(?,?);`;
    const result = await connection.execute(statement, [name, password]);
    return result;
  }
  //根据用户名在数据库查找
  async getNameUser(name) {
    const statement = `	SELECT * FROM user WHERE name=?`;
    const result = await connection.execute(statement, [name]);
    return result[0];
  }
}
module.exports = new UserService();
