'use client'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import RefreshToken from '@/components/refresh-token'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import {
  getAccessTokenFromLocalStorage,
  removeTokensFromLocalStorage
} from '@/lib/utils'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false
    }
  }
})

type profile = {
  email: string
  id: string
  username: string
}

const AppContext = createContext({
  isAuth: false,
  setIsAuth: (isAuth: boolean) => {}
})
export const useAppContext = () => {
  return useContext(AppContext)
}

export default function AppProvider({
  children
}: {
  children: React.ReactNode
}) {
  // debugger
  // const accessToken = getAccessTokenFromLocalStorage()
  const [isAuth, setIsAuthState] = useState(false)
  // const [isAuth, setIsAuthState] = useState(typeof window !== 'undefined' && (localStorage.getItem('accessToken') ? true : false))
  // sử dụng đoạn trên sẽ lỗi Hydration vì, 
  /**
   * Khi ứng dụng được kết xuất phía server (SSR), phía server không có quyền truy cập vào window hoặc localStorage vì đây là các đối tượng chỉ tồn tại ở phía client (trình duyệt). 
   * Do đó, khi bạn sử dụng điều kiện typeof window !== 'undefined' và kiểm tra localStorage.getItem('accessToken'), đoạn mã này chỉ thực thi ở phía client, tạo ra sự khác biệt giữa nội dung được kết xuất từ server và client.
   * Bạn cần đảm bảo rằng đoạn mã kiểm tra localStorage chỉ được thực thi ở phía client sau khi ứng dụng đã được tải đầy đủ (sau khi render lần đầu). Có thể sử dụng kỹ thuật như client-side rendering (CSR) cho phần logic liên quan đến localStorage.
   */
  useEffect(() => {
    const accessToken = getAccessTokenFromLocalStorage()
    if (accessToken) {
      setIsAuthState(true)
    }
  }, [])
  // Các bạn nào mà dùng Next.js 15 và React 19 thì không cần dùng useCallback đoạn này cũng được
  const setIsAuth = useCallback((isAuth: boolean) => {
    if (isAuth) {
      setIsAuthState(true)
    } else {
      setIsAuthState(false)
      // removeTokensFromLocalStorage()
    }
  }, [])

  // Nếu mọi người dùng React 19 và Next.js 15 thì không cần AppContext.Provider, chỉ cần AppContext là đủ
  return (
    <AppContext.Provider value={{ isAuth, setIsAuth }}>
      <QueryClientProvider client={queryClient}>
        {children}
        <RefreshToken />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AppContext.Provider>
  )
}