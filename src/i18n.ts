import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { locales } from '@/config'
// Can be imported from a shared config
export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound()
  return {
    messages: (await import(`../messages/${locale}.json`)).default
  }
})
// import { getUserLocale } from '@/services/locale'
// import { getRequestConfig } from 'next-intl/server'
// export default getRequestConfig(async () => {
//   // Ngôn ngữ website
//   // Cái giá trị locale chúng ta có thể lấy từ cookie người dùng chẳn hạn.
//   const locale = await getUserLocale()
//   return {
//     locale,
//     messages: (await import(`../messages/${locale}.json`)).default
//   }
// })