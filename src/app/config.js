const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();

//注意相对路径的相对值
const PRIVATE_KEY = fs.readFileSync("./src/app/key/private.key");
const PUBLIC_KEY = fs.readFileSync("./src/app/key/public.key");
module.exports = {
  APP_HOST,
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_PASSWORD,
  MYSQL_USER,
} = process.env;
module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;
