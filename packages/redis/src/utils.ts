import getRedisConnection from './client'

const redis = getRedisConnection()

type Entity = 'verificationToken'

export const setCache = async (
  entity: Entity,
  key: string,
  value: string | object,
  ttlInSeconds?: number
): Promise<void> => {
  const stringValue = typeof value === 'string' ? value : JSON.stringify(value)
  const cacheKey = `${entity}:${key}`
  if (ttlInSeconds) {
    await redis.set(cacheKey, stringValue, 'EX', ttlInSeconds)
  } else {
    await redis.set(cacheKey, stringValue)
  }
}

export const getCache = async <T>(
  entity: Entity,
  key: string
): Promise<T | null> => {
  const cacheKey = `${entity}:${key}`
  const value = await redis.get(cacheKey)
  if (!value) return null

  try {
    return JSON.parse(value) as T
  } catch {
    return value as T
  }
}

export const deleteCache = async (
  entity: Entity,
  key: string
): Promise<void> => {
  const cacheKey = `${entity}:${key}`
  await redis.del(cacheKey)
}

export const hasCache = async (
  entity: Entity,
  key: string
): Promise<boolean> => {
  const cacheKey = `${entity}:${key}`
  const result = await redis.exists(cacheKey)
  return result === 1
}

export const disconnect = async (): Promise<void> => {
  await redis.quit()
}
