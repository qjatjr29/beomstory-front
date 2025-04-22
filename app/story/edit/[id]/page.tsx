// "use client"

// import { useEffect, useState } from "react"
// import { useParams, useRouter } from "next/navigation"
// import {
//   Layout,
//   Typography,
//   Card,
//   Form,
//   Input,
//   DatePicker,
//   Select,
//   Button,
//   message,
//   Tabs,
//   Spin,
//   Divider,
//   List,
//   Modal,
//   Empty,
// } from "antd"
// import { EditOutlined, SaveOutlined, PlusOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons"
// import { storyApi, placeApi } from "@api/api-client"
// import dayjs from "dayjs"
// import { STORY_CATEGORIES, getStoryCategoryLabel } from "@components/constants/storyCategories"
// import { PLACE_CATEGORIES, getPlaceCategoryLabel } from "@components/constants/placeCategories"
// import PlaceForm from "@/components/place/PlaceForm"
// import PlaceRegisterModal from "@/components/story/PlaceRegisterModal"
// import type { Place } from "@/types/place"
// import UserStorage from "@/utils/storage/userStorage"

// const { Header, Content } = Layout
// const { Title, Text } = Typography
// const { TextArea } = Input
// const { RangePicker } = DatePicker
// const { confirm } = Modal

// interface StoryFormData {
//   title: string
//   description: string
//   dateRange: [dayjs.Dayjs, dayjs.Dayjs]
//   category: string
// }

// export default function StoryEditPage() {
//   const { id } = useParams()
//   const router = useRouter()
//   const [form] = Form.useForm()
//   const [loading, setLoading] = useState(true)
//   const [saving, setSaving] = useState(false)
//   const [story, setStory] = useState<any>(null)
//   const [places, setPlaces] = useState<any[]>([])
//   const [activeTab, setActiveTab] = useState("1")
//   const [selectedPlace, setSelectedPlace] = useState<any | null>(null)
//   const [isPlaceModalOpen, setIsPlaceModalOpen] = useState(false)
//   const [isPlaceFormVisible, setIsPlaceFormVisible] = useState(false)

//   useEffect(() => {
//     const fetchStoryData = async () => {
//       try {
//         setLoading(true)

//         // 스토리 정보 가져오기
//         const storyResponse = await storyApi.getStoryById(Number(id))
//         setStory(storyResponse)
  
//         // 폼 초기값 설정
//         form.setFieldsValue({
//           title: storyResponse.title,
//           description: storyResponse.content || storyResponse.description,
//           dateRange: [dayjs(storyResponse.startDate), dayjs(storyResponse.endDate)],
//           category: getStoryCategoryLabel(storyResponse.category),
//         })

//         // 장소 정보 가져오기
//         const placesResponse = await placeApi.getPlacesByStoryId(Number(id))
//         if (placesResponse && Array.isArray(placesResponse)) {
//           placesResponse.forEach((place) => {
//             place.category = getPlaceCategoryLabel(place.category)
//           })
//           setPlaces(placesResponse)
//         }

//         // 현재 로그인한 사용자가 작성자인지 확인
//         const currentUserId = UserStorage.getUserId()
//         if (currentUserId !== String(storyResponse.authorId)) {
//           message.error("수정 권한이 없습니다.")
//           router.push(`/story/${id}`)
//         }

//         setLoading(false)
//       } catch (error) {
//         console.error("스토리 데이터 로딩 실패:", error)
//         message.error("스토리 정보를 불러오는데 실패했습니다.")
//         router.push(`/story/${id}`)
//       }
//     }

//     if (id) {
//       fetchStoryData()
//     }
//   }, [id, form, router])

//   // 스토리 정보 수정 제출
//   const handleStorySubmit = async (values: StoryFormData) => {
//     try {
//       setSaving(true)

//       const updateData = {
//         title: values.title,
//         description: values.description,
//         startDate: values.dateRange[0].format("YYYY-MM-DDTHH:mm:ss"),
//         endDate: values.dateRange[1].format("YYYY-MM-DDTHH:mm:ss"),
//         category: values.category,
//       }

//       await storyApi.updateStory(Number(id), updateData)
//       message.success("일상 기록이 수정되었습니다.")

//       // 장소 탭으로 이동
//       setActiveTab("2")
//       setSaving(false)
//     } catch (error) {
//       console.error("스토리 수정 실패:", error)
//       message.error("일상 기록 수정에 실패했습니다.")
//       setSaving(false)
//     }
//   }

//   // 장소 추가 모달 열기
//   const openPlaceModal = () => {
//     setIsPlaceModalOpen(true)
//   }

//   // 장소 추가 모달 닫기
//   const closePlaceModal = () => {
//     setIsPlaceModalOpen(false)
//   }

//   // 장소 추가 처리
//   const handleAddPlace = (place: Place) => {
//     setSelectedPlace({
//       name: place.name,
//       address: place.address,
//       category: place.category,
//       latitude: place.latitude,
//       longitude: place.longitude,
//     })
//     setIsPlaceFormVisible(true)
//     closePlaceModal()
//   }

//   // 장소 수정 처리
//   const handleEditPlace = (place: any) => {
//     setSelectedPlace(place)
//     setIsPlaceFormVisible(true)
//   }

//   // 장소 삭제 처리
//   const handleDeletePlace = (placeId: number) => {
//     confirm({
//       title: "정말로 이 장소를 삭제하시겠습니까?",
//       icon: <ExclamationCircleOutlined />,
//       content: "삭제된 장소는 복구할 수 없습니다.",
//       okText: "삭제",
//       okType: "danger",
//       cancelText: "취소",
//       onOk: async () => {
//         try {
//           await placeApi.deletePlace(placeId)
//           message.success("장소가 삭제되었습니다.")

//           // 장소 목록 다시 불러오기
//           const placesResponse = await placeApi.getPlacesByStoryId(Number(id))
//           if (placesResponse && Array.isArray(placesResponse)) {
//             setPlaces(placesResponse)
//           }
//         } catch (error) {
//           console.error("장소 삭제 실패:", error)
//           message.error("장소 삭제에 실패했습니다.")
//         }
//       },
//     })
//   }

//   // 장소 폼 제출 처리
//   const handlePlaceFormSubmit = async (values: any) => {
//     try {
//       setSaving(true)

//       if (selectedPlace.id) {
//         // 기존 장소 수정
//         await placeApi.updatePlace(selectedPlace.id, {
//           name: values.name,
//           description: values.description,
//           category: values.category,
//           latitude: values.latitude,
//           longitude: values.longitude,
//           address: values.address,
//         })

//         message.success("장소가 수정되었습니다.")
//       } else {
//         // 새 장소 추가
//         await placeApi.createPlace(
//           {
//             storyId: id as string,
//             name: values.name,
//             description: values.description,
//             category: values.category,
//             latitude: values.latitude,
//             longitude: values.longitude,
//             address: values.address,
//           },
//           values.imageFile,
//         )

//         message.success("장소가 추가되었습니다.")
//       }

//       // 장소 목록 다시 불러오기
//       const placesResponse = await placeApi.getPlacesByStoryId(Number(id))
//       if (placesResponse && Array.isArray(placesResponse)) {
//         setPlaces(placesResponse)
//       }

//       // 폼 초기화
//       setIsPlaceFormVisible(false)
//       setSelectedPlace(null)
//       setSaving(false)
//     } catch (error) {
//       console.error("장소 저장 실패:", error)
//       message.error("장소 저장에 실패했습니다.")
//       setSaving(false)
//     }
//   }

//   // 수정 완료 처리
//   const handleFinish = () => {
//     router.push(`/story/${id}`)
//   }

//   // Tabs items 정의
//   const tabItems = [
//     {
//       key: "1",
//       label: "기본 정보",
//       children: (
//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={handleStorySubmit}
//           initialValues={{
//             category: "daily",
//           }}
//         >
//           <Form.Item name="title" label="제목" rules={[{ required: true, message: "제목을 입력해주세요!" }]}>
//             <Input placeholder="일상의 제목을 입력하세요" />
//           </Form.Item>

//           <Form.Item name="description" label="설명" rules={[{ required: true, message: "설명을 입력해주세요!" }]}>
//             <TextArea rows={4} placeholder="일상에 대한 설명을 입력하세요" />
//           </Form.Item>

//           <div style={{ display: "flex", gap: "16px" }}>
//             <Form.Item
//               name="dateRange"
//               label="기간"
//               rules={[{ required: true, message: "기간을 선택해주세요!" }]}
//               style={{ flex: 1 }}
//             >
//               <RangePicker style={{ width: "100%" }} />
//             </Form.Item>

//             <Form.Item
//               name="category"
//               label="카테고리"
//               rules={[{ required: true, message: "카테고리를 선택해주세요!" }]}
//               style={{ flex: 1 }}
//             >
//               <Select placeholder="카테고리 선택">

//                 {Object.entries(STORY_CATEGORIES).map(([value, label]) => (
//                   <Select.Option key={value} value={value}>
//                     {label}
//                   </Select.Option>
//                 ))}
//               </Select>
//             </Form.Item>
//           </div>

//           <Form.Item>
//             <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={saving}>
//               정보 저장
//             </Button>
//           </Form.Item>
//         </Form>
//       ),
//     },
//     {
//       key: "2",
//       label: "장소 관리",
//       children: (
//         <>
//           <div style={{ marginBottom: "16px" }}>
//             <Button type="primary" icon={<PlusOutlined />} onClick={openPlaceModal}>
//               새 장소 추가
//             </Button>
//           </div>

//           {isPlaceFormVisible ? (
//             <Card title={selectedPlace.id ? "장소 수정" : "새 장소 추가"}>
//               <PlaceForm initialValues={selectedPlace} onFinish={handlePlaceFormSubmit} loading={saving} />
//               <div style={{ marginTop: "16px", textAlign: "right" }}>
//                 <Button
//                   onClick={() => {
//                     setIsPlaceFormVisible(false)
//                     setSelectedPlace(null)
//                   }}
//                   style={{ marginRight: "8px" }}
//                 >
//                   취소
//                 </Button>
//               </div>
//             </Card>
//           ) : (
//             <>
//               <Divider orientation="left">장소 목록</Divider>
//               {places.length > 0 ? (
//                 <List
//                   itemLayout="horizontal"
//                   dataSource={places}
//                   renderItem={(place) => (
//                     <List.Item
//                       actions={[
//                         <Button key="edit" icon={<EditOutlined />} onClick={() => handleEditPlace(place)}>
//                           수정
//                         </Button>,
//                         <Button
//                           key="delete"
//                           danger
//                           icon={<DeleteOutlined />}
//                           onClick={() => handleDeletePlace(place.id)}
//                         >
//                           삭제
//                         </Button>,
//                       ]}
//                     >
//                       <List.Item.Meta
//                         title={place.name}
//                         description={
//                           <>
//                             <Text type="secondary">
//                               카테고리:{" "}
//                               {getPlaceCategoryLabel(place.category)}
                            
//                             </Text>
//                             <br />
//                             <Text type="secondary">주소: {place.address}</Text>
//                           </>
//                         }
//                       />
//                     </List.Item>
//                   )}
//                 />
//               ) : (
//                 <Empty description="등록된 장소가 없습니다." />
//               )}
//               <Divider />
//               <div style={{ textAlign: "center", marginTop: "24px" }}>
//                 <Button type="primary" size="large" onClick={handleFinish}>
//                   수정 완료
//                 </Button>
//               </div>
//             </>
//           )}
//         </>
//       ),
//     },
//   ]

//   if (loading) {
//     return (
//       <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
//         <Spin size="large" />
//       </div>
//     )
//   }

//   return (
//     <Layout>
//       {/* <Header style={{ background: "#fff", padding: "0 20px" }}>
//         <Title level={3} style={{ margin: "16px 0" }}>
//           일상 기록 수정
//         </Title>
//       </Header> */}
//       <Content style={{ padding: "20px" }}>
//         <Card style={{ maxWidth: "1000px", margin: "0 auto" }}>
//           <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
//         </Card>
//       </Content>

//       {/* 장소 추가 모달 */}
//       {isPlaceModalOpen && (
//         <PlaceRegisterModal isOpen={isPlaceModalOpen} onClose={closePlaceModal} onAddPlace={handleAddPlace} />
//       )}
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
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  message,
  Tabs,
  Spin,
  Divider,
  List,
  Modal,
  Empty,
} from "antd"
import { EditOutlined, SaveOutlined, PlusOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons"
import { storyApi, placeApi } from "@api/api-client"
import dayjs from "dayjs"
import { STORY_CATEGORIES, getStoryCategoryLabel } from "@components/constants/storyCategories"
import { PLACE_CATEGORIES, getPlaceCategoryLabel } from "@components/constants/placeCategories"
import PlaceForm from "@/components/place/PlaceForm"
import PlaceRegisterModal from "@/components/story/PlaceRegisterModal"
import type { Place } from "@/types/place"
import UserStorage from "@/utils/storage/userStorage"

const { Header, Content } = Layout
const { Title, Text } = Typography
const { TextArea } = Input
const { RangePicker } = DatePicker
const { confirm } = Modal

interface StoryFormData {
  title: string
  description: string
  dateRange: [dayjs.Dayjs, dayjs.Dayjs]
  category: string
}

export default function StoryEditPage() {
  const { id } = useParams()
  const router = useRouter()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [story, setStory] = useState<any>(null)
  const [places, setPlaces] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("1")
  const [selectedPlace, setSelectedPlace] = useState<any | null>(null)
  const [isPlaceModalOpen, setIsPlaceModalOpen] = useState(false)
  const [isPlaceFormVisible, setIsPlaceFormVisible] = useState(false)

  useEffect(() => {
    const fetchStoryData = async () => {
      try {
        setLoading(true)

        // 스토리 정보 가져오기
        const storyResponse = await storyApi.getStoryById(Number(id))
        setStory(storyResponse)

        // 폼 초기값 설정
        form.setFieldsValue({
          title: storyResponse.title,
          description: storyResponse.content || storyResponse.description,
          dateRange: [dayjs(storyResponse.startDate), dayjs(storyResponse.endDate)],
          category: storyResponse.category,
        })

        // 장소 정보 가져오기
        const placesResponse = await placeApi.getPlacesByStoryId(Number(id))
        if (placesResponse && Array.isArray(placesResponse)) {
          setPlaces(placesResponse)
        }

        // 현재 로그인한 사용자가 작성자인지 확인
        const currentUserId = UserStorage.getUserId()
        if (currentUserId !== String(storyResponse.authorId)) {
          message.error("수정 권한이 없습니다.")
          router.push(`/story/${id}`)
        }

        setLoading(false)
      } catch (error) {
        console.error("스토리 데이터 로딩 실패:", error)
        message.error("스토리 정보를 불러오는데 실패했습니다.")
        router.push(`/story/${id}`)
      }
    }

    if (id) {
      fetchStoryData()
    }
  }, [id, form, router])

  // 스토리 정보 수정 제출
  const handleStorySubmit = async (values: StoryFormData) => {
    try {
      setSaving(true)

      const updateData = {
        title: values.title,
        description: values.description,
        startDate: values.dateRange[0].format("YYYY-MM-DDTHH:mm:ss"),
        endDate: values.dateRange[1].format("YYYY-MM-DDTHH:mm:ss"),
        category: values.category,
      }

      await storyApi.updateStory(Number(id), updateData)
      message.success("일상 기록이 수정되었습니다.")

      // 장소 탭으로 이동
      setActiveTab("2")
      setSaving(false)
    } catch (error) {
      console.error("스토리 수정 실패:", error)
      message.error("일상 기록 수정에 실패했습니다.")
      setSaving(false)
    }
  }

  // 장소 추가 모달 열기
  const openPlaceModal = () => {
    setIsPlaceModalOpen(true)
  }

  // 장소 추가 모달 닫기
  const closePlaceModal = () => {
    setIsPlaceModalOpen(false)
  }

  // 장소 추가 처리
  const handleAddPlace = (place: Place) => {
    setSelectedPlace({
      name: place.name,
      descrption: place.description,
      address: place.address,
      category: place.category,
      visitedDate: place.visitedDate,
      latitude: place.latitude,
      longitude: place.longitude,
    })
    setIsPlaceFormVisible(true)
    closePlaceModal()
  }

  // 장소 수정 처리
  const handleEditPlace = (place: any) => {
    setSelectedPlace(place)
    setIsPlaceFormVisible(true)
  }

  // 장소 삭제 처리
  const handleDeletePlace = (placeId: number) => {
    confirm({
      title: "정말로 이 장소를 삭제하시겠습니까?",
      icon: <ExclamationCircleOutlined />,
      content: "삭제된 장소는 복구할 수 없습니다.",
      okText: "삭제",
      okType: "danger",
      cancelText: "취소",
      onOk: async () => {
        try {
          await placeApi.deletePlace(placeId)
          message.success("장소가 삭제되었습니다.")

          // 장소 목록 다시 불러오기
          const placesResponse = await placeApi.getPlacesByStoryId(Number(id))
          if (placesResponse && Array.isArray(placesResponse)) {
            setPlaces(placesResponse)
          }
        } catch (error) {
          console.error("장소 삭제 실패:", error)
          message.error("장소 삭제에 실패했습니다.")
        }
      },
    })
  }

  // 장소 폼 제출 처리
  const handlePlaceFormSubmit = async (values: any) => {
     console.log("!!!",values)
    try {
      setSaving(true)

      if (selectedPlace.id) {
        // 기존 장소 수정
        const visitedDate = values.visitedDate || dayjs().format("YYYY-MM-DD")
        const updateData = {
          name: values.name,
          description: values.description,
          category: values.category,
          latitude: values.latitude,
          longitude: values.longitude,
          address: values.address,
          visitedDate: values.visitedDate
        }

        console.log(updateData)

        // // 방법 1: 이미지와 데이터를 함께 전송
        // if (values.imageChanged) {
        //   // 이미지가 변경된 경우에만 이미지 처리
        //   // await placeApi.updatePlace(selectedPlace.id, updateData, values.imageFile)
        // } else {
        //   // 이미지 변경 없이 데이터만 업데이트
        //   await placeApi.updatePlace(selectedPlace.id, updateData)
        // }

        // 방법 2: 이미지와 데이터를 분리하여 처리
        // 1. 먼저 기본 데이터 업데이트
        await placeApi.updatePlace(selectedPlace.id, updateData)

        // 2. 이미지가 변경된 경우에만 별도로 이미지 업로드
        if (values.imageChanged && values.imageFile) {
          await placeApi.uploadPlaceImage(selectedPlace.id, values.imageFile)
        }

        message.success("장소가 수정되었습니다.")
      } else {
        // 새 장소 추가
        const visitedDate = values.visitedDate || dayjs().format("YYYY-MM-DD")
      
        await placeApi.createPlace(
          {
            storyId: Number(id),
            name: values.name,
            description: values.description,
            category: values.category,
            latitude: values.latitude,
            longitude: values.longitude,
            address: values.address,
            visitedDate: values.visitedDate
          },
          values.imageFile, // 새 장소 추가 시에는 이미지 파일이 있으면 전달
        )

        message.success("장소가 추가되었습니다.")
      }

      // 장소 목록 다시 불러오기
      const placesResponse = await placeApi.getPlacesByStoryId(Number(id))
      if (placesResponse && Array.isArray(placesResponse)) {
        setPlaces(placesResponse)
      }

      // 폼 초기화
      setIsPlaceFormVisible(false)
      setSelectedPlace(null)
      setSaving(false)
    } catch (error) {
      console.error("장소 저장 실패:", error)
      message.error("장소 저장에 실패했습니다.")
      setSaving(false)
    }
  }

  // 수정 완료 처리
  const handleFinish = () => {
    router.push(`/story/${id}`)
  }

  // Tabs items 정의
  const tabItems = [
    {
      key: "1",
      label: "기본 정보",
      children: (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleStorySubmit}
          initialValues={{
            category: "daily",
          }}
        >
          <Form.Item name="title" label="제목" rules={[{ required: true, message: "제목을 입력해주세요!" }]}>
            <Input placeholder="일상의 제목을 입력하세요" />
          </Form.Item>

          <Form.Item name="description" label="설명" rules={[{ required: true, message: "설명을 입력해주세요!" }]}>
            <TextArea rows={4} placeholder="일상에 대한 설명을 입력하세요" />
          </Form.Item>

          <div style={{ display: "flex", gap: "16px" }}>
            <Form.Item
              name="dateRange"
              label="기간"
              rules={[{ required: true, message: "기간을 선택해주세요!" }]}
              style={{ flex: 1 }}
            >
              <RangePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              name="category"
              label="카테고리"
              rules={[{ required: true, message: "카테고리를 선택해주세요!" }]}
              style={{ flex: 1 }}
            >
              <Select placeholder="카테고리 선택">
                {Object.entries(STORY_CATEGORIES).map(([value, label]) => (
                  <Select.Option key={value} value={value}>
                    {label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={saving}>
              정보 저장
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: "2",
      label: "장소 관리",
      children: (
        <>
          <div style={{ marginBottom: "16px" }}>
            <Button type="primary" icon={<PlusOutlined />} onClick={openPlaceModal}>
              새 장소 추가
            </Button>
          </div>

          {isPlaceFormVisible ? (
            <Card title={selectedPlace.id ? "장소 수정" : "새 장소 추가"}>
              <PlaceForm initialValues={selectedPlace} onFinish={handlePlaceFormSubmit} loading={saving} />
              <div style={{ marginTop: "16px", textAlign: "right" }}>
                <Button
                  onClick={() => {
                    setIsPlaceFormVisible(false)
                    setSelectedPlace(null)
                  }}
                  style={{ marginRight: "8px" }}
                >
                  취소
                </Button>
              </div>
            </Card>
          ) : (
            <>
              <Divider orientation="left">장소 목록</Divider>
              {places.length > 0 ? (
                <List
                  itemLayout="horizontal"
                  dataSource={places}
                  renderItem={(place) => (
                    <List.Item
                      actions={[
                        <Button key="edit" icon={<EditOutlined />} onClick={() => handleEditPlace(place)}>
                          수정
                        </Button>,
                        <Button
                          key="delete"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => handleDeletePlace(place.id)}
                        >
                          삭제
                        </Button>,
                      ]}
                    >
                      <List.Item.Meta
                        title={place.name}
                        description={
                          <>
                            <Text type="secondary">
                              카테고리:{" "}
                              {PLACE_CATEGORIES.find((cat) => cat.value === place.category)?.label || place.category}
                            </Text>
                            <br />
                            <Text type="secondary">주소: {place.address}</Text>
                          </>
                        }
                      />
                    </List.Item>
                  )}
                />
              ) : (
                <Empty description="등록된 장소가 없습니다." />
              )}
              <Divider />
              <div style={{ textAlign: "center", marginTop: "24px" }}>
                <Button type="primary" size="large" onClick={handleFinish}>
                  수정 완료
                </Button>
              </div>
            </>
          )}
        </>
      ),
    },
  ]

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Spin size="large" />
      </div>
    )
  }

  return (
    <Layout>
      {/* <Header style={{ background: "#fff", padding: "0 20px" }}>
        <Title level={3} style={{ margin: "16px 0" }}>
          일상 기록 수정
        </Title>
      </Header> */}
      <Content style={{ padding: "20px" }}>
        <Card style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
        </Card>
      </Content>

      {/* 장소 추가 모달 */}
      {isPlaceModalOpen && (
        <PlaceRegisterModal isOpen={isPlaceModalOpen} onClose={closePlaceModal} onAddPlace={handleAddPlace} />
      )}
    </Layout>
  )
}