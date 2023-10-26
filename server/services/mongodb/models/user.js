const { ObjectId } = require("mongodb");
const { getDatabase } = require("../configs/mongoConnection");

class User {
  static getCollections() {
    const db = getDatabase();
    const users = db.collection("users");
    return users;
  }

  static findAll() {
    return this.getCollections().find().toArray();
  }

  static findById(objectId) {
    return this.getCollections().findOne({
      _id: new ObjectId(objectId),
    });
  }

  static create(user) {
    return this.getCollections().insertOne({
      email: user.email,
      username: user.username,
      password: user.password,
      role: "Admin",
      phoneNumber: user.phoneNumber,
      address: user.address,
    });
  }

  static delete(objectId) {
    return this.getCollections().deleteOne({
      _id: new ObjectId(objectId),
    });
  }
}

module.exports = User;
