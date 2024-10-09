'use client'
import { toast } from "@/hooks/use-toast";
import { handleErrorApi } from "@/lib/utils";
import { Fragment } from "react";
// import { Link } from "@/navigation";
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useAppContext } from '@/components/app-provider'
import { Input } from '@/components/ui/input';
import { useForm } from "react-hook-form";
import { ResetPasswordBody, ResetPasswordBodyType } from "@/schemaValidations/auth.schema";
import { useResetPasswordMutation } from "@/queries/useAuth";
import { Link, useRouter } from "@/navigation";

export default function ResetPasswordForm(){
    const resetPasswordMutation = useResetPasswordMutation()
    const searchParams = useSearchParams()
    const email = searchParams.get('email')
    const token = searchParams.get('token')
    const { setIsAuth } = useAppContext()

    const form = useForm<ResetPasswordBodyType>({
        resolver: zodResolver(ResetPasswordBody),
        defaultValues: {
            email: email as string,
            token: token as string,
            password: '',
            confirmpassword: ''
        }
    })

    const router = useRouter()

    const onSubmit = async (data: ResetPasswordBodyType) => {
        // Khi nhấn submit thì React hook form sẽ validate cái form bằng zod schema ở client trước
        // Nếu không pass qua vòng này thì sẽ không gọi api
        if (resetPasswordMutation.isPending) return
        try {
            data.email = email as string
            data.token = (token as string).replace(/ /g, '+')
            const result = await resetPasswordMutation.mutateAsync(data)
          
            toast({
                description: result.payload.message,
                variant: "destructive",
                className: "bg-white text-foreground",
            })
            setIsAuth(true)
            router.push('/login')
        } 
        catch (error: any) {
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
                                <h2>Forgot Password</h2>
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
                                <h3>Forgot Password</h3>
                                <Form {...form}>
                                    <form
                                        onSubmit={form.handleSubmit(onSubmit)}
                                        className='space-y-2 max-w-[600px] flex-shrink-0 w-full'
                                        noValidate
                                    >
                                        <FormField
                                            control={form.control}
                                            name='token' 
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input type="hidden" {...field} className="rounded-xs bg-white"/>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className="input__item">
                                            <FormField
                                                control={form.control}
                                                name='email'
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input placeholder='Email' {...field} className="px-10 rounded-xs bg-white"/>
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
                                        <div className="input__item">
                                            <FormField
                                                control={form.control}
                                                name='confirmpassword'
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input placeholder='Confirm password' type='password' {...field} className="px-10 rounded-xs bg-white"/>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <span className="icon_lock"></span>
                                        </div>
                                    <Button type="submit" style={{marginTop: '26px'}} className="site-btn bg-red-600 hover:bg-destructive/90 my-10">Submit</Button>
                                    </form>
                                </Form>
                                <Link href="/login" className="forget_pass">Login</Link>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="login__register">
                                <h3>Dont’t Have An Account?</h3>
                                <Link href="/register" className="primary-btn">Register Now</Link>
                            </div>
                        </div>
                    </div>
                    {/* <div className="login__social">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-6">
                                <div className="login__social__links">
                                    <span>or</span>
                                    <ul>
                                        <li><Link href="#" className="google"><i className="fa fa-google"></i> Sign in With Google</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </section>
        </Fragment>
    )
}