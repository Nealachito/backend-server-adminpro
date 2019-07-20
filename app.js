// Requires
var express = require('express');
var mongoose = require('mongoose');




//Iniciar Variables

var app = express();

//Conexion bd
mongoose.connection.openUri('mongodb://localhost:27017/HospitalDB', (err, Response)=>{
    if(err) throw err;
    console.log('Base de datos HospitalDB \x1b[34m%s\x1b[0m','Online');
});

//Creacion de Rutas
app.get('/',(Request,Response,Next)=>{
    Response.status(300).json({
        ok: true,
        mensaje: "Operacion Correcta"
    });
});


//Escuchar Peticiones

app.listen(3000, ()=>{
    console.log('Express Arriba, Online sobre \x1b[34m%s\x1b[0m', 'puerto 3000');
});