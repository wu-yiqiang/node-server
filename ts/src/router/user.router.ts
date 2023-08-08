// Koa-router 是 koa 的一个路由中间件，
// 它可以将请求的URL和方法（如：GET 、 POST 、 PUT 、 DELETE 等） 
// 匹配到对应的响应程序或页面
import Router from "koa-router";
import userService from '@/controller/user.controller'
// 数据处理中间件
import { verifyUser, handlePassword } from "@/middleware/user.middleware";
// 通过调用 router.prefix(prefix) 来设置路由的前缀
const userRouter = new Router({ prefix: "/user" });

/**
 * @swagger
 * /user/login: # 接口地址
 *   post: # 请求体
 *     description: 用户登入 # 接口信息
 *     tags: [用户鉴权模块] # 模块名称
 *     produces: 
 *       - application/x-www-form-urlencoded # 响应内容类型
 *     parameters: # 请求参数
 *       - name: password
 *         description: 用户密码
 *         in: formData # 参数的位置，可能的值有 "query", "header", "path" 或 "cookie" 没有formData，但是我加了不报错
 *         required: true
 *         type: string
 *       - name: name
 *         description: 用户名
 *         in: formData
 *         required: true
 *         type: string # 可能的值有string、number、file（文件）等
 *     responses:
 *       '200':
 *         description: Ok
 *         schema: # 返回体说明
 *           type: 'object'
 *           properties:
 *             code:
 *               type: 'number'
 *             data:
 *               type: 'object'
 *               description: 返回数据
 *             message:
 *               type: 'string'
 *               description: 消息提示
 *       '400':
 *         description: 请求参数错误
 *       '404':
 *         description: not found
 */
userRouter.post("/login", verifyUser, handlePassword, userService.create);

export = userRouter
