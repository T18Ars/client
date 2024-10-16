'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterBody, RegisterBodyType } from "@/schemaValidations/auth.schema";
import { Link, useRouter } from "@/i18n/routing";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { useToast } from "@/hooks/use-toast"
import { Input } from '@/components/ui/input';
import { useRegisterMutation } from '@/queries/useAuth';
import { CommonMessages, handleErrorApi } from '@/lib/utils';
import { useTranslations } from 'next-intl'
import { LoaderCircle } from 'lucide-react'

export default function RegisterForm(){
    const t = useTranslations('Register')
    const commonT = useTranslations('Common')
    const errorMessageT = useTranslations('ErrorMessage')
    const registeMutation = useRegisterMutation()
    const { toast } = useToast()
    const router = useRouter()

    const form = useForm<RegisterBodyType>({
        resolver: zodResolver(RegisterBody),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirm_password: '',
            roles: ["User"]
        }
    })

    // 2. Define a submit handler.
    async function onSubmit(data: RegisterBodyType) {
        if (registeMutation.isPending) return
        try {
            const result = await registeMutation.mutateAsync(data)
            const messageKey = result.payload.message as keyof typeof CommonMessages;
            console.log(messageKey);
            
            toast({
                description: commonT(messageKey),
                variant: "success"
            })
            router.push('/login')
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
    
    return(
        <Fragment>
            <section className="normal-breadcrumb set-bg" data-setbg="/img/normal-breadcrumb.jpg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="normal__breadcrumb__text">
                                <h2>{t("title")}</h2>
                                <p>{t("descriptionPage")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="signup spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="login__form">
                                <h3>{t("title")}</h3>
                                <Form {...form}>
                                    <form
                                        onSubmit={form.handleSubmit(onSubmit)}
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
                                                name='email'
                                                render={({ field, formState: { errors } }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input placeholder={t("email")} type='email' {...field} className="px-10 rounded-xs bg-white"/>
                                                        </FormControl>
                                                        <FormMessage>
                                                            {Boolean(errors.email?.message) &&
                                                            errorMessageT(errors.email?.message as any)}
                                                        </FormMessage>
                                                    </FormItem>
                                                )}
                                            />
                                            <span className="icon_mail"></span>
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
                                        <div className="input__item">
                                            <FormField
                                                control={form.control}
                                                name='confirm_password'
                                                render={({ field, formState: { errors } }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input placeholder={t("confirmPassword")} type='password' {...field} className="px-10 rounded-xs bg-white"/>
                                                        </FormControl>
                                                        <FormMessage>
                                                            {Boolean(errors.confirm_password?.message) &&
                                                            errorMessageT(errors.confirm_password?.message as any)}
                                                        </FormMessage>
                                                    </FormItem>
                                                )}
                                            />
                                            <span className="icon_lock"></span>
                                        </div>
                                        {/* <button type="submit" className="site-btn">Login Now</button> */}
                                        <Button type="submit" className="site-btn bg-red-600 hover:bg-destructive/90">
                                            {registeMutation.isPending && (<LoaderCircle className='w-5 h-5 mr-2 animate-spin' />)}
                                            {t("title")}
                                        </Button>
                                    
                                    </form>
                                </Form>
                                <h5>{t("alreadyHaveAnAccount")} <Link href="/login">{t("login")}!</Link></h5>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="login__social__links">
                                <h3>{t("loginWith")}:</h3>
                                <ul>
                                    {/* <li><a href="#" className="facebook"><i className="fa fa-facebook"></i> Sign in With Facebook</a></li> */}
                                    <li><a href="#" className="google"><i className="fa fa-google"></i> {t("signInGoogle")}</a></li>
                                    {/* <li><a href="#" className="twitter"><i className="fa fa-twitter"></i> Sign in With Twitter</a></li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
}