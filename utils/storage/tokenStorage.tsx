// import LocalStorage from './localStorage';
// const ACCESS_TOKEN = 'access-token' as const;

// class TokenStorage extends LocalStorage<string> {
//   getToken(): string | undefined {
//     return this.get(ACCESS_TOKEN, '');
//   }

//   setToken(token: string): void {
//     this.set(ACCESS_TOKEN, token);
//   }

//   clearToken(): void {
//     this.clear(ACCESS_TOKEN);
//   }
//   // clearToken(): void {
//   //   if (typeof window === "undefined") return
//   //   localStorage.removeItem(this.ACCESS_TOKEN)
//   // }
// }

// export default new TokenStorage();


class TokenStorage {
  private readonly TOKEN_KEY = "auth_token"
  private readonly TOKEN_EXPIRY_KEY = "auth_token_expiry"
  private readonly DEFAULT_EXPIRY_MINUTES = 60 // 기본 1시간 만료

  // 토큰 저장 (만료 시간 포함)
  setToken(token: string, rememberMe = false): void {
    if (typeof window === "undefined") return

    // 현재 시간 + 만료 시간(분)
    const expiryTime = new Date().getTime() + this.DEFAULT_EXPIRY_MINUTES * 60 * 1000

    // 토큰 저장
    if (rememberMe) {
      localStorage.setItem(this.TOKEN_KEY, token)
      localStorage.setItem(this.TOKEN_EXPIRY_KEY, expiryTime.toString())
    } else {
      sessionStorage.setItem(this.TOKEN_KEY, token)
      sessionStorage.setItem(this.TOKEN_EXPIRY_KEY, expiryTime.toString())
    }
  }

  // 토큰 가져오기 (만료 확인)
  getToken(): string | null {
    if (typeof window === "undefined") return null

    // localStorage와 sessionStorage 모두 확인
    const token = localStorage.getItem(this.TOKEN_KEY) || sessionStorage.getItem(this.TOKEN_KEY)
    const expiryTime = localStorage.getItem(this.TOKEN_EXPIRY_KEY) || sessionStorage.getItem(this.TOKEN_EXPIRY_KEY)

    if (!token || !expiryTime) return null

    // 만료 시간 확인
    const now = new Date().getTime()
    if (now > Number.parseInt(expiryTime)) {
      this.clearToken() // 만료된 토큰 삭제
      return null
    }

    return token
  }

  // 토큰 삭제 - 수정된 부분
  clearToken(): void {
    if (typeof window === "undefined") return

    // localStorage와 sessionStorage 모두에서 토큰 관련 데이터 삭제
    localStorage.removeItem(this.TOKEN_KEY)
    localStorage.removeItem(this.TOKEN_EXPIRY_KEY)
    sessionStorage.removeItem(this.TOKEN_KEY)
    sessionStorage.removeItem(this.TOKEN_EXPIRY_KEY)

  }

  // 토큰 만료 시간 갱신
  refreshTokenExpiry(): void {
    if (typeof window === "undefined") return

    const token = this.getToken()
    if (!token) return

    const expiryTime = new Date().getTime() + this.DEFAULT_EXPIRY_MINUTES * 60 * 1000

    // localStorage와 sessionStorage 중 토큰이 저장된 곳에 만료 시간 갱신
    if (localStorage.getItem(this.TOKEN_KEY)) {
      localStorage.setItem(this.TOKEN_EXPIRY_KEY, expiryTime.toString())
    } else if (sessionStorage.getItem(this.TOKEN_KEY)) {
      sessionStorage.setItem(this.TOKEN_EXPIRY_KEY, expiryTime.toString())
    }
  }

  // 토큰 만료까지 남은 시간(초)
  getTimeToExpiry(): number | null {
    if (typeof window === "undefined") return null

    const expiryTime = localStorage.getItem(this.TOKEN_EXPIRY_KEY) || sessionStorage.getItem(this.TOKEN_EXPIRY_KEY)
    if (!expiryTime) return null

    const now = new Date().getTime()
    const timeToExpiry = Number.parseInt(expiryTime) - now

    return timeToExpiry > 0 ? Math.floor(timeToExpiry / 1000) : 0
  }

  // 토큰 존재 여부 확인
  hasToken(): boolean {
    return this.getToken() !== null
  }
}

export default new TokenStorage()