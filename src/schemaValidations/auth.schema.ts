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
