

"use client"

import { Button, Typography, Space, Tag } from "antd"
import { PlusOutlined, EnvironmentOutlined } from "@ant-design/icons"
import type { Place } from "@/types/place"
import { getCategoryName } from "@/utils/categoryIcons"
import "@/styles/place.register.module.css"

const { Text, Title } = Typography

interface PlaceInfoWindowProps {
  place: Place
  onAddPlace: (place: Place) => void
  modalMode?: boolean
}

export default function PlaceInfoWindow({ place, onAddPlace, modalMode = false }: PlaceInfoWindowProps) {
  const handleAddPlace = () => {
    onAddPlace(place)
  }

  const categoryName = getCategoryName(place.category)

  return (
    <div
      className="place-info-window"
      style={{
        backgroundColor: "white",
        padding: "15px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        width: "280px",
        border: "1px solid #eee",
        marginTop: "8px",
        zIndex: 1000,
      }}
    >
      <Title level={5} style={{ margin: "0 0 8px 0" }}>
        {place.name}
      </Title>

      {categoryName && (
        <Tag color="blue" style={{ marginBottom: "8px" }}>
          {categoryName}
        </Tag>
      )}

      <Space direction="vertical" size={2} style={{ width: "100%", marginBottom: "10px" }}>
        {place.address && (
          <Text type="secondary" style={{ fontSize: "12px", display: "flex", alignItems: "center" }}>
            <EnvironmentOutlined style={{ marginRight: "5px" }} /> {place.address}
          </Text>
        )}
      </Space>

      {!modalMode && (
        <div style={{ marginTop: "10px", borderTop: "1px solid #f0f0f0", paddingTop: "10px" }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddPlace}
            size="middle"
            style={{ width: "100%" }}
          >
            장소 추가하기
          </Button>
        </div>
      )}
    </div>
  )
}