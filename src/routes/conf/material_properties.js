const { Router } = require("express");
const router = Router();

const materialPropertiesController = require("../../controllers/materialPropertiesController");

router.get("/materiales", materialPropertiesController.getAll);
router.get("/materiales/:id", materialPropertiesController.get);
router.post("/materiales_nuevo", materialPropertiesController.saveNewMaterial);
router.get("/materiales_eliminar/:id", materialPropertiesController.deleteMaterial);
router.post("/materiales_editar", materialPropertiesController.editMaterial);
module.exports = router;
