import errorType from "../constants/error-types";
import service from "@/service/user.service";
import {md5password} from "@/utils/password-handle";
const verifyLogin = async (ctx:any, next:any) => {
  // 1, get name & password
  const { name, password } = ctx.request.body;

  // 2, check empty
  if (!name || !password) {
    const error = new Error('sadsa');
    return ctx.app.emit("error", error, ctx);
  }

  // 3, check user is exists
  const result = await service.getUserByName(name);
  const user = result[0];
  if (!user) {
    const error = new Error('asda');
    return ctx.app.emit("error", error, ctx);
  }

  // 4, check password
  if (md5password(password) !== user.password) {
    const error = new Error('asda');
    return ctx.app.emit("error", error, ctx);
  }
  await next();
};

export { verifyLogin };