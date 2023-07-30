import mysql from "mysql2";
import config from '../config/index'
const dbConfig = {
  host: config.mysql.host,
  port: config.mysql.port,
  database: config.mysql.database,
  user: config.mysql.user,
  password: config.mysql.password,
}
const pool = mysql.createPool(dbConfig);
const exec = (sql: string) => {
  return new Promise<any>((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) {
        reject(error);
      } else {
        connection.query(sql, (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
          connection.release(); // 释放该链接，把该链接放回池里供其他人使用
        });
      }
    });
  });
};

export default exec;