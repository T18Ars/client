'use client'

import { Link, useRouter } from "@/navigation";
import { useLogoutMutation } from '@/queries/useAuth'
import { getProfileFromLocalStorage, handleErrorApi } from '@/lib/utils'
import { useEffect, useState } from "react";
import { useAppContext } from '@/components/app-provider'
import { UserIcon, ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/solid'

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
        if (strAccount){
            setProfile(JSON.parse(strAccount))
        }
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
                        {profile.username || profile["username"]} <span className="arrow_carrot-down"></span>
                    </Link>
                    <ul className="dropdown">
                        <li><Link href="/profile"><UserIcon className="size-4 text-white-500" /> Profile</Link></li>
                        <li><Link href="#" onClick={handleLogout}><ArrowLeftEndOnRectangleIcon className="size-4 text-white-500" /> Logout</Link></li>
                    </ul>
                </div>
                : <Link href="/login" className="txt_login">Login</Link>}
            </div>
        </div>
    )
}