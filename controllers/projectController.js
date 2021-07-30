const axios = require("axios");
const { Project, Category } = require("../models");
const router = require("../routes/projectRouter");




class Proyectos {

    // Crear un proyecto

    async createProject(project) {
        
      return Project.create(project);

    }

    // Buscar proyecto por Id

    async findByProjectId(idProject) {
        return Project.findByPk(idProject);
  
    }

    // Modificar un proyecto


    async modifyProject(newAtributes) {
        
        await Project.update(
    
          //datos que cambiamos
          {

            name: newAtributes.name,
            state: newAtributes.state,
            endDate: newAtributes.endDate,
            idCategory: newAtributes.idCategory,
    
          },
          //donde
          { where: { id: newAtributes.idProject } }
       
        )
    
        let resultado = this.findByProjectId(newAtributes.idProject);
    
        return resultado;
      }

    // Eliminar proyecto

    async deleteProject(idProject) {
      return Project.destroy({ where: { id: idProject } });
  }

}



let projectController = new Proyectos();
module.exports = projectController;