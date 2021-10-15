const express=require('express');
const router=express();
const ClientesController=require('../controller/ClientesController');

const ruta="/clientes";

router.post(ruta,ClientesController.guardar);
router.get(ruta+"/:id",ClientesController.obtenerPorId);
router.get(ruta+"/edad/:edad",ClientesController.filtarPorEdad);
router.delete(ruta+"/:id",ClientesController.eliminarPorId);
router.put(ruta+"/:id",ClientesController.actualizar);
router.get(ruta,ClientesController.obtenerTodo);


module.exports=router;