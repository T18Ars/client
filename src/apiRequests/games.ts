import http from '@/lib/http'
import {
  GamesListResType
} from '@/schemaValidations/games.schema'

const gamesApiRequest = {
  getGamesByCategories: (cate: string) => http.get<GamesListResType>(`/api/games/get-by-categories/${cate}`),
  getDetail: (slug: string) => http.get(`/api/games/get-detail/${slug}`),
  getGamesNew: (page: number, page_size: number, sort: string) => http.get<any>(`/api/games/get-games-new?page=${page}&page_size=${page_size}&sort=${sort}`),
  getGamesTrending: (page: number, page_size: number, sort: string) => http.get<any>(`/api/games/get-games-trending?page=${page}&page_size=${page_size}&sort=${sort}`)
}

export default gamesApiRequest