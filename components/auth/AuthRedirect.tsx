"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { message } from "antd"
import UserStorage from "@/utils/storage/userStorage"
import TokenStorage from "@/utils/storage/tokenStorage"

interface AuthRedirectProps {
  children: React.ReactNode
  redirectTo?: string
  message?: string
}

// 이미 로그인한 사용자를 리다이렉트하는 컴포넌트
export  function AuthRedirect({
  children,
  redirectTo = "/",
  message: customMessage = "이미 로그인되어 있습니다.",
}: AuthRedirectProps) {
  const router = useRouter()

  useEffect(() => {
    // 토큰과 사용자 정보 모두 확인
    const token = TokenStorage.getToken()
    const user = UserStorage.getUser()

    if (token && user) {
      message.info(customMessage)
      router.push(redirectTo)
    }
  }, [router, redirectTo, customMessage])

  return <>{children}</>
}

export default AuthRedirect