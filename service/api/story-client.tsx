import { Api } from "./api"
import type { StoryCreateRequest } from "@/types/story"
import { handleStoryCreationError } from "@/utils/error/errorHandler"


// 스토리 관련 API
export class storyApi extends Api {
  private readonly storyPath = "/story-service"
  private readonly placePath = "/place-service"

  // 스토리 목록 조회 (로그인 불필요)
  getStories = async (page = 0, size = 10) => {
    const response = await this.baseInstance.get(`${this.storyPath}`, {
      params: { page, size },
    })
    return response.data
  }

  // 작성 완료된 일상 기록 조회
  getArchivedStory = async (page = 0, size = 10) => {
    try {
      const response = await this.baseInstance.get(`${this.storyPath}/archived`, {
        params: { page, size },
      })
      return response.data
    } catch (error) {
      console.error("작성 완료된 기록 조회 실패:", error)
      return null
    }
  }

  // 스토리 상세 조회 (로그인 불필요)
  getStoryById = async (storyId: number) => {
    const response = await this.baseInstance.get(`${this.storyPath}/${storyId}`)
    return response.data
  }

  // 특정 사용자의 스토리 목록 조회
  getStoriesByUserId = async (userId: number, page = 0, size = 10) => {
    const response = await this.baseInstance.get(`${this.storyPath}/user`, {
      params: { id: userId, page, size },
    })
    return response.data
  }

  // 스토리 생성 (로그인 필요)
  createStory = async (storyData: StoryCreateRequest) => {
    try {
      const response = await this.authInstance.post(`${this.storyPath}`, storyData)
      return response.data
    } catch (error) {
      throw handleStoryCreationError(error)
    }
  }

  // 내 스토리 목록 조회 (로그인 필요)
  getMyStories = async (page = 0, size = 10) => {
    try {
      const response = await this.authInstance.get(`${this.storyPath}/me`, {
        params: { page, size },
      })
      return response.data
    } catch (error) {
      console.error("내 스토리 목록 조회 실패:", error)
      return { content: [], totalElements: 0 }
    }
  }
  // 스토리 수정 (로그인 필요)
  updateStory = async (storyId: number, storyData: Partial<StoryCreateRequest>) => {
    const response = await this.authInstance.put(`${this.storyPath}/${storyId}`, storyData)
    return response.data
  }

  // 스토리 삭제 (로그인 필요)
  deleteStory = async (storyId: number) => {
    const response = await this.authInstance.delete(`${this.storyPath}/${storyId}`)
    return response.data
  }


  // 임시저장된 일상 기록 조회 (로그인 필요)
  getDraftStory = async () => {
    try {
      const response = await this.authInstance.get(`${this.storyPath}/status?status=DRAFT`)
      return response.data
    } catch (error) {
      console.error("임시저장 기록 조회 실패:", error)
      return null
    }
  }

  // 일상 기록 상태 업데이트 (로그인 필요)
  updateStoryStatus = async (storyId: number, status: "DRAFT" | "IN_PROGRESS" | "ARCHIVED") => {
    try {
      const response = await this.authInstance.patch(`${this.storyPath}/${storyId}?status=${status}`)
      return response.data
    } catch (error) {
      console.error("일상 기록 상태 업데이트 실패:", error)
      throw error
    }
  }
}

export default new storyApi()