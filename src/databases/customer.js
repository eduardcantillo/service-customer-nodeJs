const Sequelize=require('sequelize')

const sequelize = new Sequelize('service', 'root', 'root',  {
    host: 'localhost',   
    port:'3306',
    dialect: 'mysql',
    pool: {   
      max: 5, 
      min: 0, 
      idle: 10000
    },
   });
 

exports.sequelize=sequelize;

const TipoIdentificacion=require('../models/TipoIdentificacion');
const Clientes=require('../models/Clientes');
( async() => {

    await sequelize.sync({});
    console.log("database connected");
})();

module.exports={TipoIdentificacion,Clientes}
//exports.models={TipoIdentificacion,Clientes}