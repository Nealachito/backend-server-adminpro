var jwt = require('jsonwebtoken');
const SEED = require('../config/config').SEED;
//Verificar Token
module.exports.VerificarToken = function(Request, Response, Next){
    var token = Request.query.token;
    jwt.verify( token, SEED,(err, decoded)=>{
        if(err){
            return Response.status(401).json({
                ok: false,
                message: 'Token no valido',
                errors: err
            });
        }
        Request.usuario = decoded.usuario;
        Next();
       
    });
}

    

