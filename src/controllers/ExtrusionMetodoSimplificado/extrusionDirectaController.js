const calculosBasicos = require('../basicsController');
const extrusionDirecta = {};

extrusionDirecta.fuerza = (esf_fluencia, n, diametro_i, diametro_f, a, b, longitud) => {
  let pExtrusion = extrusionDirecta.esfuerzo(esf_fluencia, n, diametro_i, diametro_f, a, b, longitud);

  area_i = calculosBasicos.calcArea(diametro_i);

  return pExtrusion * area_i;

}

extrusionDirecta.getFuerza = (req, res) => {
  let data = { 'Fuerza_directa': extrusionDirecta.fuerza(req.body.esf_fluencia, req.body.n, req.body.diametro_i, req.body.diametro_f, req.body.a, req.body.b, req.body.longitud) }
  return res.json(data);
}

extrusionDirecta.esfuerzo = (esf_fluencia, n, diametro_i, diametro_f, a, b, longitud) => {

  let esfuerzo_medio = calculosBasicos.calcEsfuerzoMedio(esf_fluencia, n, diametro_i, diametro_f);
  let jhonson = calculosBasicos.calcJohnson(diametro_i, diametro_f, a, b);
  return jhonson * (esfuerzo_medio + ((2 * longitud) / diametro_i));
}

extrusionDirecta.getEsfuerzo = (req, res) => {
  let data = { 'presion_extrusion_directa': extrusionDirecta.esfuerzo(req.body.esf_fluencia, req.body.n, req.body.diametro_i, req.body.diametro_f, req.body.a, req.body.b, req.body.longitud) }
  return res.json(data);
}

extrusionDirecta.potencia = (esf_fluencia, n, diametro_i, diametro_f, a, b, velocidad, longitud) => {

  return extrusionDirecta.fuerza(esf_fluencia, n, diametro_i, diametro_f, a, b, longitud) * velocidad;
}

extrusionDirecta.GetCalculos = (req, res) => {
  let data = {
    'area_inicial': {
      'valor': calculosBasicos.calcArea(req.body.diametro_i),
      'unidad': req.body.u_diametro_i
    },
    'area_final': {
      'valor': calculosBasicos.calcArea(req.body.diametro_f),
      'unidad': req.body.u_diametro_f
    },
    'Fuerza': {
      'valor': extrusionDirecta.fuerza(
        req.body.esf_fluencia,
        req.body.n,
        req.body.diametro_i,
        req.body.diametro_f,
        req.body.a,
        req.body.b,
        req.body.longitud
      ),
      'unidad': 'N'
    }
    ,
    'presion_extrusion': {
      'valor': extrusionDirecta.esfuerzo(
        req.body.esf_fluencia,
        req.body.n,
        req.body.diametro_i,
        req.body.diametro_f,
        req.body.a,
        req.body.b,
        req.body.longitud
      ),
      'unidad': req.body.u_esfuerzo_fluencia
    },

    'esfuerzo_medio': {
      'valor': calculosBasicos.calcEsfuerzoMedio(
        req.body.esf_fluencia,
        req.body.n,
        req.body.diametro_i,
        req.body.diametro_f
      ),
      'unidad': req.body.u_esfuerzo_fluencia
    },
    're': calculosBasicos.calcRe(
      req.body.diametro_i,
      req.body.diametro_f
    ),
    'jhonson': calculosBasicos.calcJohnson(
      req.body.diametro_i,
      req.body.diametro_f,
      req.body.a,
      req.body.b
    ),
    'Potencia': {
      'valor': extrusionDirecta.potencia(
        req.body.esf_fluencia,
        req.body.n,
        req.body.diametro_i,
        req.body.diametro_f,
        req.body.a,
        req.body.b,
        req.body.velocidad,
        req.body.longitud
      ),
      'unidad': 'W'
    },
    'others': {
      'esf_fluencia': req.body.esf_fluencia,
      'unidad_esf_fluencia': req.body.u_esfuerzo_fluencia,
      'n': req.body.n
    }
  }
  return res.json(data);
}
module.exports = extrusionDirecta;