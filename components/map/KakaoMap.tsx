
// "use client"
// import { Map, CustomOverlayMap } from "react-kakao-maps-sdk"
// import { getCategoryIcon } from "@/utils/categoryIcons"

// interface KakaoMapProps {
//   places: any[]
//   currentPlace: any
//   onPlaceClick: (place: any) => void
// }

// export default function KakaoMap({ places, currentPlace, onPlaceClick }: KakaoMapProps) {
//   // 지도 중심 좌표 설정
//   const center =
//     currentPlace?.latitude && currentPlace?.longitude
//       ? { lat: currentPlace.latitude, lng: currentPlace.longitude }
//       : places.length > 0 && places[0].latitude && places[0].longitude
//         ? { lat: places[0].latitude, lng: places[0].longitude }
//         : { lat: 37.5665, lng: 126.978 } // 서울시청 기본값

//   return (
//     <Map center={center} style={{ width: "100%", height: "100%" }} level={3}>
//       {places.map(
//         (place) =>
//           place.latitude &&
//           place.longitude && (
//             <CustomOverlayMap
//               key={place.id}
//               position={{ lat: place.latitude, lng: place.longitude }}
//               clickable={true}
//               // onClick={() => onPlaceClick(place)}
//             >
//               <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//                 <div
//                   className={`place-marker ${currentPlace?.id === place.id ? "selected" : ""}`}
//                   style={{
//                     cursor: "pointer",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     width: "32px",
//                     height: "32px",
//                     borderRadius: "50%",
//                     backgroundColor: "white",
//                     boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
//                     border: currentPlace?.id === place.id ? "2px solid #1677ff" : "1px solid #ddd",
//                     zIndex: currentPlace?.id === place.id ? 100 : 0,
//                   }}
//                 >
//                   {getCategoryIcon(place.category || "")}
//                 </div>
//                 <div
//                   style={{
//                     backgroundColor: "white",
//                     padding: "2px 4px",
//                     borderRadius: "4px",
//                     fontSize: "12px",
//                     marginTop: "4px",
//                     boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
//                     border: currentPlace?.id === place.id ? "1px solid #1677ff" : "1px solid #ddd",
//                     fontWeight: currentPlace?.id === place.id ? "bold" : "normal",
//                     maxWidth: "100px",
//                     overflow: "hidden",
//                     textOverflow: "ellipsis",
//                     whiteSpace: "nowrap",
//                     textAlign: "center",
//                   }}
//                 >
//                   {place.name}
//                 </div>
//               </div>
//             </CustomOverlayMap>
//           ),
//       )}
//     </Map>
//   )
// }

"use client"
import { Map, CustomOverlayMap } from "react-kakao-maps-sdk"
import { getCategoryIcon } from "@/utils/categoryIcons"
import { Typography, Tag, Space } from "antd"
import { EnvironmentOutlined } from "@ant-design/icons"

const { Title, Text } = Typography

interface KakaoMapProps {
  places: any[]
  currentPlace: any
  onPlaceClick: (place: any) => void
}

export default function KakaoMap({ places, currentPlace, onPlaceClick }: KakaoMapProps) {
  // 지도 중심 좌표 설정
  const center =
    currentPlace?.latitude && currentPlace?.longitude
      ? { lat: currentPlace.latitude, lng: currentPlace.longitude }
      : places.length > 0 && places[0].latitude && places[0].longitude
        ? { lat: places[0].latitude, lng: places[0].longitude }
        : { lat: 37.5665, lng: 126.978 } // 서울시청 기본값

  return (
    <Map center={center} style={{ width: "100%", height: "100%" }} level={3}>
      {places.map(
        (place) =>
          place.latitude &&
          place.longitude && (
            <CustomOverlayMap
              key={place.id}
              position={{ lat: place.latitude, lng: place.longitude }}
              clickable={true}
              // onClick={() => onPlaceClick(place)}
            >
              {currentPlace?.id === place.id ? (
                // 선택된 장소는 상세 정보 창 표시
                <div
                  style={{
                    backgroundColor: "white",
                    padding: "15px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                    width: "280px",
                    border: "1px solid #1677ff",
                    zIndex: 1000,
                  }}
                >
                  <Title level={5} style={{ margin: "0 0 8px 0" }}>
                    {place.name}
                  </Title>

                  <Tag color="blue" style={{ marginBottom: "8px" }}>
                    {place.category}
                  </Tag>

                  <Space direction="vertical" size={2} style={{ width: "100%", marginBottom: "10px" }}>
                    {place.address && (
                      <Text type="secondary" style={{ fontSize: "12px", display: "flex", alignItems: "center" }}>
                        <EnvironmentOutlined style={{ marginRight: "5px" }} /> {place.address}
                      </Text>
                    )}
                  </Space>
                </div>
              ) : (
                // 선택되지 않은 장소는 간단한 아이콘과 이름만 표시
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div
                    className="place-marker"
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
                      border: "1px solid #ddd",
                    }}
                  >
                    {getCategoryIcon(place.category || "")}
                  </div>
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "2px 4px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      marginTop: "4px",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                      border: "1px solid #ddd",
                      maxWidth: "100px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      textAlign: "center",
                    }}
                  >
                    {place.name}
                  </div>
                </div>
              )}
            </CustomOverlayMap>
          ),
      )}
    </Map>
  )
}