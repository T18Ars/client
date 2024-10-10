import ForgotPasswordForm from "./forgot-password-form";
import { Locale } from '@/config'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import React, { Suspense } from 'react'

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  const t = await getTranslations({ locale, namespace: 'ForgotPassword' })
  return {
    title: t('title'),
    description: t('description')
  }
}

export default function ForgotPasswordPage({params: { locale }} : { params: { locale: string }}){
    unstable_setRequestLocale(locale)
    return(
      <Suspense>
        <ForgotPasswordForm />
      </Suspense>
    );
}