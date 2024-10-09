import { Suspense } from 'react'
import LogoutForm from './logout-form'
export default function LogoutPage() {
  return(
    <Suspense>
        <LogoutForm />
    </Suspense>
  )
}