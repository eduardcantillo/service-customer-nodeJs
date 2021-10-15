const {sequelize}=require('../databases/customer');
const {DataTypes}=require('sequelize');


const TipoIdentificacion=sequelize.define(
    'tipo_identificacion',
    {
        nombre:{
            type:DataTypes.STRING,

        },
        id:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        

    },

    {
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports=TipoIdentificacion;