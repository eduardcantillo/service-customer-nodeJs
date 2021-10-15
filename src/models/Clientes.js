const {sequelize}=require('../databases/customer');
const {DataTypes}=require('sequelize');
const {TipoIdentificacion}=require('../databases/customer')//.models;


const Clientes=sequelize.define(
    'clientes',
    {
        nombres:{
            type:DataTypes.STRING,

        },
        identificacion:{
            type:DataTypes.STRING,
            primaryKey: true,
          
        },
        apellidos:{
            type:DataTypes.STRING,

        },
        ciudad:{
            type:DataTypes.STRING,

        },
        edad:{
            type:DataTypes.INTEGER,

        },
        idType:{
            type:DataTypes.INTEGER,
            reference:{
                model:TipoIdentificacion,
                key:"id"
            }
        }
        ,
       foto:{
                type:DataTypes.STRING,
        }
        

    },
    
    {
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports=Clientes;