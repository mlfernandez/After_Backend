const axios = require("axios");
const { Category } = require("../models");
const router = require("../routes/categoryRouter");



class Categorias {

    // Crear una categoria

    async createCategory(category) {
        
      return Category.create(category);

    }

    // Buscar categoria por Id

    async findByCategoryId(idCategory) {
        return Category.findByPk(idCategory);
  
    }

    // Modificar una categoria


    async modifyCategory(newAtributes) {
        
        await Category.update(
    
          //datos que cambiamos
          {

            name: newAtributes.name,

    
          },
          //donde
          { where: { id: newAtributes.idCategory } }
       
        )
    
        let resultado = this.findByCategoryId(newAtributes.idCategory);
    
        return resultado;
      }

    // Eliminar categoría

    async deleteCategory(idCategory) {
        return Category.destroy({ where: { id: idCategory } });
    }
}



let categoryController = new Categorias();
module.exports = categoryController;