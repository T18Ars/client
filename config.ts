// valid chính xác biến mối trường và dùng từ file này thay vì process.env.
// những biến sử dụng từ .env đều là string

import { z } from 'zod'

const configSchema = z.object({
  NEXT_PUBLIC_API_ENDPOINT: z.string(),
  NEXT_PUBLIC_URL: z.string()
})

// giúp valid xem giá trị có đúng như configSchema không
const configProject = configSchema.safeParse({
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL
})

// nếu configProject false
if (!configProject.success) {
  throw new Error('Các khai báo biến môi trường không hợp lệ')
}

// nếu đúng trả về thông tin biến môi trường
const envConfig = configProject.data

export default envConfig