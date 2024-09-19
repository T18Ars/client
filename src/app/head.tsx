'use client'

import Link from "next/link";
import { useLogoutMutation } from '@/queries/useAuth'
import { getAccessTokenFromLocalStorage, handleErrorApi } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";

export default function Head(){
    const [isAuth, setIsAuth] = useState(false)
    const logoutMutation = useLogoutMutation()
    const router = useRouter()

    const isBrowser = typeof window !== 'undefined'
    if (isBrowser){
        useEffect(() => {
            setIsAuth(Boolean(getAccessTokenFromLocalStorage()))
        }, [localStorage.getItem('accessToken')])
    }

    const handleLogout = async () => {
        if (logoutMutation.isPending) return
        try {
            await logoutMutation.mutateAsync()
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
        <header className="header">
            <div className="container">
                <div className="row">
                    <div className="col-lg-2">
                        <div className="header__logo">
                            <a href="./index.html">
                                <img src="img/logo.png" alt="" />
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="header__nav">
                            <nav className="header__menu mobile-menu">
                                <ul>
                                    <li className="active"><a href="./index.html">Homepage</a></li>
                                    <li><a href="./categories.html">Categories <span className="arrow_carrot-down"></span></a>
                                        <ul className="dropdown">
                                            <li><a href="./categories.html">Categories</a></li>
                                            <li><a href="./anime-details.html">Anime Details</a></li>
                                            <li><a href="./anime-watching.html">Anime Watching</a></li>
                                            <li><a href="./blog-details.html">Blog Details</a></li>
                                            <li><a href="./signup.html">Sign Up</a></li>
                                            <li><a href="./login.html">Login</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="./blog.html">Our Blog</a></li>
                                    <li><a href="#">Contacts</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div className="header__right">
                        <Link href="#" className="search-switch"><span className="icon_search"></span></Link>
                            {isAuth ?
                            <div className="auth">
                                <Link href="#" className="auth_a">
                                    Admin <span className="arrow_carrot-down"></span>
                                </Link>
                                <ul className="dropdown">
                                    <li><Link href="/profile">Profile</Link></li>
                                    <li><Link href="#" onClick={handleLogout}>Logout</Link></li>
                                </ul>
                            </div>
                            : <Link href="/login" className="txt_login">Login</Link>}
                        </div>
                    </div>
                </div>
                <div id="mobile-menu-wrap"></div>
            </div>
        </header>
    )
}