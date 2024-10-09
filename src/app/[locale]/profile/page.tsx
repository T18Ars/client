import { Suspense } from 'react'
import ProfileForm from './profile-form'
export default function ProfilePage() {
  return(
    <Suspense>
        <ProfileForm />
    </Suspense>
  )
}