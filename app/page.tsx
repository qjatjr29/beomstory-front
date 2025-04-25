// "use client"

// import { useEffect, useState } from "react"
// import { Layout, Typography, Card, Row, Col, Button, Spin, Empty, Carousel, Image, Tag } from "antd"
// import { ArrowRightOutlined, CalendarOutlined, EnvironmentOutlined, UserOutlined } from "@ant-design/icons"
// import { useRouter } from "next/navigation"
// import { storyApi } from "@api/api-client"
// import type { StorySummaryResponse } from "@api/story-client"
// import { STORY_CATEGORIES } from "@components/constants/storyCategories"

// const { Content } = Layout
// const { Title, Paragraph, Text } = Typography

// export default function Home() {
//   const router = useRouter()
//   const [recentStories, setRecentStories] = useState<StorySummaryResponse[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchRecentStories = async () => {
//       try {
//         setLoading(true)
//         const response = await storyApi.getStories(0, 5) // 최근 5개만 가져오기
//         if (response && response.content) {
//           setRecentStories(response.content)
//         }
//       } catch (error) {
//         console.error("최근 일상 기록 로딩 실패:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchRecentStories()
//   }, [])

//   // 배너 이미지 배열
//   const bannerImages = ["/banner1.jpg", "/banner2.jpg", "/banner3.jpg"]

//   return (
//     <Content style={{ width: "100%", padding: 0 }}>
//       {/* 히어로 섹션 - 캐러셀 배너 */}
//       <Carousel autoplay effect="fade" style={{ width: "100%" }}>
//         {bannerImages.map((image, index) => (
//           <div key={index}>
//             <div
//               style={{
//                 height: "500px",
//                 background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${image || "/placeholder.svg?height=500&width=1200"})`,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 padding: "0 20px",
//                 textAlign: "center",
//               }}
//             >
//               <Title level={1} style={{ color: "white", marginBottom: "24px", fontSize: "3rem" }}>
//                 당신의 일상을 기록하세요
//               </Title>
//               <Paragraph style={{ fontSize: "1.5rem", color: "white", marginBottom: "32px", maxWidth: "800px" }}>
//                 특별한 순간들을 지도 위에 남기고, 언제든지 다시 돌아보세요.
//               </Paragraph>
//               <Button
//                 type="primary"
//                 size="large"
//                 onClick={() => router.push("/story/register")}
//                 style={{ height: "48px", fontSize: "1.2rem", padding: "0 32px" }}
//               >
//                 일상 기록하기
//               </Button>
//             </div>
//           </div>
//         ))}
//       </Carousel>

//       {/* 최근 일상 기록 섹션 */}
//       <div style={{ width: "100%", padding: "60px 20px", background: "#f5f5f5" }}>
//         <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
//             <Title level={2} style={{ margin: 0 }}>
//               최근 일상 기록
//             </Title>
//             <Button type="link" onClick={() => router.push("/story")} style={{ fontSize: "16px" }}>
//               더 보기 <ArrowRightOutlined />
//             </Button>
//           </div>

//           {loading ? (
//             <div style={{ textAlign: "center", padding: "40px" }}>
//               <Spin size="large" />
//             </div>
//           ) : recentStories.length > 0 ? (
//             <Row gutter={[24, 24]}>
//               {recentStories.map((story) => (
//                 <Col xs={24} sm={12} md={8} lg={8} xl={8} key={story.id}>
//                   <Card
//                     hoverable
//                     cover={
//                       <div
//                         style={{
//                           height: "200px",
//                           background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(/placeholder.svg?height=200&width=400)`,
//                           backgroundSize: "cover",
//                           backgroundPosition: "center",
//                           position: "relative",
//                         }}
//                       >
//                         <div
//                           style={{
//                             position: "absolute",
//                             bottom: "0",
//                             left: "0",
//                             right: "0",
//                             padding: "16px",
//                             background: "linear-gradient(transparent, rgba(0, 0, 0, 0.7))",
//                           }}
//                         >
//                           <Title level={4} style={{ color: "white", margin: 0 }}>
//                             {story.title}
//                           </Title>
//                         </div>
//                       </div>
//                     }
//                     onClick={() => router.push(`/story/${story.id}`)}
//                     bodyStyle={{ padding: "16px" }}
//                   >
//                     <div style={{ marginBottom: "8px" }}>
//                       <Tag color="blue">{STORY_CATEGORIES[story.category] || story.category}</Tag>
//                       {story.status === "ARCHIVED" && <Tag color="green">완료</Tag>}
//                       {story.status === "DRAFT" && <Tag color="orange">임시저장</Tag>}
//                     </div>
//                     <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
//                       <CalendarOutlined style={{ marginRight: "8px", color: "#666" }} />
//                       <Text type="secondary">
//                         {new Date(story.startDate).toLocaleDateString()} ~{" "}
//                         {new Date(story.endDate).toLocaleDateString()}
//                       </Text>
//                     </div>
//                     {/* <div style={{ display: "flex", alignItems: "center" }}>
//                       <UserOutlined style={{ marginRight: "8px", color: "#666" }} />
//                       <Text type="secondary">{story. || "익명"}</Text>
//                     </div> */}
//                   </Card>
//                 </Col>
//               ))}
//             </Row>
//           ) : (
//             <Empty description="최근 일상 기록이 없습니다." />
//           )}
//         </div>
//       </div>

//       {/* 기능 소개 섹션 */}
//       <div style={{ width: "100%", padding: "60px 20px", background: "white" }}>
//         <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
//           <Title level={2} style={{ textAlign: "center", marginBottom: "40px" }}>
//             주요 기능
//           </Title>
//           <Row gutter={[32, 32]}>
//             <Col xs={24} md={8}>
//               <Card
//                 style={{ height: "100%" }}
//                 cover={
//                   <div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
//                     <EnvironmentOutlined style={{ fontSize: "64px", color: "#1890ff" }} />
//                   </div>
//                 }
//               >
//                 <Title level={4} style={{ textAlign: "center" }}>
//                   지도 기반 기록
//                 </Title>
//                 <Paragraph style={{ textAlign: "center" }}>
//                   방문한 장소를 지도 위에 표시하고 기록할 수 있습니다. 카카오맵 API를 활용하여 정확한 위치 정보를
//                   저장합니다.
//                 </Paragraph>
//               </Card>
//             </Col>
//             <Col xs={24} md={8}>
//               <Card
//                 style={{ height: "100%" }}
//                 cover={
//                   <div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
//                     <Image
//                       src="/placeholder.svg?height=64&width=64"
//                       alt="사진 업로드"
//                       width={64}
//                       height={64}
//                       preview={false}
//                       style={{ objectFit: "contain" }}
//                     />
//                   </div>
//                 }
//               >
//                 <Title level={4} style={{ textAlign: "center" }}>
//                   사진 업로드
//                 </Title>
//                 <Paragraph style={{ textAlign: "center" }}>
//                   각 장소마다 사진을 추가하여 추억을 생생하게 남길 수 있습니다. 여행, 맛집 방문 등 특별한 순간을
//                   이미지로 기록하세요.
//                 </Paragraph>
//               </Card>
//             </Col>
//             <Col xs={24} md={8}>
//               <Card
//                 style={{ height: "100%" }}
//                 cover={
//                   <div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
//                     <CalendarOutlined style={{ fontSize: "64px", color: "#1890ff" }} />
//                   </div>
//                 }
//               >
//                 <Title level={4} style={{ textAlign: "center" }}>
//                   카테고리 분류
//                 </Title>
//                 <Paragraph style={{ textAlign: "center" }}>
//                   여행, 맛집, 일상 등 다양한 카테고리로 기록을 분류할 수 있습니다. 원하는 기록을 쉽게 찾고 관리하세요.
//                 </Paragraph>
//               </Card>
//             </Col>
//           </Row>
//         </div>
//       </div>

//       {/* 사용 방법 섹션 */}
//       <div style={{ width: "100%", padding: "60px 20px", background: "#f0f7ff" }}>
//         <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
//           <Title level={2} style={{ textAlign: "center", marginBottom: "40px" }}>
//             사용 방법
//           </Title>
//           <Row gutter={[32, 32]} align="middle">
//             <Col xs={24} md={12}>
//               <div>
//                 <Title level={3}>1. 일상 기록 시작하기</Title>
//                 <Paragraph style={{ fontSize: "16px" }}>
//                   상단 메뉴에서 '일상 기록' 버튼을 클릭하여 새로운 일상 기록을 시작하세요. 제목, 설명, 기간, 카테고리를
//                   입력하면 기본 정보가 저장됩니다.
//                 </Paragraph>
//               </div>
//             </Col>
//             <Col xs={24} md={12}>
//               <Card>
//                 <div
//                   style={{
//                     height: "200px",
//                     background: "#eee",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                 >
//                   <Text>일상 기록 시작 화면</Text>
//                 </div>
//               </Card>
//             </Col>

//             <Col xs={24} md={12} order={3} sm={{ order: 4 }}>
//               <div>
//                 <Title level={3}>2. 장소 추가하기</Title>
//                 <Paragraph style={{ fontSize: "16px" }}>
//                   카카오맵을 통해 방문한 장소를 검색하고 추가하세요. 각 장소마다 사진과 설명을 추가할 수 있습니다.
//                 </Paragraph>
//               </div>
//             </Col>
//             <Col xs={24} md={12} order={4} sm={{ order: 3 }}>
//               <Card>
//                 <div
//                   style={{
//                     height: "200px",
//                     background: "#eee",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                 >
//                   <Text>장소 추가 화면</Text>
//                 </div>
//               </Card>
//             </Col>

//             <Col xs={24} md={12}>
//               <div>
//                 <Title level={3}>3. 일상 기록 완료</Title>
//                 <Paragraph style={{ fontSize: "16px" }}>
//                   모든 장소를 추가한 후 '일상 기록 완료' 버튼을 클릭하면 기록이 저장됩니다. 언제든지 내 프로필에서
//                   기록을 확인하고 수정할 수 있습니다.
//                 </Paragraph>
//               </div>
//             </Col>
//             <Col xs={24} md={12}>
//               <Card>
//                 <div
//                   style={{
//                     height: "200px",
//                     background: "#eee",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                 >
//                   <Text>일상 기록 완료 화면</Text>
//                 </div>
//               </Card>
//             </Col>
//           </Row>
//         </div>
//       </div>

//       {/* CTA 섹션 */}
//       <div
//         style={{
//           width: "100%",
//           padding: "80px 20px",
//           background: "linear-gradient(135deg, #1890ff 0%, #36cfc9 100%)",
//           textAlign: "center",
//         }}
//       >
//         <div style={{ maxWidth: "800px", margin: "0 auto" }}>
//           <Title level={2} style={{ color: "white", marginBottom: "24px" }}>
//             지금 바로 일상을 기록해보세요
//           </Title>
//           <Paragraph style={{ fontSize: "18px", color: "white", marginBottom: "32px" }}>
//             특별한 순간들을 지도 위에 남기고, 언제든지 다시 돌아보세요.
//           </Paragraph>
//           <Button
//             type="primary"
//             size="large"
//             onClick={() => router.push("/story/register")}
//             style={{
//               height: "48px",
//               fontSize: "1.2rem",
//               padding: "0 32px",
//               background: "white",
//               color: "#1890ff",
//               borderColor: "white",
//             }}
//           >
//             일상 기록 시작하기
//           </Button>
//         </div>
//       </div>
//     </Content>
//   )
// }

"use client"

import { useEffect, useState } from "react"
import { Layout, Typography, Card, Row, Col, Button, Spin, Empty, Carousel, Image, Tag } from "antd"
import { ArrowRightOutlined, CalendarOutlined, EnvironmentOutlined, UserOutlined, PictureFilled } from "@ant-design/icons"
import { useRouter } from "next/navigation"
import { storyApi } from "@api/api-client"
import type { StorySummaryResponse } from "@/types/story"
import { STORY_CATEGORIES } from "@components/constants/storyCategories"
const storyRegisterImage = "/images/story-register.png"

const { Content } = Layout
const { Title, Paragraph, Text } = Typography

export default function Home() {
  const router = useRouter()
  const [recentStories, setRecentStories] = useState<StorySummaryResponse[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecentStories = async () => {
      try {
        setLoading(true)
        const response = await storyApi.getArchivedStory(0, 5) // 최근 5개만 가져오기
        if (response && response.content) {
          setRecentStories(response.content)
        }
      } catch (error) {
        console.error("최근 일상 기록 로딩 실패:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecentStories()
  }, [])

  // 배너 이미지 배열
  const bannerImages = ["/banner1.jpg", "/banner2.jpg", "/banner3.jpg"]

  return (
    <Content style={{ width: "100%", padding: 0, overflowX: "hidden"}}>
      {/* 히어로 섹션 - 캐러셀 배너 */}
      <div style={{ width: "100%", overflow: "hidden" }}>
        <Carousel autoplay effect="fade" style={{ width: "100%" }}>
          {bannerImages.map((image, index) => (
            <div key={index}>
              <div
                style={{
                  height: "500px",
                  background: `linear-gradient(135deg, #E6F7FF 0%, #E6F7FF 100%)`, // 하늘색 그라데이션 배경
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "0 20px",
                  textAlign: "center",
                }}
              >
                <Title
                  level={1}
                  style={{ color: "#003366", marginBottom: "24px", fontSize: "3rem", fontWeight: "bold" }}
                >
                  당신의 일상을 기록하세요
                </Title>
                <Paragraph
                  style={{
                    fontSize: "1.5rem",
                    color: "#004080",
                    marginBottom: "32px",
                    maxWidth: "800px",
                    fontWeight: "500",
                  }}
                >
                  특별한 순간들을 지도 위에 남기고, 언제든지 다시 돌아보세요.
                </Paragraph>
                <Button
                  type="primary"
                  size="large"
                  onClick={() => router.push("/story/register")}
                  style={{
                    height: "48px",
                    fontSize: "1.2rem",
                    padding: "0 32px",
                    background: "#003366",
                    borderColor: "#003366",
                    boxShadow: "0 4px 12px rgba(0, 51, 102, 0.3)",
                  }}
                >
                  일상 기록하기
                </Button>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      {/* 최근 일상 기록 섹션 */}
      <div style={{ width: "100%", padding: "60px 20px", background: "#f5f5f5", boxSizing: "border-box" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <Title level={2} style={{ margin: 0 }}>
              최근 일상 기록
            </Title>
            <Button type="link" onClick={() => router.push("/story")} style={{ fontSize: "16px" }}>
              더 보기 <ArrowRightOutlined />
            </Button>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "40px" }}>
              <Spin size="large" />
            </div>
          ) : recentStories.length > 0 ? (
            <Row gutter={[24, 24]}>
              {recentStories.map((story) => (
                <Col xs={24} sm={12} md={8} lg={8} xl={8} key={story.id}>
                  <Card
                    hoverable
                    cover={
                      <div
                        style={{
                          height: "200px",
                          background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(/placeholder.svg?height=200&width=400)`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            bottom: "0",
                            left: "0",
                            right: "0",
                            padding: "16px",
                            background: "linear-gradient(transparent, rgba(0, 0, 0, 0.7))",
                          }}
                        >
                          <Title level={4} style={{ color: "white", margin: 0 }}>
                            {story.title}
                          </Title>
                        </div>
                      </div>
                    }
                    onClick={() => router.push(`/story/${story.id}`)}
                    bodyStyle={{ padding: "16px" }}
                  >
                    <div style={{ marginBottom: "8px" }}>
                      <Tag color="blue">{STORY_CATEGORIES[story.category] || story.category}</Tag>
                      {story.status === "ARCHIVED" && <Tag color="green">완료</Tag>}
                      {story.status === "DRAFT" && <Tag color="orange">임시저장</Tag>}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                      <CalendarOutlined style={{ marginRight: "8px", color: "#666" }} />
                      <Text type="secondary">
                        {new Date(story.startDate).toLocaleDateString()} ~{" "}
                        {new Date(story.endDate).toLocaleDateString()}
                      </Text>
                    </div>
                    {/* <div style={{ display: "flex", alignItems: "center" }}>
                      <UserOutlined style={{ marginRight: "8px", color: "#666" }} />
                      <Text type="secondary">{story.userNickname || "익명"}</Text>
                    </div> */}
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <Empty description="최근 일상 기록이 없습니다." />
          )}
        </div>
      </div>

      {/* 기능 소개 섹션 */}
      <div style={{ width: "100%", padding: "60px 20px", background: "white", boxSizing: "border-box" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", overflow: "hidden" }}>
          <Title level={2} style={{ textAlign: "center", marginBottom: "40px" }}>
            주요 기능
          </Title>
          <Row gutter={[32, 32]}>
            <Col xs={24} md={8}>
              <Card
                style={{ height: "100%" }}
                cover={
                  <div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
                    <EnvironmentOutlined style={{ fontSize: "64px", color: "#1890ff" }} />
                  </div>
                }
              >
                <Title level={4} style={{ textAlign: "center" }}>
                  지도 기반 기록
                </Title>
                <Paragraph style={{ textAlign: "center" }}>
                  방문한 장소를 지도 위에 표시하고 기록할 수 있습니다. 카카오맵 API를 활용하여 정확한 위치 정보를
                  저장합니다.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card
                style={{ height: "100%" }}
                cover={
                  <div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
                    <PictureFilled style={{ fontSize: "64px", color: "#1890ff" }} />
                  </div>
                }
              >
                <Title level={4} style={{ textAlign: "center" }}>
                  사진 업로드
                </Title>
                <Paragraph style={{ textAlign: "center" }}>
                  각 장소마다 사진을 추가하여 추억을 생생하게 남길 수 있습니다. 여행, 맛집 방문 등 특별한 순간을
                  이미지로 기록하세요.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card
                style={{ height: "100%" }}
                cover={
                  <div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
                    <CalendarOutlined style={{ fontSize: "64px", color: "#1890ff" }} />
                  </div>
                }
              >
                <Title level={4} style={{ textAlign: "center" }}>
                  카테고리 분류
                </Title>
                <Paragraph style={{ textAlign: "center" }}>
                  여행, 맛집, 일상 등 다양한 카테고리로 기록을 분류할 수 있습니다. 원하는 기록을 쉽게 찾고 관리하세요.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      {/* 사용 방법 섹션 */}
      <div style={{ width: "100%", padding: "60px 20px", background: "#f0f7ff", boxSizing: "border-box" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", overflow: "hidden" }}>
          <Title level={2} style={{ textAlign: "center", marginBottom: "40px" }}>
            사용 방법
          </Title>

          {/* 첫 번째 행: 왼쪽 텍스트, 오른쪽 카드 */}
          <Row gutter={[32, 32]} align="middle" style={{ marginBottom: "40px" }}>
            <Col xs={24} md={12}>
              <div>
                <Title level={3}>1. 일상 기록 시작하기</Title>
                <Paragraph style={{ fontSize: "16px" }}>
                  상단 메뉴에서 '일상 기록' 버튼을 클릭하여 새로운 일상 기록을 시작하세요. 제목, 설명, 기간, 카테고리를
                  입력하면 기본 정보가 저장됩니다.
                </Paragraph>
              </div>
            </Col>
            <Col xs={24} md={12}>
              {/* <Card>
                <div
                  style={{
                    height: "200px",
                    background: "#eee",
                    display: "flex",
                    // overflow: "hidden",  // 넘치는 부분 잘라내기
                    // position: "relative"
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {storyRegisterImage ? (
                    <Image 
                      src={storyRegisterImage} 
                      alt="일상 기록 시작 화면" 
                      style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "cover" }}
                    />
                    
                  ) : (
                    <Text>일상 기록 시작 화면</Text>
                  )}
                </div>
              </Card> */}

              <Card>
                <div
                  style={{
                    height: "200px",
                    background: "#eee",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>일상 기록 시작 화면</Text>
                </div>
              </Card>
            </Col>
          </Row>

          {/* 두 번째 행: 왼쪽 카드, 오른쪽 텍스트 */}
          <Row gutter={[32, 32]} align="middle" style={{ marginBottom: "40px" }}>
            <Col xs={24} md={12}>
              <Card>
                <div
                  style={{
                    height: "200px",
                    background: "#eee",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {/* <Image src="/images/story-register.png"></Image> */}
                  <Text>장소 추가 화면</Text>
                </div>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <div>
                <Title level={3}>2. 장소 추가하기</Title>
                <Paragraph style={{ fontSize: "16px" }}>
                  카카오맵을 통해 방문한 장소를 검색하고 추가하세요. 각 장소마다 사진과 설명을 추가할 수 있습니다.
                </Paragraph>
              </div>
            </Col>
          </Row>

          {/* 세 번째 행: 왼쪽 텍스트, 오른쪽 카드 */}
          <Row gutter={[32, 32]} align="middle">
            <Col xs={24} md={12}>
              <div>
                <Title level={3}>3. 일상 기록 완료</Title>
                <Paragraph style={{ fontSize: "16px" }}>
                  모든 장소를 추가한 후 '일상 기록 완료' 버튼을 클릭하면 기록이 저장됩니다. 언제든지 내 프로필에서
                  기록을 확인하고 수정할 수 있습니다.
                </Paragraph>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <Card>
                <div
                  style={{
                    height: "200px",
                    background: "#eee",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>일상 기록 완료 화면</Text>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      {/* CTA 섹션 */}
      <div
        style={{
          width: "100%",
          padding: "80px 20px",
          background: "linear-gradient(135deg, #1890ff 0%, #36cfc9 100%)",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Title level={2} style={{ color: "white", marginBottom: "24px" }}>
            지금 바로 일상을 기록해보세요
          </Title>
          <Paragraph style={{ fontSize: "18px", color: "white", marginBottom: "32px" }}>
            특별한 순간들을 지도 위에 남기고, 언제든지 다시 돌아보세요.
          </Paragraph>
          <Button
            type="primary"
            size="large"
            onClick={() => router.push("/story/register")}
            style={{
              height: "48px",
              fontSize: "1.2rem",
              padding: "0 32px",
              background: "white",
              color: "#1890ff",
              borderColor: "white",
            }}
          >
            일상 기록 시작하기
          </Button>
        </div>
      </div>
    </Content>
  )
}
