const modelsProducto = require("../models/modelsProducto");


exports.crearProducto = async (req, res)=>{
    //console.log(req.body); Este codigo se creo para hacer pruebas dese el postman 

    //Aqui vamos a controlar que los datos lleguen correctamente
    try {
        let producto;
        //Creamos nuestos productos
        producto = new modelsProducto(req.body);
        
        await producto.save();
        res.send(producto);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerProductos = async (req, res)=>{
    try {
        const productos = await modelsProducto.find();
        res.json(productos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.actualizarProductos = async (req, res)=>{
    try {
        const {producto, categoria, ubicacion, precio}= req.body;
        let producto1 = await modelsProducto.findById(req.params.id);

        if(!producto1){
            res.status(404).json({msg : 'No existe el producto'});
        }

        producto1.producto = producto;
        producto1.categoria = categoria;
        producto1.ubicacion = ubicacion;
        producto1.precio = precio;

        producto1 = await modelsProducto.findOneAndUpdate({ _id: req.params.id}, producto1, {new:true})

        res.json(producto1)

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}



exports.obtenerProductoId = async (req, res)=>{
    try {
        let producto1 = await modelsProducto.findById(req.params.id);

        if(!producto1){
            res.status(404).json({msg : 'No existe el producto'});
        }

        res.json(producto1);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


exports.eliminarProductoId = async (req, res)=>{
    try {
        let producto1 = await modelsProducto.findById(req.params.id);

        if(!producto1){
            res.status(404).json({msg : 'No existe el producto'});
        }
        await modelsProducto.findOneAndDelete({_id: req.params.id})
        res.json({msg: 'Producto Eliminado con Exito'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
