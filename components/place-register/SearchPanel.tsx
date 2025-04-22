// "use client"

// import { useState } from "react"
// import { Input, Button, Card, List, Typography, Divider } from "antd"
// import { SearchOutlined, AimOutlined } from "@ant-design/icons"
// import SearchResultItem from "./SearchResultItem"
// import type { Place } from "@/types/place"

// const { Text, Title } = Typography

// interface SearchPanelProps {
//   markers: Place[]
//   selectedMarker: Place | null
//   onSearch: (query: string) => void
//   onItemClick: (place: Place) => void
//   onAddPlace: (place: Place) => void
//   onLocationClick: () => void
//   modalMode?: boolean
// }

// export default function SearchPanel({
//   markers,
//   selectedMarker,
//   onSearch,
//   onItemClick,
//   onAddPlace,
//   onLocationClick,
//   modalMode = false,
// }: SearchPanelProps) {
//   const [searchQuery, setSearchQuery] = useState("")

//   const handleSearch = () => {
//     onSearch(searchQuery)
//   }

//   return (
//     <div
//       className={modalMode ? "modal-search-panel" : "search-panel"}
//       style={{
//         width: "350px",
//         marginRight: "20px",
//         overflow: "auto",
//         height: modalMode ? "100%" : "calc(100vh - 104px)",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       <div style={{ marginBottom: "10px", flexShrink: 0 }}>
//         <Input.Search
//           placeholder="장소 검색 (예: 이태원 맛집)"
//           enterButton={<SearchOutlined />}
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           onSearch={handleSearch}
//           style={{ marginBottom: "10px" }}
//         />
//       </div>

//       <Button
//         type="default"
//         onClick={onLocationClick}
//         style={{ marginBottom: "10px", width: "100%", flexShrink: 0 }}
//         icon={<AimOutlined />}
//       >
//         내 위치로 이동
//       </Button>

//       <Card style={{ marginBottom: "20px", flex: 1, overflow: "auto" }}>
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
//           <Title level={4} style={{ margin: 0 }}>
//             검색 결과
//           </Title>
//           <Text type="secondary">{markers.length}개의 장소</Text>
//         </div>
//         <Divider style={{ margin: "12px 0", flexShrink: 0 }} />
//         <div
//           className="search-results-container"
//           style={{ overflow: "auto", maxHeight: modalMode ? "calc(90vh - 250px)" : "calc(100vh - 250px)" }}
//         >
//           {markers.length > 0 ? (
//             <List
//               itemLayout="vertical"
//               dataSource={markers}
//               renderItem={(item) => (
//                 <SearchResultItem
//                   item={item}
//                   onItemClick={onItemClick}
//                   onAddPlace={onAddPlace}
//                   isSelected={selectedMarker?.id === item.id}
//                   modalMode={modalMode}
//                 />
//               )}
//             />
//           ) : (
//             <div style={{ textAlign: "center", padding: "20px 0" }}>
//               <Text type="secondary">검색 결과가 없습니다.</Text>
//             </div>
//           )}
//         </div>
//       </Card>
//     </div>
//   )
// }
// // "use client"

// // import { useState } from "react"
// // import { Input, Button, Card, List, Typography, Divider } from "antd"
// // import { SearchOutlined, AimOutlined } from "@ant-design/icons"
// // import SearchResultItem from "./SearchResultItem"
// // import type { Place } from "@/types/place"

// // const { Text, Title } = Typography

// // interface SearchPanelProps {
// //   markers: Place[]
// //   selectedMarker: Place | null
// //   onSearch: (query: string) => void
// //   onItemClick: (place: Place) => void
// //   onAddPlace: (place: Place) => void
// //   onLocationClick: () => void
// //   modalMode?: boolean
// // }

// // export default function SearchPanel({
// //   markers,
// //   selectedMarker,
// //   onSearch,
// //   onItemClick,
// //   onAddPlace,
// //   onLocationClick,
// //   modalMode = false,
// // }: SearchPanelProps) {
// //   const [searchQuery, setSearchQuery] = useState("")

// //   const handleSearch = () => {
// //     onSearch(searchQuery)
// //   }

// //   return (
// //     <div
// //       className="search-panel"
// //       style={{
// //         width: "350px",
// //         marginRight: "20px",
// //         overflow: "auto",
// //         height: modalMode ? "100%" : undefined,
// //       }}
// //     >
// //       <div style={{ marginBottom: "10px" }}>
// //         <Input.Search
// //           placeholder="장소 검색 (예: 이태원 맛집)"
// //           enterButton={<SearchOutlined />}
// //           value={searchQuery}
// //           onChange={(e) => setSearchQuery(e.target.value)}
// //           onSearch={handleSearch}
// //           style={{ marginBottom: "10px" }}
// //         />
// //       </div>

// //       <Button
// //         type="default"
// //         onClick={onLocationClick}
// //         style={{ marginBottom: "10px", width: "100%" }}
// //         icon={<AimOutlined />}
// //       >
// //         내 위치로 이동
// //       </Button>

// //       <Card style={{ marginBottom: "20px" }}>
// //         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// //           <Title level={4} style={{ margin: 0 }}>
// //             검색 결과
// //           </Title>
// //           <Text type="secondary">{markers.length}개의 장소</Text>
// //         </div>
// //         <Divider style={{ margin: "12px 0" }} />
// //         {markers.length > 0 ? (
// //           <List
// //             itemLayout="vertical"
// //             dataSource={markers}
// //             renderItem={(item) => (
// //               <SearchResultItem
// //                 item={item}
// //                 onItemClick={onItemClick}
// //                 onAddPlace={onAddPlace}
// //                 isSelected={selectedMarker?.id === item.id}
// //                 modalMode={modalMode}
// //               />
// //             )}
// //           />
// //         ) : (
// //           <div style={{ textAlign: "center", padding: "20px 0" }}>
// //             <Text type="secondary">검색 결과가 없습니다.</Text>
// //           </div>
// //         )}
// //       </Card>
// //     </div>
// //   )
// // }

"use client"

import { useState } from "react"
import { Input, Button, Card, List, Typography, Divider } from "antd"
import { SearchOutlined, AimOutlined } from "@ant-design/icons"
import SearchResultItem from "./SearchResultItem"
import type { Place } from "@/types/place"
import "@/styles/place.register.module.css"

const { Text, Title } = Typography

interface SearchPanelProps {
  markers: Place[]
  selectedMarker: Place | null
  onSearch: (query: string) => void
  onItemClick: (place: Place) => void
  onAddPlace: (place: Place) => void
  onLocationClick: () => void
  modalMode?: boolean
}

export default function SearchPanel({
  markers,
  selectedMarker,
  onSearch,
  onItemClick,
  onAddPlace,
  onLocationClick,
  modalMode = false,
}: SearchPanelProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = () => {
    onSearch(searchQuery)
  }

  return (
    <div
      className={modalMode ? "modal-search-panel" : "search-panel"}
      style={{
        width: "350px",
        marginRight: "20px",
        overflow: "auto",
        height: modalMode ? "100%" : "calc(100vh - 104px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ marginBottom: "10px", flexShrink: 0 }}>
        <Input.Search
          placeholder="장소 검색 (예: 이태원 맛집)"
          enterButton={<SearchOutlined />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={handleSearch}
          style={{ marginBottom: "10px" }}
        />
      </div>

      <Button
        type="default"
        onClick={onLocationClick}
        style={{ marginBottom: "10px", width: "100%", flexShrink: 0 }}
        icon={<AimOutlined />}
      >
        내 위치로 이동
      </Button>

      <Card style={{ marginBottom: "20px", flex: 1, overflow: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
          <Title level={4} style={{ margin: 0 }}>
            검색 결과
          </Title>
          <Text type="secondary">{markers.length}개의 장소</Text>
        </div>
        <Divider style={{ margin: "12px 0", flexShrink: 0 }} />
        <div
          className="search-results-container"
          style={{ overflow: "auto", maxHeight: modalMode ? "calc(90vh - 250px)" : "calc(100vh - 250px)" }}
        >
          {markers.length > 0 ? (
            <List
              itemLayout="vertical"
              dataSource={markers}
              renderItem={(item) => (
                <SearchResultItem
                  item={item}
                  onItemClick={onItemClick}
                  onAddPlace={onAddPlace}
                  isSelected={selectedMarker?.id === item.id}
                  modalMode={modalMode}
                />
              )}
            />
          ) : (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <Text type="secondary">검색 결과가 없습니다.</Text>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
