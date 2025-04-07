const path = require("path");

const {PrismaClient} = require("@prisma/client");
const client = new PrismaClient(); 

class VeiculoController {
    static formCadastro(req, res){
        res.sendFile(path.join(__dirname, "../", "views", "formVeiculo.html"))
    }
    static async cadastrar(req, res){

        const {modelo, placa, ano, cor} = req.body;

        const veiculo = await client.veiculo.create({data:{
          modelo,
          placa,
          ano: parseInt(ano),
          cor
        }});

        res.send({veiculo});
    }

    static async buscarTodos(req, res){
     const veiculos = await client.veiculo.findMany({});

     res.send(JSON.stringify(veiculos));
    }
}

module.exports = VeiculoController


// npx prisma migrate dev
// npx prisma generate