'use client'
import { toast } from "@/hooks/use-toast";
import { useRouter } from "@/navigation";
import { useSetTokenToCookieMutation } from '@/queries/useAuth'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
export default function OAuthPage() {
    const { mutateAsync } = useSetTokenToCookieMutation()
    const router = useRouter()
    const count = useRef(0)
    //   const { setRole, setSocket } = useAppContext()
    const searchParams = useSearchParams()
    const accessToken = searchParams.get('accessToken')
    const refreshToken = searchParams.get('refreshToken')
    const expiresAccessToken = searchParams.get('expiresAccessToken')!
    const expiresRefreshToken = searchParams.get('expiresRefreshToken')!
    const account = JSON.parse(decodeURIComponent(searchParams.get('account')!))
    
    useEffect(() => {
        if (accessToken && refreshToken) {
            if (count.current === 0) {
                mutateAsync({ accessToken, refreshToken, expiresAccessToken, expiresRefreshToken, account })
                .then(() => {
                    router.push('/')
                })
                .catch((e) => {
                    toast({
                        description: e.message || 'Có lỗi xảy ra',
                        variant: "destructive",
                        className: "bg-white text-foreground",
                    })
                })
                count.current++
            }
        } 
        else {
            toast({
                description: 'Có lỗi xảy ra',
                variant: "destructive",
                className: "bg-white text-foreground",
            })
        }
    }, [
        accessToken,
        refreshToken,
        expiresAccessToken,
        expiresRefreshToken,
        account,
        router,
        mutateAsync
  ])
  return <div />
}