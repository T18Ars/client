import categoriesApiRequest from '@/apiRequests/categories'
import gamesApiRequest from '@/apiRequests/games'
import envConfig, { locales } from '@/config'
import type { MetadataRoute } from 'next'

const staticRoutes: MetadataRoute.Sitemap = [
  {
    url: '',
    changeFrequency: 'daily',
    priority: 1
  },
  {
    url: '/login',
    changeFrequency: 'yearly',
    priority: 0.5
  }
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const resultCate = await categoriesApiRequest.getAllSlug()
    const resultGames = await gamesApiRequest.getAllSlug()

    const cateList = resultCate?.payload
    const gameList = resultGames?.payload
    
    const localizeStaticSiteMap = locales.reduce((acc, locale) => {
        return [
            ...acc,
            ...staticRoutes?.map((route) => {
                return {
                ...route,
                url: `${envConfig.NEXT_PUBLIC_URL}/${locale}${route.url}`,
                lastModified: new Date()
                }
            })
        ]
    }, [] as MetadataRoute.Sitemap)

    const localizeCateSiteMap = locales.reduce((acc, locale) => {
        const cateListSiteMap: MetadataRoute.Sitemap = cateList?.map((cate: any) => {
            return {
                url: `${envConfig.NEXT_PUBLIC_URL}/${locale}/${cate}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.9
            }
        })
        return [...acc, ...cateListSiteMap]
    }, [] as MetadataRoute.Sitemap)

    const localizeGamesSiteMap = locales.reduce((acc, locale) => {
        const gameListSiteMap: MetadataRoute.Sitemap = gameList?.map((game: any) => {
            return {
                url: `${envConfig.NEXT_PUBLIC_URL}/${locale}/${game}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.9
            }
        })
        return [...acc, ...gameListSiteMap]
    }, [] as MetadataRoute.Sitemap)

    return [...localizeStaticSiteMap, ...localizeCateSiteMap, ...localizeGamesSiteMap]
}
