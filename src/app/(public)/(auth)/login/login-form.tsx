'use client'
import { toast } from "@/hooks/use-toast";
import { handleErrorApi } from "@/lib/utils";
import { Fragment } from "react";
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
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useAppContext } from '@/components/app-provider'
import { Input } from '@/components/ui/input';
import { useForm } from "react-hook-form";
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
import { useLoginMutation } from "@/queries/useAuth";

export default function LoginForm(){
    const loginMutation = useLoginMutation()
    const searchParams = useSearchParams()
    const clearTokens = searchParams.get('clearTokens')
    const { setIsAuth } = useAppContext()

    const form = useForm<LoginBodyType>({
        resolver: zodResolver(LoginBody),
        defaultValues: {
            username: '',
            password: ''
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
            description: result.payload.message
          })
          router.push('/')
        } catch (error: any) {
          handleErrorApi({
            error,
            setError: form.setError
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
                                <Link href="#" className="forget_pass">Forgot Your Password?</Link>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="login__register">
                                <h3>Dont’t Have An Account?</h3>
                                <Link href="#" className="primary-btn">Register Now</Link>
                            </div>
                        </div>
                    </div>
                    <div className="login__social">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-6">
                                <div className="login__social__links">
                                    <span>or</span>
                                    <ul>
                                        <li><Link href="#" className="facebook"><i className="fa fa-facebook"></i> Sign in With
                                        Facebook</Link></li>
                                        <li><Link href="#" className="google"><i className="fa fa-google"></i> Sign in With Google</Link></li>
                                        <li><Link href="#" className="twitter"><i className="fa fa-twitter"></i> Sign in With Twitter</Link>
                                        </li>
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