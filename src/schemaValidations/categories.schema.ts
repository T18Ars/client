import z from 'zod'

export const CategoriesSchema = z.object({
  id: z.string(),
  slug: z.string(),
  ten: z.string(),
  title: z.string(),
  description: z.string(),
  img: z.string(),
  so_thu_tu: z.number(),
  children: z.any(),
  ds_games: z.any(),
})

export const CategoriesRes = z.object({
  data: CategoriesSchema,
  message: z.string()
})

export type CategoriesResType = z.TypeOf<typeof CategoriesRes>

export const CategoriesListRes = z.object({
  data: z.array(CategoriesSchema),
  message: z.string()
})

export type CategoriesListResType = z.TypeOf<typeof CategoriesListRes>

