"use client"

import { useEffect, useState } from "react"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import { Spin, message } from "antd"
import { userApi } from "@/service/api/api-client"
import TokenStorage from "@/utils/storage/tokenStorage"
import UserStorage from "@/utils/storage/userStorage"

export default function OAuthCallbackPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const provider = params.provider as string
        const code = searchParams.get("code")
        if (!code) {
          throw new Error("Authorization code not found")
        }

        // 서버의 callback 엔드포인트로 요청
        // const response = await fetch(`/user-service/login/oauth2/code/${provider}?code=${code}`)
        const response = await userApi.handleOAuthCallback(provider, code) 
        console.log("response", response)

        if (!response.ok) {
          throw new Error("Failed to authenticate with the server")
        }

        const userData = await response.json()
        console.log("userData", userData)

        // 토큰 저장
        if (userData.accessToken) {
          TokenStorage.setToken(userData.accessToken)
        }

        if (userData.accessToken) {
          // 토큰에서 Bearer 접두사 제거 (이미 있는 경우)
          const token = userData.accessToken.startsWith('Bearer ') 
            ? userData.accessToken.substring(7) 
            : userData.accessToken
            
          TokenStorage.setToken(token, true) // OAuth 로그인은 기본적으로 "로그인 상태 유지" 활성화
        }

        // 사용자 정보 저장
        UserStorage.setUser({
          id: userData.id,
          email: userData.email,
          nickname: userData.nickname,
          authType: "OAUTH",
        })

        message.success("로그인에 성공했습니다.")
        router.push("/") // 홈페이지로 리다이렉트
      } catch (err) {
        console.error("OAuth 로그인 실패:", err)
        setError("로그인 처리 중 오류가 발생했습니다.")
        message.error("로그인에 실패했습니다.")
      } finally {
        setLoading(false)
      }
    }

    handleOAuthCallback()
  }, [params.provider, searchParams, router])

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Spin size="large" tip="로그인 처리 중..." />
      </div>
    )
  }

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <h2>로그인 오류</h2>
        <p>{error}</p>
        <button onClick={() => router.push("/login")}>로그인 페이지로 돌아가기</button>
      </div>
    )
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Spin size="large" tip="리다이렉트 중..." />
    </div>
  )
}
