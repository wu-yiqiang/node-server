// 这个主要是创建app，直接导入到main里
const koa = require("koa");
const bodyParser = require("koa-bodyparser"); //解析请求参数的
const errorHandler = require("./error-handle"); //处理错误函数
const useRouter = require('../router');//引入路由

const app = new koa();

app.use(bodyParser()); //解析请求参数的
useRouter(app)
app.on("error", errorHandler);

module.exports = app;