// "use client"

// import { useEffect, useCallback } from "react"
// import { useRouter } from "next/navigation"
// import TokenStorage from "@/utils/storage/tokenStorage"
// import UserStorage from "@/utils/storage/userStorage"
// import { message } from "antd"

// // 세션 타임아웃 시간 (분)
// const SESSION_TIMEOUT_MINUTES = 30

// export function useSessionManager() {
//   const router = useRouter()

//   // 로그아웃 함수
//   const logout = useCallback(() => {
//     TokenStorage.clearToken()
//     UserStorage.clearUser()
//     message.info("세션이 만료되었습니다. 다시 로그인해주세요.")
//     router.push("/login")
//   }, [router])

//   // 세션 활성화 함수
//   const refreshSession = useCallback(() => {
//     if (TokenStorage.getToken()) {
//       TokenStorage.refreshTokenExpiry()
//     }
//   }, [])

//   // 자동 로그아웃 타이머 설정
//   useEffect(() => {
//     let logoutTimer: NodeJS.Timeout

//     const checkSession = () => {
//       const timeToExpiry = TokenStorage.getTimeToExpiry()

//       if (timeToExpiry !== null && timeToExpiry <= 0) {
//         logout()
//       } else if (timeToExpiry !== null) {
//         // 만료 시간까지 타이머 설정
//         logoutTimer = setTimeout(logout, timeToExpiry * 1000)
//       }
//     }

//     // 초기 세션 확인
//     checkSession()

//     // 사용자 활동 감지
//     const handleActivity = () => {
//       clearTimeout(logoutTimer)
//       refreshSession()
//       checkSession()
//     }

//     // 이벤트 리스너 등록
//     window.addEventListener("mousemove", handleActivity)
//     window.addEventListener("keypress", handleActivity)
//     window.addEventListener("click", handleActivity)

//     // 컴포넌트 언마운트 시 정리
//     return () => {
//       clearTimeout(logoutTimer)
//       window.removeEventListener("mousemove", handleActivity)
//       window.removeEventListener("keypress", handleActivity)
//       window.removeEventListener("click", handleActivity)
//     }
//   }, [logout, refreshSession])

//   return { logout, refreshSession }
// }

"use client"

import { useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import TokenStorage from "../storage/tokenStorage"
import UserStorage from "../storage/userStorage"
import { message } from "antd"

// 세션 타임아웃 시간 (분)
const SESSION_TIMEOUT_MINUTES = 30

export function useSessionManager() {
  const router = useRouter()

  // 로그아웃 함수
  const logout = useCallback(() => {
    TokenStorage.clearToken()
    UserStorage.clearUser()
    message.info("세션이 만료되었습니다. 다시 로그인해주세요.")
    router.push("/login")
  }, [router])

  // 세션 활성화 함수
  const refreshSession = useCallback(() => {
    if (TokenStorage.getToken()) {
      TokenStorage.refreshTokenExpiry()
    }
  }, [])

  // 자동 로그아웃 타이머 설정
  useEffect(() => {
    let logoutTimer: NodeJS.Timeout

    const checkSession = () => {
      const timeToExpiry = TokenStorage.getTimeToExpiry()

      if (timeToExpiry !== null && timeToExpiry <= 0) {
        logout()
      } else if (timeToExpiry !== null) {
        // 만료 시간까지 타이머 설정
        logoutTimer = setTimeout(logout, timeToExpiry * 1000)
      }
    }

    // 초기 세션 확인
    checkSession()

    // 사용자 활�� 감지
    const handleActivity = () => {
      clearTimeout(logoutTimer)
      refreshSession()
      checkSession()
    }

    // 이벤트 리스너 등록
    window.addEventListener("mousemove", handleActivity)
    window.addEventListener("keypress", handleActivity)
    window.addEventListener("click", handleActivity)

    // 컴포넌트 언마운트 시 정리
    return () => {
      clearTimeout(logoutTimer)
      window.removeEventListener("mousemove", handleActivity)
      window.removeEventListener("keypress", handleActivity)
      window.removeEventListener("click", handleActivity)
    }
  }, [logout, refreshSession])

  return { logout, refreshSession }
}