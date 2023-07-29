const NAME_PWD_IS_REQUIRED = "用户名和密码不能为空";

export const userError = {
  NAME_PWD_IS_REQUIRED: "用户名和密码不能为空"
}
//const errorHandler = (error, ctx) => {
//  let status, message;
//  console.log('error', error);
//  if (error.message === NAME_PWD_IS_REQUIRED) {
//    status = 400;
//    message = "用户名或密码不能为空";
//    return
//  }
//  if (error.message === errorType.NAME_OR_PWD_IS_REQUIRED) {
//    status = 400;
//    message = "用户名或密码不能为空";
//    return
//  }
//  if (error.message === errorType.NAME_OR_PWD_IS_REQUIRED) {
//    status = 400;
//    message = "用户名或密码不能为空";
//    return
//  }
//  if (error.message === errorType.NAME_OR_PWD_IS_REQUIRED) {
//    status = 400;
//    message = "用户名或密码不能为空";
//    return
//  } else {
//    status = 500;
//    message = "用户名或密码不能为空";
//  }
//  ctx.status = status;
//  ctx.body = message;
//};