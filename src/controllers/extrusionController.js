const calculosBasicos = require('./basicsController');
const controller = {};

controller.calcExtrusionInd = (esf_fluencia, n, diametro_i, diametro_f, a, b) => {
  
  let esfuerzo_medio = controller.calcEsfuerzoMedio(esf_fluencia, n, diametro_i, diametro_f);
  let jhonson = controller.calcJohnson(diametro_i, diametro_f, a, b);

  return jhonson * esfuerzo_medio;
}

controller.getExtruccionInd = (req,res) => {
  let data = { 'presion_extrusion_indirecta': controller.calcExtrusionInd(req.body.esf_fluencia, req.body.n, req.body.diametro_i, req.body.diametro_f, req.body.a, req.body.b) }
  return res.json(data);
}

controller.calcFuerzaInd = (esf_fluencia, n, diametro_i, diametro_f, a, b) =>{
  let pExtrusionInd = controller.calcExtrusionInd(esf_fluencia, n, diametro_i, diametro_f, a, b);

  area_i = controller.calcArea(diametro_i);
  area_f = controller.calcArea(diametro_f);

  return pExtrusionInd * (area_i - area_f);

}


controller.GetFuerzaInd = (req,res) => {
  let data = { 'Fuerza_indirecta': controller.calcFuerzaInd(req.body.esf_fluencia, req.body.n, req.body.diametro_i, req.body.diametro_f, req.body.a, req.body.b) }
  return res.json(data);
}

controller.calcPotenciaInd = (esf_fluencia, n, diametro_i, diametro_f, a, b, velocidad) => {

  return controller.calcFuerzaInd(esf_fluencia, n, diametro_i, diametro_f, a, b) * velocidad;
}

controller.GetCalcInd = (req,res) => {


  let data = {
    'area_inicial':{
      'valor': controller.calcArea(req.body.diametro_i),
      'unidad': req.body.u_diametro_i
    },
    'area_final': {
      'valor': controller.calcArea(req.body.diametro_f),
      'unidad': req.body.u_diametro_f
    },
    'Fuerza_indirecta': {
      'valor': controller.calcFuerzaInd(
        req.body.esf_fluencia,
        req.body.n,
        req.body.diametro_i,
        req.body.diametro_f,
        req.body.a,
        req.body.b
      ),
      'unidad': 'N'
    }
    , 
    'presion_extrusion_indirecta': {
      'valor': controller.calcExtrusionInd(
        req.body.esf_fluencia,
        req.body.n,
        req.body.diametro_i,
        req.body.diametro_f,
        req.body.a,
        req.body.b
      ),
      'unidad': req.body.u_esfuerzo_fluencia
    },
      
    'esfuerzo_medio': {
      'valor': controller.calcEsfuerzoMedio(
        req.body.esf_fluencia,
        req.body.n,
        req.body.diametro_i,
        req.body.diametro_f
      ),
      'unidad': req.body.u_esfuerzo_fluencia
    },
      're': controller.calcRe(
                              req.body.diametro_i, 
                              req.body.diametro_f
                              ),
      'jhonson': controller.calcJohnson(
                                        req.body.diametro_i, 
                                        req.body.diametro_f, 
                                        req.body.a, 
                                        req.body.b
                                      ),
    'Potencia': {
      'valor': controller.calcPotenciaInd(
        req.body.esf_fluencia,
        req.body.n,
        req.body.diametro_i,
        req.body.diametro_f,
        req.body.a,
        req.body.b,
        req.body.velocidad
      ),
      'unidad':'W'
    },
    'others': {
      'esf_fluencia': req.body.esf_fluencia,
      'unidad_esf_fluencia': req.body.u_esfuerzo_fluencia,
      'n':req.body.n
    }
}
  return res.json(data);
}

module.exports = controller;