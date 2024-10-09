'use client'
import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import categoriesApiRequest from "@/apiRequests/categories";
import { Link, useRouter } from "@/navigation";
import { useState, useEffect, Fragment } from 'react'
import { useSearchParams } from 'next/navigation'
import gamesApiRequest from "@/apiRequests/games";

type Props = {
    slug: string
}

type cate = {
    id: string,
    slug: string,
    ten: string,
    title: string,
    description: string,
    img: string,
    so_thu_tu: number,
    children: Array<cate>,
    ds_games: gameDetail[],
    meta: {
        page: number,
        page_size: number,
        total: number,
        total_page: number,
        sort: string
    }
}
type gameDetail = {
    id: string,
    slug: string,
    ten: string,
    iframe: string,
    title: string,
    description: string,
    img: string,
    is_new: boolean,
    is_trending: boolean,
    is_menu: boolean,
    ten_category: string
}
const initData : cate = {
    id: '',
    slug: '',
    ten: '',
    title: '',
    description: '',
    img: '',
    so_thu_tu: 0,
    children: [],
    ds_games: [],
    meta: {
        page: 1,
        page_size: 40,
        total: 0,
        total_page: 0,
        sort: '0'
    }
}

export default function CategoriesPage({slug} : Props){
    const router = useRouter()
    const [cateDetail, setCateDetail] = useState<cate>(initData)
    const [gameTop, setGameTop] = useState<gameDetail[]>([])
    const searchParams = useSearchParams()
    const sort = searchParams.get('sort') ? searchParams.get('sort') : "0"
    const page = Number(searchParams.get('page') ? searchParams.get('page') : 1)


    useEffect(() => {
        const fetchData = async (): Promise<cate>  => {
            const {payload} = await categoriesApiRequest.getDetail(slug, page, initData.meta.page_size, sort ? sort : '0')
            
            return payload as cate;
        }
        fetchData().then((res) => {
            setCateDetail(res as cate)
        })
    }, [page, sort])

    useEffect(() => {
        // games relate
        const fetchDataRelate = async () : Promise<gameDetail[]> => {
            const { payload } = await gamesApiRequest.getGamesTopByCate(slug)
            return payload as gameDetail[];
        }
        fetchDataRelate().then(res => {
            setGameTop(res)
        })
    }, [])

    const handleSort = (e: any) => {
        router.push(`/${slug}?page=${cateDetail.meta.page}&sort=${e.target.value}`)
    }

    return(
        <Fragment>
            <div className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__links">
                                <a href="./"><i className="fa fa-home"></i> Home</a>
                                <span>{cateDetail?.ten || ''}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="product-page spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="product__page__content">
                                <div className="product__page__title">
                                    <div className="row">
                                        <div className="col-lg-8 col-md-8 col-sm-6">
                                            <div className="section-title">
                                                <h4>{cateDetail?.ten}</h4>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-6">
                                            <div className="product__page__filter">
                                                <p>Order by:</p>
                                                {/* <Select>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Select a sort" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="0">A-Z</SelectItem>
                                                            <SelectItem value="1">Z-A</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select> */}
                                                <select onChange={handleSort} value={cateDetail.meta.sort}>
                                                    <option value="0">A-Z</option>
                                                    <option value="1">Z-A</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    {cateDetail?.ds_games?.map((game: gameDetail) => (
                                    <div className="col-lg-3 col-md-4 col-sm-6" key={game.id}>
                                        <div className="product__item">
                                            <div className="product__item__pic">
                                                <img src={game.img} alt={game.slug} />
                                                <div className="ep bg_red">New</div>
                                            </div>
                                            <div className="product__item__text">
                                                <h5><Link href={`${slug}/${game.slug}`}>{game.ten}</Link></h5>
                                            </div>
                                        </div>
                                    </div>
                                    ))}
                                    
                                </div>
                            </div>
                            <div className="product__pagination">
                                {cateDetail.meta.page > 2 &&
                                <Link href={`/${cateDetail.slug}`}><i className="fa fa-angle-double-left"></i></Link>}

                                {cateDetail.meta.page > 1 &&
                                <Link href={`/${cateDetail.slug}?page=${cateDetail.meta.page - 1}`}><i className="fa fa-angle-left"></i></Link>}
                                
                                {cateDetail.meta.total_page > 1 && Array(cateDetail.meta.total_page)
                                    .fill(0)
                                    .map((_, index) => {
                                        if ((index + 1) >= (cateDetail.meta.page - 2) && (index + 1) <= (cateDetail.meta.page + 2)){
                                            const pageNumber = index + 1
                                            const isActive = cateDetail.meta.page === pageNumber
                                            return (
                                                <Link 
                                                    key={pageNumber} 
                                                    href={`/${cateDetail.slug}?page=${pageNumber}`}
                                                    className={isActive ? "current-page" : ""}>
                                                    {pageNumber}
                                                </Link>
                                            )
                                        }
                                    }
                                )}
                                {cateDetail.meta.page != cateDetail.meta.total_page && ((cateDetail.meta.total_page as number) > 0) &&
                                <Link href={`/${cateDetail.slug}?page=${cateDetail.meta.page + 1}`} ><i className="fa fa-angle-right"></i></Link>}
                                
                                {((cateDetail.meta.page + 1) < Number(cateDetail.meta.total_page)) &&
                                <Link href={`/${cateDetail.slug}?page=${cateDetail.meta.total_page}`}><i className="fa fa-angle-double-right"></i></Link>}
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12">
                            <div className="product__sidebar">
                                <div className="product__sidebar__view">
                                    <div className="section-title product__page__title">
                                        <h4>Top Games</h4>
                                    </div>
                                    
                                    <div className="row">
                                    {gameTop?.map((game: gameDetail) => (
                                        <div className="col-lg-6 col-md-4 col-sm-6" key={game.id}>
                                            <div className="product__item">
                                                <div className="product__item__pic">
                                                    <img src={game.img} alt={game.slug}/>
                                                    <div className="ep bg_red"></div>
                                                </div>
                                                <div className="product__item__text">
                                                    <h5><Link href={`${slug}/${game.slug}`}>{game.ten}</Link></h5>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    ))}
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
}