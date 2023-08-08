//const errorType = require('../constants/error-types')// 获取错误常量
import errorType from  '@/constants/error-types'
const errorHandler = (error:any , ctx: any) => {
  let status, message;
  console.log('error', error);
  switch (error.message) {
    case errorType.NAME_OR_PWD_IS_REQUIRED:
      status = 400;
      message = "用户名或密码不能为空";
      break;case errorType.NAME_OR_PWD_IS_REQUIRED:
        status = 400;
        message = "用户名或密码不能为空";
        break;
      default:
        status = 404;
        message = "NOT FOUND";
        break;
  }

  ctx.status = status;
  ctx.body = message;
};

export = errorHandler;