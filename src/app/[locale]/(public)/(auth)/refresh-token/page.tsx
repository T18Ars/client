import RefreshTokenClient from './refresh-token-client'
import { unstable_setRequestLocale } from 'next-intl/server'

export default function RefreshTokenPage({params: { locale }} : { params: { locale: string }}){
  unstable_setRequestLocale(locale)
  return(
    <RefreshTokenClient />
  )
}