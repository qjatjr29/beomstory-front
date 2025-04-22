interface UserInfo {
  id: string | number
  email: string
  nickname: string
  profileImage?: string
  authType: string
}

class UserStorage {
  private readonly USER_KEY = "user_info"

  getUser(): UserInfo | null {
    if (typeof window === "undefined") return null
    const userStr = localStorage.getItem(this.USER_KEY)
    return userStr ? JSON.parse(userStr) : null
  }

  setUser(user: UserInfo): void {
    if (typeof window === "undefined") return
    localStorage.setItem(this.USER_KEY, JSON.stringify(user))
  }

  // 사용자 정보 삭제 - 수정된 부분
  clearUser(): void {
    if (typeof window === "undefined") return
    localStorage.removeItem(this.USER_KEY)
  }

  getUserId(): string | null {
    const user = this.getUser()
    return user ? String(user.id) : null
  }

  getUsername(): string | null {
    const user = this.getUser()
    return user ? user.nickname : null
  }

  getEmail(): string | null {
    const user = this.getUser()
    return user ? user.email : null
  }

  getProfileImage(): string | null {
    const user = this.getUser()
    return user?.profileImage || null
  }

  getAuthType(): string | null {
    const user = this.getUser()
    return user ? user.authType : null
  }

  isLoggedIn(): boolean {
    return !!this.getUser()
  }
}

export default new UserStorage()