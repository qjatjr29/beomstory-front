// "use client"

// import { useEffect, useState } from "react"
// import { useParams, useRouter } from "next/navigation"
// import { Layout, Typography, Card, Avatar, Tabs, List, Skeleton, Button, Empty, message } from "antd"
// import { UserOutlined, BookOutlined, EnvironmentOutlined, CalendarOutlined } from "@ant-design/icons"
// import { userApi, storyApi } from "@api/api-client"
// import type { StorySummaryResponse } from "@api/story-client"
// import UserStorage from "@/utils/storage/userStorage"

// const { Header, Content } = Layout
// const { Title, Text } = Typography
// const { TabPane } = Tabs

// interface UserProfile {
//   id: string
//   username: string
//   email: string
//   profileImage?: string
//   bio?: string
//   createdAt: string
// }

// export default function UserProfilePage() {
//   const { id } = useParams()
//   const router = useRouter()
//   const [user, setUser] = useState<UserProfile | null>(null)
//   const [stories, setStories] = useState<StorySummaryResponse[]>([])
//   const [loading, setLoading] = useState(true)
//   const [isCurrentUser, setIsCurrentUser] = useState(false)

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         setLoading(true)

//         // 현재 로그인한 사용자의 ID와 비교
//         const currentUserId = UserStorage.getUserId()
//         setIsCurrentUser(currentUserId === id)

//         // 만약 현재 사용자의 프로필을 보려고 하면 /user/profile로 리다이렉트
//         if (currentUserId === id) {
//           router.push("/user/profile")
//           return
//         }

//         // 사용자 정보 가져오기
//         const userResponse = await userApi.getUserById(Number(user.id))
//         setUser(userResponse.data)

//         // 사용자의 스토리 목록 가져오기
//         const storiesResponse = await storyApi.getStoriesByUserId(Number(user.id))

//         // 응답 구조 확인 및 데이터 설정
//         if (storiesResponse && storiesResponse.content) {
//           setStories(storiesResponse.content)
//         } else {
//           setStories([])
//         }

//         setLoading(false)
//       } catch (error) {
//         console.error("사용자 정보 로딩 실패:", error)
//         message.error("사용자 정보를 불러오는데 실패했습니다.")
//         setLoading(false)
//       }
//     }

//     if (id) {
//       fetchUserData()
//     }
//   }, [id, router])

//   if (loading) {
//     return (
//       <Layout>
//         <Header style={{ background: "#fff", padding: "0 20px" }}>
//           <Skeleton.Avatar size="large" active style={{ marginRight: 16 }} />
//           <Skeleton.Input style={{ width: 200 }} active />
//         </Header>
//         <Content style={{ padding: "20px" }}>
//           <Card style={{ maxWidth: "800px", margin: "0 auto" }}>
//             <Skeleton active avatar paragraph={{ rows: 4 }} />
//           </Card>
//         </Content>
//       </Layout>
//     )
//   }

//   if (!user) {
//     return (
//       <Layout>
//         <Header style={{ background: "#fff", padding: "0 20px" }}>
//           <Title level={3} style={{ margin: "16px 0" }}>
//             사용자 프로필
//           </Title>
//         </Header>
//         <Content style={{ padding: "20px" }}>
//           <Card style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", padding: "40px" }}>
//             <Empty description="사용자를 찾을 수 없습니다." />
//             <Button type="primary" style={{ marginTop: "20px" }} onClick={() => router.push("/")}>
//               홈으로 돌아가기
//             </Button>
//           </Card>
//         </Content>
//       </Layout>
//     )
//   }

//   return (
//     <Layout>
//       <Header style={{ background: "#fff", padding: "0 20px", display: "flex", alignItems: "center" }}>
//         <Title level={3} style={{ margin: "16px 0" }}>
//           사용자 프로필
//         </Title>
//       </Header>
//       <Content style={{ padding: "20px" }}>
//         <Card style={{ maxWidth: "800px", margin: "0 auto" }}>
//           <div style={{ display: "flex", alignItems: "center", marginBottom: "24px" }}>
//             <Avatar
//               size={80}
//               src={user.profileImage}
//               icon={!user.profileImage && <UserOutlined />}
//               style={{ marginRight: "16px" }}
//             />
//             <div>
//               <Title level={3} style={{ margin: "0 0 8px 0" }}>
//                 {user.username}
//               </Title>
//               <Text type="secondary">{user.email}</Text>
//               {user.bio && <Text style={{ display: "block", marginTop: "8px" }}>{user.bio}</Text>}
//               <Text type="secondary" style={{ display: "block", marginTop: "8px" }}>
//                 <CalendarOutlined style={{ marginRight: "8px" }} />
//                 가입일: {new Date(user.createdAt).toLocaleDateString()}
//               </Text>
//             </div>
//           </div>

//           <Tabs defaultActiveKey="stories">
//             <TabPane
//               tab={
//                 <span>
//                   <BookOutlined />
//                   일상 기록
//                 </span>
//               }
//               key="stories"
//             >
//               {stories && stories.length > 0 ? (
//                 <List
//                   itemLayout="horizontal"
//                   dataSource={stories}
//                   renderItem={(story) => (
//                     <List.Item
//                       actions={[
//                         <Button key="view" type="link" onClick={() => router.push(`/story/${story.id}`)}>
//                           보기
//                         </Button>,
//                       ]}
//                     >
//                       <List.Item.Meta
//                         title={story.title}
//                         description={
//                           <div>
//                             <Text type="secondary" style={{ display: "block" }}>
//                               <CalendarOutlined style={{ marginRight: "8px" }} />
//                               {new Date(story.startDate).toLocaleDateString()} ~{" "}
//                               {new Date(story.endDate).toLocaleDateString()}
//                             </Text>
//                             <Text type="secondary" style={{ display: "block", marginTop: "4px" }}>
//                               <EnvironmentOutlined style={{ marginRight: "8px" }} />
//                               장소 정보
//                             </Text>
//                           </div>
//                         }
//                       />
//                     </List.Item>
//                   )}
//                 />
//               ) : (
//                 <Empty description="작성한 일상 기록이 없습니다." />
//               )}
//             </TabPane>
//           </Tabs>
//         </Card>
//       </Content>
//     </Layout>
//   )
// }
"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Layout, Typography, Card, Avatar, Tabs, List, Skeleton, Button, Empty, message, Tag } from "antd"
import { UserOutlined, BookOutlined, CalendarOutlined } from "@ant-design/icons"
import { userApi, storyApi } from "@api/api-client"
import type { StorySummaryResponse, } from "@api/story-client"
import UserStorage from "@/utils/storage/userStorage"
import { STORY_CATEGORIES } from "@components/constants/storyCategories"

const { Header, Content } = Layout
const { Title, Text } = Typography
const { TabPane } = Tabs

interface UserProfile {
  id: string
  username: string
  email: string
  profileImage?: string
  bio?: string
  createdAt: string
}

export default function UserProfilePage() {
  const { id } = useParams()
  const router = useRouter()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [stories, setStories] = useState<StorySummaryResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [isCurrentUser, setIsCurrentUser] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)

        // 현재 로그인한 사용자의 ID와 비교
        const currentUserId = UserStorage.getUserId()
        setIsCurrentUser(currentUserId === id)

        // 만약 현재 사용자의 프로필을 보려고 하면 /user/profile로 리다이렉트
        if (currentUserId === id) {
          router.push("/user/profile")
          return
        }

        // 사용자 정보 가져오기
        const userResponse = await userApi.getUserById(Number(id))
        setUser(userResponse.data)

        // 사용자의 스토리 목록 가져오기
        const storiesResponse = await storyApi.getStoriesByUserId(Number(id))

        // 응답 구조 확인 및 데이터 설정
        if (storiesResponse && storiesResponse.content) {
          setStories(storiesResponse.content)
        } else {
          setStories([])
        }

        setLoading(false)
      } catch (error) {
        console.error("사용자 정보 로딩 실패:", error)
        message.error("사용자 정보를 불러오는데 실패했습니다.")
        setLoading(false)
      }
    }

    if (id) {
      fetchUserData()
    }
  }, [id, router])

  if (loading) {
    return (
      <Layout>
        <Header style={{ background: "#fff", padding: "0 20px" }}>
          <Skeleton.Avatar size="large" active style={{ marginRight: 16 }} />
          <Skeleton.Input style={{ width: 200 }} active />
        </Header>
        <Content style={{ padding: "20px" }}>
          <Card style={{ maxWidth: "800px", margin: "0 auto" }}>
            <Skeleton active avatar paragraph={{ rows: 4 }} />
          </Card>
        </Content>
      </Layout>
    )
  }

  if (!user) {
    return (
      <Layout>
        <Header style={{ background: "#fff", padding: "0 20px" }}>
          <Title level={3} style={{ margin: "16px 0" }}>
            사용자 프로필
          </Title>
        </Header>
        <Content style={{ padding: "20px" }}>
          <Card style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", padding: "40px" }}>
            <Empty description="사용자를 찾을 수 없습니다." />
            <Button type="primary" style={{ marginTop: "20px" }} onClick={() => router.push("/")}>
              홈으로 돌아가기
            </Button>
          </Card>
        </Content>
      </Layout>
    )
  }

  return (
    <Layout>
      <Header style={{ background: "#fff", padding: "0 20px", display: "flex", alignItems: "center" }}>
        <Title level={3} style={{ margin: "16px 0" }}>
          사용자 프로필
        </Title>
      </Header>
      <Content style={{ padding: "20px" }}>
        <Card style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "24px" }}>
            <Avatar
              size={80}
              src={user.profileImage}
              icon={!user.profileImage && <UserOutlined />}
              style={{ marginRight: "16px" }}
            />
            <div>
              <Title level={3} style={{ margin: "0 0 8px 0" }}>
                {user.username}
              </Title>
              <Text type="secondary">{user.email}</Text>
              {user.bio && <Text style={{ display: "block", marginTop: "8px" }}>{user.bio}</Text>}
              <Text type="secondary" style={{ display: "block", marginTop: "8px" }}>
                <CalendarOutlined style={{ marginRight: "8px" }} />
                가입일: {new Date(user.createdAt).toLocaleDateString()}
              </Text>
            </div>
          </div>

          <Tabs defaultActiveKey="stories">
            <TabPane
              tab={
                <span>
                  <BookOutlined />
                  일상 기록
                </span>
              }
              key="stories"
            >
              {stories && stories.length > 0 ? (
                <List
                  itemLayout="horizontal"
                  dataSource={stories}
                  renderItem={(story) => (
                    <List.Item
                      actions={[
                        <Button key="view" type="link" onClick={() => router.push(`/story/${story.id}`)}>
                          보기
                        </Button>,
                      ]}
                    >
                      <List.Item.Meta
                        title={
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <span>{story.title}</span>
                            <Tag color="green" style={{ marginLeft: "8px" }}>
                              {STORY_CATEGORIES[story.category] || story.category}
                            </Tag>
                          </div>
                        }
                        description={
                          <div>
                            <Text type="secondary" style={{ display: "block" }}>
                              <CalendarOutlined style={{ marginRight: "8px" }} />
                              {new Date(story.startDate).toLocaleDateString()} ~{" "}
                              {new Date(story.endDate).toLocaleDateString()}
                            </Text>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              ) : (
                <Empty description="작성한 일상 기록이 없습니다." />
              )}
            </TabPane>
          </Tabs>
        </Card>
      </Content>
    </Layout>
  )
}
