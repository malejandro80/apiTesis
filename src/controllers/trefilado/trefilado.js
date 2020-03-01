const trefilado = {}
const basics = require('../basicsController');

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

trefilado.GetCalculos = (req, res) => {

  let esfuerzo = trefilado.calcEsfuerzo(req.body.esf_fluencia, req.body.n, req.body.diametro_i, req.body.diametro_f, req.body.angulo, req.body.roce);
  let aeraFinal = basics.calcArea(req.body.diametro_f);
  let Fuerza = basics.Fuerza(esfuerzo, aeraFinal);
  
  let data = {
    'area_inicial': {
      'valor': basics.calcArea(req.body.diametro_i),
      'unidad': req.body.u_diametro_i
    },
    'area_final': {
      'valor': basics.calcArea(req.body.diametro_f),
      'unidad': req.body.u_diametro_f
    },
    'Fuerza': {
      'valor': Fuerza,
      'unidad': 'N'
    }
    ,
    'presion_extrusion': {
      'valor': esfuerzo,
      'unidad': 'prueba'
    },

    'esfuerzo_medio': {
      'valor': basics.calcEsfuerzoMedio(
        req.body.esf_fluencia,
        req.body.n,
        req.body.diametro_i,
        req.body.diametro_f
      ),
      'unidad': 'prueba'
    },
    'Potencia': {
      'valor': basics.potencia(Fuerza,req.body.velocidad),
      'unidad': 'W'
    }
    // 'others': {
    //   'esf_fluencia': req.body.esf_fluencia,
    //   'unidad_esf_fluencia': req.body.u_esfuerzo_fluencia,
    //   'n': req.body.n
    // }
  }
  return res.json(data);
}

module.exports = trefilado;
