import LoginForm from "./login-form";
// import { unstable_setRequestLocale } from 'next-intl/server'
import { Locale } from '@/config'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  const t = await getTranslations({ locale, namespace: 'Login' })
  return {
    title: t('title'),
    description: t('description')
  }
}

export default function LoginPage({params: { locale }} : { params: { locale: string }}){
    unstable_setRequestLocale(locale)
    return(
        <LoginForm />
    );
}