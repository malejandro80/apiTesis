const trefilado = {}
const basics = require('../basicsController');
const configuracion = require("../../models/configuracion_model");

trefilado.calcReduccion = (diametro_i, diametro_f) => {
  let areaIncial = basics.calcArea(diametro_i);
  let aeraFinal  = basics.calcArea(diametro_f)
  return (( areaIncial - aeraFinal)/areaIncial)*100;
}

trefilado.getReduccion = (req, res) => {
  let data = { 'porcentajeReduccion': trefilado.calcReduccion(req.body.diametro_i, req.body.diametro_f) }
  return res.json(data);
};

trefilado.calcEsfuerzo = (esf_fluencia, n, diametro_i, diametro_f, ang, roce) => {
  let esf_medio = basics.calcEsfuerzoMedio(esf_fluencia, n, diametro_i, diametro_f);
  let deformacion = basics.calcDefIdeal(diametro_i, diametro_f);
  let factor = basics.factorFormaTrefilado(diametro_i, diametro_f, ang);
  let grados = ang * Math.PI / 180;
  return esf_medio * factor * deformacion * (1 + (roce / Math.tan(grados)));
}

trefilado.getEsfuerzo = (req, res) => {
  
  let data = { 'esfuerzo': trefilado.calcEsfuerzo(req.body.esf_fluencia, req.body.n,req.body.diametro_i, req.body.diametro_f,req.body.angulo,req.body.roce) }
  return res.json(data);
};

trefilado.GetCalculos = async (req, res) => {
  let conf = await configuracion.getConf();
  let r = req.body;
  
  let esfuerzo = trefilado.calcEsfuerzo(r.esf_fluencia.valor, r.otros.n, r.diametro_inicial.valor, r.diametro_final.valor, r.otros.angulo, r.otros.roce);

  let aeraFinal = basics.calcArea(r.diametro_final.valor);
  let Fuerza = basics.Fuerza(esfuerzo, aeraFinal);
  
  let data = {
    'area_inicial': {
      'valor': basics.calcArea(r.diametro_inicial.valor),
      'unidad': r.diametro_inicial.unidad
    },
    'area_final': {
      'valor': basics.calcArea(r.diametro_final.valor),
      'unidad': r.diametro_final.unidad
    },
    'Fuerza': {
      'valor': Fuerza,
      'unidad': conf[3].valor
    }
    ,
    'presion': {
      'valor': esfuerzo,
      'unidad': conf[1].valor
    },

    'esfuerzo_medio': {
      'valor': basics.calcEsfuerzoMedio(
        r.esf_fluencia.valor,
        r.otros.n,
        r.diametro_inicial.valor,
        r.diametro_final.valor
      ),
      'unidad': conf[1].valor
    },
    'Potencia': {
      'valor': basics.potencia(Fuerza,r.velocidad.valor),
      'unidad': conf[4].valor
    },
    'others': {
      'esf_fluencia': r.esf_fluencia.valor,
      'unidad_esf_fluencia': r.esf_fluencia.unidad,
      'n': r.otros.n
    }
  }
  return res.json(data);
}

module.exports = trefilado;
