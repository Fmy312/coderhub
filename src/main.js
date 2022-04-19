const app = require("./app");
//加载数据库
require("./app/database");
//引入环境变量
const dotenv = require("./app/config");
app.listen(dotenv.APP_PORT, () => {
  console.log(`服务器在${dotenv.APP_PORT}端口 启动成功`);
});
