'use client'

import { Fragment, useEffect, useState } from 'react'
import { gameDetail } from '@/lib/utils';
import gamesApiRequest from '@/apiRequests/games';
import { Link, useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation'


export type gamesSearch = {
    data: gameDetail[]
    meta: {
        page: number,
        page_size: number,
        total: number,
        total_page: number,
        sort: string
    }
  }
const initData : gamesSearch = {
    data: [],
    meta: {
        page: 1,
        page_size: 60,
        total: 0,
        total_page: 0,
        sort: '0'
    }
}

export default function GamesNewPage(){
    const t = useTranslations('Common')
    const homePageT = useTranslations('HomePage')
    const searchParams = useSearchParams()
    const router = useRouter()

    const [gamesSearch, setGamesSearch] = useState<gamesSearch>(initData)
    const sort = searchParams.get('sort') ? searchParams.get('sort') : "0"
    const page = Number(searchParams.get('page') ? searchParams.get('page') : 1)

    useEffect(() => {
        const fetchDataRelate = async () : Promise<gamesSearch> => {
            const { payload } = await gamesApiRequest.getGamesNew(page, initData.meta.page_size, sort ? sort : '0')
            return payload as gamesSearch;
        }
        fetchDataRelate().then(res => {
            setGamesSearch(res)
        })
    }, [page, sort])

    const handleSort = (e: any) => {
        router.push(`/games-new?page=${gamesSearch.meta.page}&sort=${e.target.value}`)
    }

    return(
        <Fragment>
            <div className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__links">
                                <Link href="/" title={t("home")}><i className="fa fa-home"></i> {t("home")}</Link>
                                <span>{homePageT("title_new_games")}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="product-page spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="product__page__content">
                                <div className="product__page__title">
                                    <div className="row">
                                        <div className="col-lg-8 col-md-8 col-sm-6">
                                            <div className="section-title">
                                                <h1>{homePageT("title_new_games")}</h1>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-6">
                                            <div className="product__page__filter">
                                                <p>{t("orderBy")}:</p>
                                                <select onChange={handleSort} value={gamesSearch.meta.sort}>
                                                    <option value="0">A-Z</option>
                                                    <option value="1">Z-A</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    {gamesSearch?.data?.map((game: gameDetail) => (
                                    <div className="col-lg-2 col-md-3 col-sm-4" key={game.id}>
                                        <div className="product__item">
                                            <div className="product__item__pic">
                                                <img src={game.img} alt={game.slug} title={game.slug} />
                                                {game.is_new &&
                                                <div className="ep bg_red">New</div>
                                                }
                                            </div>
                                            <div className="product__item__text">
                                                <h5><Link href={`${game.slug_category}/${game.slug}`} title={game.ten}>{game.ten}</Link></h5>
                                            </div>
                                        </div>
                                    </div>
                                    ))}
                                    
                                </div>
                            </div>
                            <div className="product__pagination">
                                {gamesSearch.meta.page > 2 &&
                                <Link href={`/games-new`}><i className="fa fa-angle-double-left" title="Trang đầu"></i></Link>}

                                {gamesSearch.meta.page > 1 &&
                                <Link href={`/games-new?page=${gamesSearch.meta.page - 1}`} title="Trang trước"><i className="fa fa-angle-left"></i></Link>}
                                
                                {gamesSearch.meta.total_page > 1 && Array(gamesSearch.meta.total_page)
                                    .fill(0)
                                    .map((_, index) => {
                                        if ((index + 1) >= (gamesSearch.meta.page - 2) && (index + 1) <= (gamesSearch.meta.page + 2)){
                                            const pageNumber = index + 1
                                            const isActive = gamesSearch.meta.page === pageNumber
                                            return (
                                                <Link 
                                                    key={pageNumber} 
                                                    href={`/games-new?page=${pageNumber}`}
                                                    className={isActive ? "current-page" : ""}
                                                    title={`Trang ${pageNumber}`}>
                                                    {pageNumber}
                                                </Link>
                                            )
                                        }
                                    }
                                )}
                                {gamesSearch.meta.page != gamesSearch.meta.total_page && ((gamesSearch.meta.total_page as number) > 0) &&
                                <Link href={`/games-new?page=${gamesSearch.meta.page + 1}`} title="Trang sau"><i className="fa fa-angle-right"></i></Link>}
                                
                                {((gamesSearch.meta.page + 1) < Number(gamesSearch.meta.total_page)) &&
                                <Link href={`/games-new?page=${gamesSearch.meta.total_page}`} title="Trang cuối"><i className="fa fa-angle-double-right"></i></Link>}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
}