import { message } from "antd"
import type { AxiosError } from "axios"

// 에러 응답 타입 정의
interface ErrorResponse {
  message?: string
  error?: string
  status?: number
  timestamp?: string
  path?: string
}

// HTTP 상태 코드별 기본 메시지
const DEFAULT_ERROR_MESSAGES: Record<number, string> = {
  400: "잘못된 요청입니다.",
  401: "인증이 필요합니다. 다시 로그인해주세요.",
  403: "접근 권한이 없습니다.",
  404: "요청한 리소스를 찾을 수 없습니다.",
  409: "요청이 현재 서버의 상태와 충돌합니다.",
  500: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
}

// 에러 처리 함수
export function handleApiError(error: AxiosError<ErrorResponse>) {
  const status = error.response?.status || 500
  const serverMessage = error.response?.data?.message || error.response?.data?.error

  // 상태 코드별 처리
  switch (status) {
    case 401:
      // 인증 오류 - 로그인 페이지로 리다이렉트 필요
      message.error("인증이 만료되었습니다. 다시 로그인해주세요.")
      // 로그아웃 처리 로직 추가 가능
      break

    case 409:
      // 충돌 (예: 이미 존재하는 이메일)
      message.error(serverMessage || DEFAULT_ERROR_MESSAGES[409])
      break

    case 500:
      // 서버 오류
      message.error(DEFAULT_ERROR_MESSAGES[500])
      console.error("서버 오류:", error)
      break

    default:
      // 기타 오류
      console.log("기타 오류:", error)
      message.error(serverMessage || DEFAULT_ERROR_MESSAGES[status] || "오류가 발생했습니다.")
  }

  return error
}

// 특정 API 요청에 대한 에러 처리 함수
export function handleLoginError(error: AxiosError<ErrorResponse>) {
  const status = error.response?.status

  if (status === 401) {
    message.error("이메일 또는 비밀번호가 올바르지 않습니다.")
  } else {
    handleApiError(error)
  }

  return error
}

export function handleSignupError(error: AxiosError<ErrorResponse>) {
  const status = error.response?.status

  if (status === 409) {
    message.error("이미 사용 중인 이메일입니다. 다른 이메일을 사용해주세요.")
  } else {
    handleApiError(error)
  }

  return error
}

export function handleStoryCreationError(error: AxiosError<ErrorResponse>) {
  const status = error.response?.status

  if (status === 500) {
    message.error("일상 기록 생성에 실패했습니다. 잠시 후 다시 시도해주세요.")
  } else {
    handleApiError(error)
  }

  return error
}