const { getLabelInfo, CreateLabel } = require("../service/label.service");
const { LABEL_ALREADY_EXISTS } = require("../constants/error-type");

const VerifyLabelsExists = async (ctx, next) => {
  const { labels } = ctx.request.body;
  const newLabels = [];
  for (const name of labels) {
    const labelResult = await getLabelInfo(name);
    const label = { name };
    if (!labelResult) {
      const result = await CreateLabel(name);
      label.id = result.insertId;
    } else {
      label.id = labelResult.id;
    }
    newLabels.push(label);
  }
  ctx.labels = newLabels;
  await next();
};
module.exports = {
  VerifyLabelsExists,
};
