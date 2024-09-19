'use client'

import { Suspense } from 'react'
import RefreshTokenClient from './refresh-token-client'
export default function RefreshTokenPage() {
  return(
    <Suspense>
        <RefreshTokenClient />
    </Suspense>
  )
}