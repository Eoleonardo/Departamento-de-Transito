const router = require("express").Router();

const VeiculoController = require("../controllers/VeiculoController");

router.post("/cadastro", VeiculoController.cadastrar);

router.get("/buscar:idVeiculo?", VeiculoController.buscar);                                               

module.exports = router;