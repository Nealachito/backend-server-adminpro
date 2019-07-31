// importaciones
var mongoose = require('mongoose');
var uniquevld = require('mongoose-unique-validator');


var Schema = mongoose.Schema;

var rolesValidos = {
    values:['ADMIN_ROLE','USER_ROLE'],
    message:'{VALUE} no es un rol permitido'
};

var usuarioSchema = new Schema({
    nombre: {type: String, required: [true, 'El nombre es un campo necesario'] },
    email: {type: String, required: [true, 'El email es un campo necesario'], unique:true},
    password: {type: String, required: [true, 'El password es un campo requerido']},
    img: {type: String, required: false},
    role: {type: String, required: true, enum: rolesValidos, default: 'USER_ROLE'}

});

usuarioSchema.plugin(uniquevld, {message: 'El {PATH} debe ser unico'});

module.exports = mongoose.model('Usuario', usuarioSchema);