import exec from "@/app/database"
interface User {
  name: string
  password: string
}
class UserService {
  async create(user: User) {
    console.log("user存数据库",user);
    const { name, password } = user;
    const statement = `INSERT INTO users (name, password) VALUES ("${name}", "${password}");`;
    const result = await exec(statement);
    // 将user 存储到数据库
    return result;
  }
  // 根据name查询
  async getUserByName(name: string){
    const statement = `SELECT * FROM users WHERE name = "${name}";`
    const result= await exec(statement)
    return result
  }
}

export default new UserService();