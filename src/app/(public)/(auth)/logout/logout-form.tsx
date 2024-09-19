'use client'
import { getRefreshTokenFromLocalStorage, getAccessTokenFromLocalStorage } from '@/lib/utils'
import { useLogoutMutation } from '@/queries/useAuth'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
export default function LogoutForm() {
  const { mutateAsync } = useLogoutMutation()
  const router = useRouter()
  const searchParams = useSearchParams()
  const accessTokenFromUrl = searchParams.get('accessToken')
  const refreshTokenFromUrl = searchParams.get('refreshToken')
  const ref = useRef<any>(null)
  useEffect(() => {
    if (
      ref.current ||
      (refreshTokenFromUrl &&
        refreshTokenFromUrl !== getRefreshTokenFromLocalStorage()) ||
      (accessTokenFromUrl &&
        accessTokenFromUrl !== getAccessTokenFromLocalStorage())
    ) {
      return
    }
    ref.current = mutateAsync
    mutateAsync().then((res) => {
      setTimeout(() => {
        ref.current = null
      }, 1000)
      router.push('/login')
    })
  }, [mutateAsync, router, refreshTokenFromUrl, accessTokenFromUrl])
  return <div>Log out....</div>
}