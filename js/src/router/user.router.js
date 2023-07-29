// Koa-router 是 koa 的一个路由中间件，
// 它可以将请求的URL和方法（如：GET 、 POST 、 PUT 、 DELETE 等） 
// 匹配到对应的响应程序或页面
const Router = require("koa-router");
const { create } = require('../controller/user.controller')

// 数据处理中间件
const { verifyUser, handlePassword } = require('../middleware/user.middleware')

// 通过调用 router.prefix(prefix) 来设置路由的前缀
const userRouter = new Router({ prefix: "/users" });

userRouter.post("/", verifyUser, handlePassword,create);

module.exports = userRouter
