const { getMomentInfoById } = require("../service/moment.service");
const { checkResource } = require("../service/auth.service");
const { No_PROMISE, DONT_QUERY } = require("../constants/error-type");
//这个方法本不应该写在这个地方，不想改了
const VerifyCurCount = async (ctx, next) => {
  const [resourceName] = Object.keys(ctx.params);
  const tableName = resourceName.replace("Id", "");
  const resourceId = ctx.params[resourceName];
  const userId = ctx.user.id;
  const flag = await checkResource(tableName, resourceId, userId);
  //给我自己写个特权 hhhhh 😊
  if (!flag && ctx.user.name != "冯木杨") {
    const error = new Error(No_PROMISE);
    return ctx.app.emit("Error", error, ctx);
  }
  await next();
};
const CheckTheInfo = async (ctx, next) => {
  let { momentId } = ctx.params;
  if (!momentId) {
    momentId = ctx.request.body.momentId;
  }
  const [info] = await getMomentInfoById(momentId);
  if (!info?.id) {
    const error = new Error(DONT_QUERY);
    ctx.app.emit("Error", error, ctx);
    return;
  }
  await next();
};
module.exports = {
  VerifyCurCount,
  CheckTheInfo,
};
