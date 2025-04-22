
// // "use client"

// // import { useEffect, useState } from "react"
// // import { Layout, Typography } from "antd"
// // import { useKakaoLoader } from "react-kakao-maps-sdk"
// // import SearchPanel from "./SearchPanel"
// // import MapPanel from "./MapPanel"
// // import AddPlaceModal from "./AddPlaceModal"
// // import type { Place } from "@/types/place"
// // import "@/styles/place.register.module.css"

// // const { Header, Content } = Layout
// // const { Title } = Typography

// // // Kakao Maps API 전역 객체 선언
// // declare global {
// //   interface Window {
// //     kakao: any
// //   }
// // }

// // interface PlaceRegisterProps {
// //   modalMode?: boolean
// //   onPlaceSelect?: (place: Place) => void
// // }

// // export default function PlaceRegister({ modalMode = false, onPlaceSelect }: PlaceRegisterProps) {
// //   const KAKAO_MAPS_API_KEY = process.env.NEXT_PUBLIC_KAKAO_MAPS_API_KEY as string
// //   const [loading, error] = useKakaoLoader({
// //     appkey: KAKAO_MAPS_API_KEY,
// //     libraries: ["services", "clusterer"],
// //   })

// //   const [center, setCenter] = useState<{ lat: number; lng: number }>({ lat: 37.5665, lng: 126.978 }) // 서울시청 기본값
// //   const [map, setMap] = useState<any>(null)
// //   const [markers, setMarkers] = useState<Place[]>([])
// //   const [selectedMarker, setSelectedMarker] = useState<Place | null>(null)
// //   const [isAddPlaceModalOpen, setIsAddPlaceModalOpen] = useState(false)
// //   const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
// //   const [imageList, setImageList] = useState<any[]>([])

// //   // 지도 중심 이동 함수
// //   const moveMapCenter = (lat: number, lng: number) => {
// //     if (map) {
// //       map.setCenter(new window.kakao.maps.LatLng(lat, lng))
// //     }
// //   }

// //   // 사용자의 현재 위치 가져오기
// //   const fetchUserLocation = () => {
// //     if (navigator.geolocation) {
// //       navigator.geolocation.getCurrentPosition(
// //         (position) => {
// //           const { latitude, longitude } = position.coords
// //           setCenter({ lat: latitude, lng: longitude })
// //           moveMapCenter(latitude, longitude)
// //         },
// //         (error) => {
// //           console.warn("사용자 위치 가져오기 실패:", error.message)
// //           setCenter({ lat: 37.5665, lng: 126.978 }) // 서울시청 fallback
// //         },
// //       )
// //     } else {
// //       console.warn("브라우저가 위치 정보를 지원하지 않습니다.")
// //       setCenter({ lat: 37.5665, lng: 126.978 })
// //     }
// //   }

// //   // 페이지 로드 시 사용자 위치 요청
// //   useEffect(() => {
// //     fetchUserLocation()
// //   }, [])

// //   // 선택된 마커가 변경될 때 onPlaceSelect 콜백 호출 (모달 모드일 때)
// //   useEffect(() => {
// //     if (modalMode && onPlaceSelect && selectedMarker) {
// //       onPlaceSelect(selectedMarker)
// //     }
// //   }, [modalMode, onPlaceSelect, selectedMarker])

// //   // 장소 추가 모달 닫기 함수
// //   const handleAddPlaceModalClose = () => {
// //     setIsAddPlaceModalOpen(false)
// //   }

// //   // 장소 추가 모달 열기 함수
// //   const openAddPlaceModal = (place: Place) => {
// //     setSelectedPlace(place)
// //     setIsAddPlaceModalOpen(true)
// //   }

// //   // 지도 클릭 이벤트 핸들러
// //   const handleMapClick = (_: any, mouseEvent: any) => {
// //     const lat = mouseEvent.latLng.getLat()
// //     const lng = mouseEvent.latLng.getLng()

// //     // 클릭한 위치로 지도 중심 이동
// //     moveMapCenter(lat, lng)

// //     // 클릭한 위치의 주소 정보 가져오기
// //     if (map) {
// //       const geocoder = new window.kakao.maps.services.Geocoder()
// //       geocoder.coord2Address(lng, lat, (result: any, status: any) => {
// //         if (status === window.kakao.maps.services.Status.OK) {
// //           const address = result[0]?.address?.address_name || ""
// //           const newPlace: Place = {
// //             title: "새로운 장소",
// //             position: { lat, lng },
// //             content: "새로운 장소 설명",
// //             address,
// //             category: "",
// //             id: `new-${Date.now()}`,
// //           }

// //           // 새로운 장소를 마커 목록에 추가
// //           setMarkers((prevMarkers) => [...prevMarkers, newPlace])

// //           // 새로운 장소를 선택된 마커로 설정
// //           setSelectedMarker(newPlace)
// //           setSelectedPlace(newPlace)
// //         }
// //       })
// //     }
// //   }

// //   // 마커 클릭 이벤트 핸들러
// //   const handleMarkerClick = (marker: Place) => {
// //     setSelectedMarker(marker)
// //     setSelectedPlace(marker)
// //     moveMapCenter(marker.position.lat, marker.position.lng)
// //   }

// //   // 리스트 아이템 클릭 핸들러
// //   const handleListItemClick = (place: Place) => {
// //     moveMapCenter(place.position.lat, place.position.lng)
// //     setSelectedMarker(place)
// //     setSelectedPlace(place)
// //   }

// //   // 장소 검색 함수
// //   const handleSearch = (query: string) => {
// //     if (!map || !query.trim()) return

// //     const ps = new window.kakao.maps.services.Places()
// //     ps.keywordSearch(query, (data, status) => {
// //       if (status === window.kakao.maps.services.Status.OK) {
// //         const bounds = new window.kakao.maps.LatLngBounds()
// //         const foundMarkers = data.map((place: any) => {
// //           bounds.extend(new window.kakao.maps.LatLng(place.y, place.x))
// //           return {
// //             position: { lat: Number.parseFloat(place.y), lng: Number.parseFloat(place.x) },
// //             content: place.place_name,
// //             address: place.address_name || "",
// //             category: place.category_name || "",
// //             phone: place.phone || "",
// //             id: place.id,
// //           }
// //         })
// //         setMarkers(foundMarkers)
// //         map.setBounds(bounds) // 검색된 장소로 중심 이동
// //         if (foundMarkers.length > 0) {
// //           setSelectedMarker(foundMarkers[0])
// //         }
// //       } else {
// //         setMarkers([])
// //         setSelectedMarker(null)
// //       }
// //     })
// //   }

// //   // 이미지 변경 핸들러
// //   const handleImageChange = ({ fileList }: any) => setImageList(fileList)

// //   // 장소 추가 폼 제출
// //   const handleAddPlaceSubmit = async (values: any) => {
// //     // 여기에 장소 추가 로직 구현
// //     console.log("장소 추가:", values)
// //     setIsAddPlaceModalOpen(false)
// //   }

// //   // 모달 모드일 때는 헤더를 표시하지 않음
// //   const renderContent = () => (
// //     <Content
// //       style={{
// //         padding: modalMode ? "0" : "0 20px",
// //         display: "flex",
// //         height: modalMode ? "100%" : "calc(100vh - 64px)",
// //         overflow: "hidden", // 모달 모드에서 스크롤 방지
// //       }}
// //     >
// //       <SearchPanel
// //         markers={markers}
// //         selectedMarker={selectedMarker}
// //         onSearch={handleSearch}
// //         onItemClick={handleListItemClick}
// //         onAddPlace={modalMode ? handleMarkerClick : openAddPlaceModal}
// //         onLocationClick={fetchUserLocation}
// //         modalMode={modalMode}
// //       />
// //       <MapPanel
// //         center={center}
// //         markers={markers}
// //         selectedMarker={selectedMarker}
// //         onMapCreate={setMap}
// //         onMapClick={handleMapClick}
// //         onMarkerClick={handleMarkerClick}
// //         onAddPlace={modalMode ? handleMarkerClick : openAddPlaceModal}
// //         modalMode={modalMode}
// //       />
// //     </Content>
// //   )

// //   if (modalMode) {
// //     return renderContent()
// //   }

// //   return (
// //     <Layout className="place-register-layout">
// //       <Header style={{ background: "#fff", padding: "0 20px" }}>
// //         <Title level={3} style={{ margin: "16px 0" }}>
// //           장소 등록하기
// //         </Title>
// //       </Header>
// //       {renderContent()}
// //       <AddPlaceModal
// //         isOpen={isAddPlaceModalOpen}
// //         onClose={handleAddPlaceModalClose}
// //         onSubmit={handleAddPlaceSubmit}
// //         selectedPlace={selectedPlace}
// //         imageList={imageList}
// //         onImageChange={handleImageChange}
// //       />
// //     </Layout>
// //   )
// // }


// "use client"

// import { useEffect, useState } from "react"
// import { Layout, Typography } from "antd"
// import { useKakaoLoader } from "react-kakao-maps-sdk"
// import SearchPanel from "./SearchPanel"
// import MapPanel from "./MapPanel"
// import AddPlaceModal from "./AddPlaceModal"
// import type { Place } from "@/types/place"
// import "@/styles/place.register.module.css"

// const { Header, Content } = Layout
// const { Title } = Typography

// // Kakao Maps API 전역 객체 선언
// declare global {
//   interface Window {
//     kakao: any
//   }
// }

// interface PlaceRegisterProps {
//   modalMode?: boolean
//   onPlaceSelect?: (place: Place) => void
// }

// export default function PlaceRegister({ modalMode = false, onPlaceSelect }: PlaceRegisterProps) {
//   const KAKAO_MAPS_API_KEY = process.env.NEXT_PUBLIC_KAKAO_MAPS_API_KEY as string
//   const [loading, error] = useKakaoLoader({
//     appkey: KAKAO_MAPS_API_KEY,
//     libraries: ["services", "clusterer"],
//   })

//   const [center, setCenter] = useState<{ lat: number; lng: number }>({ lat: 37.5665, lng: 126.978 }) // 서울시청 기본값
//   const [map, setMap] = useState<any>(null)
//   const [markers, setMarkers] = useState<Place[]>([])
//   const [selectedMarker, setSelectedMarker] = useState<Place | null>(null)
//   const [isAddPlaceModalOpen, setIsAddPlaceModalOpen] = useState(false)
//   const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
//   const [imageList, setImageList] = useState<any[]>([])
//   const [userLocationMarker, setUserLocationMarker] = useState<Place | null>(null)

//   // 지도 중심 이동 함수
//   const moveMapCenter = (lat: number, lng: number) => {
//     if (map) {
//       map.setCenter(new window.kakao.maps.LatLng(lat, lng))
//     }
//   }

//   // 사용자의 현재 위치 가져오기
//   const fetchUserLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords
//           setCenter({ lat: latitude, lng: longitude })
//           moveMapCenter(latitude, longitude)

//           // 현재 위치에 마커 추가
//           if (map) {
//             const geocoder = new window.kakao.maps.services.Geocoder()
//             geocoder.coord2Address(longitude, latitude, (result: any, status: any) => {
//               if (status === window.kakao.maps.services.Status.OK) {
//                 const address = result[0]?.address?.address_name || "현재 위치"
//                 const userMarker: Place = {
//                   position: { lat: latitude, lng: longitude },
//                   name: "내 위치",
//                   content: "내 위치",
//                   address,
//                   category: "현재 위치",
//                   id: `user-location-${Date.now()}`,
//                 }
//                 setUserLocationMarker(userMarker)

//                 // 현재 위치 마커를 선택된 마커로 설정
//                 setSelectedMarker(userMarker)
//               }
//             })
//           }
//         },
//         (error) => {
//           console.warn("사용자 위치 가져오기 실패:", error.message)
//           setCenter({ lat: 37.5665, lng: 126.978 }) // 서울시청 fallback
//         },
//       )
//     } else {
//       console.warn("브라우저가 위치 정보를 지원하지 않습니다.")
//       setCenter({ lat: 37.5665, lng: 126.978 })
//     }
//   }

//   // 페이지 로드 시 사용자 위치 요청
//   useEffect(() => {
//     fetchUserLocation()
//   }, [])

//   // 선택된 마커가 변경될 때 onPlaceSelect 콜백 호출 (모달 모드일 때)
//   useEffect(() => {
//     if (modalMode && onPlaceSelect && selectedMarker) {
//       onPlaceSelect(selectedMarker)
//     }
//   }, [modalMode, onPlaceSelect, selectedMarker])

//   // 장소 추가 모달 닫기 함수
//   const handleAddPlaceModalClose = () => {
//     setIsAddPlaceModalOpen(false)
//   }

//   // 장소 추가 모달 열기 함수
//   const openAddPlaceModal = (place: Place) => {
//     setSelectedPlace(place)
//     setIsAddPlaceModalOpen(true)
//   }

//   // 지도 클릭 이벤트 핸들러
//   const handleMapClick = (_: any, mouseEvent: any) => {
//     const lat = mouseEvent.latLng.getLat()
//     const lng = mouseEvent.latLng.getLng()

//     // 클릭한 위치로 지도 중심 이동
//     moveMapCenter(lat, lng)

//     // 클릭한 위치의 주소 정보 가져오기
//     if (map) {
//       const geocoder = new window.kakao.maps.services.Geocoder()
//       geocoder.coord2Address(lng, lat, (result: any, status: any) => {
//         if (status === window.kakao.maps.services.Status.OK) {
//           const address = result[0]?.address?.address_name || ""
//           const newPlace: Place = {
//             position: { lat, lng },
//             name: result.name || "새로운 장소",
//             content: "새로운 장소",
//             address,
//             category: "",
//             id: `${lat}-${lng}`,
//           }

//           // 새로운 장소를 마커 목록에 추가
//           setMarkers((prevMarkers) => [...prevMarkers, newPlace])

//           // 새로운 장소를 선택된 마커로 설정
//           setSelectedMarker(newPlace)
//           setSelectedPlace(newPlace)
//         }
//       })
//     }
//   }

//   // 마커 클릭 이벤트 핸들러
//   const handleMarkerClick = (marker: Place) => {
//     setSelectedMarker(marker)
//     setSelectedPlace(marker)
//     moveMapCenter(marker.position.lat, marker.position.lng)
//   }

//   // 리스트 아이템 클릭 핸들러
//   const handleListItemClick = (place: Place) => {
//     moveMapCenter(place.position.lat, place.position.lng)
//     setSelectedMarker(place)
//     setSelectedPlace(place)
//   }

//   // 장소 검색 함수
//   const handleSearch = (query: string) => {
//     if (!map || !query.trim()) return

//     const ps = new window.kakao.maps.services.Places()
//     ps.keywordSearch(query, (data, status) => {
//       if (status === window.kakao.maps.services.Status.OK) {
//         const bounds = new window.kakao.maps.LatLngBounds()
//         const foundMarkers = data.map((place: any) => {
//           bounds.extend(new window.kakao.maps.LatLng(place.y, place.x))
//           return {
//             position: { lat: Number.parseFloat(place.y), lng: Number.parseFloat(place.x) },
//             name: place.place_name,
//             content: place.place_name || "",
//             address: place.address_name || "",
//             category: place.category_name || "",
//             phone: place.phone || "",
//             id: place.id,
//           }
//         })
//         setMarkers(foundMarkers)
//         map.setBounds(bounds) // 검색된 장소로 중심 이동
//         if (foundMarkers.length > 0) {
//           setSelectedMarker(foundMarkers[0])
//         }
//       } else {
//         setMarkers([])
//         setSelectedMarker(null)
//       }
//     })
//   }

//   // 이미지 변경 핸들러
//   const handleImageChange = ({ fileList }: any) => setImageList(fileList)

//   // 장소 추가 폼 제출
//   const handleAddPlaceSubmit = async (values: any) => {
//     // 여기에 장소 추가 로직 구현
//     console.log("장소 추가:", values)
//     setIsAddPlaceModalOpen(false)
//   }

//   // 모달 모드일 때는 헤더를 표시하지 않음
//   const renderContent = () => (
//     <Content
//       style={{
//         padding: modalMode ? "0" : "0 20px",
//         display: "flex",
//         height: modalMode ? "100%" : "calc(100vh - 64px)",
//         overflow: "hidden", // 모달 모드에서 스크롤 방지
//       }}
//     >
//       <SearchPanel
//         markers={markers}
//         selectedMarker={selectedMarker}
//         onSearch={handleSearch}
//         onItemClick={handleListItemClick}
//         onAddPlace={modalMode ? handleMarkerClick : openAddPlaceModal}
//         onLocationClick={fetchUserLocation}
//         modalMode={modalMode}
//       />
//       <MapPanel
//         center={center}
//         markers={userLocationMarker ? [...markers, userLocationMarker] : markers}
//         selectedMarker={selectedMarker}
//         onMapCreate={setMap}
//         onMapClick={handleMapClick}
//         onMarkerClick={handleMarkerClick}
//         onAddPlace={modalMode ? handleMarkerClick : openAddPlaceModal}
//         modalMode={modalMode}
//       />
//     </Content>
//   )

//   if (modalMode) {
//     return renderContent()
//   }

//   return (
//     <Layout className="place-register-layout">
//       <Header style={{ background: "#fff", padding: "0 20px" }}>
//         <Title level={3} style={{ margin: "16px 0" }}>
//           장소 등록하기
//         </Title>
//       </Header>
//       {renderContent()}
//       <AddPlaceModal
//         isOpen={isAddPlaceModalOpen}
//         onClose={handleAddPlaceModalClose}
//         onSubmit={handleAddPlaceSubmit}
//         selectedPlace={selectedPlace}
//         imageList={imageList}
//         onImageChange={handleImageChange}
//       />
//     </Layout>
//   )
// }


"use client"

import { lazy, useEffect, useState } from "react"
import { Layout, Typography } from "antd"
import { useKakaoLoader } from "react-kakao-maps-sdk"
import SearchPanel from "./SearchPanel"
import MapPanel from "./MapPanel"
import AddPlaceModal from "./AddPlaceModal"
import type { Place } from "@/types/place"
import "@/styles/place.register.module.css"
import { describe } from "node:test"

const { Header, Content } = Layout
const { Title } = Typography

// Kakao Maps API 전역 객체 선언
declare global {
  interface Window {
    kakao: any
  }
}

interface PlaceRegisterProps {
  modalMode?: boolean
  onPlaceSelect?: (place: Place) => void
}

export default function PlaceRegister({ modalMode = false, onPlaceSelect }: PlaceRegisterProps) {
  const KAKAO_MAPS_API_KEY = process.env.NEXT_PUBLIC_KAKAO_MAPS_API_KEY as string
  const [loading, error] = useKakaoLoader({
    appkey: KAKAO_MAPS_API_KEY,
    libraries: ["services", "clusterer"],
  })

  const [center, setCenter] = useState<{ lat: number; lng: number }>({ lat: 37.5665, lng: 126.978 }) // 서울시청 기본값
  const [map, setMap] = useState<any>(null)
  const [markers, setMarkers] = useState<Place[]>([])
  const [selectedMarker, setSelectedMarker] = useState<Place | null>(null)
  const [isAddPlaceModalOpen, setIsAddPlaceModalOpen] = useState(false)
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const [imageList, setImageList] = useState<any[]>([])
  const [userLocationMarker, setUserLocationMarker] = useState<Place | null>(null)

  // 지도 중심 이동 함수
  const moveMapCenter = (lat: number, lng: number) => {
    if (map) {
      map.setCenter(new window.kakao.maps.LatLng(lat, lng))
    }
  }

  // 사용자의 현재 위치 가져오기
  const fetchUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setCenter({ lat: latitude, lng: longitude })
          moveMapCenter(latitude, longitude)

          // 현재 위치에 마커 추가
          if (map) {
            const geocoder = new window.kakao.maps.services.Geocoder()
            geocoder.coord2Address(longitude, latitude, (result: any, status: any) => {
              if (status === window.kakao.maps.services.Status.OK) {
                const address = result[0]?.address?.address_name || "현재 위치"
                const userMarker: Place = {
              
                  latitude: latitude,
                  longitude: longitude,
                  // position: { lat: latitude, lng: longitude },
                  name: "내 위치",
                  description: "내 위치",
                  address,
                  category: "현재 위치",
                  visitedDate: "",
                }
                setUserLocationMarker(userMarker)

                // 현재 위치 마커를 선택된 마커로 설정
                setSelectedMarker(userMarker)
              }
            })
          }
        },
        (error) => {
          console.warn("사용자 위치 가져오기 실패:", error.message)
          setCenter({ lat: 37.5665, lng: 126.978 }) // 서울시청 fallback
        },
      )
    } else {
      console.warn("브라우저가 위치 정보를 지원하지 않습니다.")
      setCenter({ lat: 37.5665, lng: 126.978 })
    }
  }

  // 페이지 로드 시 사용자 위치 요청
  useEffect(() => {
    fetchUserLocation()
  }, [])

  // 선택된 마커가 변경될 때 onPlaceSelect 콜백 호출 (모달 모드일 때)
  useEffect(() => {
    if (modalMode && onPlaceSelect && selectedMarker) {
      onPlaceSelect(selectedMarker)
    }
  }, [modalMode, onPlaceSelect, selectedMarker])

  // 장소 추가 모달 닫기 함수
  const handleAddPlaceModalClose = () => {
    setIsAddPlaceModalOpen(false)
  }

  // 장소 추가 모달 열기 함수
  const openAddPlaceModal = (place: Place) => {
    setSelectedPlace(place)
    setIsAddPlaceModalOpen(true)
  }

  // 지도 클릭 이벤트 핸들러
  const handleMapClick = (_: any, mouseEvent: any) => {
    const lat = mouseEvent.latLng.getLat()
    const lng = mouseEvent.latLng.getLng()

    // 클릭한 위치로 지도 중심 이동
    moveMapCenter(lat, lng)

    // 클릭한 위치의 주소 정보 가져오기
    if (map) {
      const geocoder = new window.kakao.maps.services.Geocoder()
      geocoder.coord2Address(lng, lat, (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const address = result[0]?.address?.address_name || ""
          const newPlace: Place = {
            latitude: lat,
            longitude: lng,
            name: result.name || "새로운 장소",
            description: "새로운 장소",
            address,
            category: "",
          }

          // 새로운 장소를 마커 목록에 추가
          setMarkers((prevMarkers) => [...prevMarkers, newPlace])

          // 새로운 장소를 선택된 마커로 설정
          setSelectedMarker(newPlace)
          setSelectedPlace(newPlace)
        }
      })
    }
  }

  // 마커 클릭 이벤트 핸들러
  const handleMarkerClick = (marker: Place) => {
    setSelectedMarker(marker)
    setSelectedPlace(marker)
    moveMapCenter(marker.latitude, marker.longitude)
  }

  // 리스트 아이템 클릭 핸들러
  const handleListItemClick = (place: Place) => {
    moveMapCenter(place.latitude, place.longitude)
    setSelectedMarker(place)
    setSelectedPlace(place)
  }

  // 장소 검색 함수
  const handleSearch = (query: string) => {
    if (!map || !query.trim()) return

    const ps = new window.kakao.maps.services.Places()
    ps.keywordSearch(query, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const bounds = new window.kakao.maps.LatLngBounds()
        const foundMarkers = data.map((place: any) => {
          bounds.extend(new window.kakao.maps.LatLng(place.y, place.x))
          return {
            latitude: Number.parseFloat(place.y),
            longitude: Number.parseFloat(place.x),
            // position: { lat: Number.parseFloat(place.y), lng: Number.parseFloat(place.x) },
            name: place.place_name,
            description: place.place_name || "",
            address: place.address_name || "",
            category: place.category_name || "",
            // phone: place.phone || "",
            id: place.id,
          }
        })
        setMarkers(foundMarkers)
        map.setBounds(bounds) // 검색된 장소로 중심 이동
        if (foundMarkers.length > 0) {
          setSelectedMarker(foundMarkers[0])
        }
      } else {
        setMarkers([])
        setSelectedMarker(null)
      }
    })
  }

  // 이미지 변경 핸들러
  const handleImageChange = ({ fileList }: any) => setImageList(fileList)

  // 장소 추가 폼 제출
  const handleAddPlaceSubmit = async (values: any) => {
    // 여기에 장소 추가 로직 구현
    console.log("장소 추가:", values)
    setIsAddPlaceModalOpen(false)
  }

  // 모달 모드일 때는 헤더를 표시하지 않음
  const renderContent = () => (
    <Content
      style={{
        padding: modalMode ? "0" : "0 20px",
        display: "flex",
        height: modalMode ? "100%" : "calc(100vh - 64px)",
        overflow: "hidden", // 모달 모드에서 스크롤 방지
      }}
    >
      <SearchPanel
        markers={markers}
        selectedMarker={selectedMarker}
        onSearch={handleSearch}
        onItemClick={handleListItemClick}
        onAddPlace={modalMode ? handleMarkerClick : openAddPlaceModal}
        onLocationClick={fetchUserLocation}
        modalMode={modalMode}
      />
      <MapPanel
        center={center}
        markers={userLocationMarker ? [...markers, userLocationMarker] : markers}
        selectedMarker={selectedMarker}
        onMapCreate={setMap}
        onMapClick={handleMapClick}
        onMarkerClick={handleMarkerClick}
        onAddPlace={modalMode ? handleMarkerClick : openAddPlaceModal}
        modalMode={modalMode}
      />
    </Content>
  )

  if (modalMode) {
    return renderContent()
  }

  return (
    <Layout className="place-register-layout">
      <Header style={{ background: "#fff", padding: "0 20px" }}>
        <Title level={3} style={{ margin: "16px 0" }}>
          장소 등록하기
        </Title>
      </Header>
      {renderContent()}
      <AddPlaceModal
        isOpen={isAddPlaceModalOpen}
        onClose={handleAddPlaceModalClose}
        onSubmit={handleAddPlaceSubmit}
        selectedPlace={selectedPlace}
        imageList={imageList}
        onImageChange={handleImageChange}
      />
    </Layout>
  )
}