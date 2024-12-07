import { User } from '@trengym/db'
import { ApiClient } from '../core/client'

export type SigninRequest = {
  email: string
  phone: string
}

export type VerifyCodeRequest = {
  phone: string
  code: string
}

export type VerifyCodeResponse = {
  user: User
  access_token: string
}

export default class AuthController {
  private apiClient: ApiClient

  constructor(client: ApiClient) {
    this.apiClient = client
  }

  async signin(request: SigninRequest): Promise<void> {
    await this.apiClient.post(`/auth/signin`, request)
  }

  async verifyCode(request: VerifyCodeRequest): Promise<VerifyCodeResponse> {
    return await this.apiClient.post(`/auth/verify-code`, request)
  }
}
