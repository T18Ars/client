'use client'

import gamesApiRequest from "@/apiRequests/games";
import { Link, useRouter } from "@/navigation";
import { useState, useEffect, Fragment } from 'react'
import parse, { domToReact } from 'html-react-parser';
import { Button } from "@/components/ui/button";
import { getProfileFromLocalStorage, handleErrorApi } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useAddFavoritesMutation } from "@/queries/useAuth";
import { FavoritesBodyType } from "@/schemaValidations/auth.schema";
import { HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'

type Props = {
    slugCate: string
    slugGame: string
}
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
    is_favorites: boolean,
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
    is_favorites: false,
    ten_category: ''
}

export default function GamePage({slugCate, slugGame} : Props){
    const addFavoritesMutation = useAddFavoritesMutation()
    const [gameDetail, setGameDetail] = useState<gameDetail>(initData)
    const [gameRelate, setGameRelate] = useState<gameDetail[]>([])
    const { toast } = useToast()
    const [profile, setProfile] = useState({
        email: '',
        id: '',
        username: ''
    })
    const router = useRouter();

    useEffect(() => {
        // detail game
        const fetchData = async () : Promise<gameDetail> => {
            const { payload } = await gamesApiRequest.getDetail(slugGame)
            return payload as gameDetail;
        }
        fetchData().then(res => {
            setGameDetail(res)
        })

        // games relate
        const fetchDataRelate = async () : Promise<gameDetail[]> => {
            const { payload } = await gamesApiRequest.getDetailRelate(slugGame)
            return payload as gameDetail[];
        }
        fetchDataRelate().then(res => {
            setGameRelate(res)
        })

        // profile
        const strAccount = getProfileFromLocalStorage()
        if (strAccount){
            setProfile(JSON.parse(strAccount))
        }
    }, [])

    useEffect(() => {
        const handleLinkClick = (event: any) => {
            const target = event.target;
        
            // Kiểm tra nếu đối tượng click là thẻ <a> và có href
            if (target.tagName === 'a' && target.href) {
                const isInternalLink = target.href.startsWith(window.location.origin);
        
                if (isInternalLink) {
                    event.preventDefault(); // Ngăn chặn hành vi tải lại trang
                    router.push(target.getAttribute('href')); // Điều hướng trang bằng Next.js
                }
            }
        };
    
        // Thêm sự kiện click cho tất cả liên kết
        document.addEventListener('click', handleLinkClick);
    
        // Dọn dẹp sự kiện khi component unmount
        return () => {
            document.removeEventListener('click', handleLinkClick);
        };
    }, [router]);

    const options = {
        replace(domNode: any) {
            if (domNode.name === 'a') {
                const { href, target } = domNode.attribs;
                return (
                    <Link href={href}>
                        {domNode.children[0].data}
                    {/* {domToReact(domNode.children, options)} */}
                    </Link>
                );
            }
        }
    }

    const handleAddToFavorites = async () => {
        if(gameDetail.is_favorites) {
            toast({
                description: 'Trò chơi đã được thêm vào mục yêu thích!',
                variant: "destructive",
                className: "bg-white text-foreground",
            })
            return
        }
        
        // else{
            if (addFavoritesMutation.isPending) return
            try{
                if(profile.id !== ''){
                    let data = {
                        user_id: profile.id,
                        game_id: gameDetail.id
                    } as FavoritesBodyType
                    const result = await addFavoritesMutation.mutateAsync(data)
                    toast({
                        description: result.payload.message,
                        variant: "destructive",
                        className: "bg-white text-foreground",
                    })
                    setGameDetail({
                        ...gameDetail,
                        is_favorites: true
                    })
                }
                else{
                    toast({
                        description: 'Bạn cần đăng nhập để thêm trò chơi yêu thích!',
                        variant: "destructive",
                        className: "bg-white text-foreground",
                    })
                }
            }
            catch (error: any) {
                handleErrorApi({
                    error
                })
            }
        // }
    }

    return(
        <Fragment>
            <div className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__links">
                                <Link href="/"><i className="fa fa-home"></i> Home</Link>
                                <Link href={`/${slugCate}`}>{gameDetail.ten_category}</Link>
                                <span>{gameDetail.ten || ''}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="product-page spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            {gameDetail.iframe &&
                            <iframe
                                src={gameDetail.iframe}
                                frameBorder={0}
                                allowFullScreen
                                width="100%"
                                height="800px"
                            />}
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-lg-12 pull-right text-right">
                            <Button variant="outline" className='btn_add_favorites' onClick={handleAddToFavorites}>
                                {gameDetail?.is_favorites ? <HeartIconSolid className="size-4 text-red-500" /> : <HeartIcon className="size-4 text-red-500" />} Add to Favorites
                            </Button>
                        </div>
                    </div>

                    <div className="row">
                        {gameRelate?.map((game: gameDetail) => (
                            <div className="col-lg-2 col-md-3 col-sm-4" key={game.id}>
                                <div className="product__item game_relate">
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

                    <div className="col-lg-12 py-3" style={{backgroundColor: '#f4f5f7'}}>
                        {/* <div className="game_description" dangerouslySetInnerHTML={{ __html: parse(gameDetail.mo_ta, options)  }} /> */}
                        <div className="card" style={{borderRadius: '.5rem'}}>
                            <div className="card-body p-4">
                                <div className="game_description">
                                    {parse(gameDetail.mo_ta, options)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
}