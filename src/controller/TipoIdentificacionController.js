const {TipoIdentificacion}=require('../databases/customer')//.models;

const TipoIdentificacionController={

    guardar:async (req,res)=>{

        const {nombre}=req.body;
         const tipoIdentificacion =await TipoIdentificacion.create({nombre});

        return res.status(200).json({
            tipoIdentificacion
        });

    },
    obtenerPorId:async (req,res)=>{
        const id=req.params.id;
        const tipoIdentificacion=await TipoIdentificacion.findByPk(id);

        if(!tipoIdentificacion){
            return res.status(404).json({
                mensaje:"No se eencontro"
            })
        }

        return res.status(200).json({
            tipoIdentificacion
        });
    },
    eliminarPorId:async(req,res)=>{
        const id=req.params.id;
        const tipoIdentificacion=await TipoIdentificacion.findByPk(id);

        if(!tipoIdentificacion){
            return res.status(404).json({
                mensaje:"El objeto a eliminar no se encuentra een la base de datos"
            });
        }

        tipoIdentificacion.destroy();
        return res.status(200).json({
            mensaje:"Se a eliminado correctamente"
        });
    },
    obtenerTodos:async(req,res)=>{

        const identificaciones=await TipoIdentificacion.findAll({});

        return res.status(200).json({
            identificaciones
        })
    }
    

  
}

module.exports=TipoIdentificacionController;
