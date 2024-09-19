import authApiRequest from '@/apiRequests/auth'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
export async function POST(request: Request) {
    const cookieStore = cookies()
    const refreshToken = cookieStore.get('refreshToken')?.value
    if (!refreshToken) {
        return NextResponse.json(
        {
            message: 'Không tìm thấy refreshToken'
        },
        {
            status: 401
        }
        )
    }
    try {
        const { payload } = await authApiRequest.sRefreshToken({ refreshToken })
        if(payload.data.accessToken){
            cookieStore.set('accessToken', payload.data.accessToken, {
                path: '/',
                httpOnly: true,
                sameSite: 'lax',
                secure: true,
                expires: payload.data.expiresAccessToken * 1000
            })
            cookieStore.set('refreshToken', payload.data.refreshToken, {
                path: '/',
                httpOnly: true,
                sameSite: 'lax',
                secure: true,
                expires: payload.data.expiresRefreshToken * 1000
            })
            return NextResponse.json(payload)
        }
        else{
            return NextResponse.json(
                {
                message: payload.message
                },
                {
                status: 401
                }
            )
        }
    } 
    catch (error: any) {
        return NextResponse.json(
        {
            message: error.message ?? 'Có lỗi xảy ra'
        },
        {
            status: 401
        }
        )
    }
}