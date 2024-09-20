import z from 'zod'

export const GamesSchema = z.object({
  id: z.string(),
  ten: z.string(),
  title: z.string(),
  description: z.string(),
  img: z.string(),
  slug: z.string(),
  is_new: z.boolean(),
  is_trending: z.boolean(),
  is_menu: z.boolean(),
  iframe: z.string(),
  mo_ta: z.string(),
  su_dung: z.boolean(),
  so_thu_thu: z.number(),
  so_lan_choi: z.number(),
  like: z.number(),
  dislike: z.number(),
  category_id: z.string()
})

export const GamesRes = z.object({
  data: GamesSchema,
  // message: z.string()
})

export type GamesResType = z.TypeOf<typeof GamesRes>

export const GamesListRes = z.object({
  data: z.array(GamesSchema),
  // message: z.string()
})

export type GamesListResType = z.TypeOf<typeof GamesListRes>