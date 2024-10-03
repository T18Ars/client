import http from '@/lib/http'
import {
  ChangePassBodyType,
  ChangePassResType,
  LoginBodyType,
  LoginResType,
  LogoutBodyType,
  RefreshTokenBodyType,
  RefreshTokenResType,
  RegisterBodyType,
  RegisterResType
} from '@/schemaValidations/auth.schema'

const authApiRequest = {
  refreshTokenRequest: null as Promise<{
    status: number
    payload: RefreshTokenResType
  }> | null,
  sRegister: (body: RegisterBodyType) => http.post<RegisterResType>('/api/Authentication/Register', body),
  register: (body: RegisterBodyType) => http.post<RegisterResType>('/api/auth/register', body, { baseUrl: '' }),

  sLogin: (body: LoginBodyType) => http.post<LoginResType>('/api/Authentication/login-client', body),
  login: (body: LoginBodyType) => http.post<LoginResType>('/api/auth/login', body, { baseUrl: '' }),
  
  sChangePass: (body: ChangePassBodyType) => http.post<ChangePassResType>('/api/Authentication/change-password', body),
  changePass: (body: ChangePassBodyType) => http.post<ChangePassResType>('/api/auth/changePassword', body, { baseUrl: '' }),

  sLogout: (body: LogoutBodyType & { accessToken: string }) =>
    http.post(
      '/api/Authentication/logout',
      {refreshToken: body.refreshToken},
      {headers: {
          Authorization: `Bearer ${body.accessToken}`
        }
      }
    ),
  logout: () => http.post('/api/auth/logout', null, { baseUrl: '' }), // client gọi đến route handler, không cần truyền AT và RT vào body vì AT và RT tự  động gửi thông qua cookie rồi
  sRefreshToken: (body: RefreshTokenBodyType) => http.post<RefreshTokenResType>('/api/Authentication/RefreshTokenClient', body),
  async refreshToken() {
    if (this.refreshTokenRequest) {
      return this.refreshTokenRequest
    }
    this.refreshTokenRequest = http.post<RefreshTokenResType>(
      '/api/auth/refresh-token',
      null,
      {
        baseUrl: ''
      }
    )
    const result = await this.refreshTokenRequest
    this.refreshTokenRequest = null
    return result
  }
}

export default authApiRequest