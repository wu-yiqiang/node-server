const errorType = require('../constants/error-types')// 获取错误常量

const errorHandler = (error, ctx) => {
  let status, message;

  switch (error.message) {
    case errorType.NAME_OR_PWD_IS_REQUIRED:
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

module.exports = errorHandler;