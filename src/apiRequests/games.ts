import http from '@/lib/http'
import {
  GamesListResType
} from '@/schemaValidations/games.schema'

const gamesApiRequest = {
  getGamesByCategories: (cate: string) => http.get<GamesListResType>(`/api/games/get-by-categories/${cate}`),
  getDetail: (slug: string) => http.get(`/api/games/get-detail/${slug}`),
  getInfoSeo: (slug: string) => http.get(`/api/games/get-info-seo/${slug}`),
  getAllSlug: () => http.get<any>(`/api/games/get-all-slug`),
  getDetailRelate: (slug: string) => http.get(`/api/games/get-relate/${slug}`),
  getGamesNew: (page: number, page_size: number, sort: string) => http.get<any>(`/api/games/get-games-new?page=${page}&page_size=${page_size}&sort=${sort}`),
  getGamesTrending: (page: number, page_size: number, sort: string) => http.get<any>(`/api/games/get-games-trending?page=${page}&page_size=${page_size}&sort=${sort}`),
  getGameFavoriteByUser: () => http.get(`/api/games/get-game-favorites-by-user`),
  getGamesTopByCate: (slug: string) => http.get(`/api/games/get-game-top-by-cate/${slug}`),
  getGamesSearch: (search: string) => http.get(`/api/games/get-games-search?search=${search}`),
  getGamesSearchPagi: (search: string, page: number, page_size: number, sort: string) =>
    http.get(`/api/games/search-games?search=${search}&page=${page}&page_size=${page_size}&sort=${sort}`, {
      cache: 'no-store'
    }),
}

export default gamesApiRequest