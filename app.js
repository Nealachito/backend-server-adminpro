// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')

//Importacion de rutas
const routes = require('./routes');
const routeUsuario = require('./rutas/usuarioR');
const routeLogin = require('./rutas/login')




//Iniciar Variables

var app = express();

//Body Parser (Parseador para entender Json con JS)
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Conexion bd
mongoose.connection.openUri('mongodb://localhost:27017/HospitalDB', (err, Response)=>{
    if(err) throw err;
    console.log('Base de datos HospitalDB \x1b[34m%s\x1b[0m','Online');
});


// Llamado de rutas 
app.use('/usuario', routeUsuario);
app.use('/login',routeLogin);
app.use('/', routes);

//Escuchar Peticiones

app.listen(3000, ()=>{
    console.log('Express Arriba, Online sobre \x1b[34m%s\x1b[0m', 'puerto 3000');
});