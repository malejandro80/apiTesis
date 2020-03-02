const { Router } = require("express");
const router = Router();
const trefilado = require('../../controllers/trefilado/trefilado');
const middleware = require('../../middlewares/convertUnids');
const p = require('../../controllers/convertsUnidsController');

router.post("/reduccion", trefilado.getReduccion);
router.post("/esfuerzo", trefilado.getEsfuerzo);
router.post("/calculos",middleware.prueba,trefilado.GetCalculos);
router.post("/p", p.transformar);

module.exports = router;
