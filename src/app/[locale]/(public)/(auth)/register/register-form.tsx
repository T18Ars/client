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
import { handleErrorApi } from '@/lib/utils';

export default function RegisterForm(){
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
            toast({
                description: result.payload.message,
                variant: "destructive",
                className: "bg-white text-foreground",
            })
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
                                <h2>Sign Up</h2>
                                <p>Welcome to the official Anime blog.</p>
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
                                <h3>Sign Up</h3>
                                <Form {...form}>
                                    <form
                                        onSubmit={form.handleSubmit(onSubmit)}
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
                                                name='email'
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input placeholder='Email' type='email' {...field} className="px-10 rounded-xs bg-white"/>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <span className="icon_profile"></span>
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
                                                name='confirm_password'
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
                                        {/* <button type="submit" className="site-btn">Login Now</button> */}
                                        <Button type="submit" className="site-btn bg-red-600 hover:bg-destructive/90">Sign Up</Button>
                                    
                                    </form>
                                </Form>
                                <h5>Already have an account? <Link href="/login">Log In!</Link></h5>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="login__social__links">
                                <h3>Login With:</h3>
                                <ul>
                                    {/* <li><a href="#" className="facebook"><i className="fa fa-facebook"></i> Sign in With Facebook</a></li> */}
                                    <li><a href="#" className="google"><i className="fa fa-google"></i> Sign in With Google</a></li>
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