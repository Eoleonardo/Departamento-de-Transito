const path = require("path");

class VeiculoController {
    static formCadastro(req, res){
        res.sendFile(path.join(__dirname, "../", "views", "formVeiculo.html"))
    }
    static cadastrar(req, res){
        res.send(JSON.stringify(req.body));
    }

    static buscarTodos(req, res){}
}

module.exports = VeiculoController