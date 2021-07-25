const router = require("express").Router();
const userController = require("../controllers/userController");
const admin = require("../middleware/admin");
const authenticate = require("../middleware/authenticate");

//CRUD

// Create new user
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


// Find all users
router.get("/", admin, async (req, res) => {
  try {
    res.json(await userController.findAllUsers());
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});
// Find users by email
router.get("/email/:email", async (req, res) => {
  try {
    let email = req.params.email;
    res.json(await userController.findByEmail(email));
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});


// Find users by email
router.get("/dni/:dni", async (req, res) => {
  try {
    let dni = req.params.dni;
    res.json(await userController.findByDni(dni));
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});


// Find users by ID
router.get("/id/:id", async (req, res) => {
  try {
    const id = req.params.id;

    res.json(await userController.findByUserId(id));
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

// Modify one User
router.post("/update", async (req, res) => { 
  try {
    const cuerpoDeDatos = req.body;
    res.json(await userController.modifyUser(cuerpoDeDatos));
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});
// Delete Users
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

// Mail confirmation
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

router.post("/suscription", async (req, res) => {
  try {
    const body = req.body;
    console.log(req.body);
    res.json(await userController.updateSuscription(body));
  } catch (err) {
    return res.status(500).json({
      mensaje: err.message,
    });
  }
});


module.exports = router;