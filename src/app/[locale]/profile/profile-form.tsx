'use client'

import gamesApiRequest from '@/apiRequests/games'
import { getProfileFromLocalStorage, handleErrorApi } from '@/lib/utils'
import Link from 'next/link'
import { useRef, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
  } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { ChangePassBody, ChangePassBodyType } from '@/schemaValidations/auth.schema'
import { useToast } from '@/hooks/use-toast'
import { useChangePassMutation, useLogoutMutation } from '@/queries/useAuth'
import { useRouter } from 'next/navigation'
import { useAppContext } from '@/components/app-provider'

type gameDetail = {
    id: string,
    slug: string,
    slug_category: string,
    ten: string,
    iframe: string,
    title: string,
    description: string,
    mo_ta: string,
    img: string,
    is_new: boolean,
    is_trending: boolean,
    is_menu: boolean,
    ten_category: string
}
const initData : gameDetail = {
    id: '',
    slug: '',
    slug_category: '',
    ten: '',
    iframe: '',
    title: '',
    description: '',
    mo_ta: '',
    img: '',
    is_new: false,
    is_trending: false,
    is_menu: false,
    ten_category: ''
}
export default function ProfileForm() {
    const changePassMutation = useChangePassMutation()
    const { mutateAsync } = useLogoutMutation()
    const router = useRouter()
    const ref = useRef<any>(null)
    const { setIsAuth } = useAppContext()
    const { toast } = useToast()
    const form = useForm<ChangePassBodyType>({
        resolver: zodResolver(ChangePassBody),
        defaultValues: {
            password: '',
            new_password: '',
            confirm_new_password: ''
        }
    })
    const [profile, setProfile] = useState({
        email: '',
        id: '',
        username: ''
    })
    const [gameRelate, setGameRelate] = useState<gameDetail[]>([])

    useEffect(() => {
        const fetchDataRelate = async () : Promise<gameDetail[]> => {
            const { payload } = await gamesApiRequest.getGameFavoriteByUser()
            return payload as gameDetail[];
        }
        fetchDataRelate().then(res => {
            setGameRelate(res)
        })

        const strAccount = getProfileFromLocalStorage()
        if (strAccount)
            setProfile(JSON.parse(strAccount))
    }, [])

    async function onSubmit(data: ChangePassBodyType) {
        if (changePassMutation.isPending) return
        try {
            data.username = profile.username;
            const result = await changePassMutation.mutateAsync(data)
            toast({
                description: result.payload.message
            })
            if(result.payload.isSuccess){
                mutateAsync().then((res) => {
                    setTimeout(() => {
                    ref.current = null
                    }, 1000)
                    setIsAuth(false)
                    router.push('/')
                })
            }
        } 
        catch (error: any) {
            handleErrorApi({
                error,
                setError: form.setError
            })
        }
    }

    return(
        <section className="profile spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="trending__product">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="section-title">
                                        <h4>Profile</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <div className="col-lg-12 py-3" style={{backgroundColor: '#f4f5f7'}}>
                                        <div className="card" style={{borderRadius: '.5rem'}}>
                                            {/* <div className="col-md-4 gradient-custom text-center text-white d-flex justify-content-center align-items-center"
                                            style={{borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem'}}>
                                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                                    alt="Avatar" className="img-fluid my-5" style={{width: '80px'}} />
                                                <h5>Marie Horwitz</h5>
                                                <p>Web Designer</p>
                                                <i className="far fa-edit mb-5"></i>
                                            </div> */}
                                                <div className="card-body p-4">
                                                    <div className="row pt-1">
                                                        <div className="col-6 mb-3">
                                                            <h6>Email</h6>
                                                            <p className="text-muted">{profile?.email}</p>
                                                        </div>
                                                        <div className="col-6 mb-3">
                                                            <h6>Username</h6>
                                                            <p className="text-muted">{profile?.username}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row pt-1">
                                                        <div className="col-6 mb-3" style={{backgroundColor: 'white'}}>
                                                            <Dialog>
                                                                <DialogTrigger asChild>
                                                                    <Button variant="outline" className='btn_change_pass'>Change password</Button>
                                                                </DialogTrigger>
                                                                <DialogContent className="sm:max-w-[425px]">
                                                                    <Form {...form}>
                                                                        <form
                                                                            onSubmit={form.handleSubmit(onSubmit)}
                                                                            noValidate
                                                                        >
                                                                            <DialogHeader>
                                                                                <DialogTitle>Change password</DialogTitle>
                                                                            </DialogHeader>
                                                                            <FormField
                                                                                control={form.control}
                                                                                name='username' 
                                                                                defaultValue={profile.username}
                                                                                render={({ field }) => (
                                                                                    <FormItem>
                                                                                        <FormControl>
                                                                                            <Input type="hidden" {...field} className="rounded-xs bg-white"/>
                                                                                        </FormControl>
                                                                                        <FormMessage />
                                                                                    </FormItem>
                                                                                )}
                                                                            />
                                                                            <div className="grid gap-4 py-4">
                                                                                <div className="grid-cols-6 items-center gap-4">
                                                                                    <Label htmlFor="name" className="text-right">Current password</Label>
                                                                                    {/* <Input
                                                                                        id="name"
                                                                                        type="password"
                                                                                        className="col-span-3"
                                                                                    /> */}
                                                                                    <FormField
                                                                                        control={form.control}
                                                                                        name='password'
                                                                                        render={({ field }) => (
                                                                                            <FormItem>
                                                                                                <FormControl>
                                                                                                    <Input type="password" {...field} className="rounded-xs bg-white"/>
                                                                                                </FormControl>
                                                                                                <FormMessage />
                                                                                            </FormItem>
                                                                                        )}
                                                                                    />
                                                                                </div>
                                                                                <div className="grid-cols-6 items-center gap-4">
                                                                                    <Label htmlFor="username" className="text-right">New password</Label>
                                                                                    <FormField
                                                                                        control={form.control}
                                                                                        name='new_password'
                                                                                        render={({ field }) => (
                                                                                            <FormItem>
                                                                                                <FormControl>
                                                                                                    <Input type="password" {...field} className="rounded-xs bg-white"/>
                                                                                                </FormControl>
                                                                                                <FormMessage />
                                                                                            </FormItem>
                                                                                        )}
                                                                                    />
                                                                                </div>
                                                                                <div className="grid-cols-6 items-center gap-4">
                                                                                    <Label htmlFor="username" className="text-right">Confirm password</Label>
                                                                                    <FormField
                                                                                        control={form.control}
                                                                                        name='confirm_new_password'
                                                                                        render={({ field }) => (
                                                                                            <FormItem>
                                                                                                <FormControl>
                                                                                                    <Input type="password" {...field} className="rounded-xs bg-white"/>
                                                                                                </FormControl>
                                                                                                <FormMessage />
                                                                                            </FormItem>
                                                                                        )}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <DialogFooter>
                                                                                <Button type="submit" className='btn_change_pass'>Save changes</Button>
                                                                            </DialogFooter>
                                                                        </form>
                                                                    </Form>
                                                                </DialogContent>
                                                            </Dialog>
                                                        </div>
                                                    </div>
                                                </div>
                                        </div>
                                </div>
                            </div>
                        </div>

                        <div className="trending__product">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="section-title">
                                        <h4>Favorite Games</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                {gameRelate?.map((game: gameDetail) => (
                                <div className="col-lg-2 col-md-3 col-sm-4" key={game.id}>
                                    <div className="product__item">
                                        <div className="product__item__pic">
                                            <img src={game.img} alt="" />
                                            <div className="ep bg_red">New</div>
                                        </div>
                                        <div className="product__item__text">
                                            <h5><Link href={`/${game.slug_category}/${game.slug}`}>{game.ten}</Link></h5>
                                        </div>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}