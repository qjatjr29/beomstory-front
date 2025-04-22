"use client"

import type React from "react"
import { Inter } from "next/font/google"
import Header from "@/components/common/Header"
import Script from "next/script"
import StyledComponentsRegistry from "../lib/AntdRegistry"
import { ConfigProvider, Layout } from "antd"
import { useEffect } from "react"
import TokenStorage from "@/utils/storage/tokenStorage"
import UserStorage from "@/utils/storage/userStorage"
import { AuthProvider } from "@/components/auth/AuthContext"
import "@/styles/global.css"

const inter = Inter({ subsets: ["latin"] })
const KAKAO_MAPS_API_KEY = process.env.NEXT_PUBLIC_KAKAO_MAPS_API_KEY as string

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  // 앱 시작 시 토큰 유효성 확인
  useEffect(() => {
    // 토큰이 만료되었는지 확인
    const token = TokenStorage.getToken()
    const user = UserStorage.getUser()

    // 토큰이 없지만 사용자 정보가 있는 경우 (불일치 상태)
    if (!token && user) {
      UserStorage.clearUser()
    }

    // 토큰이 있지만 사용자 정보가 없는 경우 (불일치 상태)
    if (token && !user) {
      TokenStorage.clearToken()
    }
  }, [])

  return (
    <html lang="en">
      <body className={inter.className}>
        <Script
          async
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAPS_API_KEY}&libraries=services,clusterer&autoload=false`}
        ></Script>
        <StyledComponentsRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#4a90e2",
              },
            }}
          >
            <AuthProvider>
              {/* <Header /> */}
                <Layout style={{ minHeight: "100vh", width: "100%", maxWidth: "100vw", overflowX: "hidden" }}>
                  <Header />
                  <Layout.Content style={{ width: "100%", padding: 0, overflowX: "hidden" }}>{children}</Layout.Content>
                  {/* <Footer /> */}
              </Layout>
              {/* <main>{children}</main> */}
              {/* 푸터 컴포넌트를 여기에 추가*/}
            </AuthProvider>
          </ConfigProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
