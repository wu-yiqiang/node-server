const fs = require("fs");
const { userInfo } = require("os");

export const useRouter = (app:any) => {
  fs.readdirSync(__dirname).forEach((fire:any) => {
    if (fire === "index.ts") return;
    const router = require(`./${fire}`);
    app.use(router.routes());
    app.use(router.allowedMethods());
  });
};