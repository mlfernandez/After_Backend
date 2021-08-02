const { User } = require("../models");
const bcrypt = require('bcrypt');
const nodemailer = require('../config/nodemailerConfig.js');


class Person {

        // crear un usuario nuevo

    async newUser(user) {
        user.password = await bcrypt.hash(user.password, 10);
        user.password2 = await bcrypt.hash(user.password2, 10);
        
    
        //Creamos una token que enviamos por mail para activar
        const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let token = '';
        for (let i = 0; i < 25; i++) {
            token += characters[Math.floor(Math.random() * characters.length )];
        }
    
    
        user = {
            name : user.name,
            lastName: user.lastName,
            lastName2: user.lastName2,
            email: user.email,
            password: user.password,
            password2: user.password2,
            token: token
          }
          
    
          // Ver si el email esta registrado
        let checkUser = await userController.findByEmail(emailCheck);

          // Si no existe, mostrar mensaje
        if (checkUser === null) {

          let usuario = await User.create(user);
      
          //Llamamos a la funcion para enviar el correo al usuario.
          await nodemailer.sendConfirmationEmail(user.name, user.email, token);
      
          return usuario;
          
        } else {

          throw new Error("El usuario ya existe.");
        }
        
    
      }
    
      async findByToken(token) {
        return User.findOne({ token: token });
      }
    
     //Función que recibe token de email y activa la cuenta del usuario.
     async updateActive(token) {
      
      let user = await User.findOne({where:{token}});
    
      let usuario = await User.update(
          {
              isActive: true,
            },
            {where: {id: user.id}}
      );
      let resultado = "La cuenta se ha activado correctamente. Por favor, regrese a la web de After para ingresar.";
      return resultado;
    
    }    

    // encontrar todos los usuarios
  async findAllUsers() {
    return User.findAll();
  }

    // encontrar usuarios por email
  async findByEmail(email) {
    return User.findOne({
      where: { email },
    });
  }

    // encontrar usuarios por id
  async findByUserId(data) {
    return User.findByPk(data);

}
    // modificar datos usuario
  async modifyUser(cuerpoDeDatos) {
    console.log(cuerpoDeDatos)
    await User.update(

      //datos que cambiamos
      {
        name: cuerpoDeDatos.name,
        lastName: cuerpoDeDatos.lastName,
        lastName2: cuerpoDeDatos.lastName2,
        email: cuerpoDeDatos.email,
        password: cuerpoDeDatos.password,
        password2: cuerpoDeDatos.password2,
        specialization: cuerpoDeDatos.specialization,
      },
      //donde
      { where: { id: cuerpoDeDatos.idUser } }
   
    )

    let resultado = this.findByUserId(cuerpoDeDatos.idUser);

    return resultado;
  }

    // eliminar usuario
  async deleteUser(id) {
    return User.destroy({ where: { id: id } });
  }

  // desactivar usuario


/*   // modificar la contraseña

  async modifyPassword (body) {

    let user = await userController.findByUserId(body.idUser);

    let newPassword = bcrypt.hashSync( body.newPassword, 10);
    let newPassword2 = bcrypt.hashSync( body.newPassword2, 10);

    let updatepassword = await User.update(
        {password: newPassword,
        password2: newPassword2},
  
        {where: {id: body.idUser}}
    )

    return User.findOne({
        where: {id : body.idUser}
    });

}

 // olvido la contraseña

 async lostPassword (body) {

  let user = await userController.findByUserId(body.idUser);

   //Llamamos a la funcion para enviar el correo al usuario.
   await nodemailer.sendLostPasswordEmail(user.name, user.email);
      
   return user;

} */

}

let userController = new Person();
module.exports = userController;
