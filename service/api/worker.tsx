// import axios, {
//   type AxiosError,
//   type AxiosInstance,
//   type AxiosRequestConfig,
//   type InternalAxiosRequestConfig,
//   type AxiosResponse,
// } from "axios"
// import TokenStorage from "@/utils/storage/tokenStorage"

// const createInstance = (url: string, config?: AxiosRequestConfig): AxiosInstance => {
//   return axios.create({
//     baseURL: url,
//     timeout: 10000,
//     headers: {
//       "Content-Type": "application/json",
//     },
//     ...config,
//   })
// }

// const auth = (instance: AxiosInstance): AxiosInstance => {
//   instance.interceptors.request.use(
//     (config: InternalAxiosRequestConfig) => {
//       const token = TokenStorage.getToken()
//       if (token && config.headers) {
//         // Bearer 토큰 형식으로 Authorization 헤더 설정
//         config.headers.set("Authorization", `Bearer ${token}`)
//       }
//       return config
//     },
//     (error) => Promise.reject(error.response),
//   )
//   return instance
// }

// const handleResponse = (res: AxiosResponse) => res

// const handleError = (error: AxiosError) => {
//   if (error.response && error.response.status === 401) {
//     // 인증 오류 (토큰 만료 등)
//     TokenStorage.removeToken()
//     if (typeof window !== "undefined") {
//       window.location.href = "/login"
//     }
//   }

//   if (error.response && error.response.status >= 500) {
//     window.alert("현재 서버에 문제가 있습니다.")
//     console.error(error)
//   }

//   if (error.code === "ECONNABORTED" || error.response?.status === 408) {
//     alert("요청이 만료되었습니다.")
//     console.error(error)
//   }

//   return Promise.reject(error)
// }

// export { createInstance, auth, handleResponse, handleError }

import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from "axios"
import TokenStorage from "@/utils/storage/tokenStorage"
import { handleApiError } from "@/utils/error/errorHandler"

const createInstance = (url: string, config?: AxiosRequestConfig): AxiosInstance => {
  return axios.create({
    baseURL: url,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
    ...config,
  })
}

const auth = (instance: AxiosInstance): AxiosInstance => {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = TokenStorage.getToken()
      if (config.headers) {
        config.headers.set("Authorization", token || "")
      }
      return config
    },
    (error) => Promise.reject(error.response),
  )
  return instance
}

const handleResponse = (res: AxiosResponse) => res

const handleError = (error: AxiosError) => {
  if (error.response && error.response.status >= 500) {
    window.alert("현재 서버에 문제가 있습니다.")
    console.error(error)
  }

  if (error.code === "ECONNABORTED" || error.response?.status === 408) {
    alert("요청이 만료되었습니다.")
    console.error(error)
  }

  return Promise.reject(handleApiError(error))
}

export { createInstance, auth, handleResponse, handleError }

