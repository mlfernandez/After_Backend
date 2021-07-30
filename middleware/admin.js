const jwt = require('jsonwebtoken');
const secret = "Esto es lo mas dificil del bootcamp";

const admin = (req, res, next) => {

    try {
        if(!req.headers.authorization) {
            return new Error ("No tienes autorizacion");

        }

        let token = req.headers.authorization.split(' ')[1];

        let auth = jwt.verify(token, secret);

      /*   if((auth.userId != req.body.idUser) && (auth.admin != "admin")){ */
        if((auth.admin != "admin")){
            
            
            throw new Error ( "No tienes permiso para realizar esta accion");    
        }
        return next();



    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

module.exports = admin;