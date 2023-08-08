
import jwt from "jsonwebtoken";
import PRIVATE_KEY from "@/config";

class AuthController {
  async login(ctx:any, next:any) {
    const { id, name } = ctx.user;
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: "RS256",
    });
    ctx.body = { id, name, token };
  }
}

export default new AuthController();