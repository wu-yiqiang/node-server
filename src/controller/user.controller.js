const service = require('../service/user.service')

class UserController{
  async create(ctx,next){
    // 获取用户请求参数
    const user = ctx.request.body
    // 查数据库
    const result = await service.create(user)

    // 返回数据
    ctx.body = result

  }
}

module.exports = new UserController