// // "use client"

// // import type React from "react"

// // import { List, Typography, Button, Space, Tag } from "antd"
// // import { PlusOutlined, EnvironmentOutlined, PhoneOutlined } from "@ant-design/icons"
// // import type { Place } from "@/types/place"
// // import { getCategoryName } from "@/utils/categoryIcons"

// // const { Text } = Typography

// // interface SearchResultItemProps {
// //   item: Place
// //   onItemClick: (place: Place) => void
// //   onAddPlace: (place: Place) => void
// //   isSelected: boolean
// // }

// // // SearchResultItem 컴포넌트를 수정하여 장소 이름 중복 문제를 해결합니다.

// // export default function SearchResultItem({ item, onItemClick, onAddPlace, isSelected }: SearchResultItemProps) {
// //   const handleClick = () => {
// //     onItemClick(item)
// //   }

// //   const handleAddPlace = (e: React.MouseEvent) => {
// //     e.stopPropagation()
// //     onAddPlace(item)
// //   }

// //   const categoryName = getCategoryName(item.category)

// //   return (
// //     <List.Item
// //       onClick={handleClick}
// //       style={{
// //         cursor: "pointer",
// //         padding: "10px",
// //         backgroundColor: isSelected ? "#f0f7ff" : "transparent",
// //         borderRadius: "4px",
// //         marginBottom: "8px",
// //       }}
// //     >
// //       <div style={{ width: "100%" }}>
// //         <div
// //           style={{
// //             display: "flex",
// //             justifyContent: "space-between",
// //             alignItems: "flex-start",
// //             marginBottom: "5px",
// //           }}
// //         >
// //           <Text strong style={{ fontSize: "14px" }}>
// //             {item.content}
// //           </Text>
// //           <Button size="small" type="primary" icon={<PlusOutlined />} onClick={handleAddPlace}>
// //             추가
// //           </Button>
// //         </div>

// //         {categoryName && (
// //           <Tag color="blue" style={{ marginBottom: "5px" }}>
// //             {categoryName}
// //           </Tag>
// //         )}

// //         <Space direction="vertical" size={1} style={{ width: "100%" }}>
// //           {item.address && (
// //             <Text type="secondary" style={{ fontSize: "12px", display: "flex", alignItems: "center" }}>
// //               <EnvironmentOutlined style={{ marginRight: "5px", fontSize: "12px" }} />
// //               {item.address}
// //             </Text>
// //           )}
// //           {item.phone && (
// //             <Text type="secondary" style={{ fontSize: "12px", display: "flex", alignItems: "center" }}>
// //               <PhoneOutlined style={{ marginRight: "5px", fontSize: "12px" }} />
// //               {item.phone}
// //             </Text>
// //           )}
// //         </Space>
// //       </div>
// //     </List.Item>
// //   )
// // }


// "use client"

// import type React from "react"
// import { List, Typography, Button, Space, Tag } from "antd"
// import { PlusOutlined, EnvironmentOutlined, PhoneOutlined } from "@ant-design/icons"
// import type { Place } from "@/types/place"
// import { getCategoryName } from "@/utils/categoryIcons"

// const { Text } = Typography

// interface SearchResultItemProps {
//   item: Place
//   onItemClick: (place: Place) => void
//   onAddPlace: (place: Place) => void
//   isSelected: boolean
//   modalMode?: boolean
// }

// export default function SearchResultItem({
//   item,
//   onItemClick,
//   onAddPlace,
//   isSelected,
//   modalMode = false,
// }: SearchResultItemProps) {
//   const handleClick = () => {
//     onItemClick(item)
//   }

//   const handleAddPlace = (e: React.MouseEvent) => {
//     e.stopPropagation()
//     onAddPlace(item)
//   }

//   const categoryName = getCategoryName(item.category)

//   return (
//     <List.Item
//       onClick={handleClick}
//       style={{
//         cursor: "pointer",
//         padding: "10px",
//         backgroundColor: isSelected ? "#f0f7ff" : "transparent",
//         borderRadius: "4px",
//         marginBottom: "8px",
//       }}
//     >
//       <div style={{ width: "100%" }}>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "flex-start",
//             marginBottom: "5px",
//           }}
//         >
//           <Text strong style={{ fontSize: "14px" }}>
//             {item.content}
//           </Text>
//           {!modalMode && (
//             <Button size="small" type="primary" icon={<PlusOutlined />} onClick={handleAddPlace}>
//               추가
//             </Button>
//           )}
//         </div>

//         {categoryName && (
//           <Tag color="blue" style={{ marginBottom: "5px" }}>
//             {categoryName}
//           </Tag>
//         )}

//         <Space direction="vertical" size={1} style={{ width: "100%" }}>
//           {item.address && (
//             <Text type="secondary" style={{ fontSize: "12px", display: "flex", alignItems: "center" }}>
//               <EnvironmentOutlined style={{ marginRight: "5px", fontSize: "12px" }} />
//               {item.address}
//             </Text>
//           )}
//           {/* {item.phone && (
//             <Text type="secondary" style={{ fontSize: "12px", display: "flex", alignItems: "center" }}>
//               <PhoneOutlined style={{ marginRight: "5px", fontSize: "12px" }} />
//               {item.phone}
//             </Text>
//           )} */}
//         </Space>
//       </div>
//     </List.Item>
//   )
// }


"use client"

import type React from "react"
import { List, Typography, Button, Space, Tag } from "antd"
import { PlusOutlined, EnvironmentOutlined } from "@ant-design/icons"
import type { Place } from "@/types/place"
import { getCategoryName } from "@/utils/categoryIcons"
import "@/styles/place.register.module.css"

const { Text } = Typography

interface SearchResultItemProps {
  item: Place
  onItemClick: (place: Place) => void
  onAddPlace: (place: Place) => void
  isSelected: boolean
  modalMode?: boolean
}

export default function SearchResultItem({
  item,
  onItemClick,
  onAddPlace,
  isSelected,
  modalMode = false,
}: SearchResultItemProps) {
  const handleClick = () => {
    onItemClick(item)
  }

  const handleAddPlace = (e: React.MouseEvent) => {
    e.stopPropagation()
    onAddPlace(item)
  }

  const categoryName = getCategoryName(item.category)

  return (
    <List.Item
      onClick={handleClick}
      style={{
        cursor: "pointer",
        padding: "10px",
        backgroundColor: isSelected ? "#f0f7ff" : "transparent",
        borderRadius: "4px",
        marginBottom: "8px",
      }}
    >
      <div style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "5px",
          }}
        >
          <Text strong style={{ fontSize: "14px" }}>
            {item.name}
          </Text>
          {!modalMode && (
            <Button size="small" type="primary" icon={<PlusOutlined />} onClick={handleAddPlace}>
              추가
            </Button>
          )}
        </div>

        {categoryName && (
          <Tag color="blue" style={{ marginBottom: "5px" }}>
            {categoryName}
          </Tag>
        )}

        <Space direction="vertical" size={1} style={{ width: "100%" }}>
          {item.address && (
            <Text type="secondary" style={{ fontSize: "12px", display: "flex", alignItems: "center" }}>
              <EnvironmentOutlined style={{ marginRight: "5px", fontSize: "12px" }} />
              {item.address}
            </Text>
          )}
        </Space>
      </div>
    </List.Item>
  )
}