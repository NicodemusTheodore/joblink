const axios = require("axios");
const redis = require("../config/redisConfig");
const url = "http://server-mongodb:4000";

const typeDefs = `#graphql
  type User {
    _id: ID
    username: String
    email: String
    phoneNumber: String
    address: String
  }

  type Query {
    users: [User]
    user(userId: String): User
  }

  input UserInput {
    email:String, 
    username:String, 
    password:String, 
    phoneNumber:String, 
    address:String
  }

  type Mutation{
    addUser(input: UserInput): Message
    deleteUser(id: String): Message
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      let usersCache = await redis.get("users:get");

      if (usersCache) {
        let usersResult = JSON.parse(usersCache);
        return usersResult;
      }

      const { data } = await axios.get(`${url}/users`);

      redis.set("users:get", JSON.stringify(data));
      return data;
    },
    user: async (_, { userId }) => {
      const { data } = await axios.get(`${url}/users/${userId}`);
      return data.data;
    },
  },

  Mutation: {
    addUser: async (_, { input }) => {
      const { data } = await axios.post(`${url}/users`, {
        email: input.email,
        username: input.username,
        password: input.password,
        phoneNumber: input.phoneNumber,
        address: input.address,
      });

      await redis.del("users:get");
      return data;
    },
    deleteUser: async (_, { id }) => {
      const { data } = await axios.delete(`${url}/users/${id}`);

      await redis.del("users:get");
      return data;
    },
  },
};

module.exports = { typeDefs, resolvers };
