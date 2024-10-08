import { Role } from '@/constants/type'
import z from 'zod'

// Register
export const RegisterBody = z
  .object({
    username: z.string().trim().min(2).max(256),
    email: z.string().email(),
    password: z.string().min(6).max(100),
    confirm_password: z.string().min(6).max(100),
    roles: z.any()
  })
  .strict()
  .superRefine(({ confirm_password, password }, ctx) => {
    if (confirm_password !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Mật khẩu không khớp',
        path: ['confirm_password']
      })
    }
  })

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>

export const RegisterRes = z.object({
  status: z.string(),
  message: z.string(),
  isSuccess: z.boolean()
})

export type RegisterResType = z.TypeOf<typeof RegisterRes>
// end Register
  
// Login
export const LoginBody = z
  .object({
    username: z.string(),
    password: z.string().min(6).max(100)
  })
  .strict()

export type LoginBodyType = z.TypeOf<typeof LoginBody>

export const LoginRes = z.object({
  data: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
    expiresAccessToken: z.number(), 
    expiresRefreshToken: z.number(),
    account: z.object({
      id: z.string(),
      username: z.string(),
      email: z.string(),
      // role: z.enum([Role.Owner, Role.Employee])
    })
  }),
  message: z.string()
})

export type LoginResType = z.TypeOf<typeof LoginRes>
// end Login
  
// ForgotPassword
export const ForgotPasswordBody = z
.object({
  email: z.string().min(6).max(100)
})
.strict()

export type ForgotPasswordBodyType = z.TypeOf<typeof ForgotPasswordBody>

export const ForgotPasswordRes = z.object({
  status: z.string(),
  message: z.string(),
  isSuccess: z.boolean()
})

export type ForgotPasswordResType = z.TypeOf<typeof ForgotPasswordRes>
// end ForgotPassword
  
// ResetPassword
export const ResetPasswordBody = z
.object({
  email: z.string().min(6).max(100),
  password: z.string().min(6).max(100),
  confirmpassword: z.string().min(6).max(100),
  token: z.string().max(1024),
})
.strict()
.superRefine(({ confirmpassword, password }, ctx) => {
  if (confirmpassword !== password) {
    ctx.addIssue({
      code: 'custom',
      message: 'Mật khẩu không khớp',
      path: ['confirmpassword']
    })
  }
})

export type ResetPasswordBodyType = z.TypeOf<typeof ResetPasswordBody>

export const ResetPasswordRes = z.object({
  status: z.string(),
  message: z.string(),
  isSuccess: z.boolean()
})

export type ResetPasswordResType = z.TypeOf<typeof ResetPasswordRes>
// end ResetPassword

// Change password
export const ChangePassBody = z
.object({
  username: z.string().trim().min(2).max(256),
  password: z.string().min(6).max(100),
  new_password: z.string().min(6).max(100),
  confirm_new_password: z.string().min(6).max(100),
})
.strict()
.superRefine(({ new_password, confirm_new_password }, ctx) => {
  if (new_password !== confirm_new_password) {
    ctx.addIssue({
      code: 'custom',
      message: 'Mật khẩu không khớp',
      path: ['confirm_new_password']
    })
  }
})

export type ChangePassBodyType = z.TypeOf<typeof ChangePassBody>

export const ChangePassRes = z.object({
  status: z.string(),
  message: z.string(),
  isSuccess: z.boolean()
})

export type ChangePassResType = z.TypeOf<typeof ChangePassRes>
// end Change password

// AddFavorites
export const FavoritesBody = z
.object({
  user_id: z.string().min(2).max(256),
  game_id: z.string().min(2).max(256),
})
.strict()

export type FavoritesBodyType = z.TypeOf<typeof FavoritesBody>

export const FavoritesRes = z.object({
  status: z.string(),
  message: z.string(),
  isSuccess: z.boolean()
})

export type FavoritesResType = z.TypeOf<typeof FavoritesRes>
// end AddFavorites

// RefreshToken
export const RefreshTokenBody = z
  .object({
    refreshToken: z.string()
  })
  .strict()

export type RefreshTokenBodyType = z.TypeOf<typeof RefreshTokenBody>

export const RefreshTokenRes = z.object({
  data: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
    expiresAccessToken: z.number(), 
    expiresRefreshToken: z.number(),
  }),
  message: z.string()
})

export type RefreshTokenResType = z.TypeOf<typeof RefreshTokenRes>
// end RefreshToken

export const LogoutBody = z
  .object({
    refreshToken: z.string()
  })
  .strict()

export type LogoutBodyType = z.TypeOf<typeof LogoutBody>

export const LoginGoogleQuery = z.object({
  code: z.string()
})

export type LoginGoogleQueryType = z.TypeOf<typeof LoginGoogleQuery>
