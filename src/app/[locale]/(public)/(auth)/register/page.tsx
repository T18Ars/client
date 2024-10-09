import RegisterForm from "./register-form";
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { Locale } from "@/config";
export async function generateMetadata({
    params: { locale }
  }: {
    params: { locale: Locale }
  }) {
    const t = await getTranslations({ locale, namespace: 'Register' })
    return {
      title: t('title'),
      description: t('description')
    }
  }
export default function RegisterPage({params: { locale }} : { params: { locale: string }}){
    unstable_setRequestLocale(locale)
    return(
        <RegisterForm />
    );
}