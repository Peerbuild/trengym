import { User } from '@trengym/db'
import { ApiClient } from '../core/client'

export type UpdateSelfRequest = Partial<
  Omit<User, 'isApproved' | 'createdAt' | 'updatedAt'>
>

export default class UserController {
  private apiClient: ApiClient

  constructor(client: ApiClient) {
    this.apiClient = client
  }

  async updateSelf(request: UpdateSelfRequest): Promise<void> {
    await this.apiClient.post(`/user/update`, request)
  }
}
