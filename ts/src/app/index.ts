import koa from "koa";
const cors = require('koa2-cors');
const koaBody = require('koa-body');
import errorHandler from "./error-handle";
import {useRouter} from '@/router';
import {koaSwagger} from "koa2-swagger-ui";
import swaggerJSDoc from "swagger-jsdoc";
const fs = require('fs');
const path = require('path');

const app = new koa();
app.use(koaSwagger({
  routePrefix: '/swagger',
  swaggerOptions: {
    url: '/swagger.json'
  }
}))
// 处理跨域
app.use(cors({
  //设置允许来自指定域名请求
  origin: (ctx:any) => {
    return '*'  // 允许来自所有域名请求
  },
  maxAge: 5, //指定本次预检请求的有效期，单位为秒。
  credentials: true, //是否允许发送Cookie
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
}));
useRouter(app)
app.on("error", errorHandler);
export { app };