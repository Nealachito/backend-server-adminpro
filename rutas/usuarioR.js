const express = require('express');
const router = express();
var Usuariom = require ('../modelos/usuario');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var middAuth = require('../middlewares/autenticacion');


// Obtener todos los usuarios sin pass
router.get('/',(Request,Response,Next)=>{

    Usuariom.find({}, 'nombre email img role')
    .exec( 
        (err, Usuarios)=>{
        if(err){
            return Response.status(500).json({
                ok: false,
                mensaje: "Error en carga de usuarios",
                errors: err
            });
        }
        Response.status(200).json({
            ok: true,
            usuarios: Usuarios
        });
    });
    
});


//Actualizar Usuarios
router.put('/:id',(Request, Response)=>{
   
    var id = Request.params.id;
    var bodyp = Request.body;
    Usuariom.findById(id, (error, usuario)=>{
        if(error){
            return Response.status(500).json({
                ok: false,
                mensaje: "Error al buscar usuario",
                errors: error
            });
        }
        if(!usuario){
            return Response.status(400).json({
                ok: false,
                mensaje:"Usuario con "+id+ " no encontrado",
                errors: {message: 'No existe un usuario con ese ID'}
            })
        }
       usuario.nombre = bodyp.nombre;
       usuario.email = bodyp.email;
       usuario.role = bodyp.role;

       usuario.save((err, usuarioActualizado)=>{
        if(err){
            return Response.status(400).json({
                ok: false,
                mensaje: "Error al actualizar el usuario",
                errors: err
            });
        }
        Response.status(200).json({
            ok: true,
            usuario: usuarioActualizado
        });
       });
    });
});
//Crear Usuario nuevo

router.post('/',middAuth.VerificarToken,(Request,Response)=>{
    var bodyp = Request.body;

    var usuario = new Usuariom({
        nombre: bodyp.nombre,
        email: bodyp.email,
        password: bcrypt.hashSync(bodyp.password,10),
        img: bodyp.img,
        role: bodyp.role
    });

    usuario.save((err, usuarioGuardado)=>{
        if(err){
            return Response.status(400).json({
                ok: false,
                mensaje: "Error al guardar el usuario",
                errors: err
            });
        }
        Response.status(201).json({
            ok: true,
            usuario: usuarioGuardado,
            usuarioToken : Request.usuario
        });
    });
    
});

//Eliminar Registro
router.delete('/:id', (Request, Response)=>{
    var id = Request.params.id;


    Usuariom.findByIdAndRemove(id,(error, usuarioEliminado)=>{
        if(error){
            return Response.status(500).json({
                ok: false,
                mensaje: "Error al eliminar usuario",
                errors: error
            });
        }
        if(!usuarioEliminado){
            return Response.status(400).json({
                ok: false,
                mensaje: "Usuario no encontrado con ese ID",
                errors: {message: 'No existe un Usuario con ese ID'}
            });
        }
        Response.status(200).json({
            ok: true,
            usuario: usuarioEliminado
        });
       
    });
});

module.exports = router;