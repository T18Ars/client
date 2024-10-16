import { toast } from "@/hooks/use-toast"
import { type ClassValue, clsx } from "clsx"
import { UseFormSetError } from "react-hook-form"
import { twMerge } from "tailwind-merge"
import { EntityError } from "./http"
import authApiRequest from '@/apiRequests/auth'
const { convert } = require('html-to-text');

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Xóa đi ký tự `/` đầu tiên của path
 */
export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path
}

export const handleErrorApi = ({
  error,
  setError,
  title,
  mess,
  duration,
}: {
  error: any
  setError?: UseFormSetError<any>
  title?: string
  mess?: string
  duration?: number
}) => {
  if (error instanceof EntityError && setError) {
    if(error.payload.errors){
      error.payload.errors.forEach((item) => {
        setError(item.field, {
          type: 'server',
          message: item.message
        })
      })
    }
    else{
      toast({
        title: title,
        description: mess ?? 'Lỗi không xác định',
        variant: 'destructive',
        duration: duration ?? 10000
      })
    }
  } else {
    toast({
      title: title,
      description: mess ?? 'Lỗi không xác định',
      variant: 'destructive',
      duration: duration ?? 10000
    })
  }
}
const isBrowser = typeof window !== 'undefined'

export const getAccessTokenFromLocalStorage = () => isBrowser ? localStorage.getItem('accessToken') : null

export const getRefreshTokenFromLocalStorage = () => isBrowser ? localStorage.getItem('refreshToken') : null

export const getExpiresAccessTokenFromLocalStorage = () => isBrowser ? localStorage.getItem('expiresAccessToken') : null

export const getExpiresRefreshTokenFromLocalStorage = () => isBrowser ? localStorage.getItem('expiresRefreshToken') : null

export const getProfileFromLocalStorage = () => isBrowser ? localStorage.getItem('account') : JSON.stringify({email: '', id: '', username: ''})

export const setAccessTokenToLocalStorage = (value: string) => isBrowser && localStorage.setItem('accessToken', value)

export const setRefreshTokenToLocalStorage = (value: string) => isBrowser && localStorage.setItem('refreshToken', value)

export const setExpiresAccessTokenToLocalStorage = (value: string) => isBrowser && localStorage.setItem('expiresAccessToken', value)

export const setExpiresRefreshTokenToLocalStorage = (value: string) => isBrowser && localStorage.setItem('expiresRefreshToken', value)

export const removeTokensFromLocalStorage = () => {
    isBrowser && localStorage.removeItem('accessToken')
    isBrowser && localStorage.removeItem('refreshToken')
    isBrowser && localStorage.removeItem('account')
    isBrowser && localStorage.removeItem('expiresAccessToken')
    isBrowser && localStorage.removeItem('expiresRefreshToken')
}

export const checkAndRefreshToken = async (param?: {
  onError?: () => void
  onSuccess?: () => void
}) => {
  // Không nên đưa logic lấy access và refresh token ra khỏi cái function `checkAndRefreshToken`
  // Vì để mỗi lần mà checkAndRefreshToken() được gọi thì chúng ta se có một access và refresh token mới
  // Tránh hiện tượng bug nó lấy access và refresh token cũ ở lần đầu rồi gọi cho các lần tiếp theo
  const accessToken = getAccessTokenFromLocalStorage()
  const refreshToken = getRefreshTokenFromLocalStorage()
  const expiresAccessToken = getExpiresAccessTokenFromLocalStorage()
  const expiresRefreshToken = getExpiresRefreshTokenFromLocalStorage()
  // Chưa đăng nhập thì cũng không cho chạy
  if (!accessToken || !refreshToken) return
  
  // Thời điểm hết hạn của token là tính theo epoch time (s)
  // Còn khi các bạn dùng cú pháp new Date().getTime() thì nó sẽ trả về epoch time (ms)
  const now = Math.round(new Date().getTime() / 1000)
  // trường hợp refresh token hết hạn thì cho logout
  if (Number(expiresRefreshToken) <= now) {
    removeTokensFromLocalStorage()
    return param?.onError && param.onError()
  }
  // Ví dụ access token của chúng ta có thời gian hết hạn là 10s
  // thì mình sẽ kiểm tra còn 1/3 thời gian (3s) thì mình sẽ cho refresh token lại
  // Thời gian còn lại sẽ tính dựa trên công thức: decodedAccessToken.exp - now
  // Thời gian hết hạn của access token dựa trên công thức: decodedAccessToken.exp - decodedAccessToken.iat
  if (Number(expiresAccessToken) - now < 3600) {
    // Gọi API refresh token
    try {
      const res = await authApiRequest.refreshToken()
      setAccessTokenToLocalStorage(res.payload.data.accessToken)
      setRefreshTokenToLocalStorage(res.payload.data.refreshToken)
      setExpiresAccessTokenToLocalStorage(res.payload.data.expiresAccessToken.toString())
      setExpiresRefreshTokenToLocalStorage(res.payload.data.expiresRefreshToken.toString())
      param?.onSuccess && param.onSuccess()
    } catch (error) {
      param?.onError && param.onError()
    }
  }
}

export const wrapServerApi = async <T>(fn: () => Promise<T>) => {
  let result = null
  try {
    result = await fn()
  } catch (error: any) {
    if (error.digest?.includes('NEXT_REDIRECT')) {
      throw error
    }
  }
  return result
}

export const htmlToTextForDescription = (html: string) => {
  return convert(html, {
    limits: {
      maxInputLength: 140
    }
  })
}

export type cate = {
  id: string,
  slug: string,
  ten: string,
  title: string,
  description: string,
  img: string,
  so_thu_tu: number,
  children: Array<cate>,
  ds_games: gameDetail[],
  meta: {
      page: number,
      page_size: number,
      total: number,
      total_page: number,
      sort: string
  }
}
export type gameDetail = {
  id: string,
  slug: string,
  ten: string,
  iframe: string,
  title: string,
  description: string,
  slug_category: string,
  mo_ta: string,
  img: string,
  is_new: boolean,
  is_trending: boolean,
  is_menu: boolean,
  ten_category: string,
  is_favorites: boolean
}
export enum CommonMessages {
    loginSuccess = "loginSuccess",
    registerSuccess = "registerSuccess",
    existEmail = "existEmail",
    existUsername = "existUsername",
    notExistUsername = "notExistUsername",
    errorTitle = "errorTitle",
    passwordIncorrect = "passwordIncorrect",
    changePasswordSuccess = "changePasswordSuccess",
    passwordCurrentFail = "passwordCurrentFail",
    confirmEmail = "confirmEmail",
    addToFavoritesSuccess = "addToFavoritesSuccess",
    addToFavoritesFail = "addToFavoritesFail"

}