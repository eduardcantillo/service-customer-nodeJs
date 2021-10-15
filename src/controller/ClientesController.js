const {Clientes}=require('../databases/customer')//.models;
const fetch=require('node-fetch');
const {Op}=require('sequelize');


const ClientesController={

    guardar:async(req,res)=>{
        const body=req.body;
        const {foto}=req.body
       
        try {
            if(foto){
            const response=await fetch('http://localhost:4000/foto',{ method:'POST', body:JSON.stringify({foto}),headers: {'Content-Type': 'application/json'}, })
            const data=await response.json();
            body.foto=data.id;
        }
            const clientes=await Clientes.create(body);
        return res.status(200).json({
            clientes
        });

        } catch (error) {
            console.log(error)
            res.status(500).json({
                mensaje:"Ha ocurrido un error inesperado"
            })
        }
        

    },

    obtenerPorId:async(req,res)=>{
      
        const id=req.params.id;
        const usuario=await Clientes.findByPk(id);
        if(!usuario){
            return res.status(400).json({
                mensaje:"No se encontro el usuario"
            });
        }

        const idFoto=usuario.foto;
        const response=await fetch('http://localhost:4000/foto/'+idFoto);
        const data=await response.json();

        if(data.ok){
            usuario.foto=data.foto;
            return res.status(200).json(
                usuario
            );
        }

        return res.status(200).json(
            usuario
        );

    },
    filtarPorEdad:async(req, res)=>{
        const edad=req.params.edad;

        let usuarios=await Clientes.findAll({
            where:{
                edad:{
                    [Op.gte]:edad
                }
                
            }
        });
        const ids =usuarios.map(user=> user.foto);
        const response=await fetch('http://localhost:4000/foto/ids',{ method:'POST', body:JSON.stringify({ids}),headers: {'Content-Type': 'application/json'}, })
        let data=await response.json();
        data=data.fotos;
        const map={};
        data.forEach(element => {
            map[element._id]=element.foto;
        });

        usuarios= usuarios.map(user=> {
            user.foto=map[user.foto];
            return  user;
        });

       

        res.status(200).json({
            usuarios
        });
    },
    eliminarPorId:async(req,res)=>{
      
        const id=req.params.id;
        const usuario=await Clientes.findByPk(id);
        if(!usuario){
            return res.status(400).json({
                mensaje:"No se encontro el usuario"
            });
        }

        const idFoto=usuario.foto;
        const response=await fetch('http://localhost:4000/foto/'+idFoto,{ method:'DELETE',headers: {'Content-Type': 'application/json'}, });
        const data=await response.json();

        if(!data.ok){
            usuario.foto=data.foto;
            return res.status(500).json({
                mensaje: "ha ocurrido algun erro"}
            );
        }
        usuario.destroy();
        return res.status(200).json({
            mensaje:"usuario eliminado correctamente"}
        );

    },
    
    obtenerTodo:async(req,res)=>{

        let usuarios = await Clientes.findAll();

        let ids=usuarios.map(usuarios =>usuarios.foto);
        const response=await fetch('http://localhost:4000/foto/ids',{ method:'POST', body:JSON.stringify({ids}),headers: {'Content-Type': 'application/json'}, })
        let data=await response.json();
        data=data.fotos;
        const map={};
        data.forEach(element => {
            map[element._id]=element.foto;
        });
        
        usuarios= usuarios.map(user=> {
            user.foto=map[user.foto];
            return  user;
        });


        return res.status(200).json({
            usuarios
        });
    }
    ,

    actualizar:async(req,res)=>{
        const id=req.params.id;
        const user=req.body;

        
        let userDB= await Clientes.findByPk(id);


        if(!userDB){

            return res.status(404).json({
                mensaje:"el usauario no se encontro en la base de dato"
            });
        }

        let response={};
        let data={};

        if(user.foto){
        
            if(userDB.foto){
            response=await fetch('http://localhost:4000/foto/'+userDB.foto ,{ method:'PUT', body:JSON.stringify({foto:user.foto}),headers: {'Content-Type': 'application/json'}, });
            data=await response.json();
            
            }else{
                response=await fetch('http://localhost:4000/foto' ,{ method:'POST', body:JSON.stringify({foto:user.foto}),headers: {'Content-Type': 'application/json'}, });
                data=await response.json();

                userDB.foto=data.id
            }

        }else{
             response=await fetch('http://localhost:4000/foto/'+userDB.foto);
             data=await response.json();
            
        }

        if(user.nombres){
            userDB.nombres=user.nombres;
        }
        if(user.apellidos){
            userDB.apellidos=user.apellidos;
        }

        if(user.ciudad){
            userDB.ciudad=user.ciudad
        }

        if(user.edad){
            userDB.edad=user.edad
        }

        await userDB.save();

        userDB.foto=data.foto;
        return res.status(200).json(
            userDB
        );



    },
}

module.exports=ClientesController;