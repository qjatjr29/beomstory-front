// "use client"

// import { useEffect, useState } from "react"
// import { useRouter, useSearchParams } from "next/navigation"
// import { Layout, Typography, Input, Card, Row, Col, Pagination, Empty, Spin, Tag, Badge } from "antd"
// import { CalendarOutlined, SearchOutlined, ArrowLeftOutlined } from "@ant-design/icons"
// import { storyApi } from "@api/api-client"
// import type { StorySummaryResponse } from "@/types/story"
// import { STORY_CATEGORIES } from "@components/constants/storyCategories"

// const { Content } = Layout
// const { Title, Text, Paragraph } = Typography
// const { Search } = Input

// export default function StorySearchPage() {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const keyword = searchParams?.get("keyword") || ""
  
//   const [searchResults, setSearchResults] = useState<StorySummaryResponse[]>([])
//   const [loading, setLoading] = useState(false)
//   const [currentPage, setCurrentPage] = useState(1)
//   const [totalItems, setTotalItems] = useState(0)
//   const [searchKeyword, setSearchKeyword] = useState(keyword)
//   const pageSize = 9

//   // 검색 실행 함수
//   const performSearch = async (page: number, term: string) => {
//     if (!term.trim()) return
    
//     try {
//       setLoading(true)
//       // API 호출: 페이지는 0부터 시작하므로 page-1
//       const response = await storyApi.searchStories(term, page - 1, pageSize)
      
//       if (response) {
//         setSearchResults(response.content || [])
//         setTotalItems(response.totalElements || 0)
//       }
//     } catch (error) {
//       console.error("검색 실패:", error)
//       setSearchResults([])
//       setTotalItems(0)
//     } finally {
//       setLoading(false)
//     }
//   }

//   // 검색어 변경시 검색 수행
//   useEffect(() => {
//     if (keyword) {
//       setSearchKeyword(keyword)
//       performSearch(1, keyword)
//       setCurrentPage(1)
//     }
//   }, [keyword])

//   // 페이지 변경 핸들러
//   const handlePageChange = (page: number) => {
//     setCurrentPage(page)
//     performSearch(page, searchKeyword)
    
//     // 페이지 맨 위로 스크롤
//     window.scrollTo({ top: 0, behavior: 'smooth' })
//   }

//   // 새 검색 핸들러
//   const handleSearch = (value: string) => {
//     if (value.trim()) {
//       router.push(`/story/search?keyword=${encodeURIComponent(value)}`)
//     }
//   }

//   const goBack = () => {
//     router.back()
//   }

//   return (
//     <Content style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
//       {/* 헤더 영역 */}
//       <div style={{ marginBottom: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
//         <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//           <button 
//             onClick={goBack} 
//             style={{ 
//               background: "none", 
//               border: "none", 
//               cursor: "pointer", 
//               display: "flex", 
//               alignItems: "center", 
//               padding: "8px" 
//             }}
//           >
//             <ArrowLeftOutlined style={{ fontSize: "18px" }} />
//           </button>
//           <Title level={2} style={{ margin: 0 }}>검색 결과</Title>
//         </div>
//         <Search
//           placeholder="검색어를 입력하세요"
//           allowClear
//           enterButton="검색"
//           size="large"
//           value={searchKeyword}
//           onChange={(e) => setSearchKeyword(e.target.value)}
//           onSearch={handleSearch}
//           prefix={<SearchOutlined />}
//           style={{ maxWidth: "600px" }}
//         />
//         {!loading && keyword && (
//           <Text style={{ fontSize: "16px" }}>
//             <strong>"{keyword}"</strong>에 대한 검색 결과 <Badge count={totalItems} style={{ backgroundColor: '#1890ff' }} /> 건
//           </Text>
//         )}
//       </div>

//       {/* 검색 결과 영역 */}
//       {loading ? (
//         <div style={{ textAlign: "center", padding: "80px 0" }}>
//           <Spin size="large" />
//           <Paragraph style={{ marginTop: "16px" }}>검색 중입니다...</Paragraph>
//         </div>
//       ) : searchResults.length > 0 ? (
//         <>
//           <Row gutter={[24, 24]}>
//             {searchResults.map((story) => (
//               <Col xs={24} sm={12} md={8} key={story.id}>
//                 <Card
//                   hoverable
//                   cover={
//                     <div
//                       style={{
//                         height: "200px",
//                         background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(/placeholder.svg?height=200&width=400)`,
//                         backgroundSize: "cover",
//                         backgroundPosition: "center",
//                         position: "relative",
//                       }}
//                     >
//                       <div
//                         style={{
//                           position: "absolute",
//                           bottom: "0",
//                           left: "0",
//                           right: "0",
//                           padding: "16px",
//                           background: "linear-gradient(transparent, rgba(0, 0, 0, 0.7))",
//                         }}
//                       >
//                         <Title level={4} style={{ color: "white", margin: 0 }}>
//                           {story.title}
//                         </Title>
//                       </div>
//                     </div>
//                   }
//                   onClick={() => router.push(`/story/${story.id}`)}
//                   bodyStyle={{ padding: "16px" }}
//                 >
//                   <div style={{ marginBottom: "8px" }}>
//                     <Tag color="blue">{STORY_CATEGORIES[story.category] || story.category}</Tag>
//                     {story.status === "ARCHIVED" && <Tag color="green">완료</Tag>}
//                     {story.status === "DRAFT" && <Tag color="orange">임시저장</Tag>}
//                   </div>
//                   {story.description && (
//                     <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: "8px" }}>
//                       {story.description}
//                     </Paragraph>
//                   )}
//                   <div style={{ display: "flex", alignItems: "center" }}>
//                     <CalendarOutlined style={{ marginRight: "8px", color: "#666" }} />
//                     <Text type="secondary">
//                       {new Date(story.startDate).toLocaleDateString()} ~{" "}
//                       {new Date(story.endDate).toLocaleDateString()}
//                     </Text>
//                   </div>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
          
//           {/* 페이지네이션 */}
//           <div style={{ display: "flex", justifyContent: "center", marginTop: "48px" }}>
//             <Pagination
//               current={currentPage}
//               total={totalItems}
//               pageSize={pageSize}
//               onChange={handlePageChange}
//               showSizeChanger={false}
//               showQuickJumper
//             />
//           </div>
//         </>
//       ) : keyword ? (
//         <div style={{ textAlign: "center", padding: "60px 0" }}>
//           <Empty
//             image={Empty.PRESENTED_IMAGE_SIMPLE}
//             description={
//               <div style={{ fontSize: "16px" }}>
//                 <p>"{keyword}"에 대한 검색 결과가 없습니다.</p>
//                 <p>다른 검색어로 다시 시도해보세요.</p>
//               </div>
//             }
//           />
//         </div>
//       ) : (
//         <div style={{ textAlign: "center", padding: "60px 0" }}>
//           <Empty
//             description={
//               <div style={{ fontSize: "16px" }}>
//                 <p>검색어를 입력해주세요.</p>
//               </div>
//             }
//           />
//         </div>
//       )}
//     </Content>
//   )
// }

"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Layout, Typography, Input, Card, Row, Col, Pagination, Empty, Spin, Tag, Badge, Divider } from "antd"
import { CalendarOutlined, SearchOutlined, ArrowLeftOutlined, BookOutlined, UserOutlined } from "@ant-design/icons"
import { storyApi } from "@api/api-client"
import type { StorySummaryResponse } from "@/types/story"
import { STORY_CATEGORIES } from "@components/constants/storyCategories"

const { Content } = Layout
const { Title, Text, Paragraph } = Typography
const { Search } = Input

export default function StorySearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const keyword = searchParams?.get("keyword") || ""
  
  const [searchResults, setSearchResults] = useState<StorySummaryResponse[]>([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [searchKeyword, setSearchKeyword] = useState(keyword)
  const pageSize = 9

  const performSearch = async (page: number, term: string) => {
    if (!term.trim()) return
    
    try {
      setLoading(true)
      const response = await storyApi.searchStories(term, page - 1, pageSize)
      
      if (response) {
        setSearchResults(response.content || [])
        setTotalItems(response.totalElements || 0)
      }
    } catch (error) {
      console.error("검색 실패:", error)
      setSearchResults([])
      setTotalItems(0)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (keyword) {
      setSearchKeyword(keyword)
      performSearch(1, keyword)
      setCurrentPage(1)
    }
  }, [keyword])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    performSearch(page, searchKeyword)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSearch = (value: string) => {
    if (value.trim()) {
      router.push(`/story/search?keyword=${encodeURIComponent(value)}`)
    }
  }

  const goBack = () => {
    router.back()
  }

  // 배경 색상 랜덤 생성 함수
  const getRandomGradient = (id: number) => {
    const gradients = [
      'linear-gradient(135deg, #1a237e, #0d47a1)',
      'linear-gradient(135deg, #006064, #00838f)',
      'linear-gradient(135deg, #1b5e20, #2e7d32)',
      'linear-gradient(135deg, #b71c1c, #c62828)',
      'linear-gradient(135deg, #4a148c, #6a1b9a)',
      'linear-gradient(135deg, #e65100, #ef6c00)',
      'linear-gradient(135deg, #263238, #455a64)'
    ];
    
    return gradients[id % gradients.length];
  }

  return (
    <Content className="search-page-container" style={{ padding: "0", maxWidth: "100%", margin: "0 auto", backgroundColor: "#f5f7fa" }}>
      {/* 헤더 배너 영역 */}
      <div style={{ 
        background: "linear-gradient(135deg, #1890ff, #096dd9)",
        padding: "32px 24px",
        color: "white",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <button 
              onClick={goBack} 
              style={{ 
                background: "rgba(255,255,255,0.2)", 
                border: "none", 
                borderRadius: "50%",
                cursor: "pointer", 
                display: "flex", 
                alignItems: "center",
                justifyContent: "center",
                padding: "10px",
                width: "40px",
                height: "40px",
                transition: "background 0.3s"
              }}
              onMouseOver={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.3)"}
              onMouseOut={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
            >
              <ArrowLeftOutlined style={{ fontSize: "18px", color: "white" }} />
            </button>
            <Title level={2} style={{ margin: 0, color: "white" }}>스토리 검색</Title>
          </div>
          
          <div style={{ maxWidth: "800px" }}>
            <Search
              placeholder="찾고 싶은 스토리를 검색해보세요"
              allowClear
              enterButton="검색"
              size="large"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onSearch={handleSearch}
              prefix={<SearchOutlined />}
              style={{ width: "100%" }}
            />
            
            {!loading && keyword && (
              <div style={{ marginTop: "16px", display: "flex", alignItems: "center" }}>
                <Text style={{ fontSize: "16px", color: "white", marginRight: "12px" }}>
                  <strong>"{keyword}"</strong>에 대한 검색 결과
                </Text>
                <Badge 
                  count={totalItems} 
                  style={{ 
                    backgroundColor: 'white', 
                    color: '#1890ff', 
                    fontWeight: 'bold',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                  }} 
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 검색 결과 컨테이너 */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px" }}>
        {loading ? (
          <div style={{ 
            textAlign: "center", 
            padding: "80px 0",
            background: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
          }}>
            <Spin size="large" />
            <Paragraph style={{ marginTop: "16px", fontSize: "16px" }}>검색 중입니다...</Paragraph>
          </div>
        ) : searchResults.length > 0 ? (
          <>
            <Row gutter={[24, 24]}>
              {searchResults.map((story) => (
                <Col xs={24} sm={12} lg={8} key={story.id}>
                  <Card
                    hoverable
                    style={{ 
                      overflow: "hidden", 
                      borderRadius: "12px",
                      transition: "all 0.3s ease",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                      height: "100%"
                    }}
                    bodyStyle={{ padding: "16px", height: "calc(100% - 200px)" }}
                    cover={
                      <div
                        style={{
                          height: "200px",
                          background: getRandomGradient(story.id),
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          position: "relative",
                          display: "flex",
                          alignItems: "flex-end",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: "16px",
                            right: "16px",
                            zIndex: 2,
                          }}
                        >
                          {story.status === "ARCHIVED" && (
                            <Badge.Ribbon text="완료" color="green" />
                          )}
                          {story.status === "DRAFT" && (
                            <Badge.Ribbon text="임시저장" color="orange" />
                          )}
                        </div>
                        <div
                          style={{
                            padding: "20px 16px",
                            background: "linear-gradient(transparent, rgba(0, 0, 0, 0.8))",
                            width: "100%",
                          }}
                        >
                          <Tag color="blue" style={{ marginBottom: "8px" }}>
                            {STORY_CATEGORIES[story.category] || story.category}
                          </Tag>
                          <Title level={4} style={{ color: "white", margin: 0, lineHeight: "1.4" }}>
                            {story.title}
                          </Title>
                        </div>
                      </div>
                    }
                    onClick={() => router.push(`/story/${story.id}`)}
                  >
                    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                      {story.description && (
                        <Paragraph 
                          ellipsis={{ rows: 2 }} 
                          style={{ 
                            marginBottom: "12px", 
                            fontSize: "14px",
                            flex: 1
                          }}
                        >
                          {story.description}
                        </Paragraph>
                      )}
                      
                      <Divider style={{ margin: "12px 0" }} />
                      
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        {/* <div style={{ display: "flex", alignItems: "center" }}>
                          <UserOutlined style={{ marginRight: "6px", color: "#666" }} />
                          <Text type="secondary" style={{ fontSize: "13px" }}>
                            {story.user || "작성자"}
                          </Text>
                        </div> */}
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <CalendarOutlined style={{ marginRight: "6px", color: "#666" }} />
                          <Text type="secondary" style={{ fontSize: "13px" }}>
                            {new Date(story.startDate).toLocaleDateString()}
                          </Text>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
            
            {/* 페이지네이션 */}
            <div style={{ display: "flex", justifyContent: "center", marginTop: "48px" }}>
              <Pagination
                current={currentPage}
                total={totalItems}
                pageSize={pageSize}
                onChange={handlePageChange}
                showSizeChanger={false}
                showQuickJumper
              />
            </div>
          </>
        ) : keyword ? (
          <div style={{ 
            textAlign: "center", 
            padding: "60px 0",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
          }}>
            <BookOutlined style={{ fontSize: "48px", color: "#d9d9d9", marginBottom: "16px" }} />
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              imageStyle={{ display: "none" }}
              description={
                <div style={{ fontSize: "16px" }}>
                  <p style={{ fontSize: "18px", fontWeight: "bold", margin: "8px 0" }}>
                    검색 결과가 없습니다
                  </p>
                  <p style={{ color: "#666" }}>
                    "{keyword}"에 대한 스토리를 찾을 수 없습니다.<br />
                    다른 검색어로 다시 시도해보세요.
                  </p>
                </div>
              }
            />
          </div>
        ) : (
          <div style={{ 
            textAlign: "center", 
            padding: "60px 0",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
          }}>
            <SearchOutlined style={{ fontSize: "48px", color: "#d9d9d9", marginBottom: "16px" }} />
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              imageStyle={{ display: "none" }}
              description={
                <div style={{ fontSize: "16px" }}>
                  <p style={{ fontSize: "18px", fontWeight: "bold", margin: "8px 0" }}>
                    검색어를 입력해주세요
                  </p>
                  <p style={{ color: "#666" }}>
                    찾고 싶은 스토리의 제목, 내용 또는 키워드를 입력하세요
                  </p>
                </div>
              }
            />
          </div>
        )}
      </div>
    </Content>
  )
}