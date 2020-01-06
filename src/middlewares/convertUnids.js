const unidades_model = require("../models/unidades_model");

const middleware = {}

middleware.Unids = (req,res,next) => {
  data_convert = {};

  middleware.convertUnid(data_convert, req.body.u_diametro_f, req.body.diametro_f, 'diametro_f', 'u_diametro_f');
  
  // middleware.convertUnid(data_convert, req.body.u_diametro_i, req.body.diametro_i, 'diametro_i', 'u_diametro_i');

  // middleware.convertUnid(data_convert, req.body.u_velocidad, req.body.velocidad, 'velocidad', 'u_velocidad');

}

middleware.convertUnid = (object,u_convert,u_value,variable,u_variable) => {

  unidades_model.getUnid(u_convert)
    .then((data,object,variable,u_variable) => {
      object = {
        variable : data[0].equivalente_SI * (u_value * 1),
        u_variable : data[0].unidad_equivalente_SI
      }
      console.log(object);
    });

}

module.exports = middleware;