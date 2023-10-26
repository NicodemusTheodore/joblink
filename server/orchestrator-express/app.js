const cors = require("cors");
const axios = require("axios");
const express = require("express");
const app = express();
const Redis = require("ioredis");

const port = process.env.PORT || 3000;

app
  .use(cors())
  .use(express.urlencoded({ extended: false }))
  .use(express.json());

app.get("/", (req, res, next) => {
  res.status(200).json("Welcome to the shadow realm stranger");
});

const usersAPI = "http://localhost:4000";
const jobsAPI = "http://localhost:4001";

const redis = new Redis({
  port: 18532,
  host: "redis-18532.c292.ap-southeast-1-1.ec2.cloud.redislabs.com",
  username: "default",
  password: "tJeajsin4DzlWYlGMEbGERUEqemq5mut",
  db: 0,
});

app.get("/users", async (req, res, next) => {
  try {
    let usersCache = await redis.get("users:get");

    if (usersCache) {
      let usersResult = JSON.parse(usersCache);
      return res.status(200).json(usersResult);
    }

    const { data } = await axios.get(`${usersAPI}/users`);

    redis.set("users:get", JSON.stringify(data));

    return res.status(200).json({
      response: data,
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/users", async (req, res, next) => {
  try {
    const { email, username, password, phoneNumber, address } = req.body;

    const { data } = await axios.post(`${usersAPI}/users/`, {
      email,
      username,
      password,
      phoneNumber,
      address,
    });

    await redis.del("users:get");

    res.status(201).json({
      response: data.message,
    });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/users/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const { data } = await axios.delete(`${usersAPI}/users/${id}`);

    await redis.del("users:get");

    res.status(200).json({
      response: data.message,
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/jobs", async (req, res, next) => {
  try {
    let jobsCache = await redis.get("jobs:get");

    if (jobsCache) {
      console.log("Redis Exist");
      let jobsResult = JSON.parse(jobsCache);
      return res.status(200).json(jobsResult);
    }
    console.log("No Redis");

    const { data } = await axios.get(`${jobsAPI}/job`);

    redis.set("jobs:get", JSON.stringify(data));

    return res.status(200).json({
      response: data,
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/jobs", async (req, res, next) => {
  try {
    const { title, description, companyId, jobType, skills } = req.body;

    const { data } = await axios.post(`${usersAPI}/job/`, {
      title,
      description,
      companyId,
      jobType,
      skills,
    });

    await redis.del("jobs:get");

    res.status(201).json({
      response: data.message,
    });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/jobs/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const { data } = await axios.delete(`${jobsAPI}/job/${id}`);

    await redis.del("jobs:get");

    res.status(200).json({
      response: data.message,
    });
  } catch (err) {
    console.log(err);
  }
});

app.put("/jobs/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, companyId, jobType, skills } = req.body;

    const { data } = await axios.put(`${usersAPI}/job/${id}`, {
      title,
      description,
      companyId,
      jobType,
      skills,
    });

    await redis.del("jobs:get");

    res.status(200).json({
      response: data.message,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => console.log(`Apps is listening at port ${port}`));
