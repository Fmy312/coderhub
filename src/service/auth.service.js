const { getResourceAbout } = require("./moment.service");
class authService {
  async checkResource(tableName, Id, userId) {
    const [{ id }] = await getResourceAbout(tableName, Id);
    return userId == id;
  }
}
module.exports = new authService();
