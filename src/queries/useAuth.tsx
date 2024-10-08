import authApiRequest from '@/apiRequests/auth'
import { useMutation } from '@tanstack/react-query'

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.register
  })
}

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.login
  })
}

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.logout
  })
}

export const useChangePassMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.changePass
  })
}

export const useAddFavoritesMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.sAddFavorites
  })
}

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.sForgotPassword
  })
}

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.sResetPassword
  })
}

export const useSetTokenToCookieMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.setTokenToCookie
  })
}