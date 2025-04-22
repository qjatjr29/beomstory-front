"use client"
import { Layout } from "antd"
import PlaceRegister from "@/components/place-register/PlaceRegister"

export default function Home() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <PlaceRegister />
    </Layout>
  )
}
