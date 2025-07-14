
const path = require("path");
const bcryptjs = require("bcryptjs");
const jwt =  require("jsonwebtoken");

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

    static async login(req, res){
        const {email, senha} = req.body;
    
        const usuario = await client.usuario.findUnique({
            where: {
                email: email,
            },
        });
        if(!usuario){
            return res.json({
             msg: "Usuário nâo encontrado!"
            });
        }
    
    
    const senhaCorreta = bcryptjs.compareSync(senha, usuario.senha);
    if(!senhaCorreta){
        return res.json({
            msg: "Senha incorreta!"
           });
    }

     const token = jwt.sign({id: usuario.id}, process.env.SENHA_SERVIDOR, {expiresIn: "1h",});
     res.json({
        msg: "Autenticado!",
        token: token,
     });
    }
    static async verificaAutenticacao(req, res, next){
        const authHeader = req.headers["authorization"];

        if(!authHeader){
             return res.json({
            msg:"Token não encontrado"
        });
    }
            
            const token = authHeader.split(" ")[1];

          jwt.verify(token, process.env.SENHA_SERVIDOR, (err, payload)=>{
            if(err){
                return res.json({
                    msg:"Token inválido!",
                });
            }
            req.usuarioId = payload.id;
            next();
          });
        }
       
    
    static async verificaIsAdmin(req, res, next){
        if(!req.usuarioId){
            return res.json({
            msg:"Token não está autenticado!"
        });
        }
        const usuario = await client.usuario.findUnique({
            where: {
                id: req.usuarioId,
            },
        });
        if(!usuario.isAdmin){
             return res.json({
            msg:"Acesso negado! você não e o adm!"
        });
        }
        next();
    }
}

module.exports = UsuarioController


// npx prisma migrate dev
// npx prisma generate
// npm i jsonwebtoken