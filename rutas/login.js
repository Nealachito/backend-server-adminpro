var express = require('express');
var bcryp = require('bcryptjs');
var jwt = require('jsonwebtoken');
const SEED = require('../config/config').SEED;

const router = express();
var Usuariom = require('../modelos/usuario');

router.post('/',(Request,Response)=>{

    var bodyp = Request.body;

    Usuariom.findOne({email : bodyp.email},(err,UsuarioBD)=>{
        if(err){
            return Response.status(500).json({
                ok: false,
                mensaje:'Error al buscar Usuario',
                errors:err
            });
        }
        if(!UsuarioBD){
            return Response.status(400).json({
                ok: false,
                mensaje:'Usuario no encontrado - Email',
                errors:err
            });
        }
        if(!bcryp.compareSync(bodyp.password, UsuarioBD.password)){
            return Response.status(400).json({
                ok: false,
                mensaje:'Usuario no encontrado - Password Erroneo',
                errors:err
            });
        }
        

        //Crear Token

        var token = jwt.sign({usuario : UsuarioBD},SEED,{expiresIn:14400});

        Response.status(200).json({
            ok: true,
            message: 'Login Correctamente valido',
            email : UsuarioBD.email,
            token : token,
            id: UsuarioBD._id
        });
    });
    
});


module.exports = router;