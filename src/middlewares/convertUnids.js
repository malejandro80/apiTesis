const unidades_model = require("../models/unidades_model");
const materiales = require("../models/propiedades_materiales_model");
const middleware = {}
const convertir = require("../controllers/convertsUnidsController")
const configuracion = require("../models/configuracion_model")
middleware.Unids = async (req,res,next) => {
 let unidades = [];
  
  await middleware.convertUnid(req.body.u_diametro_i, req.body.diametro_i)
    .then(data => {
      unidades.push({
        'diametro_i': data.conversion,
        'u_diametro_i': data.unidad_conversion,
      })
    }); 

  await middleware.convertUnid(req.body.u_diametro_f, req.body.diametro_f)
    .then(data => {
      unidades.push({
        'diametro_f': data.conversion,
        'u_diametro_f': data.unidad_conversion,
      })
    });

  await middleware.convertUnid(req.body.u_velocidad, req.body.velocidad)
    .then(data => {
      unidades.push({
        'velocidad': data.conversion,
        'u_velocidad': data.unidad_conversion,
      })
    });

   material = await materiales.get(req.body.material);
   
   await middleware.convertUnid(material[0].unidad_esfuerzo_fluencia, material[0].esfuerzo_fluencia)
    .then(data => {
      unidades.push({
        'esf_fluencia': data.conversion,
        'u_esfuerzo_fluencia': data.unidad_conversion,
        'n' : material[0].n

      })
    });

    unidades = {
      'diametro_i': unidades[0].diametro_i,
      'u_diametro_i': unidades[0].u_diametro_i,
      'diametro_f': unidades[1].diametro_f,
      'u_diametro_f': unidades[1].u_diametro_f,
      'velocidad': unidades[2].velocidad,
      'u_velocidad': unidades[2].u_velocidad,
      'esf_fluencia': unidades[3].esf_fluencia,
      'u_esfuerzo_fluencia': unidades[3].u_esfuerzo_fluencia,
      'n': unidades[3].n,
      'a': req.body.a,
      'b': req.body.b,
    }
     req.body = unidades;
     next();  

}

middleware.convertUnids = async (req, res, next) => {
  let unidades = [];

  await middleware.convertUnid(req.body.u_diametro_i, req.body.diametro_i)
    .then(data => {
      unidades.push({
        'diametro_i': data.conversion,
        'u_diametro_i': data.unidad_conversion,
      })
    });

  await middleware.convertUnid(req.body.u_diametro_f, req.body.diametro_f)
    .then(data => {
      unidades.push({
        'diametro_f': data.conversion,
        'u_diametro_f': data.unidad_conversion,
      })
    });

  await middleware.convertUnid(req.body.u_velocidad, req.body.velocidad)
    .then(data => {
      unidades.push({
        'velocidad': data.conversion,
        'u_velocidad': data.unidad_conversion,
      })
    });

  material = await materiales.get(req.body.material);

  await middleware.convertUnid(material[0].unidad_esfuerzo_fluencia, material[0].esfuerzo_fluencia)
    .then(data => {
      unidades.push({
        'esf_fluencia': data.conversion,
        'u_esfuerzo_fluencia': data.unidad_conversion,
        'n': material[0].n

      })
    });

  await middleware.convertUnid(req.body.u_longitud, req.body.longitud)
    .then(data => {
      unidades.push({
        'longitud': data.conversion,
        'u_longitud': data.unidad_conversion,
      })
    });

  unidades = {
    'diametro_i': unidades[0].diametro_i,
    'u_diametro_i': unidades[0].u_diametro_i,
    'diametro_f': unidades[1].diametro_f,
    'u_diametro_f': unidades[1].u_diametro_f,
    'velocidad': unidades[2].velocidad,
    'u_velocidad': unidades[2].u_velocidad,
    'esf_fluencia': unidades[3].esf_fluencia,
    'u_esfuerzo_fluencia': unidades[3].u_esfuerzo_fluencia,
    'longitud': unidades[4].longitud,
    'u_longitud': unidades[4].u_longitud,
    'n': unidades[3].n,
    'a': req.body.a,
    'b': req.body.b,
  }
  configuracion
  req.body = unidades;
  next();
}

middleware.prueba = async(req,res,next) => {
  let unidades = [];
  let conf = await configuracion.getConf();
  // unidades.push( 
  //   await convertir.transformar(req.body.diametro_i,'cm','m')
  // );
  console.log(conf[0].valor.toString());
}

middleware.convertUnid = (u_convert,u_value) => {
  return new Promise((resolved,rejected)=>{ 
    unidades_model.getUnid(u_convert)
      .then((data) => {
        object = {
          conversion : data[0].equivalente_SI * (u_value * 1),
          unidad_conversion : data[0].unidad_equivalente_SI
        }
        resolved(object);
      })
  });
}

module.exports = middleware;