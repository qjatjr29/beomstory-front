// "use client"

// import type React from "react"
// import { createContext, useContext, useState, useEffect } from "react"
// import UserStorage from "@/utils/storage/userStorage"
// import TokenStorage from "@/utils/storage/tokenStorage"

// interface AuthUser {
//   id: string | number
//   email: string
//   nickname: string
//   profileImage?: string
//   authType: string
// }

// interface AuthContextType {
//   user: AuthUser | null
//   isLoggedIn: boolean
//   login: (user: AuthUser, token: string, rememberMe?: boolean) => void
//   logout: () => void
//   updateUser: (user: Partial<AuthUser>) => void
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<AuthUser | null>(null)
//   const [isLoggedIn, setIsLoggedIn] = useState(false)

//   // 초기 로드 시 로컬 스토리지에서 사용자 정보 가져오기
//   useEffect(() => {
//     const storedUser = UserStorage.getUser()
//     const token = TokenStorage.getToken()

//     if (storedUser && token) {
//       setUser(storedUser)
//       setIsLoggedIn(true)
//     }
//   }, [])

//   const login = (user: AuthUser, token: string, rememberMe = false) => {
//     TokenStorage.setToken(token, rememberMe)
//     UserStorage.setUser(user)
//     setUser(user)
//     setIsLoggedIn(true)
//   }

//   const logout = () => {
//     TokenStorage.clearToken()
//     UserStorage.clearUser()
//     setUser(null)
//     setIsLoggedIn(false)
//   }

//   const updateUser = (updatedUser: Partial<AuthUser>) => {
//     if (user) {
//       const newUser = { ...user, ...updatedUser }
//       UserStorage.setUser(newUser)
//       setUser(newUser)
//     }
//   }

//   return <AuthContext.Provider value={{ user, isLoggedIn, login, logout, updateUser }}>{children}</AuthContext.Provider>
// }

// export function useAuth() {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider")
//   }
//   return context
// }

"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import UserStorage from "@/utils/storage/userStorage"
import TokenStorage from "@/utils/storage/tokenStorage"

interface AuthUser {
  id: string | number
  email: string
  nickname: string
  profileImage?: string
  authType: string
}

interface AuthContextType {
  user: AuthUser | null
  isLoggedIn: boolean
  login: (user: AuthUser, token: string, rememberMe?: boolean) => void
  logout: () => void
  updateUser: (user: Partial<AuthUser>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // 초기 로드 시 로컬 스토리지에서 사용자 정보 가져오기
  useEffect(() => {
    const storedUser = UserStorage.getUser()
    const token = TokenStorage.getToken()

    if (storedUser && token) {
      setUser(storedUser)
      setIsLoggedIn(true)
    }
  }, [])

  const login = (user: AuthUser, token: string, rememberMe = false) => {
    TokenStorage.setToken(token, rememberMe)
    UserStorage.setUser(user)
    setUser(user)
    setIsLoggedIn(true)
    console.log("로그인 성공:", user.nickname)
  }

  const logout = () => {
    TokenStorage.clearToken()
    UserStorage.clearUser()
    setUser(null)
    setIsLoggedIn(false)
  }

  const updateUser = (updatedUser: Partial<AuthUser>) => {
    if (user) {
      const newUser = { ...user, ...updatedUser }
      UserStorage.setUser(newUser)
      setUser(newUser)
    }
  }

  return <AuthContext.Provider value={{ user, isLoggedIn, login, logout, updateUser }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
