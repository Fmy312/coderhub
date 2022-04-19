const ErrorTypes = require("../constants/error-type");

const errorHandler = (error, ctx) => {
  let status, message;
  switch (error.message) {
    case ErrorTypes.NAME_OR_PASSWORED_REQUIRED:
      status = 400; //参数错误
      message = "账号或密码不规范~";
      break;
    case ErrorTypes.USER_ALREADY_REGISTERED:
      status = 409; //confict
      message = "账号已被注册~";
      break;
    case ErrorTypes.USER_NOT_EXISTS:
      status = 400; //参数错误
      message = "用户名不存在~";
      break;
    case ErrorTypes.USER_PASSWORD_ERROR:
      status = 400; //参数错误·
      message = "密码错误~";
      break;
    case ErrorTypes.UNAUTHORIZATION:
      status = 401; //无权限·
      message = "无效的token~";
      break;
    case ErrorTypes.DONT_QUERY:
      status = 418; //随便写的·
      message = "没有该条数据~";
      break;
    case ErrorTypes.No_PROMISE:
      status = 403; //客户端没有访问内容的权限·
      message = "无此权限~";
      break;
    case ErrorTypes.LABEL_ALREADY_EXISTS:
      status = 409; //conflct·
      message = "标签已存在~";
      break;
    default: //Not Found
      status = 404;
      message = "NOT-FOUND";
  }
  ctx.status = status;
  ctx.body = message;
};
module.exports = {
  errorHandler,
};
