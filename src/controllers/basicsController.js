const basics = {}

basics.calcArea = (diametro) => {
  return (Math.PI * Math.pow(diametro * 1, 2)) / 4;
}

basics.getArea = (req, res) => {
  let data = { 'area': basics.calcArea(req.body.area) };
  return res.json(data);
};

basics.calcRe = (diametro_i, diametro_f) => {
  return basics.calcArea(diametro_i) / basics.calcArea(diametro_f);
}

basics.getRelacionExtruccion = (req, res) => {
  let data = { 're': basics.calcRe(req.body.diametro_i, req.body.diametro_f) }
  return res.json(data);
};


basics.calcDefIdeal = (diametro_i, diametro_f) => {
  re = basics.calcRe(diametro_i, diametro_f)
  return Math.log(re);
}

basics.calcJohnson = (diametro_i, diametro_f, a, b) => {
  let Re = basics.calcRe(diametro_i, diametro_f);

  return (a * 1) + ((b * 1) * (Math.log(Re)));
}

basics.getJhonson = (req, res) => {
  let data = { 'jhonson': basics.calcJohnson(req.body.diametro_i, req.body.diametro_f, req.body.a, req.body.b) }
  return res.json(data);
};

basics.calcEsfuerzoMedio = (esf_fluencia, n, diametro_i, diametro_f) => {
  n = n * 1;
  esf_fluencia = esf_fluencia * 1;
  return (esf_fluencia * Math.pow(basics.calcDefIdeal(diametro_i, diametro_f), n)) / (1 + n);
}

basics.getEsfuerzoMedio = (req, res) => {
  let data = { 'esfuerzo_medio': basics.calcEsfuerzoMedio(req.body.esf_fluencia, req.body.n, req.body.diametro_i, req.body.diametro_f) }
  return res.json(data);
};
module.exports = basics;
