import http from '@/lib/http'
import {
  LoginBodyType,
  LoginResType,
  LogoutBodyType,
  RefreshTokenBodyType,
  RefreshTokenResType
} from '@/schemaValidations/auth.schema'

const authApiRequest = {
  sLogin: (body: LoginBodyType) => http.post<LoginResType>('/api/Authentication/login-client', body),
  login: (body: LoginBodyType) =>
    http.post<LoginResType>('/api/auth/login', body, {
      baseUrl: ''
    }),
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
  sRefreshToken: (body: RefreshTokenBodyType) =>
    http.post<RefreshTokenResType>('/api/Authentication/RefreshTokenClient', body),
  refreshToken: () =>
    http.post<RefreshTokenResType>('/api/auth/refresh-token', null, {
      baseUrl: ''
    })
}

export default authApiRequest