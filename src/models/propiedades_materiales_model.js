const conexion = require("../../src/db");
const model = {};

model.getAll = ( ) => {
  return new Promise((resolve, reject) => {
    conexion.query(`SELECT * FROM propiedades_materiales`,
      (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
  });
}

model.get = (id) =>{
  return new Promise((resolve, reject) => {
    conexion.query(`SELECT * FROM propiedades_materiales
                    WHERE id = ${ id } `,
      (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
  });
}

model.create = (param) => {
  return new Promise((resolve, reject) => {
    conexion.query(`INSERT INTO propiedades_materiales 
                    SET ?`,[param],
      (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
  });
}

model.delete = (id) => {
  return new Promise((resolve, reject) => {
    conexion.query(`DELETE FROM propiedades_materiales
                    WHERE id = ${ id } `,
      (err, res) => {
        if (err) reject(err);
        else {
          response = {
            "status" : "ok",
            "status_code" : "200",
            "query_information" : res

          }
          resolve(response)
        };
      });
  });
}

model.update = (req) => {
  let id = req.body.id;
  let data = {
                'nombre_material': req.body.nombre_material,
                'esfuerzo_fluencia': req.body.esfuerzo_fluencia,
                'unidad_esfuerzo_fluencia': req.body.unidad_esfuerzo_fluencia
            };
  return new Promise((resolve, reject) => {
    conexion.query(`UPDATE propiedades_materiales SET ?
                    WHERE id = ?`,[data,id],
      (err, res) => {
        if (err) reject(err);
        else {
          response = {
            "status": "ok",
            "status_code": "200",
            "query_information": res

          }
          resolve(response)
        }
      });
  });
}

module.exports = model;