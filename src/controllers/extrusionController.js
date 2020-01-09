
const controller = {};

controller.calcArea = (diametro) =>{
  return (Math.PI*Math.pow(diametro*1,2))/4;
}

controller.getArea = (req, res) => {
  let data = { 'area': controller.calcArea(req.body.area) };
  return res.json(data);
};

controller.calcRe = (diametro_i, diametro_f) => {
  return controller.calcArea(diametro_i) / controller.calcArea(diametro_f) ;
}

controller.calcDefIdeal = (diametro_i, diametro_f) => {
  re = controller.calcRe(diametro_i, diametro_f)
  return Math.log(re);
}

controller.getRelacionExtruccion = (req,res)=>{
  let data = { 're': controller.calcRe(req.body.diametro_i, req.body.diametro_f)}
  return res.json(data);
};

controller.getJhonson = (req, res) => {
  let data = { 'jhonson': controller.calcJohnson(req.body.diametro_i, req.body.diametro_f, req.body.a, req.body.b) }
  return res.json(data);
};


controller.calcJohnson = (diametro_i, diametro_f, a,b)=>{
  let Re = controller.calcRe(diametro_i,diametro_f);

  return (a*1) + ((b*1)*(Math.log(Re)));
}

controller.calcEsfuerzoMedio = (esf_fluencia, n, diametro_i, diametro_f) => {
   n = n*1;
   esf_fluencia = esf_fluencia*1;
  return (esf_fluencia * Math.pow(controller.calcDefIdeal(diametro_i, diametro_f),n))/(1 +n);
}

controller.getEsfuerzoMedio = (req,res)=>{
  let data = { 'esfuerzo_medio': controller.calcEsfuerzoMedio(req.body.esf_fluencia, req.body.n,req.body.diametro_i, req.body.diametro_f) }
  return res.json(data);
};

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

controller.calcPotenciaInd = (esf_fluencia, n, diametro_i, diametro_f, a, b,vel) => {
  return controller.calcExtrusionInd(esf_fluencia, n, diametro_i, diametro_f, a, b) * vel;
}

controller.GetCalcInd = (req,res) => {
  let data = { 'Fuerza_indirecta': controller.calcFuerzaInd(
                                                            req.body.esf_fluencia, 
                                                            req.body.n, 
                                                            req.body.diametro_i, 
                                                            req.body.diametro_f, 
                                                            req.body.a, 
                                                            req.body.b
                                                          ), 
                'presion_extrusion_indirecta': controller.calcExtrusionInd(
                                                            req.body.esf_fluencia, 
                                                            req.body.n, 
                                                            req.body.diametro_i, 
                                                            req.body.diametro_f, 
                                                            req.body.a, 
                                                            req.body.b
                                                            ),
                'esfuerzo_medio': controller.calcEsfuerzoMedio(
                                                            req.body.esf_fluencia, 
                                                            req.body.n, 
                                                            req.body.diametro_i, 
                                                            req.body.diametro_f
                                                            ),
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
                'Potencia' : controller.calcPotenciaInd(
                                                        req.body.esf_fluencia,
                                                        req.body.n,
                                                        req.body.diametro_i,
                                                        req.body.diametro_f,
                                                        req.body.a,
                                                        req.body.b,
                                                        req.body.velocidad
                                                      )
}
  return res.json(data);
}

module.exports = controller;