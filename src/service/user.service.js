const connection = require("../app/database");

class UserService {
  async create(user) {
    console.log("user存数据库",user);
    const { name, password } = user;
    const statement = `INSERT INTO users (name, password) VALUES (?, ?);`;
    const result = await connection.execute(statement, [name, password]);
    // 将user 存储到数据库
    return result;
  }
  // 根据name查询
  async getUserByName(name){
    const statement = `SLECT * FROM users WHERE name = ?;`
    const result = await connection.execute(statement, [name])

    return result
  }
}

module.exports = new UserService();