import Router from "koa-router";
import authController from '@/controller/auth.controller';
import {verifyLogin} from '@/middleware/auth.middleware';
const authRouter = new Router();

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
authRouter.post("/login", verifyLogin, authController.login);

export = authRouter;
