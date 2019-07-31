const express = require('express');
const router = express.Router();


//Creacion de rutas
//Ruta raiz
router.get('/',(Request,Response,Next)=>{
    Response.status(200).json({
        ok: true,
        mensaje: "Operacion Correcta"
    });
});


module.exports = router;