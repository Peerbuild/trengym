import { User, Gender as GenderEnum } from '@trengym/db'
import { ApiClient } from '../core/client'
import { Enum } from '../core/types'

export const Gender: Enum<GenderEnum> = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER'
} as const

export type UpdateSelfRequest = Partial<
  Omit<User, 'isApproved' | 'createdAt' | 'updatedAt'>
>

export default class UserController {
  private apiClient: ApiClient

  constructor(client: ApiClient) {
    this.apiClient = client
  }

  async updateSelf(request: UpdateSelfRequest): Promise<void> {
    await this.apiClient.patch(`/user/update`, request)
  }
}
