const router = require("express").Router();

const UsuarioController = require("../controllers/UsuarioController");

router.post("/cadastro", UsuarioController.cadastrar);
                          
module.exports = router;