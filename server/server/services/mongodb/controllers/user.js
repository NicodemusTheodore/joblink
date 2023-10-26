const User = require("../models/user");

class UserController {
  static async findAllUsers(req, res, next) {
    const data = await User.findAll();
    res.status(200).json(data);
  }

  static async createUser(req, res, next) {
    const { email, username, password, phoneNumber, address } = req.body;

    await User.create({
      email,
      username,
      password,
      phoneNumber,
      address,
    });

    res.status(201).json({
      message: "User successfully created",
    });
  }

  static async findUserById(req, res, next) {
    const { id } = req.params;

    const foundUser = await User.findById(id);

    res.status(200).json({
      data: foundUser,
    });
  }

  static async deleteUserById(req, res, next) {
    const { id } = req.params;
    await User.delete(id);

    res.status(200).json({
      message: "user successfully deleted",
    });
  }
}

module.exports = UserController;
