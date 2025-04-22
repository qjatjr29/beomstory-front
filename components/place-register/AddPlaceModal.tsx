
// "use client"

// import React from "react"
// import { Modal, Form, Input, Upload, Button, message, Row, Col } from "antd"
// import { UploadOutlined } from "@ant-design/icons"
// import { Map, CustomOverlayMap } from "react-kakao-maps-sdk"
// import type { Place } from "@/types/place"
// import { getCategoryIcon } from "@/utils/categoryIcons"

// const { TextArea } = Input

// interface AddPlaceModalProps {
//   isOpen: boolean
//   onClose: () => void
//   onSubmit: (values: any) => void
//   selectedPlace: Place | null
//   imageList: any[]
//   onImageChange: (info: any) => void
// }

// export default function AddPlaceModal({
//   isOpen,
//   onClose,
//   onSubmit,
//   selectedPlace,
//   imageList,
//   onImageChange,
// }: AddPlaceModalProps) {
//   const [form] = Form.useForm()

//   // 모달이 열릴 때 폼 초기화
//   React.useEffect(() => {
//     if (isOpen && selectedPlace) {
//       form.setFieldsValue({
//         placeName: selectedPlace.content || "",
//         description: "",
//         address: selectedPlace.address || "",
//         category: selectedPlace.category || "",
//       })
//     }
//   }, [isOpen, selectedPlace, form])

//   const handleSubmit = () => {
//     form
//       .validateFields()
//       .then((values) => {
//         if (!selectedPlace) {
//           message.warning("장소를 선택해주세요.")
//           return
//         }

//         const formData = {
//           ...values,
//           latitude: selectedPlace.position.lat,
//           longitude: selectedPlace.position.lng,
//           images: imageList.map((file) => (file.originFileObj ? file.originFileObj.name : file.name)),
//           category: selectedPlace.category || "",
//         }

//         onSubmit(formData)
//         form.resetFields()
//       })
//       .catch((info) => {
//         console.log("Validate Failed:", info)
//       })
//   }

//   const uploadProps = {
//     onRemove: (file: any) => {
//       const index = imageList.indexOf(file)
//       const newFileList = imageList.slice()
//       newFileList.splice(index, 1)
//       onImageChange({ fileList: newFileList })
//     },
//     beforeUpload: (file: any) => {
//       const isImage = file.type.indexOf("image/") === 0
//       if (!isImage) {
//         message.error("이미지 파일만 업로드할 수 있습니다!")
//         return false
//       }

//       const isLt2M = file.size / 1024 / 1024 < 2
//       if (!isLt2M) {
//         message.error("이미지 크기는 2MB보다 작아야 합니다!")
//         return false
//       }

//       onImageChange({ fileList: [...imageList, file] })
//       return false
//     },
//     fileList: imageList,
//   }

//   // 선택된 장소가 있을 때만 지도 표시
//   const renderMap = () => {
//     if (!selectedPlace) return null

//     return (
//       <div style={{ marginBottom: "20px" }}>
//         <Map
//           center={selectedPlace.position}
//           style={{ width: "100%", height: "200px", borderRadius: "8px" }}
//           level={3}
//           draggable={false}
//           zoomable={false}
//         >
//           <CustomOverlayMap position={selectedPlace.position} clickable={true}>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 width: "32px",
//                 height: "32px",
//                 borderRadius: "50%",
//                 backgroundColor: "white",
//                 boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
//                 border: "2px solid #1677ff",
//               }}
//             >
//               {getCategoryIcon(selectedPlace.category)}
//             </div>
//           </CustomOverlayMap>
//         </Map>
//       </div>
//     )
//   }

//   return (
//     <Modal
//       title="장소 추가하기"
//       open={isOpen}
//       onCancel={onClose}
//       width={600}
//       footer={[
//         <Button key="back" onClick={onClose}>
//           취소
//         </Button>,
//         <Button key="submit" type="primary" onClick={handleSubmit}>
//           추가
//         </Button>,
//       ]}
//     >
//       {renderMap()}

//       <Form form={form} layout="vertical">
//         <Row gutter={16}>
//           <Col span={16}>
//             <Form.Item
//               name="placeName"
//               label="장소 이름"
//               rules={[{ required: true, message: "장소 이름을 입력해주세요!" }]}
//             >
//               <Input placeholder="장소 이름을 입력하세요" />
//             </Form.Item>
//           </Col>
//           <Col span={8}>
//             <Form.Item name="category" label="카테고리">
//               <Input placeholder="카테고리" disabled />
//             </Form.Item>
//           </Col>
//         </Row>

//         <Form.Item name="address" label="주소">
//           <Input placeholder="주소" disabled />
//         </Form.Item>

//         <Form.Item name="description" label="설명">
//           <TextArea rows={4} placeholder="장소에 대한 설명을 입력하세요" />
//         </Form.Item>

//         <Form.Item name="images" label="이미지">
//           <Upload {...uploadProps} listType="picture">
//             <Button icon={<UploadOutlined />}>이미지 업로드</Button>
//           </Upload>
//         </Form.Item>
//       </Form>
//     </Modal>
//   )
// }


"use client"

import React from "react"
import { Modal, Form, Input, Upload, Button, message, Row, Col, DatePicker } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import { Map, CustomOverlayMap } from "react-kakao-maps-sdk"
import type { Place } from "@/types/place"
import { getCategoryIcon } from "@/utils/categoryIcons"
import "@/styles/place.register.module.css"

const { TextArea } = Input

interface AddPlaceModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (values: any) => void
  selectedPlace: Place | null
  imageList: any[]
  onImageChange: (info: any) => void
}

export default function AddPlaceModal({
  isOpen,
  onClose,
  onSubmit,
  selectedPlace,
  imageList,
  onImageChange,
}: AddPlaceModalProps) {
  const [form] = Form.useForm()

  // 모달이 열릴 때 폼 초기화
  React.useEffect(() => {
    if (isOpen && selectedPlace) {
      form.setFieldsValue({
        placeName: selectedPlace.name || "",
        description: "",
        address: selectedPlace.address || "",
        category: selectedPlace.category || "",
        visitedDate: "",
      })
    }
  }, [isOpen, selectedPlace, form])

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        if (!selectedPlace) {
          message.warning("장소를 선택해주세요.")
          return
        }
        console.log("selectedPlace", selectedPlace)
        const formData = {
          ...values,
          latitude: selectedPlace.latitude,
          longitude: selectedPlace.longitude,
          images: imageList.map((file) => (file.originFileObj ? file.originFileObj.name : file.name)),
          category: selectedPlace.category || "",
          visitedDate: values.visitedDate.format("YYYY-MM-DD"),
        }

        onSubmit(formData)
        form.resetFields()
      })
      .catch((info) => {
        console.log("Validate Failed:", info)
      })
  }

  const uploadProps = {
    onRemove: (file: any) => {
      const index = imageList.indexOf(file)
      const newFileList = imageList.slice()
      newFileList.splice(index, 1)
      onImageChange({ fileList: newFileList })
    },
    beforeUpload: (file: any) => {
      const isImage = file.type.indexOf("image/") === 0
      if (!isImage) {
        message.error("이미지 파일만 업로드할 수 있습니다!")
        return false
      }

      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        message.error("이미지 크기는 2MB보다 작아야 합니다!")
        return false
      }

      onImageChange({ fileList: [...imageList, file] })
      return false
    },
    fileList: imageList,
  }

  // 선택된 장소가 있을 때만 지도 표시
  const renderMap = () => {
    if (!selectedPlace) return null

    return (
      <div style={{ marginBottom: "20px" }}>
        <Map
          center={{lat: selectedPlace.latitude, lng: selectedPlace.longitude}}
          style={{ width: "100%", height: "200px", borderRadius: "8px" }}
          level={3}
          draggable={false}
          zoomable={false}
        >
          <CustomOverlayMap position={{lat: selectedPlace.latitude, lng: selectedPlace.longitude}} clickable={true}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "white",
                boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                border: "2px solid #1677ff",
              }}
            >
              {getCategoryIcon(selectedPlace.category)}
            </div>
          </CustomOverlayMap>
        </Map>
      </div>
    )
  }

  return (
    <Modal
      title="장소 추가하기"
      open={isOpen}
      onCancel={onClose}
      width={600}
      footer={[
        <Button key="back" onClick={onClose}>
          취소
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          추가
        </Button>,
      ]}
    >
      {renderMap()}

      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={16}>
            <Form.Item
              name="placeName"
              label="장소 이름"
              rules={[{ required: true, message: "장소 이름을 입력해주세요!" }]}
            >
              <Input placeholder="장소 이름을 입력하세요" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="category" label="카테고리">
              <Input placeholder="카테고리" disabled />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="address" label="주소">
          <Input placeholder="주소" disabled />
        </Form.Item>

        <Form.Item name="description" label="설명">
          <TextArea rows={4} placeholder="장소에 대한 설명을 입력하세요" />
        </Form.Item>

        <Form.Item
          name="visitedDate"
          label="방문 날짜"
          rules={[{ required: true, message: "방문 날짜를 선택해주세요!" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="images" label="이미지">
          <Upload {...uploadProps} listType="picture">
            <Button icon={<UploadOutlined />}>이미지 업로드</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  )
}
