const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");

router.get("/", (req, res, next) => {
  res.status(200).json("Welcome to the shadow realm stranger");
});

router.get("/users", UserController.findAllUsers);
router.get("/users/:id", UserController.findUserById);
router.post("/users", UserController.createUser);
router.delete("/users/:id", UserController.deleteUserById);

module.exports = router;
