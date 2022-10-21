//Rutas para productos
const express = require ('express');
const router = express.Router();
const productoController = require('../controllers/productoController')

//api/productos
router.post('/', productoController.crearProducto);

router.get('/', productoController.obtenerProductos);

router.put('/:id' , productoController.actualizarProductos); //Actualizar Producto

router.get('/:id' , productoController.obtenerProductoId); //Obtener Producto

router.delete('/:id' , productoController.eliminarProductoId); //Obtener Producto

module.exports = router;
