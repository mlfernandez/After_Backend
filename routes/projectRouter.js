const router = require("express").Router();
const authenticate = require("../middleware/authenticate");
const projectController = require("../controllers/projectController");
const admin = require("../middleware/admin");



// Crear un nuevo proyecto

router.post("/", admin, async (req, res) => {
    try {
      const project = req.body;
  
      res.json(await projectController.createProject(project));
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  });


// Buscar Proyectos por ID

router.post('/id', admin, async (req, res) => {
  try{
      const idProject = req.body.idProject;
      res.json(await projectController.findByProjectId(idProject));
  }catch (err) {
      return res.status(500).json({
          message: err.message
      });
  }
})  


// Modificar proyecto

router.put('/', admin, async (req, res) => {
  try {
      const newAtributes = req.body;
      res.json(await projectController.modifyProject(newAtributes));
  }catch (err) {
      return res.status(500).json({
          message: err.message
      });
  }
});

  module.exports = router;