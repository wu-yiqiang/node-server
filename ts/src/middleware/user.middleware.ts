import {Response} from "@/type/response.type";
import service from "@/service/user.service";
import {md5password} from "@/utils/password-handle"
export const verifyUser = async (ctx:any, next:any) => {
  const { name, password } = ctx.request.body;
  console.log('asd', name, password)
  // 判空
  if (!name || !password) {
    const response: Response =  {
      code: 200,
      data: [],
      msg: '',
    }
    return ctx.body = response
  }

  // 判断唯一
  const result = await service.getUserByName(name);
  if (result.length) {
    const response: Response =  {
      code: 200,
      data: [],
      msg: '该用户已注册',
    }
    return ctx.body = response;
  }
  await next(); //只有执行了next，后面的create才可以继续执行
};


// 对密码加密
export const handlePassword = async (ctx:any, next:any) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = md5password(password);
  await next()
};

