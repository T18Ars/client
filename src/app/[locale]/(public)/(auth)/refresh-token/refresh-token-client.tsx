'use client'
import {
  checkAndRefreshToken,
  getRefreshTokenFromLocalStorage
} from '@/lib/utils'
import { useRouter } from '@/navigation'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import SearchParamsLoader, { useSearchParamsLoader } from '@/components/search-params-loader'

export default function RefreshTokenClient() {
  const router = useRouter()
  const { searchParams, setSearchParams } = useSearchParamsLoader()
  const refreshTokenFromUrl = searchParams?.get('refreshToken')
  const redirectPathname = searchParams?.get('redirect')
  useEffect(() => {
    if (
      refreshTokenFromUrl &&
      refreshTokenFromUrl === getRefreshTokenFromLocalStorage()
    ) {
      checkAndRefreshToken({
        onSuccess: () => {
          router.push(redirectPathname || '/')
        }
      })
    } 
    else {
        router.push('/')
    }
  }, [router, refreshTokenFromUrl, redirectPathname])
  return (
    <>
      <SearchParamsLoader onParamsReceived={setSearchParams} />
      <div>Refresh token....</div>
    </>
    
  )
}