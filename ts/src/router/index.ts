const fs = require("fs");
const swagger = require('@/swagger')
export const useRouter = (app:any) => {
  fs.readdirSync(__dirname).forEach((fire:any) => {
    if (fire === "index.ts") return;
    const router = require(`./${fire}`);
    app.use(router.routes());
    app.use(swagger.routes());
    app.use(swagger.allowedMethods());
    app.use(router.allowedMethods());
  });
};