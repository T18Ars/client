import http from '@/lib/http'
import {
  ChangePassBodyType,
  ChangePassResType,
  FavoritesBodyType,
  FavoritesResType,
  ForgotPasswordBodyType,
  ForgotPasswordResType,
  LoginBodyType,
  LoginResType,
  LogoutBodyType,
  RefreshTokenBodyType,
  RefreshTokenResType,
  RegisterBodyType,
  RegisterResType,
  ResetPasswordBodyType,
  ResetPasswordResType
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

  sForgotPassword: (data : {email: string, lang: string}) => {
    console.log(data);
    
    return http.get<ForgotPasswordResType>(`/api/Authentication/ForgotPassword?email=${data.email}&lang=${data.lang}`)
  },

  // sForgotPassword: (email: string) => http.get<ForgotPasswordResType>(`/api/Authentication/ForgotPassword?email=${email}`),

  sResetPassword: (body: ResetPasswordBodyType) => http.post<ResetPasswordResType>(`/api/Authentication/ResetPassword`, body),
  
  sChangePass: (body: ChangePassBodyType) => http.post<ChangePassResType>('/api/Authentication/change-password', body),
  changePass: (body: ChangePassBodyType) => http.post<ChangePassResType>('/api/auth/changePassword', body, { baseUrl: '' }),

  sAddFavorites: (body: FavoritesBodyType) => { 
    return http.post<FavoritesResType>('/api/favorites/create', body)
  },
  addFavorites: (body: FavoritesBodyType) => http.post<FavoritesResType>('/api/auth/addFavorites', body, { baseUrl: '' }),

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
  },

  setTokenToCookie: (body: { accessToken: string; refreshToken: string, expiresAccessToken: string, expiresRefreshToken: string, account: string }) => http.post('/api/auth/token', body, { baseUrl: '' })
}

export default authApiRequest