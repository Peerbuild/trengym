import { PrismaService } from '@/prisma/prisma.service'
import { NotFoundException } from '@nestjs/common'

export const getUserByIdOrEmailOrPhone = async (
  prisma: PrismaService,
  query: { id?: string; email?: string; phone?: string }
) => {
  const optionalQuery = Object.entries(query).map(([key, value]) => {
    return {
      [key]: value
    }
  })

  const user = await prisma.user.findFirst({
    where: {
      OR: optionalQuery
    }
  })

  if (!user) {
    const queryDescription = Object.entries(query)
      .map(([key, value]) => {
        return `${key}:${value}`
      })
      .join(' and ')

    throw new NotFoundException(`User with ${queryDescription} not found`)
  }

  return user
}
