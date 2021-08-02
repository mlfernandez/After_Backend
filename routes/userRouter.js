const router = require("express").Router();
const userController = require("../controllers/userController");
const admin = require("../middleware/admin");
const authenticate = require("../middleware/authenticate");

//CRUD

// Crear un usuario nuevo
router.post("/", async (req, res) => {
    try {
      const body = req.body;
  
      res.json(await userController.newUser(body));
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  });


// Buscar todos los usuarios
router.get("/", admin, async (req, res) => {
  try {
    res.json(await userController.findAllUsers());
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

// Buscar usuario por email
router.get("/email/:email", admin, async (req, res) => {
  try {
    let email = req.params.email;
    res.json(await userController.findByEmail(email));
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});


// Buscar usuario por id
router.get("/id/:id", admin, async (req, res) => {
  try {
    const id = req.params.id;

    res.json(await userController.findByUserId(id));
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

// Modificar usuario
router.post("/update", authenticate, async (req, res) => { 
  try {
    const cuerpoDeDatos = req.body;
    res.json(await userController.modifyUser(cuerpoDeDatos));
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

// Eliminar usuario
router.delete("/:id", admin, async (req, res) => { 
  try {
    const id = req.params.id;
    res.json(await userController.deleteUser(id));
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

// Mail de confirmacion
router.get("/confirm/:confirmationCode", async (req, res) => {
  try {
    token = req.params.confirmationCode;
    res.json(await userController.updateActive(token));
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

/* // Usuario modificar contraseña
router.put('/changepassword', authenticate, async (req,res) => {
  try{
      const body = req.body;
      res.json(await userController.modifyPassword(body)); 
  }catch (err) {
      return res.status(500).json({
          message: err.message
      });
  }
})

// Usuario modificar contraseña
router.put('/emailchangepassword', authenticate, async (req,res) => {
  try{
      const body = req.body;
      res.json(await userController.lostPassword(body)); 
  }catch (err) {
      return res.status(500).json({
          message: err.message
      });
  }
}) */

module.exports = router;