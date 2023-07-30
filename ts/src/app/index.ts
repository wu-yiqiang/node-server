import koa from "koa";
import bodyParser from "koa-bodyparser";
import errorHandler from "./error-handle";
import {useRouter} from '../router';
const app = new koa();
app.use(bodyParser()); //解析请求参数的
useRouter(app)
app.on("error", errorHandler);
export { app };