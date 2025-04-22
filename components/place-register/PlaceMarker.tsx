// "use client"

// import { CustomOverlayMap } from "react-kakao-maps-sdk"
// import type { Place } from "@/types/place"
// import { getCategoryIcon } from "@/utils/categoryIcons"
// import "@/styles/place.register.module.css"

// interface PlaceMarkerProps {
//   place: Place
//   isSelected: boolean
//   onClick: (place: Place) => void
//   onAddPlace: (place: Place) => void
// }

// export default function PlaceMarker({ place, isSelected, onClick, onAddPlace }: PlaceMarkerProps) {
//   const handleClick = () => {
//     onClick(place)
//   }

//   // 카테고리에 따른 아이콘 가져오기
//   const icon = getCategoryIcon(place.category)

//   return (
//     <CustomOverlayMap
//       position={place.position}
//       clickable={true}
//       zIndex={isSelected ? 100 : 0} // 선택된 마커는 더 높은 z-index
//     >
//       <div
//         className={`place-marker ${isSelected ? "selected" : ""}`}
//         onClick={handleClick}
//         style={{
//           cursor: "pointer",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           width: "32px",
//           height: "32px",
//           borderRadius: "50%",
//           backgroundColor: "white",
//           boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
//           border: isSelected ? "2px solid #1677ff" : "1px solid #ddd",
//           zIndex: isSelected ? 100 : 0,
//         }}
//       >
//         {icon}
//       </div>
//     </CustomOverlayMap>
//   )
// }


"use client"

import { CustomOverlayMap } from "react-kakao-maps-sdk"
import type { Place } from "@/types/place"
import { getCategoryIcon } from "@/utils/categoryIcons"
import "@/styles/place.register.module.css"

interface PlaceMarkerProps {
  place: Place
  isSelected: boolean
  onClick: (place: Place) => void
  onAddPlace: (place: Place) => void
}

export default function PlaceMarker({ place, isSelected, onClick, onAddPlace }: PlaceMarkerProps) {
  const handleClick = () => {
    onClick(place)
  }

  // 카테고리에 따른 아이콘 가져오기
  const icon = getCategoryIcon(place.category)

  return (
    <CustomOverlayMap
      position={{lat: place.latitude, lng: place.longitude}}
      clickable={true}
      zIndex={isSelected ? 100 : 0} // 선택된 마커는 더 높은 z-index
    >
      <div
        className={`place-marker ${isSelected ? "selected" : ""}`}
        onClick={handleClick}
        style={{
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          backgroundColor: "white",
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          border: isSelected ? "2px solid #1677ff" : "1px solid #ddd",
          zIndex: isSelected ? 100 : 0,
        }}
      >
        {icon}
      </div>
    </CustomOverlayMap>
  )
}

