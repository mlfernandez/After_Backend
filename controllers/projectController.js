const axios = require("axios");
const { User, Project, Category } = require("../models");
const router = require("../routes/projectRouter");
const bcrypt = require('bcrypt');
const nodemailer = require('../config/nodemailerConfig.js');
const moment = require("moment");



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
        console.log(newAtributes)
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


}



let projectController = new Proyectos();
module.exports = projectController;