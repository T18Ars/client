import authApiRequest from '@/apiRequests/auth'
import { LoginBodyType } from '@/schemaValidations/auth.schema'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { HttpError } from '@/lib/http'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = (await request.json()) as LoginBodyType
  const cookieStore = cookies()
  try {
    
    const { payload } = await authApiRequest.sLogin(body)
    const { accessToken, refreshToken, expiresAccessToken, expiresRefreshToken } = payload.data

    // const decodedAccessToken = jwt.decode(accessToken) as { exp: number }
    // const decodedRefreshToken = jwt.decode(refreshToken) as { exp: number }
    cookieStore.set('accessToken', accessToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: expiresAccessToken * 1000
      // expires: decodedAccessToken.exp * 1000
    })
    cookieStore.set('refreshToken', refreshToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: expiresRefreshToken * 1000
      // expires: decodedRefreshToken.exp * 1000
    })
    return NextResponse.json(payload)
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(error.payload, {
        status: error.status
      })
    } else {
      return NextResponse.json(
        {
          message: 'Có lỗi xảy ra'
        },
        {
          status: 500
        }
      )
    }
  }
}