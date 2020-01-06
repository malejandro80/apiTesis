const conexion = require("../../src/db");
const model = {};

model.getUnids = (type = '') => {
  if(type == ''){
    query = 'SELECT * FROM unidades'
  }
  else{
    query = `SELECT * from unidades WHERE descripcion like  '%${type}'` ;
  }
  return new Promise((resolve, reject) => {
    conexion.query(query,
      (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
  });

}

model.getUnid = (unid = '') => {
  
  query = `SELECT * from unidades WHERE simbolo_unidad = '${unid}'`;
  
  return new Promise((resolve, reject) => {
    conexion.query(query,
      (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
  });

}

module.exports = model;