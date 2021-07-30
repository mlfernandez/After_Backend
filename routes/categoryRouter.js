const router = require("express").Router();
const authenticate = require("../middleware/authenticate");
const categoryController = require("../controllers/categoryController");
const admin = require("../middleware/admin");



// Crear una nueva categoria

router.post("/", admin, async (req, res) => {
    try {
      const category = req.body;
  
      res.json(await categoryController.createCategory(category));
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  });


// Buscar Categoria por id

router.post('/id', admin, async (req, res) => {
  try{
      const idCategory = req.body.idCategory;
      res.json(await categoryController.findByCategoryId(idCategory));
  }catch (err) {
      return res.status(500).json({
          message: err.message
      });
  }
})  


// Modificar categoria

router.put('/', admin, async (req, res) => {
  try {
      const newAtributes = req.body;
      res.json(await categoryController.modifyCategory(newAtributes));
  }catch (err) {
      return res.status(500).json({
          message: err.message
      });
  }
});

// Eliminar categoría

router.delete('/:id', admin, async (req, res) => {
    try {
        const idCategory = req.params.id;
        res.json(await categoryController.deleteCategory(idCategory));
    }catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});


  module.exports = router;