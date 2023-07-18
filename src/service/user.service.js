class UserService {
  async create(user) {
    console.log("user存数据库",user);
    // 将user 存储到数据库
    return "user OKK!"
  }
}

module.exports = new UserService