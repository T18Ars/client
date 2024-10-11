'use client'

import { Link, useRouter } from "@/i18n/routing";
import { useLogoutMutation } from '@/queries/useAuth'
import { getProfileFromLocalStorage, handleErrorApi } from '@/lib/utils'
import { useEffect, useState } from "react";
import { useAppContext } from '@/components/app-provider'
import { UserIcon, ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/solid'
import { useTranslations } from 'next-intl'

export default function Head(){
    const t = useTranslations('Common')
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
                    <Link href="#" title={profile.username || profile["username"]} className="auth_a">
                        {profile.username || profile["username"]} <span className="arrow_carrot-down"></span>
                    </Link>
                    <ul className="dropdown">
                        <li><Link href="/profile" title={t("profile")}><UserIcon className="size-4 text-white-500" /> {t("profile")}</Link></li>
                        <li><Link href="#" title={t("logout")} onClick={handleLogout}><ArrowLeftEndOnRectangleIcon className="size-4 text-white-500" /> {t("logout")}</Link></li>
                    </ul>
                </div>
                : <Link href="/login" title={t("login")} className="txt_login">{t("login")}</Link>}
            </div>
        </div>
    )
}