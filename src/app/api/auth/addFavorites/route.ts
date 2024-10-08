import authApiRequest from '@/apiRequests/auth'
import { FavoritesBodyType } from '@/schemaValidations/auth.schema'
import { HttpError } from '@/lib/http'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = (await request.json()) as FavoritesBodyType
  try {
    const { payload } = await authApiRequest.sAddFavorites(body)
    
    return NextResponse.json(payload)
  } 
  catch (error) {
    console.log('error', error);
    
    if (error instanceof HttpError) {
      return NextResponse.json(error.payload, {
        status: error.status
      })
    } 
    else {
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