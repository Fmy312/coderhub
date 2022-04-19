const koa = require("koa");
const bodyparser = require("koa-bodyparser");
const useRouter = require("../router");
const { errorHandler } = require("./err-handler");

const app = new koa();
app.useRouter = useRouter;
app.use(bodyparser());
app.useRouter();

app.on("Error", errorHandler);

module.exports = app;
