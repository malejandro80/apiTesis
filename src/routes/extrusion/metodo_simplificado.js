const { Router } = require("express");
const router = Router();
let convertUnids = require('../../middlewares/convertUnids');
const extrusionIndirecta = require("../../controllers/ExtrusionMetodoSimplificado/extrusionIndirectaController");
const extrusionDirecta = require("../../controllers/ExtrusionMetodoSimplificado/extrusionDirectaController");
const calculosBasicos = require("../../controllers/basicsController");

//rutas de calculos basicos
router.post("/simpli/re", calculosBasicos.getRelacionExtruccion);
router.post("/simpli/jhonson", calculosBasicos.getJhonson);
router.post("/simpli/esfMedio", calculosBasicos.getEsfuerzoMedio);
router.post("/simpli/calcArea", calculosBasicos.getArea);

//rutas de extrusion indirecta
router.post("/simpli/pExtrusionInd", extrusionIndirecta.getExtruccionInd);
router.post("/simpli/fExtrusionInd", extrusionIndirecta.GetFuerzaInd);
router.post("/simpli/calcInd", convertUnids.Unids ,extrusionIndirecta.GetCalcInd);

//rutas de extrusion directa
router.post("/simpli/calcDirec", convertUnids.convertUnids, extrusionDirecta.GetCalculos);
router.post("/simpli/pExtrusionDirecta", extrusionDirecta.getEsfuerzo);
router.post("/simpli/fExtrusionDirecta", extrusionDirecta.getFuerza);

module.exports = router;
