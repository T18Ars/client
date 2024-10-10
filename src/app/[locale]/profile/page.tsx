import { Suspense } from 'react'
import ProfileForm from './profile-form'
import { Locale } from '@/config'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  const t = await getTranslations({ locale, namespace: 'Profile' })
  return {
    title: t('title'),
    description: t('description')
  }
}

export default function ProfilePage({params: { locale }} : { params: { locale: string }}){
  unstable_setRequestLocale(locale)
  return(
    <Suspense>
        <ProfileForm />
    </Suspense>
  )
}