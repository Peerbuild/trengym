import IORedis, { RedisOptions } from "ioredis";

const redisConfig: RedisOptions = {
  port: 6379,
  host: "localhost",
  maxRetriesPerRequest: null,
  lazyConnect: true,
};

let redisConnection: IORedis | null = null;

const getRedisConnection = (): IORedis => {
  if (!redisConnection) {
    redisConnection = new IORedis(redisConfig);

    redisConnection.on("connect", () => {
      console.log("Connected to Redis");
    });

    redisConnection.on("error", (error) => {
      console.error("Error in Redis Connection", error);
    });
  }
  return redisConnection;
};

export default getRedisConnection;
