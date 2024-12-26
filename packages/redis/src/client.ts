import IORedis, { type RedisOptions } from 'ioredis'

const redisConfig: RedisOptions = {
  port: 6379,
  host: 'localhost',
  maxRetriesPerRequest: null,
  lazyConnect: true
}

let redisConnection: IORedis | null = null

const getRedisConnection = (): IORedis => {
  if (!redisConnection) {
    redisConnection = new IORedis(redisConfig)
  }
  return redisConnection
}

export default getRedisConnection
