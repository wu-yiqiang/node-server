const errorType = require('../constants/error-types')// 获取错误常量
const service = require("../service/user.service"); //判断是否存在
const verifyUser = async (ctx, next) => {
  // 获取
  const { name, password } = ctx.request.body;

  // 判空
  if (!name || !password || name === "" || password === "") {
    const error = new Error(errorType.NAME_OR_PWD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }

  // 判断唯一
  const result = await service.getUserByName(name);
  //如果length不是0（判断为真）说明已经存在，抛出错误
  if (result.length) {
    const error = new Error(errorType.USER_ALREADY_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }

  await next(); //只有执行了next，后面的create才可以继续执行
};


module.exports = {
  verifyUser,
};
