'use client'
import { toast } from "@/hooks/use-toast";
import { CommonMessages, handleErrorApi } from "@/lib/utils";
import { Fragment, useState } from "react";
import { Link, useRouter, usePathname } from "@/i18n/routing";
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
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useEffect } from 'react'
import { useAppContext } from '@/components/app-provider'
import { Input } from '@/components/ui/input';
import { useForm } from "react-hook-form";
import { ForgotPasswordBody, ForgotPasswordBodyType, LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
import { useForgotPasswordMutation, useLoginMutation } from "@/queries/useAuth";
import { Label } from "@/components/ui/label";
import envConfig from '@/config'
import { useTranslations } from 'next-intl'
import SearchParamsLoader, { useSearchParamsLoader } from '@/components/search-params-loader'
import { useParams } from 'next/navigation'


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
    const t = useTranslations('Login')
    const commonT = useTranslations('Common')
    const forgotPasswordT = useTranslations('ForgotPassword')
    const errorMessageT = useTranslations('ErrorMessage')
    const loginMutation = useLoginMutation()
    const forgotPasswordMutation = useForgotPasswordMutation()
    const { searchParams, setSearchParams } = useSearchParamsLoader()
    // const searchParams = useSearchParams()
    const clearTokens = searchParams?.get('clearTokens')
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
    const lang = useParams().locale

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
            const messageKey = result.payload.message as keyof typeof CommonMessages;
            toast({
                description: commonT(messageKey),
                variant: "success",
            })
            setIsAuth(true)
            router.push('/')
        } 
        catch (error: any) {
            const messageKey = error?.payload?.message as keyof typeof CommonMessages;
            handleErrorApi({
                error,
                setError: form.setError,
                title: commonT("errorTitle"),
                mess: commonT(messageKey)
            })
        }
    }

    const onSubmitForgotPassword = async (data: ForgotPasswordBodyType) => {
        if (forgotPasswordMutation.isPending) return
        try {
            // 
            const result = await forgotPasswordMutation.mutateAsync({email: data.email, lang: lang as string})
            const messageKey = result.payload.message as keyof typeof CommonMessages;
            toast({
                description: commonT(messageKey),
                variant: "success"
            })
            setOpen(false)
        } 
        catch (error: any) {
            const messageKey = error?.payload?.message as keyof typeof CommonMessages;
            
            handleErrorApi({
                error,
                setError: formForgotPassword.setError,
                title: commonT("errorTitle"),
                mess: commonT(messageKey)
            })
        }
    }

    return(
        <Fragment>
            <SearchParamsLoader onParamsReceived={setSearchParams} />
            <section className="normal-breadcrumb set-bg" data-setbg="/img/normal-breadcrumb.jpg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="normal__breadcrumb__text">
                                <h2>{t('title')}</h2>
                                <p>{t("descriptionPage")}</p>
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
                                <h3>{t('title')}</h3>
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
                                                render={({ field, formState: { errors } }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input placeholder={t("username")} {...field} className="px-10 rounded-xs bg-white"/>
                                                        </FormControl>
                                                        <FormMessage>
                                                            {Boolean(errors.username?.message) &&
                                                            errorMessageT(errors.username?.message as any)}
                                                        </FormMessage>
                                                    </FormItem>
                                                )}
                                            />
                                            <span className="icon_profile"></span>
                                        </div>
                                        <div className="input__item">
                                            <FormField
                                                control={form.control}
                                                name='password'
                                                render={({ field, formState: { errors } }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input placeholder={t("password")} type='password' {...field} className="px-10 rounded-xs bg-white"/>
                                                        </FormControl>
                                                        <FormMessage>
                                                            {Boolean(errors.password?.message) &&
                                                            errorMessageT(errors.password?.message as any)}
                                                        </FormMessage>
                                                    </FormItem>
                                                )}
                                            />
                                            <span className="icon_lock"></span>
                                        </div>
                                    {/* <button type="submit" className="site-btn">Login Now</button> */}
                                    <Button type="submit" style={{marginTop: '26px'}} className="site-btn bg-red-600 hover:bg-destructive/90 my-10">{t('title')}</Button>
                                    </form>
                                </Form>
                                {/* <Link href="/forgot-password" className="forget_pass">Forgot Your Password?</Link> */}
                                <Dialog open={open} onOpenChange={setOpen}>
                                    <DialogTrigger asChild>
                                        <Button style={{marginTop: '26px', borderRadius: '0'}} className='site-btn bg-red-600 hover:bg-destructive/90 my-10'>{t("forgotPassword") + '?'}</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <Form {...formForgotPassword}>
                                            <form
                                                onSubmit={formForgotPassword.handleSubmit(onSubmitForgotPassword)}
                                                noValidate
                                            >
                                                <DialogHeader>
                                                    <DialogTitle>{t("forgotPassword")}</DialogTitle>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <div className="grid-cols-6 items-center gap-4">
                                                        <Label htmlFor="name" className="text-right">Email</Label>
                                                        <FormField
                                                            control={formForgotPassword.control}
                                                            name='email'
                                                            render={({ field, formState: { errors } }) => (
                                                                <FormItem>
                                                                    <FormControl>
                                                                        <Input placeholder={forgotPasswordT("email")} {...field} className="px-3 rounded-xs bg-white"/>
                                                                    </FormControl>
                                                                    <FormMessage>
                                                                        {Boolean(errors.email?.message) &&
                                                                        errorMessageT(errors.email?.message as any)}
                                                                    </FormMessage>
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <Button type="submit" className='btn_change_pass'>{t("btnSendMail")}</Button>
                                                </DialogFooter>
                                            </form>
                                        </Form>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="login__register">
                                <h3>{t("dontAccount")}</h3>
                                <Link href="/register" className="primary-btn">{t("register")}</Link>
                            </div>
                        </div>
                    </div>
                    <div className="login__social">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-6">
                                <div className="login__social__links">
                                    <span>{t("or")}</span>
                                    <ul>
                                        {/* <li><Link href="#" className="facebook"><i className="fa fa-facebook"></i> Sign in WithFacebook</Link></li> */}
                                        <li><Link href={googleOauthUrl} className="google"><i className="fa fa-google"></i> {t("signInGoogle")}</Link></li>
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