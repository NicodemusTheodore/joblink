require("dotenv").config();
const { MongoClient } = require("mongodb");

const connectionString = process.env.MONGODB_CONNECTION;

let db = null;

const mongoConnect = async () => {
  const client = new MongoClient(connectionString);

  try {
    db = client.db("joblink");

    return db;
  } catch (err) {
    await client.close();
  }
};

const getDatabase = () => db;

module.exports = {
  mongoConnect,
  getDatabase,
};
