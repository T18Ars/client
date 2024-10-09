import LogoutForm from './logout-form'
import { unstable_setRequestLocale } from 'next-intl/server'

export default function LogoutPage({params: { locale }} : { params: { locale: string }}){
  unstable_setRequestLocale(locale)
  return(
    <LogoutForm />
  )
}