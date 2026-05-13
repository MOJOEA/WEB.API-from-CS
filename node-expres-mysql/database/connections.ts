import mysql = require("mysql2"); 

export const conn: mysql.Pool = mysql.createPool({
  connectionLimit: 10,
  host: "127.0.0.1", 
  user: "tripbooking",
  password: "tripbooking@csmsu",
  database: "tripbooking",
  port: 3306 
});
