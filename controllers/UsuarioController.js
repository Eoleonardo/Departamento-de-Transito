const path = require("path");
const bcryptjs = require("bcryptjs");

const {PrismaClient} = require("@prisma/client");
const client = new PrismaClient(); 

class UsuarioController {
    
    static async cadastrar(req, res){

        const {nome, email, senha} = req.body;

        const salt = bcryptjs.genSaltSync(8);
        const hashSenha = bcryptjs.hashSync(senha, salt)

        const usuario = await client.usuario.create({
          data:{
          nome,
          email,
          senha: hashSenha,
        },
    });

        res.json({
            usuarioId: usuario.id,
        });
    }

    static async buscarTodos(req, res){
     const id = req.params.idUsuario;

     let usuarios

     if (id != null){
             let usuarios = await client.usuario.findMany({
            where:{
                id: parseInt(id),
            },
        });
     }else{
        usuarios = await client.usuario.findMany({});
     }

     res.json({
        usuarios,
     });
    }
}

module.exports = UsuarioController


// npx prisma migrate dev
// npx prisma generate