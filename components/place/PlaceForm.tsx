// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { Form, Input, Button, DatePicker, Select, Upload, Card, Typography, Modal } from "antd"
// import { PlusOutlined, EnvironmentOutlined } from "@ant-design/icons"
// import type { UploadFile } from "antd/es/upload/interface"
// import dayjs from "dayjs"
// import { PLACE_CATEGORIES } from "@components/constants/placeCategories"
// import PlaceRegisterModal from "@/components/story/PlaceRegisterModal"
// import type { Place } from "@/types/place"

// const { TextArea } = Input
// const { Title } = Typography

// interface PlaceFormProps {
//   initialValues?: any
//   onFinish: (values: any) => void
//   loading: boolean
// }

// const PlaceForm: React.FC<PlaceFormProps> = ({ initialValues, onFinish, loading }) => {
//   const [form] = Form.useForm()
//   const [fileList, setFileList] = useState<UploadFile[]>([])
//   const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)

//   useEffect(() => {
//     if (initialValues) {
//       // 날짜 형식 변환
//       const formattedValues = {
//         ...initialValues,
//         visitDate: initialValues.visitDate ? dayjs(initialValues.visitDate) : undefined,
//       }

//       // 이미지 URL이 있으면 파일 목록에 추가
//       if (initialValues.imageUrl) {
//         setFileList([
//           {
//             uid: "-1",
//             name: "image.png",
//             status: "done",
//             url: initialValues.imageUrl,
//           },
//         ])
//       }

//       form.setFieldsValue(formattedValues)
//     }
//   }, [initialValues, form])

//   const handleFinish = (values: any) => {
//     // 파일 정보 추가
//     const imageFile = fileList.length > 0 && fileList[0].originFileObj ? fileList[0].originFileObj : null

//     const formData = {
//       ...values,
//       visitDate: values.visitDate ? values.visitDate.format("YYYY-MM-DD") : undefined,
//       imageFile,
//     }

//     onFinish(formData)
//   }

//   const handleUploadChange = ({ fileList }: { fileList: UploadFile[] }) => {
//     setFileList(fileList)
//   }

//   const openLocationModal = () => {
//     setIsLocationModalOpen(true)
//   }

//   const closeLocationModal = () => {
//     setIsLocationModalOpen(false)
//   }

//   const handleLocationSelect = (place: Place) => {
//     // 위치 정보 업데이트
//     form.setFieldsValue({
//       latitude: place.latitude,
//       longitude: place.longitude,
//       address: place.address,
//       // 이름이 비어있는 경우에만 업데이트
//       name: form.getFieldValue("name") || place.name,
//     })
//     closeLocationModal()
//   }

//   const uploadButton = (
//     <div>
//       <PlusOutlined />
//       <div style={{ marginTop: 8 }}>Upload</div>
//     </div>
//   )

//   return (
//     <Card>
//       <Title level={4} style={{ marginBottom: "24px" }}>
//         {initialValues?.id ? "장소 정보 수정" : "새 장소 추가"}
//       </Title>
//       <Form
//         form={form}
//         layout="vertical"
//         onFinish={handleFinish}
//         initialValues={{
//           category: "other", // 기본 카테고리
//         }}
//       >
//         <Form.Item name="name" label="장소명" rules={[{ required: true, message: "장소명을 입력해주세요" }]}>
//           <Input placeholder="장소명을 입력하세요" />
//         </Form.Item>

//         <Form.Item name="category" label="카테고리" rules={[{ required: true, message: "카테고리를 선택해주세요" }]}>
//           <Select placeholder="카테고리 선택">
//             {PLACE_CATEGORIES.map((category) => (
//               <Select.Option key={category.value} value={category.value}>
//                 {category.label}
//               </Select.Option>
//             ))}
//           </Select>
//         </Form.Item>

//         <Form.Item name="address" label="주소" rules={[{ required: true, message: "주소를 입력해주세요" }]}>
//           <Input
//             placeholder="주소를 입력하세요"
//             addonAfter={
//               <Button
//                 type="text"
//                 icon={<EnvironmentOutlined />}
//                 onClick={openLocationModal}
//                 style={{ border: "none", padding: 0 }}
//               >
//                 지도에서 선택
//               </Button>
//             }
//           />
//         </Form.Item>

//         <Form.Item name="visitDate" label="방문일" rules={[{ required: true, message: "방문일을 선택해주세요" }]}>
//           <DatePicker style={{ width: "100%" }} />
//         </Form.Item>

//         <Form.Item name="latitude" label="위도" rules={[{ required: true, message: "위도를 입력해주세요" }]}>
//           <Input type="number" step="0.000001" placeholder="위도 (예: 37.5665)" />
//         </Form.Item>

//         <Form.Item name="longitude" label="경도" rules={[{ required: true, message: "경도를 입력해주세요" }]}>
//           <Input type="number" step="0.000001" placeholder="경도 (예: 126.9780)" />
//         </Form.Item>

//         <Form.Item name="description" label="설명">
//           <TextArea rows={4} placeholder="장소에 대한 설명이나 느낌을 적어주세요" />
//         </Form.Item>

//         <Form.Item name="imageUrl" label="이미지">
//           <Upload
//             listType="picture-card"
//             fileList={fileList}
//             onChange={handleUploadChange}
//             beforeUpload={() => false}
//             maxCount={1}
//           >
//             {fileList.length >= 1 ? null : uploadButton}
//           </Upload>
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" htmlType="submit" loading={loading} block>
//             {initialValues?.id ? "수정하기" : "추가하기"}
//           </Button>
//         </Form.Item>
//       </Form>

//       {/* 위치 선택 모달 */}
//       {isLocationModalOpen && (
//         <Modal
//           title="위치 선택"
//           open={isLocationModalOpen}
//           onCancel={closeLocationModal}
//           footer={null}
//           width="90%"
//           style={{ top: 20 }}
//         >
//           <div style={{ height: "70vh" }}>
//             <PlaceRegisterModal
//               isOpen={isLocationModalOpen}
//               onClose={closeLocationModal}
//               onAddPlace={handleLocationSelect}
//             />
//           </div>
//         </Modal>
//       )}
//     </Card>
//   )
// }

// export default PlaceForm

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Form, Input, Button, DatePicker, Select, Upload, Card, Typography, Modal } from "antd"
import { PlusOutlined, EnvironmentOutlined } from "@ant-design/icons"
import type { UploadFile } from "antd/es/upload/interface"
import dayjs from "dayjs"
import { PLACE_CATEGORIES, getPlaceCategoryLabel } from "@components/constants/placeCategories"
import PlaceRegisterModal from "@/components/story/PlaceRegisterModal"
import type { Place } from "@/types/place"

const { TextArea } = Input
const { Title } = Typography

interface PlaceFormProps {
  initialValues?: any
  onFinish: (values: any) => void
  loading: boolean
}

const PlaceForm: React.FC<PlaceFormProps> = ({ initialValues, onFinish, loading }) => {
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)
  const [imageChanged, setImageChanged] = useState(false) // 이미지 변경 여부 추적

  useEffect(() => {
    if (initialValues) {
      // 날짜 형식 변환
      const formattedValues = {
        ...initialValues,
        visitedDate: initialValues.visitedDate ? dayjs(initialValues.visitedDate) : dayjs(),
      }

      // 이미지 URL이 있으면 파일 목록에 추가
      if (initialValues.imageUrl) {
        setFileList([
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: initialValues.imageUrl,
          },
        ])
      }

      form.setFieldsValue(formattedValues)
      setImageChanged(false) // 초기화 시 이미지 변경 상태 리셋
    }
  }, [initialValues, form])

  const handleFinish = (values: any) => {
    // 이미지가 변경된 경우에만 이미지 파일 추가
    const imageFile =
      imageChanged && fileList.length > 0 && fileList[0].originFileObj ? fileList[0].originFileObj : null

    const formData = {
      ...values,
      visitedDate: values.visitedDate ? values.visitedDate.format("YYYY-MM-DD") : dayjs().format("YYYY-MM-DD"),
      imageFile, // 이미지가 변경된 경우에만 파일 전달
      imageChanged, // 이미지 변경 여부 전달
    }

    onFinish(formData)
  }

  const handleUploadChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList)
    setImageChanged(true) // 파일 목록이 변경되면 이미지 변경 상태를 true로 설정
  }

  const openLocationModal = () => {
    setIsLocationModalOpen(true)
  }

  const closeLocationModal = () => {
    setIsLocationModalOpen(false)
  }

  const handleLocationSelect = (place: Place) => {
    // 위치 정보 업데이트
    form.setFieldsValue({
      latitude: place.latitude,
      longitude: place.longitude,
      address: place.address,
      // 이름이 비어있는 경우에만 업데이트
      name: form.getFieldValue("name") || place.name,
    })
    closeLocationModal()
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  return (
    <Card>
      <Title level={4} style={{ marginBottom: "24px" }}>
        {initialValues?.id ? "장소 정보 수정" : "새 장소 추가"}
      </Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          category: "other", // 기본 카테고리
        }}
      >
        <Form.Item name="name" label="장소명" rules={[{ required: true, message: "장소명을 입력해주세요" }]}>
          <Input placeholder="장소명을 입력하세요" />
        </Form.Item>

        <Form.Item name="category" label="카테고리" rules={[{ required: true, message: "카테고리를 선택해주세요" }]}>
          <Select placeholder="카테고리 선택">
        
            {PLACE_CATEGORIES.map((category) => (
              <Select.Option key={category.value} value={category.value}>
                {category.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="address" label="주소" rules={[{ required: true, message: "주소를 입력해주세요" }]}>
          <Input
            placeholder="주소를 입력하세요"
            addonAfter={
              <Button
                type="text"
                icon={<EnvironmentOutlined />}
                onClick={openLocationModal}
                style={{ border: "none", padding: 0 }}
              >
                지도에서 선택
              </Button>
            }
          />
        </Form.Item>

        <Form.Item name="visitedDate" label="방문일" rules={[{ required: true, message: "방문일을 선택해주세요" }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="latitude" label="위도" rules={[{ required: true, message: "위도를 입력해주세요" }]}>
          <Input type="number" step="0.000001" placeholder="위도 (예: 37.5665)" />
        </Form.Item>

        <Form.Item name="longitude" label="경도" rules={[{ required: true, message: "경도를 입력해주세요" }]}>
          <Input type="number" step="0.000001" placeholder="경도 (예: 126.9780)" />
        </Form.Item>

        <Form.Item name="description" label="설명">
          <TextArea rows={4} placeholder="장소에 대한 설명이나 느낌을 적어주세요" />
        </Form.Item>

        <Form.Item
          name="imageUrl"
          label="이미지"
          extra={
            initialValues?.id
              ? "이미지를 변경하려면 새 이미지를 업로드하세요. 변경하지 않으면 기존 이미지가 유지됩니다."
              : ""
          }
        >
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleUploadChange}
            beforeUpload={() => false}
            maxCount={1}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            {initialValues?.id ? "수정하기" : "추가하기"}
          </Button>
        </Form.Item>
      </Form>

      {/* 위치 선택 모달 */}
      {isLocationModalOpen && (
        <Modal
          title="위치 선택"
          open={isLocationModalOpen}
          onCancel={closeLocationModal}
          footer={null}
          width="90%"
          style={{ top: 20 }}
        >
          <div style={{ height: "70vh" }}>
            <PlaceRegisterModal
              isOpen={isLocationModalOpen}
              onClose={closeLocationModal}
              onAddPlace={handleLocationSelect}
            />
          </div>
        </Modal>
      )}
    </Card>
  )
}

export default PlaceForm