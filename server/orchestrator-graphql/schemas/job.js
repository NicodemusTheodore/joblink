const axios = require("axios");
const redis = require("../config/redisConfig");
const url = "http://server-postgres:4001";

const typeDefs = `#graphql
  type Company {
    name: String
    companyLogo: String
    location: String
    email: String
    description: String
  }

  type User {
    _id: ID
    username: String
    email: String
    phoneNumber: String
    address: String
  }

  type Message {
    message: String
  }

  type Job {
    id:ID
    title: String
    description: String
    Company: Company
    authorId: String
    Author: User 
    jobType: String
    Skills: [Skill]
    createdAt: String
    updatedAt: String
  }

  type Skill {
    id: ID
    jobId: Int
    name: String
    level: String
  }

  type Query {
    jobs: [Job]
    job(jobId: Int): Job
  }

  input SkillInput {
    name: String
    level: String
  }

  input JobInput {
    title: String, 
    description: String, 
    companyId: Int, 
    jobType: String,
    authorId: String,
    skills: [SkillInput]
  }

  type Mutation{
    addJob(input: JobInput): Message
    editJob(id: Int, input: JobInput): Message
    deleteJob(id: Int): Message
  }
`;

const resolvers = {
  Query: {
    jobs: async () => {
      let usersCache = await redis.get("jobs:get");

      if (usersCache) {
        let usersResult = JSON.parse(usersCache);
        return usersResult;
      }

      const { data } = await axios.get(`${url}/job`);

      redis.set("jobs:get", JSON.stringify(data));

      console.log(data);

      return data;
    },
    job: async (_, { jobId }) => {
      const { data } = await axios.get(`${url}/job/${jobId}`);
      return data;
    },
  },

  Job: {
    Author: async (parent) => {
      const authorId = parent.authorId;
      const { data } = await axios.get(
        `http://server-mongodb:4000/users/${authorId}`
      );
      return data.data;
    },
  },

  Mutation: {
    addJob: async (_, { input }) => {
      const { data } = await axios.post(`${url}/job`, {
        title: input.title,
        description: input.description,
        companyId: input.companyId,
        authorId: input.authorId,
        jobType: input.jobType,
        skills: input.skills,
      });

      await redis.del("jobs:get");
      return data;
    },
    editJob: async (_, { id, input }) => {
      const { data } = await axios.put(`${url}/job/${id}`, {
        title: input.title,
        description: input.description,
        companyId: input.companyId,
        authorId: input.authorId,
        jobType: input.jobType,
        skills: input.skills,
      });
      await redis.del("jobs:get");
      return data;
    },
    deleteJob: async (_, { id }) => {
      const { data } = await axios.delete(`${url}/job/${id}`);
      await redis.del("jobs:get");
      return data;
    },
  },
};

module.exports = { typeDefs, resolvers };
