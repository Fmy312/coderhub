const { CreateLabel, getLabelList } = require("../service/label.service");
class LabelController {
  async Create(ctx, next) {
    const { name } = ctx.request.body;
    const result = await CreateLabel(name);
    ctx.body = result;
  }
  async Limit(ctx, next) {
    const { limit, offest } = ctx.query;
    const result = await getLabelList(limit, offest);
    ctx.body = result;
  }
}
module.exports = new LabelController();
