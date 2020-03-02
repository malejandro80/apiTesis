const unidades_model = require("../models/unidades_model");

const controller = {};




controller.transformar = async (valor, unidadValor, unidadTransformar ) => {
  
  await unidades_model.getUnid(unidadValor)
    .then(data => {Conversion1 = data[0];
    
  });
  
  await unidades_model.getUnid(unidadTransformar)
    .then(data => { Conversion2 = data[0];
  });
  
  valorRes = valor * Conversion1.equivalente_SI / Conversion2.equivalente_SI;

  return{
    'valor': valorRes,
    'unidad': Conversion2.simbolo_unidad
  };
  
}

module.exports = controller;
