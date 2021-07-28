const userController = require('./userController');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = "Esto es lo mas dificil del bootcamp";


class LoginController {
    async validate(emailCheck,passwordCheck){

            // Ver si el email esta registrado
        let user = await userController.findByEmail(emailCheck);

            // Si no existe, mostrar mensaje
        if (user == null) {
            throw new Error("El password o el email son incorrectos.");
          }

        let password = user.password;

        let check = await bcrypt.compare(passwordCheck, password);

          // Para activar la cuenta por email
        if (!user.isActive) {
            throw new Error("La cuenta no está activa. Por favor, revisa tu correo electrónico y activa tu cuenta.");
          }

          
        if(!check){
            throw new Error("El password o el email no coinciden");
            
        }

        let payload = {
            userId : user.id,
            createdAt: new Date(),
            admin: user.profile
        };


        return jwt.sign(payload,secret);

    }
}

let loginController = new LoginController();
module.exports = loginController;