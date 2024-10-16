import gamesApiRequest from "@/apiRequests/games";
import { Link } from "@/i18n/routing";
import { getTranslations } from 'next-intl/server'
import { unstable_setRequestLocale } from 'next-intl/server'

type game = {
    id: string
    ten: string
    title: string
    description: string
    img: string
    slug: string
    slug_category: string
    is_new: boolean
    is_trending: boolean
    is_menu: boolean
    iframe: string
    mo_ta: string
    su_dung: boolean
    so_thu_thu: number
    so_lan_choi: number
    like: number
    dislike: number
    category_id: string
    ten_category: string
}

type gameDetail = {
    id: string,
    slug: string,
    slug_category: string,
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

export default async function Home({params: { locale }} : { params: { locale: string }}){
    unstable_setRequestLocale(locale)
    const t = await getTranslations('HomePage')
    let gamesNew: game[]
    let gamesTrending: game[]
    const resGamesNew = await gamesApiRequest.getGamesNew(1, 40, "0")
    const resGamesTrending = await gamesApiRequest.getGamesTrending(1, 40, "1")
    
    gamesNew = resGamesNew.payload.data
    gamesTrending = resGamesTrending.payload.data
        

  return (
    <main>
        <section className="product spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="trending__product">
                            <div className="row">
                                <div className="col-lg-8 col-md-8 col-sm-8">
                                    <div className="section-title">
                                        <h4>{t('title_new_games')}</h4>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4">
                                    <div className="btn__all">
                                        <Link href="/games-new" className="primary-btn">{t('viewAll')} <span className="arrow_right"></span></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                {gamesNew?.map((game: gameDetail) => (
                                    <div className="col-lg-2 col-md-3 col-sm-4" key={game.id}>
                                        <div className="product__item">
                                            <div className="product__item__pic">
                                                <img src={game.img} alt={game.slug} title={game.slug}/>
                                                <div className="ep bg_red">New</div>
                                            </div>
                                            <div className="product__item__text">
                                                <h5><Link href={`/${game.slug_category}/${game.slug}`} title={game.ten}>{game.ten}</Link></h5>
                                            </div>
                                        </div>
                                    </div>
                                    ))}
                            </div>
                        </div>
                        
                        <div className="trending__product">
                            <div className="row">
                                <div className="col-lg-8 col-md-8 col-sm-8">
                                    <div className="section-title">
                                        <h4>{t('title_trending_games')}</h4>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4">
                                    <div className="btn__all">
                                        <Link href="/games-trending" className="primary-btn">{t('viewAll')} <span className="arrow_right"></span></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                {gamesTrending?.map((game: gameDetail) => (
                                    <div className="col-lg-2 col-md-3 col-sm-4" key={game.id}>
                                        <div className="product__item">
                                            <div className="product__item__pic">
                                                <img src={game.img} alt={game.slug} title={game.slug} />
                                                <div className="ep bg_blue">Trending</div>
                                            </div>
                                            <div className="product__item__text">
                                                <h5><Link href={`/${game.slug_category}/${game.slug}`} title={game.ten} >{game.ten}</Link></h5>
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
    </main>
  );
}
