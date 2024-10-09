'use client'
import { toast } from "@/hooks/use-toast";
import { handleErrorApi } from "@/lib/utils";
import { Fragment, useState } from "react";
import Link from "next/link";
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useAppContext } from '@/components/app-provider'
import { Input } from '@/components/ui/input';
import { useForm } from "react-hook-form";
import { ForgotPasswordBody, ForgotPasswordBodyType, LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
import { useForgotPasswordMutation, useLoginMutation } from "@/queries/useAuth";
import { Label } from "@/components/ui/label";
import envConfig from '@/config'

const getOauthGoogleUrl = () => {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
  const options = {
    redirect_uri: envConfig.NEXT_PUBLIC_GOOGLE_AUTHORIZED_REDIRECT_URI,
    client_id: envConfig.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ].join(' ')
  }
  const qs = new URLSearchParams(options)
  return `${rootUrl}?${qs.toString()}`
}
const googleOauthUrl = getOauthGoogleUrl()
export default function LoginForm(){
    const loginMutation = useLoginMutation()
    const forgotPasswordMutation = useForgotPasswordMutation()
    const searchParams = useSearchParams()
    const clearTokens = searchParams.get('clearTokens')
    const { setIsAuth } = useAppContext()
    const [open, setOpen] = useState(false);

    const form = useForm<LoginBodyType>({
        resolver: zodResolver(LoginBody),
        defaultValues: {
            username: '',
            password: ''
        }
    })

    const formForgotPassword = useForm<ForgotPasswordBodyType>({
        resolver: zodResolver(ForgotPasswordBody),
        defaultValues: {
            email: ''
        }
    })

    const router = useRouter()

    useEffect(() => {
        if (clearTokens) {
            setIsAuth(false)
        }
    }, [clearTokens, setIsAuth])

    const onSubmit = async (data: LoginBodyType) => {
        // Khi nhấn submit thì React hook form sẽ validate cái form bằng zod schema ở client trước
        // Nếu không pass qua vòng này thì sẽ không gọi api
        if (loginMutation.isPending) return
        try {
          const result = await loginMutation.mutateAsync(data)
          
            toast({
                description: result.payload.message,
                variant: "destructive",
                className: "bg-white text-foreground",
            })
            setIsAuth(true)
            router.push('/')
        } 
        catch (error: any) {
            handleErrorApi({
                error,
                setError: form.setError
            })
        }
    }

    const onSubmitForgotPassword = async (data: ForgotPasswordBodyType) => {
        if (forgotPasswordMutation.isPending) return
        try {
          const result = await forgotPasswordMutation.mutateAsync(data.email)
            toast({
                description: result.payload.message,
                variant: "destructive",
                className: "bg-white text-foreground",
            })
            setOpen(false)
        } 
        catch (error: any) {
            handleErrorApi({
                error,
                setError: formForgotPassword.setError
            })
        }
    }

    return(
        <Fragment>
            <section className="normal-breadcrumb set-bg" data-setbg="img/normal-breadcrumb.jpg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="normal__breadcrumb__text">
                                <h2>Login</h2>
                                <p>Welcome to the official Anime blog.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="login spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="login__form">
                                <h3>Login</h3>
                                <Form {...form}>
                                    <form
                                        onSubmit={form.handleSubmit(onSubmit)}
                                        className='space-y-2 max-w-[600px] flex-shrink-0 w-full'
                                        noValidate
                                    >
                                    <div className="input__item">
                                            <FormField
                                                control={form.control}
                                                name='username'
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input placeholder='Username' {...field} className="px-10 rounded-xs bg-white"/>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <span className="icon_mail"></span>
                                        </div>
                                        <div className="input__item">
                                            <FormField
                                                control={form.control}
                                                name='password'
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input placeholder='Password' type='password' {...field} className="px-10 rounded-xs bg-white"/>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <span className="icon_lock"></span>
                                        </div>
                                    {/* <button type="submit" className="site-btn">Login Now</button> */}
                                    <Button type="submit" style={{marginTop: '26px'}} className="site-btn bg-red-600 hover:bg-destructive/90 my-10">Login Now</Button>
                                    </form>
                                </Form>
                                {/* <Link href="/forgot-password" className="forget_pass">Forgot Your Password?</Link> */}
                                <Dialog open={open} onOpenChange={setOpen}>
                                    <DialogTrigger asChild>
                                        <Button style={{marginTop: '26px', borderRadius: '0'}} className='site-btn bg-red-600 hover:bg-destructive/90 my-10'>Forgot Your Password?</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <Form {...formForgotPassword}>
                                            <form
                                                onSubmit={formForgotPassword.handleSubmit(onSubmitForgotPassword)}
                                                noValidate
                                            >
                                                <DialogHeader>
                                                    <DialogTitle>Forgot password</DialogTitle>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <div className="grid-cols-6 items-center gap-4">
                                                        <Label htmlFor="name" className="text-right">Email</Label>
                                                        <FormField
                                                            control={formForgotPassword.control}
                                                            name='email'
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormControl>
                                                                        <Input placeholder='Email' {...field} className="px-3 rounded-xs bg-white"/>
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <Button type="submit" className='btn_change_pass'>Send mail</Button>
                                                </DialogFooter>
                                            </form>
                                        </Form>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="login__register">
                                <h3>Dont’t Have An Account?</h3>
                                <Link href="/register" className="primary-btn">Register Now</Link>
                            </div>
                        </div>
                    </div>
                    <div className="login__social">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-6">
                                <div className="login__social__links">
                                    <span>or</span>
                                    <ul>
                                        {/* <li><Link href="#" className="facebook"><i className="fa fa-facebook"></i> Sign in WithFacebook</Link></li> */}
                                        <li><Link href={googleOauthUrl} className="google"><i className="fa fa-google"></i> Sign in With Google</Link></li>
                                        {/* <li><Link href="#" className="twitter"><i className="fa fa-twitter"></i> Sign in With Twitter</Link></li> */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}