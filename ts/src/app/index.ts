// 这个主要是创建app，直接导入到main里
//const koa = require("koa");
import koa from "koa";
import bodyParser from "koa-bodyparser";
import errorHandler from "./error-handle";
import {useRouter} from '../router'; //引入路由
const app = new koa();

app.use(bodyParser()); //解析请求参数的
useRouter(app)
app.on("error", errorHandler);

export { app };