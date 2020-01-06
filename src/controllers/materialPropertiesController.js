const unidades_model = require("../models/unidades_model");
const propiedades_materiales_model = require("../models/propiedades_materiales_model");

const controller = {};

controller.getAll = (req,res) => {
  propiedades_materiales_model.getAll()
                              .then(data =>{ res.json(data)})
                              .catch(err =>{ res.json( {'err': err} )});  
};

controller.get = (req, res) => {
  propiedades_materiales_model.get(req.params.id)
    .then(data => { res.json(data) })
    .catch(err => { res.json({ 'err': err }) });
};

controller.saveNewMaterial = (req, res) => {

  propiedades_materiales_model.create(req.body)
    .then(data => { res.json(data) })
    .catch(err => { res.json(err) });
};

controller.deleteMaterial = (req, res) => {
  propiedades_materiales_model.delete(req.params.id)
    .then(data => { res.json(data) })
    .catch(err => { res.json({ 'err': err }) });
};

controller.editMaterial = (req, res) => {
  propiedades_materiales_model.update(req)
    .then(data => { res.json(data) })
    .catch(err => { res.json({ 'err': err }) });
};

module.exports = controller;
