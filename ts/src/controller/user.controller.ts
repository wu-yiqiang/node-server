//const service = require('../service/user.service')
import service from "../service/user.service";
import * as console from "console";
class UserController{
  async create(ctx:any,next:any){
    // 获取用户请求参数
    const user = ctx.request.body
    // 查数据库
    const result = await service.create(user)
    // 返回数据
    ctx.body = result
    await next()
  }
}

export default new UserController