const router = require("express").Router();

const VeiculoController = require("../controllers/VeiculoController");

router.post("/cadastro", VeiculoController.cadastrar);

router.get("/todos", VeiculoController.buscarTodos);                                               

module.exports = router;