const { Router } = require("express");
const router = Router();

const unidsController = require("../../controllers/unidsControllers");

router.get("/unidades/:unid?", unidsController.getAll);

module.exports = router;
