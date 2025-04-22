// "use client"

// import React from "react"
// import { useState } from "react"
// import { Modal, Spin } from "antd"
// import type { Place } from "@/types/place"
// import PlaceRegister from "@/components/place-register/PlaceRegister"
// import "@/styles/story.module.css"

// interface PlaceRegisterModalProps {
//   isOpen: boolean
//   onClose: () => void
//   onAddPlace: (place: Place) => void
// }

// const PlaceRegisterModal: React.FC<PlaceRegisterModalProps> = ({ isOpen, onClose, onAddPlace }) => {
//   const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
//   const [isLoading, setIsLoading] = useState(true)

//   // 모달이 열릴 때 로딩 상태 초기화
//   React.useEffect(() => {
//     if (isOpen) {
//       setIsLoading(true)
//       // 지도가 로드될 시간을 주기 위해 짧은 타임아웃 설정
//       const timer = setTimeout(() => {
//         setIsLoading(false)
//       }, 1000) // 로딩 시간을 조금 더 길게 설정
//       return () => clearTimeout(timer)
//     }
//   }, [isOpen])

//   const handlePlaceSelect = (place: Place) => {
//     setSelectedPlace(place)
//   }

//   const handleAddPlace = () => {
//     if (selectedPlace) {
//       onAddPlace(selectedPlace)
//     }
//   }

//   return (
//     <Modal
//       title="장소 선택"
//       open={isOpen}
//       onCancel={onClose}
//       width="90%"
//       style={{ top: 20 }}
//       styles={{
//         body: {
//           padding: 0,
//           height: "calc(90vh - 110px)",
//           overflow: "hidden",
//           position: "relative",
//         },
//       }}
//       okText="선택한 장소 추가"
//       cancelText="취소"
//       onOk={handleAddPlace}
//       okButtonProps={{ disabled: !selectedPlace }}
//     >
//       {isLoading ? (
//         <div className="place-modal-loading">
//           <Spin size="large" tip="지도를 불러오는 중..." />
//         </div>
//       ) : (
//         <div className="place-modal-content">
//           <PlaceRegister modalMode={true} onPlaceSelect={handlePlaceSelect} />
//         </div>
//       )}
//     </Modal>
//   )
// }

// export default PlaceRegisterModal

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Modal, Spin } from "antd"
import type { Place } from "@/types/place"
import PlaceRegister from "@/components/place-register/PlaceRegister"
import "@/styles/story.module.css"

interface PlaceRegisterModalProps {
  isOpen: boolean
  onClose: () => void
  onAddPlace: (place: Place) => void
}

const PlaceRegisterModal: React.FC<PlaceRegisterModalProps> = ({ isOpen, onClose, onAddPlace }) => {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // 모달이 열릴 때 로딩 상태 초기화
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      setSelectedPlace(null)
      // 지도가 로드될 시간을 주기 위해 짧은 타임아웃 설정
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1000) // 로딩 시간을 조금 더 길게 설정
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const handlePlaceSelect = (place: Place) => {
    console.log("선택된 장소:", place)
    setSelectedPlace(place)
  }

  const handleAddPlace = () => {
    if (selectedPlace) {
      onAddPlace(selectedPlace)
    }
  }

  return (
    <Modal
      title="장소 선택"
      open={isOpen}
      onCancel={onClose}
      width="90%"
      style={{ top: 20 }}
      styles={{
        body: {
          padding: 0,
          height: "calc(90vh - 110px)",
          overflow: "hidden",
          position: "relative",
        },
      }}
      okText="선택한 장소 추가"
      cancelText="취소"
      onOk={handleAddPlace}
      okButtonProps={{ disabled: !selectedPlace }}
    >
      {isLoading ? (
        <div
          className="place-modal-loading"
          style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}
        >
          <Spin size="large" tip="지도를 불러오는 중..." />
        </div>
      ) : (
        <div className="place-modal-content" style={{ height: "100%" }}>
          <PlaceRegister modalMode={true} onPlaceSelect={handlePlaceSelect} />
        </div>
      )}
    </Modal>
  )
}

export default PlaceRegisterModal

