import {
    ShopOutlined,
    CoffeeOutlined,
    BankOutlined,
    HomeOutlined,
    CarOutlined,
    EnvironmentOutlined,
    ShoppingOutlined,
    ReadOutlined,
    MedicineBoxOutlined,
  } from "@ant-design/icons"
import React from "react"


// 카테고리에 따른 아이콘 매핑
export function getCategoryIcon(category: string): React.ReactNode {
  if (!category) return <EnvironmentOutlined style={{ fontSize: "18px", color: "#1677ff" }} />

  if (category === "current_location") {
    return <EnvironmentOutlined style={{ fontSize: "18px", color: "#ff4d4f" }} />
  } else if (category.includes("음식점")) {
    return <CoffeeOutlined style={{ fontSize: "18px", color: "#f5222d" }} />
  } else if (category.includes("카페")) {
    return <CoffeeOutlined style={{ fontSize: "18px", color: "#722ed1" }} />
  } else if (category.includes("숙박")) {
    return <HomeOutlined style={{ fontSize: "18px", color: "#13c2c2" }} />
  } else if (category.includes("관광") || category.includes("명소")) {
    return <EnvironmentOutlined style={{ fontSize: "18px", color: "#eb2f96" }} />
  } else if (category.includes("쇼핑") || category.includes("마트")) {
    return <ShoppingOutlined style={{ fontSize: "18px", color: "#fa8c16" }} />
  } else if (category.includes("문화") || category.includes("공연")) {
    return <ReadOutlined style={{ fontSize: "18px", color: "#a0d911" }} />
  } else if (category.includes("교통")) {
    return <CarOutlined style={{ fontSize: "18px", color: "#1890ff" }} />
  } else if (category.includes("은행") || category.includes("금융")) {
    return <BankOutlined style={{ fontSize: "18px", color: "#faad14" }} />
  } else if (category.includes("병원") || category.includes("약국")) {
    return <MedicineBoxOutlined style={{ fontSize: "18px", color: "#52c41a" }} />
  } else {
    return <ShopOutlined style={{ fontSize: "18px", color: "#1677ff" }} />
  }
}

// 카테고리 이름 가져오기
export function getCategoryName(category: string): string {
  if (!category) return ""

  const categories = category.split(" > ")
  return categories[categories.length - 1] || categories[0] || ""
}