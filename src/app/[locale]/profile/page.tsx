import { Suspense } from 'react'
import ProfileForm from './profile-form'
import { unstable_setRequestLocale } from 'next-intl/server'

export default function ProfilePage({params: { locale }} : { params: { locale: string }}){
  unstable_setRequestLocale(locale)
  return(
    <Suspense>
        <ProfileForm />
    </Suspense>
  )
}