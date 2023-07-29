import {Response} from "../type/response.type";
import service from "../service/user.service";
import {md5password} from "../utils/password-handle"
const verifyUser = async (ctx:any, next:any) => {
  // 获取
  const { name, password } = ctx.request.body;
  // 判空
  if (!name || !password) {
    const response: Response =  {
      code: 200,
      data: [],
      msg: 'sadsa',
    }
    return ctx.body = response
  }

  // 判断唯一
  const result = await service.getUserByName(name);
  //如果length不是0（判断为真）说明已经存在，抛出错误
  if (result.length) {
    const error = new Error('asda');
    return ctx.app.emit("error", error, ctx);
  }
  await next(); //只有执行了next，后面的create才可以继续执行
};


// 对密码加密
const handlePassword = async (ctx:any, next:any) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = md5password(password);
  await next()
};


module.exports = {
  verifyUser,
  handlePassword
};
