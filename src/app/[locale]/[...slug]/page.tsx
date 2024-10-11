import { Fragment } from 'react'
import CategoriesPage from "./categories-page";
import GamePage from "./game-page";
import { unstable_setRequestLocale } from 'next-intl/server'
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server'
import { cache } from 'react'
import { cate, gameDetail, wrapServerApi } from '@/lib/utils';
import categoriesApiRequest from '@/apiRequests/categories';
import gamesApiRequest from '@/apiRequests/games';
import envConfig from '@/config';

const getCateDetail = cache((slug: string) =>
    wrapServerApi(() => categoriesApiRequest.getDetail(slug, 1, 40, '0'))
)

const getGameDetail = cache((slug: string) =>
    wrapServerApi(() => gamesApiRequest.getDetail(slug))
)


type Props = {
    params: { slug: string, locale: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({params, searchParams}: Props): Promise<Metadata> {
    const t = await getTranslations({
        locale: params.locale,
        namespace: 'Category'
    })
    const slug = params.slug
    if (slug.length === 1){
        const data = await getCateDetail(slug[0])
        const cate = data?.payload as cate
        if (cate) {
            return {
                title: cate.title,
                description: cate.description,
                openGraph: {
                    title: cate.title,
                    description: cate.description,
                    url: envConfig.NEXT_PUBLIC_URL + `/${params.locale}/${slug[0]}`,
                    siteName: envConfig.NEXT_PUBLIC_URL,
                    // images: [
                    //     {
                    //         url: 'https://nextjs.org/og.png', // Must be an absolute URL
                    //         width: 800,
                    //         height: 600,
                    //     }
                    // ],
                    locale: params.locale,
                    type: 'website',
                }
            }
        }
        else{
            return {
                title: "cate",
                description: "des cate"
            }
        }
    }
    else{
        const data = await getGameDetail(slug[1])
        const game = data?.payload as gameDetail
        if (game) {
            return {
                title: game.title,
                description: game.description,
                openGraph: {
                    title: game.title,
                    description: game.description,
                    url: envConfig.NEXT_PUBLIC_URL + `/${params.locale}/${slug[0]}/${slug[1]}`,
                    siteName: envConfig.NEXT_PUBLIC_URL,
                    // images: [
                    //     {
                    //         url: 'https://nextjs.org/og.png', // Must be an absolute URL
                    //         width: 800,
                    //         height: 600,
                    //     }
                    // ],
                    locale: params.locale,
                    type: 'website',
                }
            }
        }
        else{
            return {
                title: "game",
                description: "des game"
            }
        }
    }
  }

export default async function SlugPage({params} : Props){
    unstable_setRequestLocale(params.locale)

    let cate, game
    const slug = params.slug
    if (slug.length === 1){
        const data = await getCateDetail(slug[0])
        cate = data?.payload as cate
    }
    else{
        const data = await getGameDetail(slug[1])
        game = data?.payload as gameDetail
    }

    return(
        <Fragment>
            {slug.length === 1 &&
            <CategoriesPage data={cate} slug={slug[0]} />
            }
            {slug.length === 2 &&
            <GamePage data={game} slugCate={slug[0]} slugGame={slug[1]}/>
            }
        </Fragment>
    );
}