
const controller = {};

controller.calcArea = (diametro) =>{
  return (Math.PI*Math.pow(diametro*1,2))/4;
}

controller.getArea = (req, res) => {
  let data = { 'area': controller.calcArea(req.body.area) };
  return res.json(data);
};

controller.calcRe = (Area_i, Area_f) => {
  return Area_i*1 / Area_f*1;
}

controller.calcDefIdeal = (area_i, area_f) => {
  return Math.log(area_i/area_f);
}

controller.getRelacionExtruccion = (req,res)=>{
  let data = { 're': controller.calcRe(req.body.area_i, req.body.area_f)}
  return res.json(data);
};

controller.getJhonson = (req, res) => {
  let data = { 'jhonson': controller.calcJohnson(req.body.area_i, req.body.area_f, req.body.a, req.body.b) }
  return res.json(data);
};


controller.calcJohnson = (area_i, area_f, a,b)=>{
  let Re = controller.calcRe(area_i,area_f);

  return (a*1) + ((b*1)*(Math.log(Re)));
}

controller.calcEsfuerzoMedio = (esf_fluencia, n, area_i, area_f) => {
   n = n*1;
   esf_fluencia = esf_fluencia*1;
  return (esf_fluencia * Math.pow(controller.calcDefIdeal(area_i, area_f),n))/(1 +n);
}

controller.getEsfuerzoMedio = (req,res)=>{
  let data = { 'esfuerzo_medio': controller.calcEsfuerzoMedio(req.body.esf_fluencia, req.body.n,req.body.area_i, req.body.area_f) }
  return res.json(data);
};

controller.calcExtrusionInd = (esf_fluencia, n, area_i, area_f, a, b) => {
  
  let esfuerzo_medio = controller.calcEsfuerzoMedio(esf_fluencia, n, area_i, area_f);
  let jhonson = controller.calcJohnson(area_i, area_f, a, b);

  return jhonson * esfuerzo_medio;
}

controller.getExtruccionInd = (req,res) => {
  let data = { 'presion_extrusion_indirecta': controller.calcExtrusionInd(req.body.esf_fluencia, req.body.n, req.body.area_i, req.body.area_f, req.body.a, req.body.b) }
  return res.json(data);
}

controller.calcFuerzaInd = (esf_fluencia, n, area_i, area_f, a, b) =>{
  let pExtrusionInd = controller.calcExtrusionInd(esf_fluencia, n, area_i, area_f, a, b);

  return pExtrusionInd * (area_i - area_f);

}

controller.GetFuerzaInd = (req,res) => {
  let data = { 'Fuerza_indirecta': controller.calcFuerzaInd(req.body.esf_fluencia, req.body.n, req.body.area_i, req.body.area_f, req.body.a, req.body.b) }
  return res.json(data);
}

controller.calcPotenciaInd = (esf_fluencia, n, area_i, area_f, a, b,vel) => {
  return controller.calcExtrusionInd(esf_fluencia, n, area_i, area_f, a, b) * vel;
}

controller.GetCalcInd = (req,res) => {
  let data = { 'Fuerza_indirecta': controller.calcFuerzaInd(
                                                            req.body.esf_fluencia, 
                                                            req.body.n, 
                                                            req.body.area_i, 
                                                            req.body.area_f, 
                                                            req.body.a, 
                                                            req.body.b
                                                          ), 
                'presion_extrusion_indirecta': controller.calcExtrusionInd(
                                                            req.body.esf_fluencia, 
                                                            req.body.n, 
                                                            req.body.area_i, 
                                                            req.body.area_f, 
                                                            req.body.a, 
                                                            req.body.b
                                                            ),
                'esfuerzo_medio': controller.calcEsfuerzoMedio(
                                                            req.body.esf_fluencia, 
                                                            req.body.n, 
                                                            req.body.area_i, 
                                                            req.body.area_f
                                                            ),
                're': controller.calcRe(
                                        req.body.area_i, 
                                        req.body.area_f
                                        ),
                'jhonson': controller.calcJohnson(
                                                  req.body.area_i, 
                                                  req.body.area_f, 
                                                  req.body.a, 
                                                  req.body.b
                                                ),
                'Potencia' : controller.calcPotenciaInd(
                                                        req.body.esf_fluencia,
                                                        req.body.n,
                                                        req.body.area_i,
                                                        req.body.area_f,
                                                        req.body.a,
                                                        req.body.b,
                                                        req.body.velocidad
                                                      )
}
  return res.json(data);
}

module.exports = controller;