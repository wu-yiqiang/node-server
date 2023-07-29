const mysql = require('mysql2');
const config = require("../config");
const connections = mysql.createPool({
  host: config.mysql.host,
  port: config.mysql.port,
  database: config.mysql.database,
  user: config.mysql.user,
  password: config.mysql.password,
});

connections.getConnection((err, conn) => {
  conn.connect((err) => {
    if (err) {
      console.log("sql error");
    } else {
      console.log("sql OK");
    }
  });
});

module.exports = connections.promise()