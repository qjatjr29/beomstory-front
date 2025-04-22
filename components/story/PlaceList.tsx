"use client"

import { List, Button, Typography, Tag, Empty, Image } from "antd"
import { EditOutlined, DeleteOutlined, EnvironmentOutlined } from "@ant-design/icons"
import type { Place } from "@/types/place"
import { getCategoryIcon } from "@/utils/categoryIcons"

const { Text } = Typography

export const PLACE_CATEGORIES = [
  { value: "restaurant", label: "음식점" },
  { value: "cafe", label: "카페" },
  { value: "accommodation", label: "숙박" },
  { value: "attraction", label: "관광명소" },
  { value: "shopping", label: "쇼핑" },
  { value: "culture", label: "문화/공연" },
  { value: "transport", label: "교통" },
  { value: "other", label: "기타" },
]

interface PlaceListProps {
  places: Place[]
  onEdit: (placeId: number) => void
  onRemove: (placeId: number) => void
}

export default function PlaceList({ places, onEdit, onRemove }: PlaceListProps) {
  if (places.length === 0) {
    return (
      <Empty
        description="추가된 장소가 없습니다. 장소를 추가해주세요."
        style={{
          padding: "20px",
          background: "#f9f9f9",
          borderRadius: "4px",
          marginBottom: "16px",
        }}
      />
    )
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={places}
      renderItem={(place) => (
        <List.Item
          actions={[
            <Button key="edit" type="text" icon={<EditOutlined />} onClick={() => onEdit(place.id)} />,
            <Button key="delete" type="text" danger icon={<DeleteOutlined />} onClick={() => onRemove(place.id)} />,
          ]}
        >
          <List.Item.Meta
            avatar={
              place.image ? (
                <Image
                  src={place.image[0] || "/placeholder.svg"}
                  alt={place.name}
                  width={64}
                  height={64}
                  // alt={place.name}
                  // width={64}
                  // height={64}
                  style={{ objectFit: "cover", borderRadius: "4px" }}
                  preview={{ mask: <div>보기</div> }}
                />
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "64px",
                    height: "64px",
                    borderRadius: "4px",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  {getCategoryIcon(place.category)}
                </div>
              )
            }
            title={
              <div>
                {place.name}
                {place.description && (
                  <Tag color="green" style={{ marginLeft: "8px" }}>
                    기록 있음
                  </Tag>
                )}
                {PLACE_CATEGORIES.map(
                  (category) =>
                    category.value === place.category && (
                      <Tag key={category.value} color="red" style={{ marginLeft: "8px" }}>
                        {category.label}
                      </Tag>
                    ),
                )}
              </div>
            }
            description={
              <div>
                <Text type="secondary" style={{ fontSize: "12px", display: "block" }}>
                  <EnvironmentOutlined style={{ marginRight: "5px" }} />
                  {place.address}
                </Text>
                {place.description && (
                  <Text type="secondary" style={{ fontSize: "12px", display: "block", marginTop: "4px" }}>
                    {place.description.length > 50 ? `${place.description.substring(0, 50)}...` : place.description}
                  </Text>
                )}
              </div>
            }
          />
        </List.Item>
      )}
    />
  )
}