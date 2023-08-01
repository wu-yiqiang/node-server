// Koa-router 是 koa 的一个路由中间件，
// 它可以将请求的URL和方法（如：GET 、 POST 、 PUT 、 DELETE 等） 
// 匹配到对应的响应程序或页面
import Router from "koa-router";
import userService from "../controller/user.controller"
// 数据处理中间件
import { verifyUser, handlePassword } from "../middleware/user.middleware";
// 通过调用 router.prefix(prefix) 来设置路由的前缀
const userRouter = new Router({ prefix: "/users" });
userRouter.post("/", verifyUser, handlePassword,userService.create);

export = userRouter
