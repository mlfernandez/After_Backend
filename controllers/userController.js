const { User } = require("../models");
const bcrypt = require('bcrypt');
const nodemailer = require('../config/nodemailerConfig.js');


class Person {

        // crear un usuario nuevo

    async newUser(user) {
        user.password = await bcrypt.hash(user.password, 10);
        
    
        //Creamos una token que enviamos por mail para activar
        const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let token = '';
        for (let i = 0; i < 25; i++) {
            token += characters[Math.floor(Math.random() * characters.length )];
        }
        console.log(token)
    
        user = {
            name : user.name,
            lastName: user.lastName,
            lastName2: user.lastName2,
            email: user.email,
            password: user.password,
            password2: user.password2,
          }
          
        console.log(user)
    
        let usuario = await User.create(user);
    
        //Llamamos a la funcion para enviar el correo al usuario.
        await nodemailer.sendConfirmationEmail(user.name, user.email, token);
    
        return usuario;
    
      }
    
      async findByToken(token) {
        return User.findOne({ token: token });
      }
    
     //Función que recibe token de email y activa la cuenta del usuario.
     async updateActive(token) {
       console.log(token);
      let user = await User.findOne({where:{token}});
      console.log(user);
      let usuario = await User.update(
          {
              isActive: true,
            },
            {where: {id: user.id}}
      );
      let resultado = "La cuenta se ha activado correctamente. Por favor, ve a la web de Smile para ingresar.";
      return resultado;
    
    }    

  async findAllUsers() {
    return User.findAll();
  }
  async findByEmail(email) {
    return User.findOne({
      where: { email },
    });
  }

  async findByDni(dni) {
    return User.findOne({
      where: { dni },
    });
  }
  
    async findByUserId(data) {
      return User.findByPk(data);

  }

 

  // para cambiar la suscripcion 
  async updateSuscription(body) {

   User.update(
    
      //Datos que cambiamos
    {
      lastSuscriptionBegin: body.lastSuscriptionBegin,
      lastSuscriptionEnd: body.lastSuscriptionEnd,
    },
    { where: { id: body.idUser } }
  )

    let resultado = User.findByPk(body.idUser);
    console.log(resultado, "controller")

    return resultado;
    

}

  async modifyUser(cuerpoDeDatos) {
    console.log(cuerpoDeDatos)
    await User.update(

      //datos que cambiamos
      {

        /* creditCardNumber: cuerpoDeDatos.creditCardNumber, */
        creditCardNumber: await bcryptjs.hash(cuerpoDeDatos.creditCardSecureCodeNumber, 5),
        creditCardName: cuerpoDeDatos.creditCardName,
        creditCardExpDate: cuerpoDeDatos.creditCardExpDate,
        creditCardSecureCodeNumber: await bcryptjs.hash(cuerpoDeDatos.creditCardSecureCodeNumber, 5),
      /*   creditCardSecureCodeNumber: cuerpoDeDatos.creditCardSecureCodeNumber, */

        


      },
      //donde
      { where: { id: cuerpoDeDatos.idUser } }
   
    )

    let resultado = this.findByUserId(cuerpoDeDatos.idUser);

    return resultado;
  }

  async deleteUser(id) {
    return User.destroy({ where: { id: id } });
  }

  


}
let userController = new Person();
module.exports = userController;
