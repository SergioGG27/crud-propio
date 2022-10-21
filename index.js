const express = require('express');
const conectarBD = require('./config/db');
const cors = require ("cors");

// Creamos el servidor
const app = express();

//Conectamos a la base de Datos
conectarBD();

app.use(cors());

//Aceptamos el tipo de datos que nos evian, en este caso JSON
app.use(express.json());

app.use('/api/productos', require('./routes/producto'));

//Definimos ruta principal
/*app.get('/', (req, res)=>{
    //res.send('Hola Mundo')
//})*/

app.listen(3000,()=> {
    console.log('el servidor esta funsionando')
})