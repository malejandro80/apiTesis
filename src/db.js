const mysql = require("mysql");
// credenciales
module.exports = mysql.createPool({
  host: "bxc6o4spcg495zre20jc-mysql.services.clever-cloud.com",
  user: "uaugi2guymjwvn3e",
  password: "aNV37Qju4QPVFVFWdWtC",
  database: "bxc6o4spcg495zre20jc"
});