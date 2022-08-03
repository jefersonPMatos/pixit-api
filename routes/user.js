const express = require("express");
const router = express.Router();
const usersController = require("../controllers/userControllers");
const userAuth = require("../middlewares/userAuth");
const userValidations = require("../middlewares/userValidations");

router.post("/cadastrar", userValidations, usersController.register);
router.post("/login", usersController.login);
router.post("/:id", userAuth, usersController.update);
router.delete("/:id", userAuth, usersController.delete);
module.exports = router;
