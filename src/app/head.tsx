'use client'

import Link from "next/link";
import { useLogoutMutation } from '@/queries/useAuth'
import { getProfileFromLocalStorage, handleErrorApi } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import { useAppContext } from '@/components/app-provider'

export default function Head(){
    const logoutMutation = useLogoutMutation()
    const router = useRouter()
    const { isAuth, setIsAuth } = useAppContext()
    const [profile, setProfile] = useState({
        email: '',
        id: '',
        username: ''
    })

    useEffect(() => {
        setIsAuth(isAuth)
    }, [isAuth])

    useEffect(() => {
        const strAccount = getProfileFromLocalStorage()
        if (strAccount)
            setProfile(JSON.parse(strAccount))
    }, [])

    const handleLogout = async () => {
        if (logoutMutation.isPending) return
        try {
            await logoutMutation.mutateAsync()
            setIsAuth(false)
            router.push('/')
            router.refresh()
        } 
        catch (error: any) {
            handleErrorApi({
                error
            })
        }
    }

    return(
        <div className="col-lg-2">
            <div className="header__right">
            <Link href="#" className="search-switch"><span className="icon_search"></span></Link>
                {isAuth ?
                <div className="auth">
                    <Link href="#" className="auth_a">
                        {profile.username} <span className="arrow_carrot-down"></span>
                    </Link>
                    <ul className="dropdown">
                        <li><Link href="/profile">Profile</Link></li>
                        <li><Link href="#" onClick={handleLogout}>Logout</Link></li>
                    </ul>
                </div>
                : <Link href="/login" className="txt_login">Login</Link>}
            </div>
        </div>
    )
}