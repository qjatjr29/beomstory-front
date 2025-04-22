// // "use client"

// import { Map, CustomOverlayMap } from "react-kakao-maps-sdk"
// import { Card } from "antd"
// import { EnvironmentOutlined } from "@ant-design/icons"
// import PlaceMarker from "./PlaceMarker"
// import PlaceInfoWindow from "./PlaceInfoWindow"
// import type { Place } from "@/types/place"
// import "@/styles/place.register.module.css"

// interface MapPanelProps {
//   center: { lat: number; lng: number }
//   markers: Place[]
//   selectedMarker: Place | null
//   onMapCreate: (map: any) => void
//   onMapClick: (map: any, mouseEvent: any) => void
//   onMarkerClick: (marker: Place) => void
//   onAddPlace: (place: Place) => void
//   modalMode?: boolean
// }

// export default function MapPanel({
//   center,
//   markers,
//   selectedMarker,
//   onMapCreate,
//   onMapClick,
//   onMarkerClick,
//   onAddPlace,
//   modalMode = false,
// }: MapPanelProps) {
//   return (
//     <Card
//       className="map-panel-card"
//       styles={{
//         body: {
//           padding: modalMode ? 0 : undefined,
//           height: "100%",
//         },
//       }}
//       style={{
//         flex: 1,
//         height: modalMode ? "100%" : "100%",
//         padding: modalMode ? 0 : undefined,
//       }}
//     >
//       <Map
//         center={center}
//         style={{
//           width: "100%",
//           height: modalMode ? "calc(90vh - 150px)" : "calc(100vh - 150px)",
//         }}
//         level={3}
//         onCreate={onMapCreate}
//         onClick={onMapClick}
//         className="kakao-map"
//       >
//         {/* 검색 결과 마커들 */}
//         {markers.map((marker) => (
//           <PlaceMarker
//             key={`marker-${marker.id}`}
//             place={marker}
//             isSelected={selectedMarker?.id === marker.id}
//             onClick={onMarkerClick}
//             onAddPlace={onAddPlace}
//           />
//         ))}

//         {/* 선택된 마커의 정보창 */}
//         {selectedMarker && (
//           <CustomOverlayMap position={selectedMarker.position} yAnchor={1.4} zIndex={1000}>
//             <PlaceInfoWindow place={selectedMarker} onAddPlace={onAddPlace} modalMode={modalMode} />
//           </CustomOverlayMap>
//         )}
//       </Map>
//       {!modalMode && (
//         <div style={{ marginTop: "10px", color: "#666", fontSize: "14px" }}>
//           <EnvironmentOutlined /> 지도를 클릭해서 장소를 선택하거나 검색 결과에서 선택하세요
//         </div>
//       )}
//     </Card>
//   )
// }


"use client"

import { Map, CustomOverlayMap } from "react-kakao-maps-sdk"
import { Card } from "antd"
import { EnvironmentOutlined } from "@ant-design/icons"
import PlaceMarker from "./PlaceMarker"
import PlaceInfoWindow from "./PlaceInfoWindow"
import type { Place } from "@/types/place"
import "@/styles/place.register.module.css"

interface MapPanelProps {
  center: { lat: number; lng: number }
  markers: Place[]
  selectedMarker: Place | null
  onMapCreate: (map: any) => void
  onMapClick: (map: any, mouseEvent: any) => void
  onMarkerClick: (marker: Place) => void
  onAddPlace: (place: Place) => void
  modalMode?: boolean
}

export default function MapPanel({
  center,
  markers,
  selectedMarker,
  onMapCreate,
  onMapClick,
  onMarkerClick,
  onAddPlace,
  modalMode = false,
}: MapPanelProps) {
  return (
    <Card
      className="map-panel-card"
      styles={{
        body: {
          padding: modalMode ? 0 : undefined,
          height: "100%",
        },
      }}
      style={{
        flex: 1,
        height: modalMode ? "100%" : "100%",
        padding: modalMode ? 0 : undefined,
      }}
    >
      <Map
        center={center}
        style={{
          width: "100%",
          height: modalMode ? "calc(90vh - 150px)" : "calc(100vh - 150px)",
        }}
        level={3}
        onCreate={onMapCreate}
        onClick={onMapClick}
        className="kakao-map"
      >
        {/* 검색 결과 마커들 */}
        {markers.map((marker) => (
          <PlaceMarker
            key={`marker-${marker.id}`}
            place={marker}
            isSelected={selectedMarker?.id === marker.id}
            onClick={onMarkerClick}
            onAddPlace={onAddPlace}
          />
        ))}

        {/* 선택된 마커의 정보창 */}
        {selectedMarker && (
          <CustomOverlayMap position={{lat: selectedMarker.latitude, lng: selectedMarker.longitude}} yAnchor={1.4} zIndex={1000}>
            <PlaceInfoWindow place={selectedMarker} onAddPlace={onAddPlace} modalMode={modalMode} />
          </CustomOverlayMap>
        )}
      </Map>
      {!modalMode && (
        <div style={{ marginTop: "10px", color: "#666", fontSize: "14px" }}>
          <EnvironmentOutlined /> 지도를 클릭해서 장소를 선택하거나 검색 결과에서 선택하세요
        </div>
      )}
    </Card>
  )
}
