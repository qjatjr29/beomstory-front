// "use client"

// import { useEffect, useState } from "react"
// import { useParams } from "next/navigation"
// import Link from "next/link"
// import {
//   Layout,
//   Typography,
//   Card,
//   Descriptions,
//   Tag,
//   Divider,
//   List,
//   Skeleton,
//   Button,
//   Empty,
//   message,
//   Image,
//   Row,
//   Col,
// } from "antd"
// import { CalendarOutlined, TagOutlined, ArrowLeftOutlined, PictureOutlined } from "@ant-design/icons"
// import { Map, CustomOverlayMap } from "react-kakao-maps-sdk"
// import type { Story } from "@/types/story"
// import { getCategoryIcon, getCategoryName } from "@/utils/categoryIcons"
// import { storyApi, placeApi } from "@api/api-client"
// import type { PlaceDetailResponse } from "@/types/place"
// import { PLACE_CATEGORIES, getPlaceCategoryLabel } from "@components/constants/placeCategories"
// import { getStoryCategoryLabel } from "@components/constants/storyCategories"
// import "@/styles/story.module.css"
// import "@/styles/place.register.module.css"

// const { Header, Content } = Layout
// const { Title, Text, Paragraph } = Typography

// // 카테고리 매핑
// const STORY_CATEGORIES: Record<string, string> = {
//   travel: "여행",
//   food: "맛집",
//   daily: "일상",
//   activity: "활동",
//   culture: "문화/예술",
// }


// export default function StoryDetailPage() {
//   const { id } = useParams()
//   const [story, setStory] = useState<Story | null>(null)
//   const [places, setPlaces] = useState<PlaceDetailResponse[]>([])
//   const [loading, setLoading] = useState(true)
//   const [selectedPlace, setSelectedPlace] = useState<PlaceDetailResponse | null>(null)
//   const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(null)

//   useEffect(() => {
//     const fetchStoryAndPlaces = async () => {
//       try {
//         setLoading(true)

//         // API 호출로 스토리 데이터 가져오기
//         const storyData = await storyApi.getStoryById(id as string)
//         setStory(storyData)

//         // 장소 정보 별도로 가져오기
//         const placesData = await placeApi.getPlacesByStoryId(id as string)
//         setPlaces(placesData)

//         // 첫 번째 장소를 기본 선택
//         if (placesData && placesData.length > 0) {
//           setSelectedPlace(placesData[0])
//           if (placesData[0].latitude && placesData[0].longitude) {
//             setMapCenter({
//               lat: placesData[0].latitude,
//               lng: placesData[0].longitude,
//             })
//           }
//         }

//         setLoading(false)
//       } catch (error) {
//         console.error("일상 정보 로딩 실패:", error)
//         message.error("일상 정보를 불러오는데 실패했습니다.")
//         setLoading(false)
//       }
//     }

//     if (id) {
//       fetchStoryAndPlaces()
//     }
//   }, [id])

//   // 지도에서 장소 클릭 핸들러
//   const handlePlaceClick = (place: PlaceDetailResponse) => {
//     setSelectedPlace(place)
//     if (place.latitude && place.longitude) {
//       setMapCenter({
//         lat: place.latitude,
//         lng: place.longitude,
//       })
//     }
//   }

//   // 지도에 표시할 경계 계산
//   const calculateBounds = (places: PlaceDetailResponse[]) => {
//     if (!window.kakao || places.length === 0) return null

//     const bounds = new window.kakao.maps.LatLngBounds()
//     places.forEach((place) => {
//       if (place.latitude && place.longitude) {
//         bounds.extend(new window.kakao.maps.LatLng(place.latitude, place.longitude))
//       }
//     })

//     return bounds
//   }

//   // 카테고리에 따른 기본 이미지 URL 반환
//   const getDefaultImageUrl = (category?: string) => {
//     return `/icons/category-${category || "other"}.svg`
//   }

//   if (loading) {
//     return (
//       <Layout>
//         <Header style={{ background: "#fff", padding: "0 20px" }}>
//           <Skeleton.Input style={{ width: 200, marginTop: 16 }} active />
//         </Header>
//         <Content style={{ padding: "20px" }}>
//           <Card style={{ maxWidth: "1000px", margin: "0 auto" }}>
//             <Skeleton active paragraph={{ rows: 4 }} />
//             <Divider />
//             <Skeleton active paragraph={{ rows: 6 }} />
//           </Card>
//         </Content>
//       </Layout>
//     )
//   }

//   if (!story) {
//     return (
//       <Layout>
//         <Header style={{ background: "#fff", padding: "0 20px" }}>
//           <Title level={3} style={{ margin: "16px 0" }}>
//             일상 상세
//           </Title>
//         </Header>
//         <Content style={{ padding: "20px" }}>
//           <Card style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center", padding: "40px" }}>
//             <Empty description="일상 정보를 찾을 수 없습니다." image={Empty.PRESENTED_IMAGE_SIMPLE} />
//             <Button type="primary" style={{ marginTop: "20px" }}>
//               <Link href="/story/register">새 일상 기록하기</Link>
//             </Button>
//           </Card>
//         </Content>
//       </Layout>
//     )
//   }

//   return (
//     <Layout>
//       <Header style={{ background: "#fff", padding: "0 20px", display: "flex", alignItems: "center" }}>
//         <Link href="/story" style={{ marginRight: "16px" }}>
//           <Button icon={<ArrowLeftOutlined />} type="text" />
//         </Link>
//         <Title level={3} style={{ margin: "16px 0" }}>
//           {story.title}
//         </Title>
//       </Header>
//       <Content style={{ padding: "20px" }}>
//         <Card style={{ maxWidth: "1000px", margin: "0 auto" }}>
//           {/* 스토리 정보 섹션 */}
//           <div style={{ marginBottom: "24px", textAlign: "center" }}>
//             <Title level={2} style={{ marginBottom: "16px", color: "#1890ff" }}>
//               {story.title}
//             </Title>
//             <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginBottom: "16px" }}>
//               <Tag color="blue" style={{ padding: "4px 8px", fontSize: "14px" }}>
//                 <CalendarOutlined style={{ marginRight: "4px" }} />
//                 {new Date(story.startDate).toLocaleDateString()} ~ {new Date(story.endDate).toLocaleDateString()}
//               </Tag>
//               <Tag color="green" style={{ padding: "4px 8px", fontSize: "14px" }}>
//                 <TagOutlined style={{ marginRight: "4px" }} />
//                   {getStoryCategoryLabel(story.category)}
//               </Tag>
//             </div>
//             <Paragraph style={{ fontSize: "16px", maxWidth: "700px", margin: "0 auto" }}>{story.description}</Paragraph>
//           </div>

//           <Divider orientation="center" style={{ fontSize: "18px", fontWeight: "bold" }}>
//             방문 장소
//           </Divider>

//           {/* 선택된 장소 상세 정보 */}
//           {selectedPlace && (
//             <Card
//               style={{ marginBottom: "24px" }}
//               title={
//                 <div style={{ fontSize: "18px", fontWeight: "bold" }}>{selectedPlace.name}</div>
//               }
//             >
//               <Row gutter={24}>
//                 {/* 장소 이미지 */}
//                 <Col xs={24} sm={12} md={8}>
//                   <div style={{ marginBottom: "16px" }}>
//                     {selectedPlace.imageUrl ? (
//                       <Image
//                         src={selectedPlace.imageUrl || "/placeholder.svg"}
//                         alt={selectedPlace.name}
//                         style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }}
//                         fallback={getDefaultImageUrl(selectedPlace.category)}
//                       />
//                     ) : (
//                       <div
//                         style={{
//                           width: "100%",
//                           height: "200px",
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                           backgroundColor: "#f5f5f5",
//                           borderRadius: "8px",
//                         }}
//                       >
//                         <PictureOutlined style={{ fontSize: "48px", color: "#d9d9d9" }} />
//                       </div>
//                     )}
//                   </div>
//                 </Col>

//                 {/* 장소 정보 */}
//                 <Col xs={24} sm={12} md={16}>
//                   <Descriptions column={1} bordered size="small">
//                     <Descriptions.Item label="장소명">{selectedPlace.name}</Descriptions.Item>
//                     <Descriptions.Item label="카테고리">
//                       {/* <Tag color="blue">{getCategoryName(selectedPlace.category || "")}</Tag> */}
//                       <Tag color="blue">{getPlaceCategoryLabel(selectedPlace.category)}</Tag>
//                     </Descriptions.Item>
//                     {selectedPlace.description && (
//                       <Descriptions.Item label="설명">{selectedPlace.description}</Descriptions.Item>
//                     )}
//                   </Descriptions>

//                   {/* 지도 (작은 크기로) */}
//                   {selectedPlace.latitude && selectedPlace.longitude && (
//                     <div style={{ marginTop: "16px", height: "150px", borderRadius: "8px", overflow: "hidden" }}>
//                       <Map
//                         center={{ lat: selectedPlace.latitude, lng: selectedPlace.longitude }}
//                         style={{ width: "100%", height: "100%" }}
//                         level={3}
//                         draggable={false}
//                       >
//                         <CustomOverlayMap
//                           position={{ lat: selectedPlace.latitude, lng: selectedPlace.longitude }}
//                           clickable={false}
//                         >
//                           <div className="place-marker selected">{getCategoryIcon(selectedPlace.category || "")}</div>
//                         </CustomOverlayMap>
//                       </Map>
//                     </div>
//                   )}
//                 </Col>
//               </Row>
//             </Card>
//           )}

//           {/* 장소 목록 */}
//           <List
//             grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
//             dataSource={places}
//             renderItem={(place) => (
//               <List.Item>
//                 <Card
//                   hoverable
//                   style={{
//                     cursor: "pointer",
//                     borderColor: selectedPlace?.id === place.id ? "#1890ff" : undefined,
//                     boxShadow: selectedPlace?.id === place.id ? "0 0 8px rgba(24, 144, 255, 0.5)" : undefined,
//                   }}
//                   onClick={() => handlePlaceClick(place)}
//                   cover={
//                     place.imageUrl ? (
//                       <div style={{ height: "150px", overflow: "hidden" }}>
//                         <img
//                           alt={place.name}
//                           src={place.imageUrl || "/placeholder.svg"}
//                           style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                         />
//                       </div>
//                     ) : (
//                       <div
//                         style={{
//                           height: "150px",
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                           backgroundColor: "#f5f5f5",
//                         }}
//                       >
//                         <div style={{ fontSize: "36px" }}>{getCategoryIcon(place.category || "")}</div>
//                       </div>
//                     )
//                   }
//                 >
//                   <Card.Meta
//                     title={place.name}
//                     description={
//                       <div>
//                         <Tag color="blue" style={{ marginBottom: "4px" }}>
//                           {getCategoryName(place.category || "")}
//                         </Tag>
//                         {place.description && (
//                           <div style={{ marginTop: "4px", fontSize: "12px", color: "#666" }}>
//                             {place.description.length > 30
//                               ? `${place.description.substring(0, 30)}...`
//                               : place.description}
//                           </div>
//                         )}
//                       </div>
//                     }
//                   />
//                 </Card>
//               </List.Item>
//             )}
//           />
//         </Card>
//       </Content>
//     </Layout>
//   )
// }

"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  Layout,
  Typography,
  Card,
  Row,
  Col,
  Skeleton,
  Tag,
  Button,
  Divider,
  message,
  Empty,
  Modal,
  Image,
  Descriptions,
  Affix,
} from "antd"
import {
  CalendarOutlined,
  EnvironmentOutlined,
  UserOutlined,
  ExclamationCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  PictureOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons"
import { storyApi, placeApi } from "@api/api-client"
import KakaoMap from "@/components/map/KakaoMap"
import { STORY_CATEGORIES, getStoryCategoryLabel } from "@components/constants/storyCategories"
import { getPlaceCategoryLabel } from "@components/constants/placeCategories"
import { getCategoryIcon } from "@/utils/categoryIcons"
import UserStorage from "@/utils/storage/userStorage"

const { Content } = Layout
const { Title, Text, Paragraph } = Typography
const { confirm } = Modal

interface Place {
  id: number
  name: string
  address: string
  category: string
  description?: string
  visitDate: string
  imageUrl?: string
  latitude: number
  longitude: number
}

interface Story {
  id: number
  title: string
  content: string
  category: string
  startDate: string
  endDate: string
  userId: number
  createdAt: string
  updatedAt: string
  userNickname?: string
}

export default function StoryDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [story, setStory] = useState<Story | null>(null)
  const [places, setPlaces] = useState<Place[]>([])
  const [currentPlace, setCurrentPlace] = useState<Place | null>(null)
  const [loading, setLoading] = useState(true)
  const [isOwner, setIsOwner] = useState(false)

  useEffect(() => {
    const fetchStoryData = async () => {
      try {
        setLoading(true)
        const storyResponse = await storyApi.getStoryById(Number(id))
        setStory(storyResponse)

        // 현재 로그인한 사용자가 작성자인지 확인
        const currentUserId = UserStorage.getUserId()
        setIsOwner(currentUserId === String(storyResponse.userId))

        // 장소 정보 가져오기
        const placesResponse = await placeApi.getPlacesByStoryId(Number(id))
        if (placesResponse && Array.isArray(placesResponse)) {
          setPlaces(placesResponse)
          // 첫 번째 장소를 현재 장소로 설정
          if (placesResponse.length > 0) {
            setCurrentPlace(placesResponse[0])
          }
        }

        setLoading(false)
      } catch (error) {
        console.error("스토리 데이터 로딩 실패:", error)
        message.error("스토리 정보를 불러오는데 실패했습니다.")
        setLoading(false)
      }
    }

    if (id) {
      fetchStoryData()
    }
  }, [id])

  const handlePlaceClick = (place: Place) => {
    setCurrentPlace(place)
  }

  const handleEdit = () => {
    router.push(`/story/edit/${id}`)
  }

  const handleDelete = () => {
  
    confirm({
      title: "정말로 이 일상 기록을 삭제하시겠습니까?",
      icon: <ExclamationCircleOutlined />,
      content: "삭제된 기록은 복구할 수 없습니다.",
      okText: "삭제",
      okType: "danger",
      cancelText: "취소",
      onOk: async () => {
        try {
          await storyApi.deleteStory(Number(id))
          message.success("일상 기록이 삭제되었습니다.")
          router.push("/user/profile")
        } catch (error) {
          console.error("스토리 삭제 실패:", error)
          message.error("일상 기록 삭제에 실패했습니다.")
        }
      },
    })
  }

  // 뒤로가기 버튼 처리 - 자신의 일상 기록 페이지로 이동
  const handleBack = () => {
    router.push("/user/profile")
  }

  // 카테고리에 따른 기본 이미지 URL 반환
  const getDefaultImageUrl = (category?: string) => {
    return `/icons/category-${category || "other"}.svg`
  }

  if (loading) {
    return (
      <Content style={{ padding: "20px", width: "100%" }}>
        <Card>
          <Skeleton active paragraph={{ rows: 6 }} />
        </Card>
      </Content>
    )
  }

  if (!story) {
    return (
      <Content style={{ padding: "20px", width: "100%" }}>
        <Card>
          <Empty description="스토리를 찾을 수 없습니다." />
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Button type="primary" onClick={() => router.push("/")}>
              홈으로 돌아가기
            </Button>
          </div>
        </Card>
      </Content>
    )
  }

  return (
    <Content style={{ padding: "20px", width: "100%" }}>
      <Card style={{ width: "100%", marginBottom: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button icon={<ArrowLeftOutlined />} onClick={handleBack} style={{ marginRight: "16px" }} />
            <Title level={2} style={{ margin: 0, color: "#1890ff" }}>
              {story.title}
            </Title>
          </div>
          {isOwner && (
            <div>
              <Button type="primary" icon={<EditOutlined />} onClick={handleEdit} style={{ marginRight: "8px" }}>
                수정
              </Button>
              <Button danger icon={<DeleteOutlined />} onClick={handleDelete}>
                삭제
              </Button>
            </div>
          )}
        </div>
        <div style={{ marginTop: "16px" }}>
          <Tag color="green">
            {getStoryCategoryLabel(story.category)}
            {/* {STORY_CATEGORIES[story.category] || story.category} */}
            </Tag>
          <Text type="secondary" style={{ marginLeft: "8px" }}>
            <CalendarOutlined style={{ marginRight: "8px" }} />
            {new Date(story.startDate).toLocaleDateString()} ~ {new Date(story.endDate).toLocaleDateString()}
          </Text>
          {story.userNickname && (
            <Text type="secondary" style={{ marginLeft: "16px" }}>
              <UserOutlined style={{ marginRight: "8px" }} />
              {story.userNickname}
            </Text>
          )}
        </div>
        <Divider />
        <Paragraph>{story.content}</Paragraph>
      </Card>

      <Row gutter={16}>
        {/* 사이드바 - 장소 목록 */}
        <Col xs={24} md={8} lg={6}>
          <Affix offsetTop={20}>
            <Card title="방문 장소 목록" style={{ marginBottom: "16px" }}>
              {places.length > 0 ? (
                places.map((place) => (
                  <div
                    key={place.id}
                    style={{
                      padding: "12px",
                      borderRadius: "4px",
                      marginBottom: "8px",
                      cursor: "pointer",
                      backgroundColor: currentPlace?.id === place.id ? "#f0f7ff" : "#f5f5f5",
                      borderLeft: currentPlace?.id === place.id ? "4px solid #1890ff" : "4px solid transparent",
                    }}
                    onClick={() => handlePlaceClick(place)}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          backgroundColor: "white",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginRight: "8px",
                          border: "1px solid #ddd",
                        }}
                      >
                        {getCategoryIcon(place.category)}
                      </div>
                      <div>
                        <div style={{ fontWeight: "bold" }}>{place.name}</div>
                        <div style={{ fontSize: "12px", color: "#666" }}>{getPlaceCategoryLabel(place.category)}</div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <Empty description="등록된 장소가 없습니다." />
              )}
            </Card>
          </Affix>
        </Col>

        {/* 메인 컨텐츠 - 선택된 장소 상세 정보 */}
        <Col xs={24} md={16} lg={18}>
          {currentPlace ? (
            <Card title={<Title level={4}>{currentPlace.name}</Title>}>
              <Row gutter={[16, 16]}>
                {/* 장소 이미지 */}
                <Col xs={24} md={12}>
                  {currentPlace.imageUrl ? (
                    <Image
                      src={currentPlace.imageUrl || "/placeholder.svg"}
                      alt={currentPlace.name}
                      style={{ width: "100%", maxHeight: "300px", objectFit: "cover", borderRadius: "8px" }}
                      fallback="/placeholder.svg?height=300&width=400"
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "300px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#f5f5f5",
                        borderRadius: "8px",
                      }}
                    >
                      <PictureOutlined style={{ fontSize: "64px", color: "#d9d9d9" }} />
                    </div>
                  )}
                </Col>

                {/* 장소 정보 */}
                <Col xs={24} md={12}>
                  <Descriptions bordered column={1}>
                    <Descriptions.Item label="카테고리">
                      <Tag color="blue">{getPlaceCategoryLabel(currentPlace.category)}</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="주소">
                      <div style={{ display: "flex", alignItems: "flex-start" }}>
                        <EnvironmentOutlined style={{ marginRight: "8px", marginTop: "4px" }} />
                        <span>{currentPlace.address}</span>
                      </div>
                    </Descriptions.Item>
                    {/* <Descriptions.Item label="방문일">
                      {new Date(currentPlace.visitDate).toLocaleDateString()}
                    </Descriptions.Item> */}
                    {currentPlace.description && (
                      <Descriptions.Item label="설명">{currentPlace.description}</Descriptions.Item>
                    )}
                  </Descriptions>
                </Col>

                {/* 지도 */}
                <Col xs={24}>
                  <div style={{ height: "400px", borderRadius: "8px", overflow: "hidden" }}>
                    <KakaoMap places={[currentPlace]} currentPlace={currentPlace} onPlaceClick={() => {}} />
                  </div>
                </Col>
              </Row>
            </Card>
          ) : (
            <Card>
              <Empty description="선택된 장소가 없습니다." />
            </Card>
          )}
        </Col>
      </Row>
    </Content>
  )
}
