const { Router } = require("express");
const router = Router();
let convertUnids = require('../../middlewares/convertUnids');

const extrusionController = require("../../controllers/extrusionController");

router.post("/simpli/re", extrusionController.getRelacionExtruccion);
router.post("/simpli/jhonson", extrusionController.getJhonson);
router.post("/simpli/esfMedio", extrusionController.getEsfuerzoMedio);
router.post("/simpli/pExtrusionInd", extrusionController.getExtruccionInd);
router.post("/simpli/fExtrusionInd", extrusionController.GetFuerzaInd);
router.post("/simpli/calcInd", convertUnids.Unids ,extrusionController.GetCalcInd);
router.post("/simpli/calcArea", extrusionController.getArea);

module.exports = router;
