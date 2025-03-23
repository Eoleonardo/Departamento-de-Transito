const router = require("express").Router();

const VeiculoController = require("../controllers/VeiculoController");

router.get("/cadastro", VeiculoController.formCadastro);

router.post("/cadastro", VeiculoController.cadastrar);

router.get("/todos", VeiculoController.buscarTodos);                                               

module.exports = router;