// "use client"

// import { useState, useEffect } from "react"
// import { Steps, Button, Card, Divider, message, Modal } from "antd"
// import { PlusOutlined } from "@ant-design/icons"
// import { useRouter } from "next/navigation"
// import { Form } from "antd"
// import type { StoryPlace, StoryCreateRequest } from "@/types/story"
// import type { Place, PlaceCreateRequest } from "@/types/place"
// import { storyApi, placeApi } from "@api/api-client"
// import StoryForm, { type StoryFormValues } from "./StoryForm"
// import PlaceList from "./PlaceList"
// import PlaceRegisterModal from "./PlaceRegisterModal"
// import PlaceDetailModal, { type PlaceDetailData } from "./PlaceDetailModal"
// import dayjs from "dayjs"

// interface StoryStepsProps {
//   isLoggedIn: boolean
// }

// export default function StorySteps({ isLoggedIn }: StoryStepsProps) {
//   const router = useRouter()
//   const [form] = Form.useForm()
//   const [currentStep, setCurrentStep] = useState(0)
//   const [storyId, setStoryId] = useState<string | null>(null)
//   const [storyData, setStoryData] = useState<StoryCreateRequest | null>(null)
//   const [selectedPlaces, setSelectedPlaces] = useState<StoryPlace[]>([])
//   const [isPlaceModalOpen, setIsPlaceModalOpen] = useState(false)
//   const [isPlaceDetailModalOpen, setIsPlaceDetailModalOpen] = useState(false)
//   const [currentPlace, setCurrentPlace] = useState<Place | null>(null)
//   const [loading, setLoading] = useState(false)
//   const [confirmCancelVisible, setConfirmCancelVisible] = useState(false)
//   const [hasDraftStory, setHasDraftStory] = useState(false)
//   const [draftStoryId, setDraftStoryId] = useState<string | null>(null)
//   const [isResumeDraftModalVisible, setIsResumeDraftModalVisible] = useState(false)

//   // 컴포넌트 마운트 시 임시저장된 일상 기록 확인
//   useEffect(() => {
//     const checkDraftStory = async () => {
//       if (!isLoggedIn) return

//       try {
//         // 임시저장된 일상 기록 조회 API 호출
//         const response = await storyApi.getDraftStory()

//         if (response && response.id) {
//           setHasDraftStory(true)
//           setDraftStoryId(response.id)
//           setIsResumeDraftModalVisible(true)
//         }
//       } catch (error) {
//         console.error("임시저장 기록 조회 실패:", error)
//       }
//     }

//     checkDraftStory()
//   }, [isLoggedIn])

//   // 페이지 이탈 시 임시저장 처리
//   useEffect(() => {
//     const handleBeforeUnload = (e: BeforeUnloadEvent) => {
//       if (storyId && currentStep === 1) {
//         // 일상 기록 작성 중인 경우 임시저장
//         saveAsDraft()

//         // 브라우저 기본 확인 메시지 표시
//         e.preventDefault()
//         e.returnValue = "작성 중인 내용이 있습니다. 페이지를 나가시겠습니까?"
//         return e.returnValue
//       }
//     }

//     // 페이지 이탈 이벤트 리스너 등록
//     window.addEventListener("beforeunload", handleBeforeUnload)

//     return () => {
//       // 컴포넌트 언마운트 시 이벤트 리스너 제거
//       window.removeEventListener("beforeunload", handleBeforeUnload)
//     }
//   }, [storyId, currentStep])

//   // 임시저장 처리 함수
//   const saveAsDraft = async () => {
//     if (!storyId) return

//     try {
//       // 일상 기록 상태를 DRAFT로 변경하는 API 호출
//       await storyApi.updateStoryStatus(storyId, "DRAFT")
//       console.log("일상 기록이 임시저장되었습니다.")
//     } catch (error) {
//       console.error("임시저장 실패:", error)
//     }
//   }

//   // 임시저장된 기록 불러오기
//   const loadDraftStory = async () => {
//     if (!draftStoryId) return

//     setLoading(true)

//     try {
//       // 임시저장된 일상 기록 상세 정보 조회
//       const storyResponse = await storyApi.getStoryById(Number(draftStoryId))

//       // 폼에 데이터 설정
//       form.setFieldsValue({
//         title: storyResponse.title,
//         description: storyResponse.description,
//         dateRange: [
//           storyResponse.startDate ? dayjs(storyResponse.startDate) : null,
//           storyResponse.endDate ? dayjs(storyResponse.endDate) : null,
//         ],
//         category: storyResponse.category,
//       })

//       // 상태 업데이트
//       setStoryId(draftStoryId)
//       setStoryData({
//         title: storyResponse.title,
//         description: storyResponse.description,
//         startDate: storyResponse.startDate,
//         endDate: storyResponse.endDate,
//         category: storyResponse.category,
//       })

//       // 장소 정보 설정
//       if (storyResponse.places && storyResponse.places.length > 0) {
//         setSelectedPlaces(storyResponse.places)
//       }

//       // 장소 추가 단계로 이동
//       setCurrentStep(1)

//       message.success("임시저장된 일상 기록을 불러왔습니다.")
//     } catch (error) {
//       console.error("임시저장 기록 불러오기 실패:", error)
//       message.error("임시저장된 기록을 불러오는데 실패했습니다.")
//     } finally {
//       setLoading(false)
//       setIsResumeDraftModalVisible(false)
//     }
//   }

//   // 새 일상 기록 시작
//   const startNewStory = () => {
//     setIsResumeDraftModalVisible(false)
//   }

//   // 일상 기록 생성 처리
//   const handleStoryFormSubmit = async (values: StoryFormValues) => {
//     if (!isLoggedIn) {
//       message.warning("로그인이 필요한 서비스입니다.")
//       router.push("/login")
//       return
//     }

//     setLoading(true)

//     try {
//       // 서버 API 요구사항에 맞게 데이터 구조화
//       const storyRequest: StoryCreateRequest = {
//         title: values.title,
//         description: values.description,
//         startDate: values.dateRange[0].format("YYYY-MM-DDTHH:mm:ss"),
//         endDate: values.dateRange[1].format("YYYY-MM-DDTHH:mm:ss"),
//         category: values.category,
//       }

//       // API 호출하여 스토리 생성
//       const response = await storyApi.createStory(storyRequest)

//       // 스토리 ID 저장
//       setStoryId(response.id)
//       setStoryData(storyRequest)

//       // 다음 단계로 이동
//       setCurrentStep(1)
//       message.success("일상 기록이 생성되었습니다. 이제 장소를 추가해보세요!")
//     } catch (error) {
//       console.error("일상 기록 생성 실패:", error)
//       message.error("일상 기록 생성에 실패했습니다. 다시 시도해주세요.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // 장소 모달 관련 함수
//   const openPlaceModal = () => {
//     setIsPlaceModalOpen(true)
//   }

//   const closePlaceModal = () => {
//     setIsPlaceModalOpen(false)
//   }

//   const openPlaceDetailModal = (place: Place) => {
//     setCurrentPlace(place)
//     setIsPlaceDetailModalOpen(true)
//   }

//   const closePlaceDetailModal = () => {
//     setIsPlaceDetailModalOpen(false)
//     setCurrentPlace(null)
//   }

//   // 장소 추가 처리
//   const handleAddPlace = (place: Place) => {
//     // 중복 장소 체크
//     if (selectedPlaces.some((p) => p.id === place.id)) {
//       message.warning("이미 추가된 장소입니다.")
//       return
//     }

//     // 장소 상세 정보 입력 모달 열기
//     openPlaceDetailModal(place)
//     closePlaceModal()
//   }

//   // 장소 상세 정보 저장
//   const handleSavePlaceDetail = async (placeData: PlaceDetailData) => {
//     if (!storyId) {
//       message.error("일상 기록 ID가 없습니다. 다시 시도해주세요.")
//       return
//     }

//     setLoading(true)

//     try {
//       // 디버깅 로그 추가
//       console.log("장소 데이터:", placeData)

//       if (placeData.imageFile) {
//         console.log("이미지 파일 정보:", {
//           name: placeData.imageFile.name,
//           type: placeData.imageFile.type,
//           size: placeData.imageFile.size,
//         })
//       }

//       const placeRequest: PlaceCreateRequest = {
//         storyId: storyId,
//         name: placeData.name,
//         description: placeData.description,
//         category: placeData.category,
//         latitude: placeData.latitude,
//         longitude: placeData.longitude,
//         address: placeData.address,
//       }

//       // API 호출하여 장소 생성 (이미지 포함)
//       const response = await placeApi.createPlace(placeRequest, placeData.imageFile)
//       console.log("서버 응답:", response)

//       // 새 장소 객체 생성
//       const newPlace: StoryPlace = {
//         id: response.id || placeData.id, // 서버에서 반환한 ID 또는 임시 ID
//         name: placeData.name,
//         description: placeData.description,
//         category: placeData.category,
//         latitude: placeData.latitude,
//         longitude: placeData.longitude,
//         address: placeData.address,
//         images: response.images || undefined,
//       }

//       setSelectedPlaces([...selectedPlaces, newPlace])
//       closePlaceDetailModal()
//       message.success("장소가 추가되었습니다.")

//       // 장소 추가 시 상태 업데이트 API 호출 제거
//     } catch (error) {
//       console.error("장소 추가 실패:", error)
//       message.error("장소 추가에 실패했습니다. 다시 시도해주세요.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // 장소 편집
//   const handleEditPlace = (placeId: string) => {
//     const place = selectedPlaces.find((p) => p.id === placeId)
//     if (place) {
//       // Place 객체로 변환
//       const kakaoPlace: Place = {
//         id: place.id,
//         name: place.name,
//         content: place.description,
//         address: place.address,
//         category: place.category,
//         position: {
//           lat: place.latitude,
//           lng: place.longitude,
//         },
//         images: place.images,
//       }
//       setCurrentPlace(kakaoPlace)
//       setIsPlaceDetailModalOpen(true)
//     }
//   }

//   // 장소 정보 업데이트
//   const handleUpdatePlaceDetail = async (placeData: PlaceDetailData) => {
//     if (!storyId) {
//       message.error("일상 기록 ID가 없습니다. 다시 시도해주세요.")
//       return
//     }

//     setLoading(true)

//     try {
//       const placeRequest: Partial<PlaceCreateRequest> = {
//         name: placeData.name,
//         description: placeData.description,
//         category: placeData.category,
//       }

//       // 이미지가 있는 경우 업데이트
//       if (placeData.imageFile) {
//         const formData = new FormData()
//         formData.append("image", placeData.imageFile)

//         // 이미지 업로드 API 호출
//         await placeApi.uploadPlaceImage(placeData.id, formData)
//       }

//       // API 호출하여 장소 업데이트
//       await storyApi.updatePlace(placeData.id, placeRequest)

//       // 업데이트된 장소 객체 생성
//       const updatedPlace: StoryPlace = {
//         id: placeData.id,
//         name: placeData.name,
//         description: placeData.description,
//         category: placeData.category,
//         latitude: placeData.latitude,
//         longitude: placeData.longitude,
//         address: placeData.address,
//         images: undefined, // 서버에서 받아온 이미지 정보로 업데이트 필요
//       }

//       // 장소 목록에서 해당 장소 업데이트
//       setSelectedPlaces(selectedPlaces.map((place) => (place.id === placeData.id ? updatedPlace : place)))

//       // 업데이트된 장소 정보 다시 가져오기
//       const updatedPlaceData = await placeApi.getPlaceById(placeData.id)
//       if (updatedPlaceData && updatedPlaceData.images) {
//         setSelectedPlaces((prevPlaces) =>
//           prevPlaces.map((place) =>
//             place.id === placeData.id ? { ...place, images: updatedPlaceData.images } : place,
//           ),
//         )
//       }

//       closePlaceDetailModal()
//       message.success("장소 정보가 수정되었습니다.")
//     } catch (error) {
//       console.error("장소 수정 실패:", error)
//       message.error("장소 수정에 실패했습니다. 다시 시도해주세요.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // 장소 삭제
//   const handleRemovePlace = async (placeId: string) => {
//     if (!storyId) {
//       message.error("일상 기록 ID가 없습니다. 다시 시도해주세요.")
//       return
//     }

//     setLoading(true)

//     try {
//       // API 호출하여 장소 삭제
//       await storyApi.deletePlace(placeId)

//       setSelectedPlaces(selectedPlaces.filter((place) => place.id !== placeId))
//       message.success("장소가 삭제되었습니다.")
//     } catch (error) {
//       console.error("장소 삭제 실패:", error)
//       message.error("장소 삭제에 실패했습니다. 다시 시도해주세요.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // 일상 기록 완료
//   const handleCompleteStory = async () => {
//     if (!storyId) {
//       message.error("일상 기록 ID가 없습니다. 다시 시도해주세요.")
//       return
//     }

//     if (selectedPlaces.length === 0) {
//       message.warning("최소 한 개 이상의 장소를 추가해주세요.")
//       return
//     }

//     setLoading(true)

//     try {
//       // 일상 기록 상태를 ARCHIVED로 변경
//       await storyApi.updateStoryStatus(storyId, "ARCHIVED")

//       message.success("일상 기록이 완료되었습니다!")

//       // 상세 페이지로 이동
//       router.push(`/story/${storyId}`)
//     } catch (error) {
//       console.error("일상 기록 완료 처리 실패:", error)
//       message.error("일상 기록 완료 처리에 실패했습니다.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // 일상 기록 취소 확인
//   const showCancelConfirm = () => {
//     setConfirmCancelVisible(true)
//   }

//   // 일상 기록 취소 처리
//   const handleCancelStory = async () => {
//     if (!storyId) {
//       router.push("/story/register")
//       return
//     }

//     setLoading(true)

//     try {
//       // API 호출하여 스토리 삭제
//       await storyApi.deleteStory(Number(storyId))
//       message.success("일상 기록이 취소되었습니다.")
//       router.push("/story/register")
//     } catch (error) {
//       console.error("일상 기록 취소 실패:", error)
//       message.error("일상 기록 취소에 실패했습니다. 다시 시도해주세요.")
//     } finally {
//       setLoading(false)
//       setConfirmCancelVisible(false)
//     }
//   }

//   // 단계별 컨텐츠 렌더링
//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 0:
//         return (
//           <Card>
//             <StoryForm form={form} onFinish={handleStoryFormSubmit} loading={loading} />
//           </Card>
//         )
//       case 1:
//         return (
//           <Card>
//             <h3>장소 추가</h3>
//             <p>일상에 포함된 장소를 추가해주세요. 최소 한 개 이상의 장소가 필요합니다.</p>

//             <div style={{ marginBottom: "16px" }}>
//               <Button type="dashed" icon={<PlusOutlined />} onClick={openPlaceModal} style={{ width: "100%" }}>
//                 장소 추가하기
//               </Button>
//             </div>

//             <PlaceList places={selectedPlaces} onEdit={handleEditPlace} onRemove={handleRemovePlace} />

//             <Divider />

//             <div style={{ display: "flex", justifyContent: "space-between", marginTop: "24px" }}>
//               <Button danger onClick={showCancelConfirm}>
//                 일상 기록 취소
//               </Button>
//               <Button type="primary" onClick={handleCompleteStory} disabled={selectedPlaces.length === 0}>
//                 일상 기록 완료
//               </Button>
//             </div>
//           </Card>
//         )
//       default:
//         return null
//     }
//   }

//   return (
//     <>
//       <Steps
//         current={currentStep}
//         items={[
//           {
//             title: "일상 정보 입력",
//             description: "",
//           },
//           {
//             title: "장소 추가",
//             description: "방문한 장소 추가",
//           },
//         ]}
//         style={{ marginBottom: "24px" }}
//       />

//       {renderStepContent()}

//       {/* 장소 선택 모달 */}
//       <PlaceRegisterModal isOpen={isPlaceModalOpen} onClose={closePlaceModal} onAddPlace={handleAddPlace} />

//       {/* 장소 상세 정보 모달 */}
//       {currentPlace && (
//         <PlaceDetailModal
//           isOpen={isPlaceDetailModalOpen}
//           onClose={closePlaceDetailModal}
//           onSave={
//             selectedPlaces.some((p) => p.id === currentPlace.id) ? handleUpdatePlaceDetail : handleSavePlaceDetail
//           }
//           place={currentPlace}
//         />
//       )}

//       {/* 취소 확인 모달 */}
//       <Modal
//         title="일상 기록 취소"
//         open={confirmCancelVisible}
//         onOk={handleCancelStory}
//         onCancel={() => setConfirmCancelVisible(false)}
//         okText="예, 취소할게요"
//         cancelText="아니오"
//         confirmLoading={loading}
//       >
//         <p>일상 기록을 취소하시겠습니까?</p>
//         <p>지금까지 입력한 모든 정보가 삭제됩니다.</p>
//       </Modal>

//       {/* 임시저장 기록 불러오기 모달 */}
//       <Modal
//         title="임시저장된 일상 기록"
//         open={isResumeDraftModalVisible}
//         onOk={loadDraftStory}
//         onCancel={startNewStory}
//         okText="이어서 작성하기"
//         cancelText="새로 작성하기"
//         confirmLoading={loading}
//       >
//         <p>이전에 작성 중이던 일상 기록이 있습니다.</p>
//         <p>이어서 작성하시겠습니까?</p>
//       </Modal>
//     </>
//   )
// }


"use client"

import { useEffect, useState } from "react"
import { Steps, Button, Card, Divider, message, Modal, Typography, Tag, Skeleton, Empty } from "antd"
import { PlusOutlined, CalendarOutlined } from "@ant-design/icons"
import { useRouter } from "next/navigation"
import { Form } from "antd"
import type {StoryCreateRequest } from "@/types/story"
import type { Place, PlaceCreateRequest } from "@/types/place"
import { storyApi, placeApi } from "@api/api-client"
import StoryForm, { type StoryFormValues } from "./StoryForm"
import PlaceList from "./PlaceList"
import PlaceRegisterModal from "./PlaceRegisterModal"
import PlaceDetailModal, { type PlaceDetailData } from "./PlaceDetailModal"
import dayjs from "dayjs"

const { Text, Title, Paragraph } = Typography
const { Step } = Steps

interface StoryStepsProps {
  isLoggedIn: boolean
  storyId?: number
  currentPlaceId?: number
}

export default function StorySteps({ isLoggedIn, storyId, currentPlaceId }: StoryStepsProps) {
  const router = useRouter()
  const [form] = Form.useForm()
  const [currentStep, setCurrentStep] = useState(0)
  const [storyIdState, setStoryIdState] = useState<number | null>(null)
  const [storyData, setStoryData] = useState<StoryCreateRequest | null>(null)
  const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([])
  const [isPlaceModalOpen, setIsPlaceModalOpen] = useState(false)
  const [isPlaceDetailModalOpen, setIsPlaceDetailModalOpen] = useState(false)
  const [currentPlace, setCurrentPlace] = useState<Place | null>(null)
  const [loading, setLoading] = useState(false)
  const [confirmCancelVisible, setConfirmCancelVisible] = useState(false)
  const [hasDraftStory, setHasDraftStory] = useState(false)
  const [draftStories, setDraftStories] = useState<any[]>([])
  const [isResumeDraftModalVisible, setIsResumeDraftModalVisible] = useState(false)
  const [places, setPlaces] = useState<Place[]>([])
  const [currentStepVertical, setCurrentStepVertical] = useState<number | undefined>(undefined)

  // 컴포넌트 마운트 시 임시저장된 일상 기록 확인
  useEffect(() => {
    const checkDraftStories = async () => {
      if (!isLoggedIn) return

      try {
        setLoading(true)
        // 임시저장된 일상 기록 목록 조회 API 호출
        const response = await storyApi.getDraftStory()

        if (response && response.content && response.content.length > 0) {
          setHasDraftStory(true)
          setDraftStories(response.content)
          setIsResumeDraftModalVisible(true)
        }
        setLoading(false)
      } catch (error) {
        console.error("임시저장 기록 조회 실패:", error)
        setLoading(false)
      }
    }

    checkDraftStories()
  }, [isLoggedIn])

  // 페이지 이탈 시 임시저장 처리
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (storyIdState && currentStep === 1) {
        // 일상 기록 작성 중인 경우 임시저장
        // saveAsDraft()

        // 브라우저 기본 확인 메시지 표시
        e.preventDefault()
        e.returnValue = "작성 중인 내용이 있습니다. 페이지를 나가시겠습니까?"
        return e.returnValue
      }
    }

    // 페이지 이탈 이벤트 리스너 등록
    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [storyIdState, currentStep])

  // 임시저장 처리 함수
  // const saveAsDraft = async () => {
  //   if (!storyIdState) return

  //   try {
  //     await storyApi.updateStoryStatus(storyIdState, "DRAFT")
  //     console.log("일상 기록이 임시저장되었습니다.")
  //   } catch (error) {
  //     console.error("임시저장 실패:", error)
  //   }
  // }

  // 스토리 ID로 장소 정보 가져오기
  const fetchPlacesByStoryId = async (storyId: number) => {
    try {
      const places = await placeApi.getPlacesByStoryId(storyId)

      // 서버에서 받은 장소 데이터를 StoryPlace 형식으로 변환
      const storyPlaces: Place[] = places.map((place) => ({
        id: place.id,
        name: place.name,
        description: place.description || "",
        category: place.category || "other",
        latitude: place.latitude || 0,
        longitude: place.longitude || 0,
        address: place.address || "",
        visitedDate: place.visitedDate || "",
        images: place.imageUrl ? [place.imageUrl] : undefined,
      }))

      return storyPlaces
    } catch (error) {
      console.error("장소 정보 가져오기 실패:", error)
      return []
    }
  }

  // 임시저장된 기록 불러오기
  const loadDraftStory = async (draftStoryId: number) => {
    if (!draftStoryId) return

    setLoading(true)

    try {
      // 임시저장된 일상 기록 상세 정보 조회
      const draftStories = await storyApi.getStoryById(draftStoryId)

      // 폼에 데이터 설정
      form.setFieldsValue({
        title: draftStories.title,
        description: draftStories.content || draftStories.description,
        dateRange: [
          draftStories.startDate ? dayjs(draftStories.startDate) : null,
          draftStories.endDate ? dayjs(draftStories.endDate) : null,
        ],
        category: draftStories.category,
      })

      // 상태 업데이트
      // setStoryIdState(draftStoryId)
      setStoryData({
        title: draftStories.title,
        description: draftStories.content || draftStories.description,
        startDate: draftStories.startDate,
        endDate: draftStories.endDate,
        category: draftStories.category,
      })

      // 임시저장된 기록의 장소 정보 가져오기
      const places = await placeApi.getPlacesByStoryId(draftStoryId)
      // const places = await fetchPlacesByStoryId(draftStoryId)

      if (places.length > 0) {
        setSelectedPlaces(places)
      }

      // 장소 추가 단계로 이동
      setCurrentStep(1)

      message.success("임시저장된 일상 기록을 불러왔습니다.")
    } catch (error) {
      console.error("임시저장 기록 불러오기 실패:", error)
      message.error("임시저장된 기록을 불러오는데 실패했습니다.")
    } finally {
      setLoading(false)
      setIsResumeDraftModalVisible(false)
    }
  }

  // 새 일상 기록 시작
  const startNewStory = () => {
    console.log("새로 일상 작성하기 클릭")
    setIsResumeDraftModalVisible(false)
  }

  // 일상 기록 생성 처리
  const handleStoryFormSubmit = async (values: StoryFormValues) => {
    if (!isLoggedIn) {
      message.warning("로그인이 필요한 서비스입니다.")
      router.push("/login")
      return
    }

    setLoading(true)

    try {
      // 서버 API 요구사항에 맞게 데이터 구조화
      const storyRequest: StoryCreateRequest = {
        title: values.title,
        description: values.description,
        startDate: values.dateRange[0].format("YYYY-MM-DDTHH:mm:ss"),
        endDate: values.dateRange[1].format("YYYY-MM-DDTHH:mm:ss"),
        category: values.category,
      }

      // API 호출하여 스토리 생성
      const response = await storyApi.createStory(storyRequest)

      // 스토리 ID 저장
      setStoryIdState(response.id)
      setStoryData(storyRequest)

      // 다음 단계로 이동
      console.log("일상 기록 생성 성공 후 이동 :", response)
      setCurrentStep(1)
      message.success("일상 기록이 생성되었습니다. 이제 장소를 추가해보세요!")
    } catch (error) {
      console.error("일상 기록 생성 실패:", error)
      message.error("일상 기록 생성에 실패했습니다. 다시 시도해주세요.")
    } finally {
      setLoading(false)
    }
  }

  // 장소 모달 관련 함수
  const openPlaceModal = () => {
    setIsPlaceModalOpen(true)
  }

  const closePlaceModal = () => {
    setIsPlaceModalOpen(false)
  }

  const openPlaceDetailModal = (place: Place) => {
    setCurrentPlace(place)
    setIsPlaceDetailModalOpen(true)
  }

  const closePlaceDetailModal = () => {
    setIsPlaceDetailModalOpen(false)
    setCurrentPlace(null)
  }

  // 장소 추가 처리
  const handleAddPlace = (place: Place) => {
    // 중복 장소 체크
    if (selectedPlaces.some((p) => p.id === place.id)) {
      message.warning("이미 추가된 장소입니다.")
      return
    }
    console.log("장소 추가 클릭:", place)

    // 장소 상세 정보 입력 모달 열기
    openPlaceDetailModal(place)
    closePlaceModal()
  }

  // 장소 상세 정보 저장
  const handleSavePlaceDetail = async (placeData: Place) => {
    if (!storyIdState) {
      message.error("일상 기록 ID가 없습니다. 다시 시도해주세요.")
      return
    }

    setLoading(true)

    try {
      const placeRequest: PlaceCreateRequest = {
        storyId: storyIdState,
        name: placeData.name,
        description: placeData.description,
        category: placeData.category,
        latitude: placeData.latitude,
        longitude: placeData.longitude,
        address: placeData.address, 
        visitedDate: placeData.visitedDate,
      }

      // API 호출하여 장소 생성 (이미지 포함)
      const response = await placeApi.createPlace(placeRequest, placeData.image)
      console.log("서버 응답:", response)

      // 새 장소 객체 생성
      const newPlace: Place = {
        id: response.id || placeData.id, // 서버에서 반환한 ID 또는 임시 ID
        name: placeData.name,
        description: placeData.description,
        category: placeData.category,
        latitude: placeData.latitude,
        longitude: placeData.longitude,
        address: placeData.address,
        visitedDate: placeData.visitedDate,
        image: response.images || undefined,
      }

      setSelectedPlaces([...selectedPlaces, newPlace])
      closePlaceDetailModal()
      message.success("장소가 추가되었습니다.")

      // 장소 추가 시 상태 업데이트 API 호출 제거
    } catch (error) {
      console.error("장소 추가 실패:", error)
      message.error("장소 추가에 실패했습니다. 다시 시도해주세요.")
    } finally {
      setLoading(false)
    }
  }

  // 장소 편집
  const handleEditPlace = (placeId: number) => {
    const place = selectedPlaces.find((p) => p.id === placeId)
    if (place) {
      // Place 객체로 변환
      const kakaoPlace: Place = {
        id: place.id,
        name: place.name,
        description: place.description,
        address: place.address,
        category: place.category,
        latitude: place.latitude,
        longitude: place.longitude,
        visitedDate: place.visitedDate,
        image: place.image,
      }
      setCurrentPlace(kakaoPlace)
      setIsPlaceDetailModalOpen(true)
    }
  }

  // 장소 정보 업데이트
  const handleUpdatePlaceDetail = async (placeData: Place) => {
    if (!storyIdState) {
      message.error("일상 기록 ID가 없습니다. 다시 시도해주세요.")
      return
    }

    setLoading(true)

    try {
      const placeRequest: Partial<PlaceCreateRequest> = {
        name: placeData.name,
        description: placeData.description,
        category: placeData.category,
      }

      // 이미지가 있는 경우 업데이트
      if (placeData.image) {
        const formData = new FormData()
        formData.append("image", placeData.image)

        // 이미지 업로드 API 호출
        await placeApi.uploadPlaceImage(placeData.id, formData)
      }

      // API 호출하여 장소 업데이트
      await placeApi.updatePlace(placeData.id, placeRequest)

      // 업데이트된 장소 객체 생성
      const updatedPlace: Place = {
        id: placeData.id,
        name: placeData.name,
        description: placeData.description,
        category: placeData.category,
        latitude: placeData.latitude,
        longitude: placeData.longitude,
        address: placeData.address,
        visitedDate: placeData.visitedDate,
        image: undefined, // 서버에서 받아온 이미지 정보로 업데이트 필요
      }

      // 장소 목록에서 해당 장소 업데이트
      setSelectedPlaces(selectedPlaces.map((place) => (place.id === placeData.id ? updatedPlace : place)))

      // 업데이트된 장소 정보 다시 가져오기
      const updatedPlaceData = await placeApi.getPlaceById(placeData.id)
      if (updatedPlaceData && updatedPlaceData.images) {
        setSelectedPlaces((prevPlaces) =>
          prevPlaces.map((place) =>
            place.id === placeData.id ? { ...place, images: updatedPlaceData.images } : place,
          ),
        )
      }

      closePlaceDetailModal()
      message.success("장소 정보가 수정되었습니다.")
    } catch (error) {
      console.error("장소 수정 실패:", error)
      message.error("장소 수정에 실패했습니다. 다시 시도해주세요.")
    } finally {
      setLoading(false)
    }
  }

  // 장소 삭제
  const handleRemovePlace = async (placeId: number) => {
    if (!storyIdState) {
      message.error("일상 기록 ID가 없습니다. 다시 시도해주세요.")
      return
    }

    setLoading(true)

    try {
      // API 호출하여 장소 삭제
      await placeApi.deletePlace(placeId)

      setSelectedPlaces(selectedPlaces.filter((place) => place.id !== placeId))
      message.success("장소가 삭제되었습니다.")
    } catch (error) {
      console.error("장소 삭제 실패:", error)
      message.error("장소 삭제에 실패했습니다. 다시 시도해주세요.")
    } finally {
      setLoading(false)
    }
  }

  // 일상 기록 완료
  const handleCompleteStory = async () => {
    if (!storyIdState) {
      message.error("일상 기록 ID가 없습니다. 다시 시도해주세요.")
      return
    }

    if (selectedPlaces.length === 0) {
      message.warning("최소 한 개 이상의 장소를 추가해주세요.")
      return
    }

    setLoading(true)

    try {
      // 일상 기록 상태를 ARCHIVED로 변경
      await storyApi.updateStoryStatus(storyIdState, "ARCHIVED")

      message.success("일상 기록이 완료되었습니다!")

      // 상세 페이지로 이동
      router.push(`/story/${storyIdState}`)
    } catch (error) {
      console.error("일상 기록 완료 처리 실패:", error)
      message.error("일상 기록 완료 처리에 실패했습니다.")
    } finally {
      setLoading(false)
    }
  }

  // 일상 기록 취소 확인
  const showCancelConfirm = () => {
    setConfirmCancelVisible(true)
  }

  // 일상 기록 취소 처리
  const handleCancelStory = async () => {
    if (!storyIdState) {
      router.push("/story/register")
      return
    }

    setLoading(true)

    try {
      // API 호출하여 스토리 삭제
      await storyApi.deleteStory(Number(storyIdState))
      message.success("일상 기록이 취소되었습니다.")
      router.push("/story/register")
    } catch (error) {
      console.error("일상 기록 취소 실패:", error)
      message.error("일상 기록 취소에 실패했습니다. 다시 시도해주세요.")
    } finally {
      setLoading(false)
      setConfirmCancelVisible(false)
    }
  }

  // 단계별 컨텐츠 렌더링
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card>
            <StoryForm form={form} onFinish={handleStoryFormSubmit} loading={loading} />
          </Card>
        )
      case 1:
        return (
          <Card>
            <h3>장소 추가</h3>
            <p>일상에 포함된 장소를 추가해주세요. 최소 한 개 이상의 장소가 필요합니다.</p>

            <div style={{ marginBottom: "16px" }}>
              <Button type="dashed" icon={<PlusOutlined />} onClick={openPlaceModal} style={{ width: "100%" }}>
                장소 추가하기
              </Button>
            </div>

            <PlaceList places={selectedPlaces} onEdit={handleEditPlace} onRemove={handleRemovePlace} />

            <Divider />

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "24px" }}>
              <Button danger onClick={showCancelConfirm}>
                일상 기록 취소
              </Button>
              <Button type="primary" onClick={handleCompleteStory} disabled={selectedPlaces.length === 0}>
                일상 기록 완료
              </Button>
            </div>
          </Card>
        )
      default:
        return null
    }
  }

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true)
        const response = await placeApi.getPlacesByStoryId(storyId)

        if (response && Array.isArray(response)) {
          setPlaces(response)

          // 현재 보고 있는 장소가 있으면 해당 스텝으로 설정
          if (currentPlaceId) {
            const index = response.findIndex((place) => place.id === currentPlaceId)
            if (index !== -1) {
              setCurrentStepVertical(index)
            }
          }
        } else {
          setPlaces([])
        }
      } catch (error) {
        console.error("장소 정보 로딩 실패:", error)
        setPlaces([])
      } finally {
        setLoading(false)
      }
    }

    if (storyId) {
      fetchPlaces()
    }
  }, [storyId, currentPlaceId])

  if (loading) {
    return <Skeleton active paragraph={{ rows: 4 }} />
  }

  return (
    <>
      <Steps
        current={currentStep}
        items={[
          {
            title: "일상 정보 입력",
            description: "제목, 설명, 기간, 카테고리",
          },
          {
            title: "장소 추가",
            description: "방문한 장소 추가",
          },
        ]}
        style={{ marginBottom: "24px" }}
      />

      {renderStepContent()}

      {/* 장소 선택 모달 */}
      <PlaceRegisterModal isOpen={isPlaceModalOpen} onClose={closePlaceModal} onAddPlace={handleAddPlace} />

      {/* 장소 상세 정보 모달 */}
      {currentPlace && (
        <PlaceDetailModal
          isOpen={isPlaceDetailModalOpen}
          onClose={closePlaceDetailModal}
          onSave={
            selectedPlaces.some((p) => p.id === currentPlace.id) ? handleUpdatePlaceDetail : handleSavePlaceDetail
          }
          place={currentPlace}
        />
      )}

      {/* 취소 확인 모달 */}
      <Modal
        title="일상 기록 취소"
        open={confirmCancelVisible}
        onOk={handleCancelStory}
        onCancel={() => setConfirmCancelVisible(false)}
        okText="예, 취소할게요"
        cancelText="아니오"
        confirmLoading={loading}
      >
        <p>일상 기록을 취소하시겠습니까?</p>
        <p>지금까지 입력한 모든 정보가 삭제됩니다.</p>
      </Modal>

      {/* 임시저장 기록 불러오기 모달 */}
      <Modal
        title="임시저장된 일상 기록"
        open={isResumeDraftModalVisible}
        onCancel={startNewStory}
        footer={null}
        width={600}
      >
        <div style={{ marginBottom: "20px" }}>
          <p>이전에 작성 중이던 일상 기록이 있습니다. 이어서 작성하시겠습니까?</p>
        </div>

        {draftStories.length > 0 ? (
          <div style={{ maxHeight: "300px", overflowY: "auto", marginBottom: "20px" }}>
            {draftStories.map((story) => (
              <Card
                key={story.id}
                style={{ marginBottom: "10px", cursor: "pointer" }}
                hoverable
                onClick={() => loadDraftStory(story.id)}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <Title level={5} style={{ margin: 0 }}>
                      {story.title}
                    </Title>
                    <div style={{ marginTop: "5px" }}>
                      <Tag color="blue">{story.category}</Tag>
                      <Text type="secondary" style={{ marginLeft: "10px" }}>
                        <CalendarOutlined style={{ marginRight: "5px" }} />
                        {new Date(story.startDate).toLocaleDateString()} ~{" "}
                        {new Date(story.endDate).toLocaleDateString()}
                      </Text>
                    </div>
                    <Text type="secondary" style={{ fontSize: "12px", display: "block", marginTop: "5px" }}>
                      마지막 수정: {new Date(story.updatedAt).toLocaleString()}
                    </Text>
                  </div>
                  <Button type="primary">이어서 작성</Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Empty description="임시저장된 기록이 없습니다." />
        )}

        <div style={{ textAlign: "right", marginTop: "20px" }}>
          <Button onClick={startNewStory}>새로 작성하기</Button>
        </div>
      </Modal>
    </>
  )
}
