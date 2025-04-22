// "use client"

// import { useEffect, useState } from "react"
// import { Modal, Form, Input, Select, Button, Upload, message } from "antd"
// import { UploadOutlined } from "@ant-design/icons"
// import type { UploadFile, UploadProps } from "antd/es/upload/interface"
// import type { Place } from "@/types/place"

// const { TextArea } = Input
// const { Option } = Select

// interface PlaceDetailModalProps {
//   isOpen: boolean
//   onClose: () => void
//   onSave: (placeData: PlaceDetailData) => void
//   place: Place
// }

// export interface PlaceDetailData {
//   id: string
//   name: string
//   description: string
//   category: string
//   latitude: number
//   longitude: number
//   address: string
//   imageFile?: File | null
// }

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

// export default function PlaceDetailModal({ isOpen, onClose, onSave, place }: PlaceDetailModalProps) {
//   const [form] = Form.useForm()
//   const [isEditing, setIsEditing] = useState(false)
//   const [fileList, setFileList] = useState<UploadFile[]>([])
//   const [uploadedFile, setUploadedFile] = useState<File | null>(null)

//   useEffect(() => {
//     if (isOpen && place) {
//       // 기존 장소 정보가 있는 경우 수정 모드로 설정
//       setIsEditing(!!place.content)

//       form.setFieldsValue({
//         name: place.name || place.content || "",
//         description: place.content || "",
//         category: getCategoryValue(place.category),
//       })

//       // 이미지 파일 리스트 초기화
//       setFileList([])
//     }
//   }, [isOpen, place, form])

//   const getCategoryValue = (categoryName: string): string => {
//     if (!categoryName) return "other"

//     const lowerCaseName = categoryName.toLowerCase()

//     if (lowerCaseName.includes("음식") || lowerCaseName.includes("식당")) return "restaurant"
//     if (lowerCaseName.includes("카페")) return "cafe"
//     if (lowerCaseName.includes("숙박") || lowerCaseName.includes("호텔")) return "accommodation"
//     if (lowerCaseName.includes("관광") || lowerCaseName.includes("명소")) return "attraction"
//     if (lowerCaseName.includes("쇼핑") || lowerCaseName.includes("마트")) return "shopping"
//     if (lowerCaseName.includes("문화") || lowerCaseName.includes("공연")) return "culture"
//     if (lowerCaseName.includes("교통")) return "transport"

//     const matchingCategories = PLACE_CATEGORIES.filter((category) => category.value === categoryName)
//     return matchingCategories.length > 0 ? matchingCategories[0].value : "other"
//   }

//   const handleSubmit = () => {
//     form.validateFields().then((values) => {
//       // 별도로 관리하는 파일 상태 사용
//       const imageFile = uploadedFile

//       // 디버깅 로그 추가
//       console.log(
//         "폼 제출 - 이미지 파일:",
//         imageFile
//           ? {
//               name: imageFile.name,
//               type: imageFile.type,
//               size: imageFile.size,
//             }
//           : "없음",
//       )

//       const placeData: PlaceDetailData = {
//         id: place.id,
//         name: values.name,
//         description: values.description,
//         category: values.category,
//         latitude: place.position.lat,
//         longitude: place.position.lng,
//         address: place.address,
//         imageFile: imageFile,
//       }

//       onSave(placeData)
//       form.resetFields()
//       setFileList([])
//       setUploadedFile(null) // 파일 상태 초기화
//     })
//   }

//   // 업로드 속성 설정
//   const uploadProps: UploadProps = {
//     onRemove: () => {
//       setFileList([])
//       setUploadedFile(null) // 파일 상태도 초기화
//     },
//     beforeUpload: (file) => {
//       // 이미지 파일 타입 검사
//       const isImage = file.type.startsWith("image/")
//       if (!isImage) {
//         message.error("이미지 파일만 업로드할 수 있습니다!")
//         return Upload.LIST_IGNORE
//       }

//       // 파일 크기 제한 (5MB)
//       const isLt5M = file.size / 1024 / 1024 < 5
//       if (!isLt5M) {
//         message.error("이미지 크기는 5MB보다 작아야 합니다!")
//         return Upload.LIST_IGNORE
//       }

//       // 디버깅 로그 추가
//       console.log("업로드할 파일:", {
//         name: file.name,
//         type: file.type,
//         size: file.size,
//       })

//       // 중요: 파일 객체를 별도 상태로 저장
//       setUploadedFile(file)
//       setFileList([file])
//       return false // 자동 업로드 방지
//     },
//     fileList,
//   }

//   return (
//     <Modal
//       title={isEditing ? "장소 정보 수정" : "장소 정보 입력"}
//       open={isOpen}
//       onCancel={onClose}
//       footer={[
//         <Button key="back" onClick={onClose}>
//           취소
//         </Button>,
//         <Button key="submit" type="primary" onClick={handleSubmit}>
//           저장
//         </Button>,
//       ]}
//     >
//       <Form form={form} layout="vertical">
//         <Form.Item name="name" label="장소 이름" rules={[{ required: true, message: "장소 이름을 입력해주세요!" }]}>
//           <Input placeholder="장소 이름을 입력하세요" />
//         </Form.Item>

//         <Form.Item name="category" label="카테고리" rules={[{ required: true, message: "카테고리를 선택해주세요!" }]}>
//           <Select placeholder="카테고리 선택">
//             {PLACE_CATEGORIES.map((category) => (
//               <Option key={category.value} value={category.value}>
//                 {category.label}
//               </Option>
//             ))}
//           </Select>
//         </Form.Item>

//         <Form.Item name="description" label="이 장소에서의 기록">
//           <TextArea rows={4} placeholder="이 장소에서의 경험이나 기억을 기록해보세요" />
//         </Form.Item>

//         <Form.Item label="장소 사진">
//           <Upload name="image" listType="picture" maxCount={1} {...uploadProps}>
//             <Button icon={<UploadOutlined />}>사진 업로드</Button>
//           </Upload>
//           <p style={{ marginTop: 8, color: "#888" }}>* 5MB 이하의 이미지 파일만 업로드 가능합니다.</p>
//         </Form.Item>

//         <div style={{ marginBottom: "10px" }}>
//           <p style={{ color: "#666", fontSize: "14px", margin: 0 }}>주소: {place.address}</p>
//         </div>
//       </Form>
//     </Modal>
//   )
// }
"use client"

import { useEffect, useState } from "react"
import { Modal, Form, Input, Select, Button, Upload, message, DatePicker } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import type { UploadFile, UploadProps } from "antd/es/upload/interface"
import type { Place, PlaceDetailResponse } from "@/types/place"
import type { getPlaceCategoryLabel } from "@components/constants/placeCategories"
import dayjs from "dayjs"

const { TextArea } = Input
const { Option } = Select

interface PlaceDetailModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (placeData: Place) => void
  place: Place
}

export interface PlaceDetailData {
  id: string
  name: string
  description: string
  category: string
  latitude: number
  longitude: number
  address: string
  imageFile?: File | null
}

const PLACE_CATEGORIES = [
  { value: "restaurant", label: "음식점" },
  { value: "cafe", label: "카페" },
  { value: "accommodation", label: "숙박" },
  { value: "attraction", label: "관광명소" },
  { value: "shopping", label: "쇼핑" },
  { value: "culture", label: "문화/공연" },
  { value: "transport", label: "교통" },
  { value: "other", label: "기타" },
]

export default function PlaceDetailModal({ isOpen, onClose, onSave, place }: PlaceDetailModalProps) {
  const [form] = Form.useForm()
  const [isEditing, setIsEditing] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  useEffect(() => {
    if (isOpen && place) {
      // 기존 장소 정보가 있는 경우 수정 모드로 설정
      setIsEditing(!!place.description)

      form.setFieldsValue({
        name: place.name || "",
        description: place.description || "",
        category: getCategoryValue(place.category),
        address: place.address || "", // address 필드 추가
        visitedDate: place.visitedDate ? dayjs(place.visitedDate) : dayjs(), 
      })

      // 이미지 파일 리스트 초기화
      setFileList([])
    }
  }, [isOpen, place, form])

  const getCategoryValue = (categoryName: string): string => {
    if (!categoryName) return "other"

    const lowerCaseName = categoryName.toLowerCase()

    if (lowerCaseName.includes("음식") || lowerCaseName.includes("식당")) return "restaurant"
    if (lowerCaseName.includes("카페")) return "cafe"
    if (lowerCaseName.includes("숙박") || lowerCaseName.includes("호텔")) return "accommodation"
    if (lowerCaseName.includes("관광") || lowerCaseName.includes("명소")) return "attraction"
    if (lowerCaseName.includes("쇼핑") || lowerCaseName.includes("마트")) return "shopping"
    if (lowerCaseName.includes("문화") || lowerCaseName.includes("공연")) return "culture"
    if (lowerCaseName.includes("교통")) return "transport"

    const matchingCategories = PLACE_CATEGORIES.filter((category) => category.value === categoryName)
    return matchingCategories.length > 0 ? matchingCategories[0].value : "other"
  }

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      // 별도로 관리하는 파일 상태 사용
      const imageFile = uploadedFile

      const visitedDate = values.visitedDate ? values.visitedDate.format("YYYY-MM-DD") : dayjs().format("YYYY-MM-DD")

      const placeData: Place = {
        id: place.id,
        name: values.name,
        description: values.description,
        category: values.category,
        latitude: place.latitude,
        longitude: place.longitude,
        address: place.address,
        visitedDate: visitedDate,
        image: imageFile,
      }

      onSave(placeData)
      form.resetFields()
      setFileList([])
      setUploadedFile(null) // 파일 상태 초기화
    })
  }

  // 업로드 속성 설정
  const uploadProps: UploadProps = {
    onRemove: () => {
      setFileList([])
      setUploadedFile(null) // 파일 상태도 초기화
    },
    beforeUpload: (file) => {
      // 이미지 파일 타입 검사
      const isImage = file.type.startsWith("image/")
      if (!isImage) {
        message.error("이미지 파일만 업로드할 수 있습니다!")
        return Upload.LIST_IGNORE
      }

      // 파일 크기 제한 (5MB)
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        message.error("이미지 크기는 5MB보다 작아야 합니다!")
        return Upload.LIST_IGNORE
      }

      // 중요: 파일 객체를 별도 상태로 저장
      setUploadedFile(file)
      setFileList([file])
      return false // 자동 업로드 방지
    },
    fileList,
  }

  return (
    <Modal
      title={isEditing ? "장소 정보 수정" : "장소 정보 입력"}
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          취소
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          저장
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="장소 이름" rules={[{ required: true, message: "장소 이름을 입력해주세요!" }]}>
          <Input placeholder="장소 이름을 입력하세요" />
        </Form.Item>

        <Form.Item name="category" label="카테고리" rules={[{ required: true, message: "카테고리를 선택해주세요!" }]}>
          <Select placeholder="카테고리 선택">
            {PLACE_CATEGORIES.map((category) => (
              <Option key={category.value} value={category.value}>
                {category.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="description" label="이 장소에서의 기록">
          <TextArea rows={4} placeholder="이 장소에서의 경험이나 기억을 기록해보세요" />
        </Form.Item>

        <Form.Item
          name="visitedDate"
          label="방문 날짜"
          rules={[{ required: true, message: "방문 날짜를 선택해주세요!" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>


        <Form.Item label="장소 사진">
          <Upload name="image" listType="picture" maxCount={1} {...uploadProps}>
            <Button icon={<UploadOutlined />}>사진 업로드</Button>
          </Upload>
          <p style={{ marginTop: 8, color: "#888" }}>* 5MB 이하의 이미지 파일만 업로드 가능합니다.</p>
        </Form.Item>

        <div style={{ marginBottom: "10px" }}>
          <p style={{ color: "#666", fontSize: "14px", margin: 0 }}>주소: {place.address}</p>
        </div>
      </Form>
    </Modal>
  )
}
