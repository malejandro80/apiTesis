const conexion = require("../../src/db");
const model = {};

model.getConf = () => {
  
    query = 'SELECT * FROM configuracion'

  return new Promise((resolve, reject) => {
    conexion.query(query,
      (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
  });

}


module.exports = model;