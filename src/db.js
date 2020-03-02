const mysql = require("mysql");
// credenciales
module.exports = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "tesis"
});