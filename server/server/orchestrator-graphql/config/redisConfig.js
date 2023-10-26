const Redis = require("ioredis");

const redis = new Redis({
  port: 18532,
  host: "redis-18532.c292.ap-southeast-1-1.ec2.cloud.redislabs.com",
  username: "default",
  password: "tJeajsin4DzlWYlGMEbGERUEqemq5mut",
  db: 0,
});

module.exports = redis;
