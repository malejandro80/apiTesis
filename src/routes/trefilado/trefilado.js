const { Router } = require("express");
const router = Router();
const trefilado = require('../../controllers/trefilado/trefilado');
const middleware = require('../../middlewares/convertUnids');

router.post("/reduccion", trefilado.getReduccion);
router.post("/esfuerzo", trefilado.getEsfuerzo);
router.post("/calculos",middleware.transformar,trefilado.GetCalculos);


module.exports = router;
