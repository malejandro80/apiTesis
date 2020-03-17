const unidades_model = require("../models/unidades_model");

const controller = {};

controller.getAll = (req, res) => {
  unidades_model.getUnids(req.params.unid)
    .then(data => { res.json(data) })
    .catch(err => { res.json({ 'err': err }) });
};

module.exports = controller;
