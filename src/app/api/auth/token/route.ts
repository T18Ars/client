import { cookies } from 'next/headers'
import { HttpError } from '@/lib/http'
import { NextResponse } from 'next/server'
export async function POST(request: Request) {
  const body = (await request.json()) as {
    accessToken: string
    refreshToken: string
    expiresAccessToken: number
    expiresRefreshToken: number
    account: string
  }
  const { accessToken, refreshToken, expiresAccessToken, expiresRefreshToken, account } = body
  
  const cookieStore = cookies()
  try {
    cookieStore.set('accessToken', accessToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: expiresAccessToken * 1000
    })
    cookieStore.set('refreshToken', refreshToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: expiresRefreshToken * 1000
    })
    return NextResponse.json(body)
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