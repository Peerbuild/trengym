import AuthController from '../controllers/auth'
import UserController from '../controllers/user'

export class ApiClient {
  private accessToken?: string

  auth: AuthController
  user: UserController

  constructor({ accessToken }: { accessToken?: string }) {
    this.accessToken = accessToken

    this.user = new UserController(this)
    this.auth = new AuthController(this)
  }

  private async request<T>(url: string, options: RequestInit): Promise<T> {
    const backendUrl = 'http://localhost:8000/api'
    const headers = {
      'Content-Type': 'application/json',
      Authorization: this.accessToken ?? '',
      ...options.headers
    }

    const res = await fetch(`${backendUrl}${url}`, {
      ...options,
      headers
    })

    const data = await res.json()

    if (!res.ok) {
      const message = data.message as string
      throw new Error(message)
    }

    return data
  }

  async get<T>(url: string): Promise<T> {
    return this.request<T>(url, {
      method: 'GET'
    })
  }

  async post<T>(url: string, body: unknown): Promise<T> {
    return this.request<T>(url, {
      method: 'POST',
      body: JSON.stringify(body)
    })
  }

  async put<T>(url: string, body: unknown): Promise<T> {
    return this.request<T>(url, {
      method: 'PUT',
      body: JSON.stringify(body)
    })
  }

  async delete<T>(url: string): Promise<T> {
    return this.request<T>(url, {
      method: 'DELETE'
    })
  }

  async patch<T>(url: string, body: unknown): Promise<T> {
    return this.request<T>(url, {
      method: 'PATCH',
      body: JSON.stringify(body)
    })
  }
}
