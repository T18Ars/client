'use client'
import { getRefreshTokenFromLocalStorage, getAccessTokenFromLocalStorage } from '@/lib/utils'
import { useLogoutMutation } from '@/queries/useAuth'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { useAppContext } from '@/components/app-provider'
import { useRouter } from '@/navigation'
export default function LogoutForm() {
  const { mutateAsync } = useLogoutMutation()
  const router = useRouter()
  const { setIsAuth } = useAppContext()
  const searchParams = useSearchParams()
  const accessTokenFromUrl = searchParams.get('accessToken')
  const refreshTokenFromUrl = searchParams.get('refreshToken')
  const ref = useRef<any>(null)
  useEffect(() => {
    if (
      !ref.current &&
      ((refreshTokenFromUrl &&
        refreshTokenFromUrl === getRefreshTokenFromLocalStorage()) ||
        (accessTokenFromUrl &&
        accessTokenFromUrl === getAccessTokenFromLocalStorage()))
    ) {
      ref.current = mutateAsync
      mutateAsync().then((res) => {
        setTimeout(() => {
          ref.current = null
        }, 1000)
        setIsAuth(false)
        router.push('/login')
      })
    } 
    else {
      router.push('/')
    }
  }, [mutateAsync, router, refreshTokenFromUrl, accessTokenFromUrl])
  return <div>Log out....</div>
}