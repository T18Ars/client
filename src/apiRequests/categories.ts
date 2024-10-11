import http from '@/lib/http'

const categoriesApiRequest = {
  getCateMenu: () => http.get('/api/categories/get-categories-menu'),
  getDetail: (slug: string, page: number, page_size: number, sort: string) =>
    http.get(`/api/categories/get-detail/${slug}?page=${page}&page_size=${page_size}&sort=${sort}`, {
      cache: 'no-store'
    }),
  getAllSlug: () => http.get<any>(`/api/categories/get-all-slug`),
}

export default categoriesApiRequest
