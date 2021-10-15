const express=require('express');
const router=express();
const TipoIdentificacionController=require('../controller/TipoIdentificacionController');


const ruta='/id-type';

router.post(ruta,TipoIdentificacionController.guardar);
router.get(ruta+"/:id",TipoIdentificacionController.obtenerPorId);
router.delete(ruta+"/:id",TipoIdentificacionController.eliminarPorId);
router.get(ruta,TipoIdentificacionController.obtenerTodos);

module.exports=router;