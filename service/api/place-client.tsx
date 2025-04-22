import { Api } from './api';
// import type { PlaceCreateRequest } from "@/types/story"
import type { Place, PlaceDetailResponse, PlaceCreateRequest } from "@/types/place"

// 장소 관련 API
export class placeApi extends Api{

    private readonly placePath = '/place-service';
    private readonly authPath = '/auth';

    deletePlace = async (placeId: number) => {
        await this.authInstance.delete(`${this.placePath}/${placeId}`);
    }

    // 장소 수정 (로그인 필요)
    updatePlace = async (placeId: number, placeData: Partial<PlaceCreateRequest>) => {
        const response = await this.authInstance.put(`${this.placePath}/${placeId}/content`, placeData)
        return response.data
    }

    // 장소 상세 정보 조회
    getPlaceById = async (placeId: number) => {
        const response = await this.baseInstance.get(`${this.placePath}/${placeId}`)
        return response.data
    }

    // 장소 이미지 업로드
    uploadPlaceImage = async (placeId: number, formData: FormData) => {
        const response = await this.authInstance.post(`${this.placePath}/${placeId}/images`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        return response.data
    }


    // 스토리 ID로 장소 목록 조회
    getPlacesByStoryId = async (storyId: number) => {
        try {
            const response = await this.baseInstance.get(`${this.placePath}/story/${storyId}`)
            return response.data
        } catch (error) {
            console.error(`스토리 ID ${storyId}에 대한 장소 조회 실패:`, error)
            return []
        }
    }

    createPlace = async (placeData: any, imageFile?: File | null) => {
        try {
          const formData = new FormData()
    
          // 요청 데이터 구성
          const placeRequest = {
            storyId: Number(placeData.storyId),
            name: placeData.name,
            description: placeData.description || "",
            category: placeData.category,
            visitedDate: placeData.visitedDate,
            latitude: placeData.latitude,
            longitude: placeData.longitude,
            address: placeData.address,
          }
    
          // JSON 문자열로 변환하여 FormData에 추가
          // 중요: 'request' 파트 이름을 정확히 사용
          formData.append("request", new Blob([JSON.stringify(placeRequest)], { type: "application/json" }))
    
          // 이미지 파일이 있으면 'image' 파트에 추가
          if (imageFile) {
            formData.append("image", imageFile)
          }
    
    
          const response = await this.authInstance.post(`${this.placePath}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
    
          return response.data
        } catch (error) {
          console.error("장소 생성 실패:", error)
          throw error
        }
      }

};

export default new placeApi();