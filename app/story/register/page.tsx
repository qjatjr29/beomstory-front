"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Layout, Typography, Card, message } from "antd"
import StorySteps from "@components/story/StoryStep"
import "@/styles/story.module.css"
import tokenStorage from "@/utils/storage/tokenStorage"

const { Header, Content } = Layout
const { Title } = Typography

export default function StoryRegisterPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // 로그인 상태 확인
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // 로컬 스토리지나 쿠키에서 토큰 확인 등의 방법으로 로그인 상태 확인
        const token = tokenStorage.getToken()
        setIsLoggedIn(!!token)

        // 개발 중에는 로그인 상태로 가정
        setIsLoggedIn(true)

        // 실제 환경에서는 아래 코드 활성화
        // if (!token) {
        //   message.warning("로그인이 필요한 서비스입니다.")
        //   router.push("/login") // 로그인 페이지로 리다이렉트
        // }
      } catch (error) {
        console.error("로그인 상태 확인 실패:", error)
      }
    }

    checkLoginStatus()
  }, [router])

  if (!isLoggedIn) {
    return (
      <Layout className="story-register-layout">
        <Header style={{ background: "#fff", padding: "0 20px" }}>
          <Title level={3} style={{ margin: "16px 0" }}>
            일상 기록하기
          </Title>
        </Header>
        <Content style={{ padding: "20px" }}>
          <Card style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", padding: "40px" }}>
            <Title level={4}>로그인이 필요한 서비스입니다</Title>
            <button
              className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => router.push("/login")}
            >
              로그인 페이지로 이동
            </button>
          </Card>
        </Content>
      </Layout>
    )
  }

  return (
    <Layout className="story-register-layout">
      <Header style={{ background: "#fff", padding: "0 20px" }}>
        <Title level={3} style={{ margin: "16px 0" }}>
          일상 기록하기
        </Title>
      </Header>
      <Content style={{ padding: "20px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <StorySteps isLoggedIn={isLoggedIn} />
        </div>
      </Content>
    </Layout>
  )
}

// "use client"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { Layout, Typography, Form, Input, DatePicker, Select, Button, Card, List, Divider, message, Tag } from "antd"
// import { PlusOutlined, DeleteOutlined, EnvironmentOutlined, EditOutlined, PictureOutlined } from "@ant-design/icons"
// import dayjs from "dayjs"
// import PlaceRegisterModal from "@/components/story/PlaceRegisterModal"
// import PlaceDetailModal, { type PlaceDetailData } from "@/components/story/PlaceDetailModal"
// import type { Place } from "@/types/place"
// import type { StoryPlace, StoryCreateRequest, PlaceCreateRequest } from "@/types/story"
// import { getCategoryIcon } from "@/utils/categoryIcons"
// import { storyApi } from "@api/api-client"
// import "@/styles/story.module.css"

// const { Header, Content } = Layout
// const { Title, Text } = Typography
// const { TextArea } = Input
// const { Option } = Select
// const { RangePicker } = DatePicker

// const STORY_CATEGORIES = [
//   { value: "travel", label: "여행" },
//   { value: "food", label: "맛집" },
//   { value: "daily", label: "일상" },
//   { value: "activity", label: "활동" },
//   { value: "culture", label: "문화/예술" },
// ]

// const PLACE_CATEGORIES = [
//   { value: "restaurant", label: "음식점" },
//   { value: "cafe", label: "카페" },
//   { value: "accommodation", label: "숙박" },
//   { value: "attraction", label: "관광명소" },
//   { value: "shopping", label: "쇼핑" },
//   { value: "culture", label: "문화/공연" },
//   { value: "transport", label: "교통" },
//   { value: "other", label: "기타" },
// ]

// export default function StoryRegisterPage() {
//   const router = useRouter()
//   const [form] = Form.useForm()
//   const [isPlaceModalOpen, setIsPlaceModalOpen] = useState(false)
//   const [isPlaceDetailModalOpen, setIsPlaceDetailModalOpen] = useState(false)
//   const [selectedPlaces, setSelectedPlaces] = useState<StoryPlace[]>([])
//   const [currentPlace, setCurrentPlace] = useState<Place | null>(null)
//   const [loading, setLoading] = useState(false)
//   const [isLoggedIn, setIsLoggedIn] = useState(false)
//   const [previewImage, setPreviewImage] = useState<string | null>(null)
//   const [previewVisible, setPreviewVisible] = useState(false)

//   // 로그인 상태 확인
//   useEffect(() => {
//     const checkLoginStatus = async () => {
//       try {
//         // 로컬 스토리지나 쿠키에서 토큰 확인 등의 방법으로 로그인 상태 확인
//         const token = localStorage.getItem("token")
//         setIsLoggedIn(!!token)
//         setIsLoggedIn(true)

//         // if (!token) {
//         //   message.warning("로그인이 필요한 서비스입니다.")
//         //   router.push("/login") // 로그인 페이지로 리다이렉트
//         // }
//       } catch (error) {
//         console.error("로그인 상태 확인 실패:", error)
//       }
//     }

//     checkLoginStatus()
//   }, [router])

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

//   const handleSavePlaceDetail = (placeData: PlaceDetailData) => {
//     const newPlace: StoryPlace = {
//       id: placeData.id,
//       name: placeData.name,
//       description: placeData.description,
//       category: placeData.category,
//       latitude: placeData.latitude,
//       longitude: placeData.longitude,
//       address: placeData.address,
//       images: null,
//     }

//     setSelectedPlaces([...selectedPlaces, newPlace])
//     closePlaceDetailModal()
//     message.success("장소가 추가되었습니다.")
//   }

//   const handleEditPlace = (placeId: string) => {
//     const place = selectedPlaces.find((p) => p.id === placeId)
//     if (place) {
//       // Place 객체로 변환 - content 필드에 name 값 할당
//       const kakaoPlace: Place = {
//         id: place.id,
//         name: place.name,
//         content: place.description, // name을 content로 변환
//         address: place.address,
//         category: place.category,
//         position: {
//           lat: place.latitude,
//           lng: place.longitude,
//         },
//       }
//       setCurrentPlace(kakaoPlace)
//       setIsPlaceDetailModalOpen(true)
//     }
//   }

//   const handleUpdatePlaceDetail = (placeData: PlaceDetailData) => {
//     // 기존 장소 찾기
//     const existingPlace = selectedPlaces.find((p) => p.id === placeData.id)

//     // // 이미지 URL 처리
//     // const imageUrls: string[] = []

//     // // if (placeData.imageFiles && placeData.imageFiles.length > 0) {
//     // //   // 실제 구현에서는 이미지를 서버에 업로드하고 URL을 받아와야 함
//     // //   placeData.imageFiles.forEach((file) => {
//     // //     const tempUrl = URL.createObjectURL(file)
//     // //     imageUrls.push(tempUrl)
//     // //   })
//     // // }

//     // // 기존 이미지 URL이 있으면 추가
//     // if (placeData.images && placeData.images.length > 0) {
//     //   imageUrls.push(...placeData.images)
//     // }

//     // // 기존 장소의 이미지가 있고, 새로운 이미지가 없는 경우 기존 이미지 유지
//     // if (existingPlace?.images && existingPlace.images.length > 0 && imageUrls.length === 0) {
//     //   imageUrls.push(...existingPlace.images)
//     // }

//     const updatedPlace: StoryPlace = {
//       id: placeData.id,
//       name: placeData.name,
//       description: placeData.description,
//       category: placeData.category,
//       latitude: placeData.latitude,
//       longitude: placeData.longitude,
//       address: placeData.address,
//       images: null,
//     }

//     setSelectedPlaces(selectedPlaces.map((place) => (place.id === placeData.id ? updatedPlace : place)))
//     closePlaceDetailModal()
//     message.success("장소 정보가 수정되었습니다.")
//   }

//   const handleRemovePlace = (placeId: string) => {
//     setSelectedPlaces(selectedPlaces.filter((place) => place.id !== placeId))
//     message.success("장소가 삭제되었습니다.")
//   }

//   const handlePreviewImage = (imageUrl: string) => {
//     setPreviewImage(imageUrl)
//     setPreviewVisible(true)
//   }

//   const handleSubmit = async (values: any) => {
//     if (!isLoggedIn) {
//       message.warning("로그인이 필요한 서비스입니다.")
//       router.push("/login")
//       return
//     }

//     if (selectedPlaces.length === 0) {
//       message.warning("최소 한 개 이상의 장소를 추가해주세요.")
//       return
//     }

//     setLoading(true)

//     try {
//       // 서버 API 요구사항에 맞게 데이터 구조화
//       const dateRange = values.dateRange || [dayjs(), dayjs()]

//       const storyRequest: StoryCreateRequest = {
//         title: values.title,
//         description: values.description,
//         startDate: dateRange[0].format("YYYY-MM-DDTHH:mm:ss"),
//         endDate: dateRange[1].format("YYYY-MM-DDTHH:mm:ss"),
//         category: values.category,
//       }

//       // 통합 API를 사용하여 스토리와 장소를 한 번에 저장
//       const placeRequests: PlaceCreateRequest[] = selectedPlaces.map((place) => ({
//         storyId: "", // 서버에서 할당될 storyId
//         name: place.name,
//         description: place.description,
//         category: place.category,
//         latitude: place.latitude,
//         longitude: place.longitude,
//         images: place.images, // 이미지 URL 배열 추가
//       }))

//       // API 호출
//       const response = await storyApi.createStoryWithPlaces(storyRequest, placeRequests)

//       message.success("일상이 성공적으로 등록되었습니다!")
//       router.push(`/story/${response.id}`)
//     } catch (error) {
//       console.error("일상 등록 실패:", error)
//       message.error("일상 등록에 실패했습니다. 다시 시도해주세요.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (!isLoggedIn) {
//     return (
//       <Layout className="story-register-layout">
//         <Header style={{ background: "#fff", padding: "0 20px" }}>
//           <Title level={3} style={{ margin: "16px 0" }}>
//             일상 기록하기
//           </Title>
//         </Header>
//         <Content style={{ padding: "20px" }}>
//           <Card style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", padding: "40px" }}>
//             <Title level={4}>로그인이 필요한 서비스입니다</Title>
//             <Button type="primary" style={{ marginTop: "20px" }} onClick={() => router.push("/login")}>
//               로그인 페이지로 이동
//             </Button>
//           </Card>
//         </Content>
//       </Layout>
//     )
//   }

//   return (
//     <Layout className="story-register-layout">
//       <Header style={{ background: "#fff", padding: "0 20px" }}>
//         <Title level={3} style={{ margin: "16px 0" }}>
//           일상 기록하기
//         </Title>
//       </Header>
//       <Content style={{ padding: "20px" }}>
//         <Card style={{ maxWidth: "800px", margin: "0 auto" }}>
//           <Form
//             form={form}
//             layout="vertical"
//             onFinish={handleSubmit}
//             initialValues={{
//               dateRange: [dayjs(), dayjs()],
//               category: "daily",
//             }}
//           >
//             <Form.Item name="title" label="제목" rules={[{ required: true, message: "제목을 입력해주세요!" }]}>
//               <Input placeholder="일상의 제목을 입력하세요" />
//             </Form.Item>

//             <Form.Item name="description" label="설명" rules={[{ required: true, message: "설명을 입력해주세요!" }]}>
//               <TextArea rows={4} placeholder="일상에 대한 설명을 입력하세요" />
//             </Form.Item>

//             <div style={{ display: "flex", gap: "16px" }}>
//               <Form.Item
//                 name="dateRange"
//                 label="기간"
//                 rules={[{ required: true, message: "기간을 선택해주세요!" }]}
//                 style={{ flex: 1 }}
//               >
//                 <RangePicker style={{ width: "100%" }} />
//               </Form.Item>

//               <Form.Item
//                 name="category"
//                 label="카테고리"
//                 rules={[{ required: true, message: "카테고리를 선택해주세요!" }]}
//                 style={{ flex: 1 }}
//               >
//                 <Select placeholder="카테고리 선택">
//                   {STORY_CATEGORIES.map((category) => (
//                     <Option key={category.value} value={category.value}>
//                       {category.label}
//                     </Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             </div>

//             <Divider orientation="left">장소 정보</Divider>

//             <div style={{ marginBottom: "16px" }}>
//               <Button type="dashed" icon={<PlusOutlined />} onClick={openPlaceModal} style={{ width: "100%" }}>
//                 장소 추가하기
//               </Button>
//             </div>

//             {selectedPlaces.length > 0 ? (
//               <List
//                 itemLayout="horizontal"
//                 dataSource={selectedPlaces}
//                 renderItem={(place) => (
//                   <List.Item
//                     actions={[
//                       <Button
//                         key="edit"
//                         type="text"
//                         icon={<EditOutlined />}
//                         onClick={() => handleEditPlace(place.id)}
//                       />,
//                       <Button
//                         key="delete"
//                         type="text"
//                         danger
//                         icon={<DeleteOutlined />}
//                         onClick={() => handleRemovePlace(place.id)}
//                       />,
//                     ]}
//                   >
//                     <List.Item.Meta
//                       avatar={
//                         <div
//                           style={{
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                             width: "32px",
//                             height: "32px",
//                             borderRadius: "50%",
//                             backgroundColor: "#f0f0f0",
//                           }}
//                         >
//                           {PLACE_CATEGORIES.map(
//                             (category) => category.value === place.category && <>{getCategoryIcon(category.label)}</>,
//                           )}
//                         </div>
//                       }
//                       title={
//                         <div>
//                           {place.name}
//                           {place.description && (
//                             <Tag color="green" style={{ marginLeft: "8px" }}>
//                               기록 있음
//                             </Tag>
//                           )}
//                           {PLACE_CATEGORIES.map(
//                             (category) =>
//                               category.value === place.category && (
//                                 <Tag color="red" style={{ marginLeft: "8px" }}>
//                                   {category.label}
//                                 </Tag>
//                               ),
//                           )}

//                           {place.images && place.images.length > 0 && (
//                             <Tag color="blue" style={{ marginLeft: "8px" }}>
//                               <PictureOutlined /> {place.images.length}장의 사진
//                             </Tag>
//                           )}
//                         </div>
//                       }
//                       description={
//                         <div>
//                           <Text type="secondary" style={{ fontSize: "12px", display: "block" }}>
//                             <EnvironmentOutlined style={{ marginRight: "5px" }} />
//                             {place.address}
//                           </Text>
//                           {place.description && (
//                             <Text type="secondary" style={{ fontSize: "12px", display: "block", marginTop: "4px" }}>
//                               {place.description.length > 50
//                                 ? `${place.description.substring(0, 50)}...`
//                                 : place.description}
//                             </Text>
//                           )}
//                           {place.images && place.images.length > 0 && (
//                             <div style={{ marginTop: "8px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
//                               {place.images.slice(0, 3).map((image, index) => (
//                                 <div
//                                   key={index}
//                                   style={{
//                                     width: "60px",
//                                     height: "60px",
//                                     cursor: "pointer",
//                                     borderRadius: "4px",
//                                     overflow: "hidden",
//                                   }}
//                                   onClick={() => handlePreviewImage(image)}
//                                 >
//                                   <img
//                                     src={image || "/placeholder.svg"}
//                                     alt={`${place.name} 이미지 ${index + 1}`}
//                                     style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                                   />
//                                 </div>
//                               ))}
//                               {place.images.length > 3 && (
//                                 <div
//                                   style={{
//                                     width: "60px",
//                                     height: "60px",
//                                     display: "flex",
//                                     alignItems: "center",
//                                     justifyContent: "center",
//                                     backgroundColor: "rgba(0,0,0,0.5)",
//                                     color: "white",
//                                     borderRadius: "4px",
//                                     cursor: "pointer",
//                                   }}
//                                   onClick={() => handlePreviewImage(place.images![3])}
//                                 >
//                                   +{place.images.length - 3}
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                         </div>
//                       }
//                     />
//                   </List.Item>
//                 )}
//               />
//             ) : (
//               <div
//                 style={{
//                   padding: "20px",
//                   textAlign: "center",
//                   background: "#f9f9f9",
//                   borderRadius: "4px",
//                   marginBottom: "16px",
//                 }}
//               >
//                 <Text type="secondary">추가된 장소가 없습니다. 장소를 추가해주세요.</Text>
//               </div>
//             )}

//             <Divider />

//             <div style={{ textAlign: "center", marginTop: "24px" }}>
//               <Button type="primary" htmlType="submit" size="large" loading={loading}>
//                 일상 등록하기
//               </Button>
//             </div>
//           </Form>
//         </Card>
//       </Content>

//       <PlaceRegisterModal isOpen={isPlaceModalOpen} onClose={closePlaceModal} onAddPlace={handleAddPlace} />

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

//       {/* 이미지 미리보기 모달 */}
//       {/* <Modal open={previewVisible} footer={null} onCancel={() => setPreviewVisible(false)}>
//         {previewImage && (
//           <img alt="이미지 미리보기" style={{ width: "100%" }} src={previewImage || "/placeholder.svg"} />
//         )}
//       </Modal> */}
//     </Layout>
//   )
// }