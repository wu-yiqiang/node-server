const fs = require("fs");
const { userInfo } = require("os");

const useRouter = (app) => {
  fs.readdirSync(__dirname).forEach((fire) => {
    if (fire === "index.js") return;
    const router = require(`./${fire}`);
    app.use(router.routes());
    app.use(router.allowedMethods());
  });
};

module.exports = useRouter;