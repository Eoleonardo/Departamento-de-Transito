const path = require("path");

const {PrismaClient} = require("@prisma/client");
const client = new PrismaClient(); 

class VeiculoController {
    
    static async cadastrar(req, res){

        const {modelo, placa, ano, cor} = req.body;

        const veiculo = await client.veiculo.create({
          data:{
          modelo,
          placa,
          ano: parseInt(ano),
          cor,
        },
    });

        res.json({
            veiculoId: veiculo.id,
        });
    }

    static async buscarTodos(req, res){
     const id = req.params.idVeiculo;

     let veiculos

     if (id != null){
        veiculos = await client.veiculo.findMany({
            where:{
                id: parseInt(id),
            },
        });
     }else{
        veiculos = await client.veiculo.findMany({});
     }

     res.json({
        veiculos,
     });
    }
}

module.exports = VeiculoController


// npx prisma migrate dev
// npx prisma generate