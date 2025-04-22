// "use client"

// import { useEffect, useState, useRef } from "react"
// import { useRouter } from "next/navigation"
// import {
//   Layout,
//   Typography,
//   Card,
//   Avatar,
//   Tabs,
//   List,
//   Skeleton,
//   Button,
//   Empty,
//   message,
//   Modal,
//   Form,
//   Input,
//   Upload,
//   Tooltip,
//   Tag,
// } from "antd"
// import {
//   UserOutlined,
//   BookOutlined,
//   CalendarOutlined,
//   EditOutlined,
//   UploadOutlined,
//   CameraOutlined,
//   KeyOutlined,
//   SaveOutlined,
//   CloseOutlined,
//   LockOutlined,
//   PlusOutlined,
//   FileTextOutlined,
//   ClockCircleOutlined,
//   CheckCircleOutlined,
// } from "@ant-design/icons"
// import { userApi, storyApi } from "@api/api-client"
// import type { StorySummaryResponse } from "@api/story-client"
// import TokenStorage from "@/utils/storage/tokenStorage"
// import type { UploadFile, UploadProps } from "antd/es/upload/interface"
// import { useAuth } from "@/components/auth/AuthContext"
// import { STORY_CATEGORIES } from "@components/constants/storyCategories"

// const { Header, Content } = Layout
// const { Title, Text, Paragraph } = Typography
// const { TabPane } = Tabs
// const { TextArea } = Input

// interface UserProfile {
//   id: string | number
//   email: string
//   nickname: string
//   profileImage?: string
//   bio?: string
//   createdAt: string
//   authType?: string // 인증 타입
// }

// // 상태에 따른 태그 색상 및 아이콘 정의
// const STATUS_CONFIG = {
//   DRAFT: {
//     color: "orange",
//     icon: <ClockCircleOutlined />,
//     text: "임시저장",
//   },
//   IN_PROGRESS: {
//     color: "blue",
//     icon: <FileTextOutlined />,
//     text: "작성중",
//   },
//   ARCHIVED: {
//     color: "green",
//     icon: <CheckCircleOutlined />,
//     text: "완료",
//   },
// }

// export default function MyProfilePage() {
//   const router = useRouter()
//   const { updateUser, logout } = useAuth()
//   const [user, setUser] = useState<UserProfile | null>(null)
//   const [stories, setStories] = useState<StorySummaryResponse[]>([])
//   const [loading, setLoading] = useState(true)
//   const [activeTab, setActiveTab] = useState("all")

//   // 수정 관련 상태
//   const [isEditingNickname, setIsEditingNickname] = useState(false)
//   const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false)
//   const [isProfileImageModalVisible, setIsProfileImageModalVisible] = useState(false)
//   const [fileList, setFileList] = useState<UploadFile[]>([])
//   const [uploadLoading, setUploadLoading] = useState(false)
//   const [passwordLoading, setPasswordLoading] = useState(false)

//   // 폼 관련
//   const [nicknameForm] = Form.useForm()
//   const [passwordForm] = Form.useForm()
//   const nicknameInputRef = useRef<Input>(null)

//   // OAuth 사용자인지 확인 (OAUTH 타입만 해당)
//   const isOAuthUser = user?.authType === "OAUTH"

//   // 상태별 스토리 필터링
//   const filteredStories = activeTab === "all" ? stories : stories.filter((story) => story.status === activeTab)

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         setLoading(true)

//         // 로그인 상태 확인
//         const token = TokenStorage.getToken()
//         if (!token) {
//           message.warning("로그인이 필요한 서비스입니다.")
//           router.push("/login")
//           return
//         }

//         // 내 정보 가져오기
//         const userResponse = await userApi.getMyInfo()
//         setUser(userResponse)

//         // 내 스토리 목록 가져오기
//         const storiesResponse = await storyApi.getMyStories()

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

//     fetchUserData()
//   }, [router])

//   // 닉네임 수정 시작
//   const startEditingNickname = () => {
//     if (user) {
//       nicknameForm.setFieldsValue({ nickname: user.nickname })
//       setIsEditingNickname(true)
//       // 다음 렌더링 사이클에서 포커스 설정
//       setTimeout(() => {
//         nicknameInputRef.current?.focus()
//       }, 0)
//     }
//   }

//   // 닉네임 수정 취소
//   const cancelEditingNickname = () => {
//     setIsEditingNickname(false)
//   }

//   // 닉네임 수정 저장
//   const saveNickname = async () => {
//     try {
//       const values = await nicknameForm.validateFields()

//       if (user) {
//         await userApi.updateNickname(Number(user.id), {
//           nickname: values.nickname,
//         })

//         // 사용자 정보 업데이트
//         const updatedUser = { ...user, nickname: values.nickname }
//         setUser(updatedUser)

//         // Context 업데이트
//         updateUser({ nickname: values.nickname })

//         message.success("닉네임이 업데이트되었습니다.")
//         setIsEditingNickname(false)

//         // 페이지 새로고침
//         setTimeout(() => {
//           window.location.reload()
//         }, 1000)
//       }
//     } catch (error) {
//       console.error("닉네임 업데이트 실패:", error)
//       message.error("닉네임 업데이트에 실패했습니다.")
//     }
//   }

//   // 비밀번호 모달 열기
//   const showPasswordModal = () => {
//     passwordForm.resetFields()
//     setIsPasswordModalVisible(true)
//   }

//   // 비밀번호 변경/추가 처리
//   const handlePasswordChange = async () => {
//     try {
//       setPasswordLoading(true)
//       const values = await passwordForm.validateFields()

//       if (user) {
//         await userApi.updatePassword(Number(user.id), {
//           // OAuth 사용자는 현재 비밀번호로 빈 문자열 전송
//           currentPassword: isOAuthUser ? "" : values.currentPassword,
//           newPassword: values.newPassword,
//         })

//         const successMessage = isOAuthUser ? "비밀번호가 추가되었습니다." : "비밀번호가 변경되었습니다."
//         message.success(successMessage)
//         setIsPasswordModalVisible(false)

//         // 페이지 새로고침
//         setTimeout(() => {
//           window.location.reload()
//         }, 1000)
//       }
//     } catch (error) {
//       console.error("비밀번호 변경 실패:", error)
//       const errorMessage = isOAuthUser
//         ? "비밀번호 추가에 실패했습니다."
//         : "비밀번호 변경에 실패했습니다. 현재 비밀번호를 확인해주세요."
//       message.error(errorMessage)
//     } finally {
//       setPasswordLoading(false)
//     }
//   }

//   // 프로필 이미지 모달 열기
//   const showProfileImageModal = () => {
//     setFileList([])
//     setIsProfileImageModalVisible(true)
//   }

//   // 프로필 이미지 업로드 처리
//   const handleProfileImageUpload = async () => {
//     if (fileList.length === 0) {
//       message.warning("이미지를 선택해주세요.")
//       return
//     }

//     try {
//       setUploadLoading(true)

//       // 이미지 파일 처리 (실제 구현에서는 FormData 등을 사용하여 서버에 업로드)
//       const file = fileList[0]

//       // 프로필 이미지 URL (실제 구현에서는 서버 응답에서 받은 URL 사용)
//       const profileImageUrl = URL.createObjectURL(file.originFileObj as Blob)

//       // 프로필 업데이트 API 호출
//       if (user) {
//         await userApi.updateProfile({
//           profileImage: profileImageUrl,
//         })

//         // 사용자 정보 업데이트
//         const updatedUser = { ...user, profileImage: profileImageUrl }
//         setUser(updatedUser)

//         // Context 업데이트
//         updateUser({ profileImage: profileImageUrl })

//         message.success("프로필 이미지가 업데이트되었습니다.")
//         setIsProfileImageModalVisible(false)

//         // 페이지 새로고침
//         setTimeout(() => {
//           window.location.reload()
//         }, 1000)
//       }
//     } catch (error) {
//       console.error("프로필 이미지 업로드 실패:", error)
//       message.error("프로필 이미지 업로드에 실패했습니다.")
//     } finally {
//       setUploadLoading(false)
//     }
//   }

//   // 업로드 속성 설정
//   const uploadProps: UploadProps = {
//     onRemove: () => {
//       setFileList([])
//     },
//     beforeUpload: (file) => {
//       // 이미지 파일 타입 검사
//       const isImage = file.type.startsWith("image/")
//       if (!isImage) {
//         message.error("이미지 파일만 업로드할 수 있습니다!")
//         return Upload.LIST_IGNORE
//       }

//       // 파일 크기 제한 (2MB)
//       const isLt2M = file.size / 1024 / 1024 < 2
//       if (!isLt2M) {
//         message.error("이미지 크기는 2MB보다 작아야 합니다!")
//         return Upload.LIST_IGNORE
//       }

//       setFileList([file])
//       return false // 자동 업로드 방지
//     },
//     fileList,
//   }

//   const handleLogout = async () => {
//     try {
//       // 서버에 로그아웃 요청
//       await userApi.logout()
//     } catch (error) {
//       console.error("로그아웃 API 호출 실패:", error)
//     } finally {
//       // Context의 logout 함수 호출
//       logout()

//       message.success("로그아웃되었습니다.")

//       // 홈페이지로 리다이렉트
//       router.push("/")

//       // 페이지 새로고침 (확실한 로그아웃을 위해)
//       setTimeout(() => {
//         window.location.href = "/"
//       }, 100)
//     }
//   }

//   // 임시저장된 기록 이어서 작성하기
//   const continueDraftStory = (storyId: string) => {
//     router.push(`/story/edit/${storyId}`)
//   }

//   if (loading) {
//     return (
//       <Layout>
//         <Header style={{ background: "#fff", padding: "0 20px", width: "100%" }}>
//           <Skeleton.Avatar size="large" active style={{ marginRight: 16 }} />
//           <Skeleton.Input style={{ width: 200 }} active />
//         </Header>
//         <Content style={{ padding: "20px", width: "100%" }}>
//           <Card style={{ width: "100%" }}>
//             <Skeleton active avatar paragraph={{ rows: 4 }} />
//           </Card>
//         </Content>
//       </Layout>
//     )
//   }

//   if (!user) {
//     return (
//       <Layout>
//         <Header style={{ background: "#fff", padding: "0 20px", width: "100%" }}>
//           <Title level={3} style={{ margin: "16px 0" }}>
//             내 프로필
//           </Title>
//         </Header>
//         <Content style={{ padding: "20px", width: "100%" }}>
//           <Card style={{ width: "100%", textAlign: "center", padding: "40px" }}>
//             <Empty description="사용자 정보를 찾을 수 없습니다." />
//             <Button type="primary" style={{ marginTop: "20px" }} onClick={() => router.push("/login")}>
//               로그인하기
//             </Button>
//           </Card>
//         </Content>
//       </Layout>
//     )
//   }

//   return (
//     <Layout style={{ width: "100%" }}>
//       <Header style={{ background: "#fff", padding: "0 20px", display: "flex", alignItems: "center", width: "100%" }}>
//         <Title level={3} style={{ margin: "16px 0" }}>
//           내 프로필
//         </Title>
//       </Header>
//       <Content style={{ padding: "20px", width: "100%" }}>
//         <Card style={{ width: "100%" }}>
//           <div style={{ display: "flex", alignItems: "flex-start", marginBottom: "24px" }}>
//             {/* 프로필 이미지 섹션 */}
//             <div style={{ position: "relative", marginRight: "24px" }}>
//               <Avatar size={100} src={user.profileImage} icon={!user.profileImage && <UserOutlined />} />
//               <Tooltip title="프로필 이미지 변경">
//                 <Button
//                   type="primary"
//                   shape="circle"
//                   icon={<CameraOutlined />}
//                   size="small"
//                   onClick={showProfileImageModal}
//                   style={{
//                     position: "absolute",
//                     bottom: 0,
//                     right: 0,
//                     boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
//                   }}
//                 />
//               </Tooltip>
//             </div>

//             {/* 사용자 정보 섹션 */}
//             <div style={{ flex: 1 }}>
//               {/* 닉네임 섹션 */}
//               <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
//                 {isEditingNickname ? (
//                   <Form form={nicknameForm} layout="inline" onFinish={saveNickname}>
//                     <Form.Item
//                       name="nickname"
//                       rules={[{ required: true, message: "닉네임을 입력해주세요!" }]}
//                       style={{ marginBottom: 0, marginRight: "8px" }}
//                     >
//                       <Input ref={nicknameInputRef} />
//                     </Form.Item>
//                     <Button
//                       type="primary"
//                       icon={<SaveOutlined />}
//                       onClick={saveNickname}
//                       style={{ marginRight: "4px" }}
//                     />
//                     <Button icon={<CloseOutlined />} onClick={cancelEditingNickname} />
//                   </Form>
//                 ) : (
//                   <>
//                     <Title level={3} style={{ margin: "0 8px 0 0" }}>
//                       {user.nickname}
//                     </Title>
//                     <Tooltip title="닉네임 변경">
//                       <Button type="text" icon={<EditOutlined />} onClick={startEditingNickname} size="small" />
//                     </Tooltip>
//                   </>
//                 )}
//               </div>

//               <Text type="secondary" style={{ display: "block" }}>
//                 {user.email}
//               </Text>

//               {user.bio && <Paragraph style={{ marginTop: "8px" }}>{user.bio}</Paragraph>}

//               <Text type="secondary" style={{ display: "block", marginTop: "8px" }}>
//                 <CalendarOutlined style={{ marginRight: "8px" }} />
//                 가입일: {new Date(user.createdAt).toLocaleDateString()}
//               </Text>

//               {user.authType && (
//                 <Text type="secondary" style={{ display: "block", marginTop: "4px" }}>
//                   로그인 방식:{" "}
//                   {user.authType === "EMAIL_PASSWORD"
//                     ? "이메일/비밀번호"
//                     : user.authType === "OAUTH"
//                       ? "소셜 로그인"
//                       : user.authType === "HYBRID"
//                         ? "하이브리드"
//                         : user.authType}
//                 </Text>
//               )}
//             </div>

//             {/* 액션 버튼 섹션 */}
//             <div>
//               <Tooltip title={isOAuthUser ? "비밀번호 추가" : "비밀번호 변경"}>
//                 <Button
//                   icon={isOAuthUser ? <PlusOutlined /> : <KeyOutlined />}
//                   onClick={showPasswordModal}
//                   style={{ marginBottom: "8px" }}
//                 >
//                   {isOAuthUser ? "비밀번호 추가하기" : "비밀번호 변경"}
//                 </Button>
//               </Tooltip>
//               <br />
//               <Button danger onClick={handleLogout}>
//                 로그아웃
//               </Button>
//             </div>
//           </div>

//           <Tabs defaultActiveKey="all" onChange={setActiveTab}>
//             <TabPane
//               tab={
//                 <span>
//                   <BookOutlined />
//                   모든 일상 기록
//                 </span>
//               }
//               key="all"
//             >
//               <div style={{ marginBottom: "16px" }}>
//                 <Button type="primary" onClick={() => router.push("/story/register")}>
//                   새 일상 기록하기
//                 </Button>
//               </div>

//               {filteredStories && filteredStories.length > 0 ? (
//                 <List
//                   itemLayout="horizontal"
//                   dataSource={filteredStories}
//                   renderItem={(story) => {
//                     const statusConfig =
//                       STATUS_CONFIG[story.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.ARCHIVED
                    
//                     return (
//                       <List.Item
//                         actions={[
//                           story.status === "DRAFT" ? (
//                             <Button key="continue" type="primary" onClick={() => continueDraftStory(story.id)}>
//                               이어서 작성
//                             </Button>
//                           ) : (
//                             <Button key="view" type="link" onClick={() => router.push(`/story/${story.id}`)}>
//                               보기
//                             </Button>
//                           ),
//                           <Button key="edit" type="link" onClick={() => router.push(`/story/edit/${story.id}`)}>
//                             수정
//                           </Button>,
//                         ]}
//                       >
//                         <List.Item.Meta
//                           title={
//                             <div style={{ display: "flex", alignItems: "center" }}>
//                               <span>{story.title}</span>
//                               <Tag color="blue" style={{ marginLeft: "8px" }}>
//                                 {STORY_CATEGORIES[story.category] || story.category}
//                               </Tag>
//                               <Tag color={statusConfig.color} icon={statusConfig.icon} style={{ marginLeft: "8px" }}>
//                                 {statusConfig.text}
//                               </Tag>
//                             </div>
//                           }
//                           description={
//                             <div>
//                               <Text type="secondary" style={{ display: "block" }}>
//                                 <CalendarOutlined style={{ marginRight: "8px" }} />
//                                 {new Date(story.startDate).toLocaleDateString()} ~{" "}
//                                 {new Date(story.endDate).toLocaleDateString()}
//                               </Text>
//                             </div>
//                           }
//                         />
//                       </List.Item>
//                     )
//                   }}
//                 />
//               ) : (
//                 <Empty description="작성한 일상 기록이 없습니다." />
//               )}
//             </TabPane>
//             <TabPane
//               tab={
//                 <span>
//                   <ClockCircleOutlined />
//                   임시저장
//                 </span>
//               }
//               key="DRAFT"
//             >
//               {filteredStories && filteredStories.length > 0 ? (
//                 <List
//                   itemLayout="horizontal"
//                   dataSource={filteredStories}
//                   renderItem={(story) => (
//                     <List.Item
//                       actions={[
//                         <Button key="continue" type="primary" onClick={() => continueDraftStory(story.id)}>
//                           이어서 작성
//                         </Button>,
//                         <Button key="edit" type="link" onClick={() => router.push(`/story/edit/${story.id}`)}>
//                           수정
//                         </Button>,
//                       ]}
//                     >
//                       <List.Item.Meta
//                         title={
//                           <div style={{ display: "flex", alignItems: "center" }}>
//                             <span>{story.title}</span>
//                             <Tag color="green" style={{ marginLeft: "8px" }}>
//                               {STORY_CATEGORIES[story.category] || story.category}
//                             </Tag>
//                           </div>
//                         }
//                         description={
//                           <div>
//                             <Text type="secondary" style={{ display: "block" }}>
//                               <CalendarOutlined style={{ marginRight: "8px" }} />
//                               {new Date(story.startDate).toLocaleDateString()} ~{" "}
//                               {new Date(story.endDate).toLocaleDateString()}
//                             </Text>
//                           </div>
//                         }
//                       />
//                     </List.Item>
//                   )}
//                 />
//               ) : (
//                 <Empty description="임시저장된 일상 기록이 없습니다." />
//               )}
//             </TabPane>
//             <TabPane
//               tab={
//                 <span>
//                   <CheckCircleOutlined />
//                   완료된 기록
//                 </span>
//               }
//               key="ARCHIVED"
//             >
//               {filteredStories && filteredStories.length > 0 ? (
//                 <List
//                   itemLayout="horizontal"
//                   dataSource={filteredStories}
//                   renderItem={(story) => (
//                     <List.Item
//                       actions={[
//                         <Button key="view" type="link" onClick={() => router.push(`/story/${story.id}`)}>
//                           보기
//                         </Button>,
//                         <Button key="edit" type="link" onClick={() => router.push(`/story/edit/${story.id}`)}>
//                           수정
//                         </Button>,
//                       ]}
//                     >
//                       <List.Item.Meta
//                         title={
//                           <div style={{ display: "flex", alignItems: "center" }}>
//                             <span>{story.title}</span>
//                             <Tag color="green" style={{ marginLeft: "8px" }}>
//                               {STORY_CATEGORIES[story.category] || story.category}
//                             </Tag>
//                           </div>
//                         }
//                         description={
//                           <div>
//                             <Text type="secondary" style={{ display: "block" }}>
//                               <CalendarOutlined style={{ marginRight: "8px" }} />
//                               {new Date(story.startDate).toLocaleDateString()} ~{" "}
//                               {new Date(story.endDate).toLocaleDateString()}
//                             </Text>
//                           </div>
//                         }
//                       />
//                     </List.Item>
//                   )}
//                 />
//               ) : (
//                 <Empty description="완료된 일상 기록이 없습니다." />
//               )}
//             </TabPane>
//           </Tabs>
//         </Card>
//       </Content>

//       {/* 비밀번호 변경/추가 모달 */}
//       <Modal
//         title={isOAuthUser ? "비밀번호 추가" : "비밀번호 변경"}
//         open={isPasswordModalVisible}
//         onCancel={() => setIsPasswordModalVisible(false)}
//         footer={[
//           <Button key="cancel" onClick={() => setIsPasswordModalVisible(false)}>
//             취소
//           </Button>,
//           <Button key="submit" type="primary" onClick={handlePasswordChange} loading={passwordLoading}>
//             {isOAuthUser ? "추가" : "변경"}
//           </Button>,
//         ]}
//       >
//         <Form form={passwordForm} layout="vertical">
//           {/* OAuth 사용자가 아닌 경우에만 현재 비밀번호 입력 필드 표시 */}
//           {!isOAuthUser && (
//             <Form.Item
//               name="currentPassword"
//               label="현재 비밀번호"
//               rules={[{ required: true, message: "현재 비밀번호를 입력해주세요!" }]}
//             >
//               <Input.Password prefix={<LockOutlined />} placeholder="현재 비밀번호" />
//             </Form.Item>
//           )}

//           <Form.Item
//             name="newPassword"
//             label="새 비밀번호"
//             rules={[
//               { required: true, message: "새 비밀번호를 입력해주세요!" },
//               { min: 8, message: "비밀번호는 8자 이상이어야 합니다!" },
//             ]}
//           >
//             <Input.Password prefix={<LockOutlined />} placeholder="새 비밀번호" />
//           </Form.Item>

//           <Form.Item
//             name="confirmPassword"
//             label="비밀번호 확인"
//             dependencies={["newPassword"]}
//             rules={[
//               { required: true, message: "비밀번호를 다시 입력해주세요!" },
//               ({ getFieldValue }) => ({
//                 validator(_, value) {
//                   if (!value || getFieldValue("newPassword") === value) {
//                     return Promise.resolve()
//                   }
//                   return Promise.reject(new Error("비밀번호가 일치하지 않습니다!"))
//                 },
//               }),
//             ]}
//           >
//             <Input.Password prefix={<LockOutlined />} placeholder="비밀번호 확인" />
//           </Form.Item>
//         </Form>
//       </Modal>
//       <Modal
//         title="프로필 이미지 변경"
//         open={isProfileImageModalVisible}
//         onOk={handleProfileImageUpload}
//         onCancel={() => setIsProfileImageModalVisible(false)}
//         okText="변경"
//         cancelText="취소"
//         okButtonProps={{ loading: uploadLoading }}
//       >
//         <Upload listType="picture-card" maxCount={1} {...uploadProps}>
//           <div>
//             <UploadOutlined />
//             <div style={{ marginTop: 8 }}>이미지 업로드</div>
//           </div>
//         </Upload>
//         <p style={{ marginTop: 8, color: "#888" }}>* 2MB 이하의 이미지 파일만 업로드 가능합니다.</p>
//       </Modal>
//     </Layout>
//   )
// }

"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  Layout,
  Typography,
  Card,
  Avatar,
  Tabs,
  List,
  Skeleton,
  Button,
  Empty,
  message,
  Modal,
  Form,
  Input,
  Upload,
  Tooltip,
  Tag,
} from "antd"
import {
  UserOutlined,
  BookOutlined,
  CalendarOutlined,
  EditOutlined,
  UploadOutlined,
  CameraOutlined,
  KeyOutlined,
  SaveOutlined,
  CloseOutlined,
  LockOutlined,
  PlusOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons"
import { userApi, storyApi } from "@api/api-client"
import type { StorySummaryResponse } from "@/types/story"
import TokenStorage from "@/utils/storage/tokenStorage"
import type { UploadFile, UploadProps } from "antd/es/upload/interface"
import { useAuth } from "@/components/auth/AuthContext"
import { STORY_CATEGORIES, getStoryCategoryLabel } from "@components/constants/storyCategories"

const { Header, Content } = Layout
const { Title, Text, Paragraph } = Typography
const { TabPane } = Tabs
const { TextArea } = Input
const { confirm } = Modal

interface UserProfile {
  id: string | number
  email: string
  nickname: string
  profileImage?: string
  bio?: string
  createdAt: string
  authType?: string // 인증 타입
}

// 상태에 따른 태그 색상 및 아이콘 정의
const STATUS_CONFIG = {
  DRAFT: {
    color: "orange",
    icon: <ClockCircleOutlined />,
    text: "임시저장",
  },
  IN_PROGRESS: {
    color: "blue",
    icon: <FileTextOutlined />,
    text: "작성중",
  },
  ARCHIVED: {
    color: "green",
    icon: <CheckCircleOutlined />,
    text: "완료",
  },
}

export default function MyProfilePage() {
  const router = useRouter()
  const { updateUser, logout } = useAuth()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [stories, setStories] = useState<StorySummaryResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const [deletingStoryId, setDeletingStoryId] = useState<number | null>(null)

  // 수정 관련 상태
  const [isEditingNickname, setIsEditingNickname] = useState(false)
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false)
  const [isProfileImageModalVisible, setIsProfileImageModalVisible] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [uploadLoading, setUploadLoading] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [isDeleteStoryModalVisible, setIsDeleteStoryModalVisible] = useState(false)

  // 폼 관련
  const [nicknameForm] = Form.useForm()
  const [passwordForm] = Form.useForm()
  const nicknameInputRef = useRef<Input>(null)

  // OAuth 사용자인지 확인 (OAUTH 타입만 해당)
  const isOAuthUser = user?.authType === "OAUTH"

  // 상태별 스토리 필터링
  const filteredStories = activeTab === "all" ? stories : stories.filter((story) => story.status === activeTab)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)

        // 로그인 상태 확인
        const token = TokenStorage.getToken()
        if (!token) {
          message.warning("로그인이 필요한 서비스입니다.")
          router.push("/login")
          return
        }

        // 내 정보 가져오기
        const userResponse = await userApi.getMyInfo()
        setUser(userResponse)

        // 내 스토리 목록 가져오기
        const storiesResponse = await storyApi.getMyStories()

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

    fetchUserData()
  }, [router])

  // 닉네임 수정 시작
  const startEditingNickname = () => {
    if (user) {
      nicknameForm.setFieldsValue({ nickname: user.nickname })
      setIsEditingNickname(true)
      // 다음 렌더링 사이클에서 포커스 설정
      setTimeout(() => {
        nicknameInputRef.current?.focus()
      }, 0)
    }
  }

  // 닉네임 수정 취소
  const cancelEditingNickname = () => {
    setIsEditingNickname(false)
  }

  // 닉네임 수정 저장
  const saveNickname = async () => {
    try {
      const values = await nicknameForm.validateFields()

      if (user) {
        await userApi.updateNickname(Number(user.id), {
          nickname: values.nickname,
        })

        // 사용자 정보 업데이트
        const updatedUser = { ...user, nickname: values.nickname }
        setUser(updatedUser)

        // Context 업데이트
        updateUser({ nickname: values.nickname })

        message.success("닉네임이 업데이트되었습니다.")
        setIsEditingNickname(false)

        // 페이지 새로고침
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      }
    } catch (error) {
      console.error("닉네임 업데이트 실패:", error)
      message.error("닉네임 업데이트에 실패했습니다.")
    }
  }

  // 비밀번호 모달 열기
  const showPasswordModal = () => {
    passwordForm.resetFields()
    setIsPasswordModalVisible(true)
  }

  // 비밀번호 변경/추가 처리
  const handlePasswordChange = async () => {
    try {
      setPasswordLoading(true)
      const values = await passwordForm.validateFields()

      if (user) {
        await userApi.updatePassword(Number(user.id), {
          // OAuth 사용자는 현재 비밀번호로 빈 문자열 전송
          currentPassword: isOAuthUser ? "" : values.currentPassword,
          newPassword: values.newPassword,
        })

        const successMessage = isOAuthUser ? "비밀번호가 추가되었습니다." : "비밀번호가 변경되었습니다."
        message.success(successMessage)
        setIsPasswordModalVisible(false)

        // 페이지 새로고침
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      }
    } catch (error) {
      console.error("비밀번호 변경 실패:", error)
      const errorMessage = isOAuthUser
        ? "비밀번호 추가에 실패했습니다."
        : "비밀번호 변경에 실패했습니다. 현재 비밀번호를 확인해주세요."
      message.error(errorMessage)
    } finally {
      setPasswordLoading(false)
    }
  }

  // 프로필 이미지 모달 열기
  const showProfileImageModal = () => {
    setFileList([])
    setIsProfileImageModalVisible(true)
  }

  // 프로필 이미지 업로드 처리
  const handleProfileImageUpload = async () => {
    if (fileList.length === 0) {
      message.warning("이미지를 선택해주세요.")
      return
    }

    try {
      setUploadLoading(true)

      // 이미지 파일 처리 (실제 구현에서는 FormData 등을 사용하여 서버에 업로드)
      const file = fileList[0]

      // 프로필 이미지 URL (실제 구현에서는 서버 응답에서 받은 URL 사용)
      const profileImageUrl = URL.createObjectURL(file.originFileObj as Blob)

      // 프로필 업데이트 API 호출
      if (user) {
        await userApi.updateProfile({
          profileImage: profileImageUrl,
        })

        // 사용자 정보 업데이트
        const updatedUser = { ...user, profileImage: profileImageUrl }
        setUser(updatedUser)

        // Context 업데이트
        updateUser({ profileImage: profileImageUrl })

        message.success("프로필 이미지가 업데이트되었습니다.")
        setIsProfileImageModalVisible(false)

        // 페이지 새로고침
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      }
    } catch (error) {
      console.error("프로필 이미지 업로드 실패:", error)
      message.error("프로필 이미지 업로드에 실패했습니다.")
    } finally {
      setUploadLoading(false)
    }
  }

  // 업로드 속성 설정
  const uploadProps: UploadProps = {
    onRemove: () => {
      setFileList([])
    },
    beforeUpload: (file) => {
      // 이미지 파일 타입 검사
      const isImage = file.type.startsWith("image/")
      if (!isImage) {
        message.error("이미지 파일만 업로드할 수 있습니다!")
        return Upload.LIST_IGNORE
      }

      // 파일 크기 제한 (2MB)
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        message.error("이미지 크기는 2MB보다 작아야 합니다!")
        return Upload.LIST_IGNORE
      }

      setFileList([file])
      return false // 자동 업로드 방지
    },
    fileList,
  }

  const handleLogout = async () => {
    try {
      // 서버에 로그아웃 요청
      await userApi.logout()
    } catch (error) {
      console.error("로그아웃 API 호출 실패:", error)
    } finally {
      // Context의 logout 함수 호출
      logout()

      message.success("로그아웃되었습니다.")

      // 홈페이지로 리다이렉트
      router.push("/")

      // 페이지 새로고침 (확실한 로그아웃을 위해)
      setTimeout(() => {
        window.location.href = "/"
      }, 100)
    }
  }

  // 임시저장된 기록 이어서 작성하기
  const continueDraftStory = (storyId: number) => {
    router.push(`/story/edit/${storyId}`)
  }

  // 일상 기록 삭제 확인 모달 표시
  const showDeleteConfirm = (storyId: number) => {
    console.log("Deleting story with ID:", storyId)
    
    setDeletingStoryId(storyId)
    setIsDeleteStoryModalVisible(true)
    // Modal.confirm({
    //   title: "일상 기록 삭제",
    //   icon: <DeleteOutlined />,
    //   content: "정말로 이 일상 기록을 삭제하시겠습니까?",
    //   okText: "삭제",
    //   okType: "danger",
    //   cancelText: "취소",
    //   onOk() {
    //     handleDeleteStory(storyId)
    //   },
    // })

    // confirm({
    //   title: "일상 기록을 삭제하시겠습니까?",
    //   icon: <ExclamationCircleOutlined />,
    //   content: "삭제된 기록은 복구할 수 없습니다.",
    //   okText: "삭제",
    //   okType: "danger",
    //   cancelText: "취소",
    //   onOk: () => handleDeleteStory(storyId),
    // })
  }

  // 일상 기록 삭제 처리
  const handleDeleteStory = async (storyId: number) => {
    try {
      // setDeletingStoryId(storyId)
      await storyApi.deleteStory(Number(storyId))

      // 삭제 후 목록에서 제거
      setStories(stories.filter((story) => story.id !== storyId))

      message.success("일상 기록이 삭제되었습니다.")
    } catch (error) {
      console.error("일상 기록 삭제 실패:", error)
      message.error("일상 기록 삭제에 실패했습니다.")
    } finally {
      setDeletingStoryId(null)
    }
  }

  if (loading) {
    return (
      <Layout>
        <Header style={{ background: "#fff", padding: "0 20px", width: "100%" }}>
          <Skeleton.Avatar size="large" active style={{ marginRight: 16 }} />
          <Skeleton.Input style={{ width: 200 }} active />
        </Header>
        <Content style={{ padding: "20px", width: "100%" }}>
          <Card style={{ width: "100%" }}>
            <Skeleton active avatar paragraph={{ rows: 4 }} />
          </Card>
        </Content>
      </Layout>
    )
  }

  if (!user) {
    return (
      <Layout>
        <Header style={{ background: "#fff", padding: "0 20px", width: "100%" }}>
          <Title level={3} style={{ margin: "16px 0" }}>
            내 프로필
          </Title>
        </Header>
        <Content style={{ padding: "20px", width: "100%" }}>
          <Card style={{ width: "100%", textAlign: "center", padding: "40px" }}>
            <Empty description="사용자 정보를 찾을 수 없습니다." />
            <Button type="primary" style={{ marginTop: "20px" }} onClick={() => router.push("/login")}>
              로그인하기
            </Button>
          </Card>
        </Content>
      </Layout>
    )
  }

  return (
    <Layout style={{ width: "100%" }}>
      <Header style={{ background: "#fff", padding: "0 20px", display: "flex", alignItems: "center", width: "100%" }}>
        <Title level={3} style={{ margin: "16px 0" }}>
          내 프로필
        </Title>
      </Header>
      <Content style={{ padding: "20px", width: "100%" }}>
        <Card style={{ width: "100%" }}>
          <div style={{ display: "flex", alignItems: "flex-start", marginBottom: "24px" }}>
            {/* 프로필 이미지 섹션 */}
            <div style={{ position: "relative", marginRight: "24px" }}>
              <Avatar size={100} src={user.profileImage} icon={!user.profileImage && <UserOutlined />} />
              <Tooltip title="프로필 이미지 변경">
                <Button
                  type="primary"
                  shape="circle"
                  icon={<CameraOutlined />}
                  size="small"
                  onClick={showProfileImageModal}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  }}
                />
              </Tooltip>
            </div>

            {/* 사용자 정보 섹션 */}
            <div style={{ flex: 1 }}>
              {/* 닉네임 섹션 */}
              <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                {isEditingNickname ? (
                  <Form form={nicknameForm} layout="inline" onFinish={saveNickname}>
                    <Form.Item
                      name="nickname"
                      rules={[{ required: true, message: "닉네임을 입력해주세요!" }]}
                      style={{ marginBottom: 0, marginRight: "8px" }}
                    >
                      <Input ref={nicknameInputRef} />
                    </Form.Item>
                    <Button
                      type="primary"
                      icon={<SaveOutlined />}
                      onClick={saveNickname}
                      style={{ marginRight: "4px" }}
                    />
                    <Button icon={<CloseOutlined />} onClick={cancelEditingNickname} />
                  </Form>
                ) : (
                  <>
                    <Title level={3} style={{ margin: "0 8px 0 0" }}>
                      {user.nickname}
                    </Title>
                    <Tooltip title="닉네임 변경">
                      <Button type="text" icon={<EditOutlined />} onClick={startEditingNickname} size="small" />
                    </Tooltip>
                  </>
                )}
              </div>

              <Text type="secondary" style={{ display: "block" }}>
                {user.email}
              </Text>

              {user.bio && <Paragraph style={{ marginTop: "8px" }}>{user.bio}</Paragraph>}

              <Text type="secondary" style={{ display: "block", marginTop: "8px" }}>
                <CalendarOutlined style={{ marginRight: "8px" }} />
                가입일: {new Date(user.createdAt).toLocaleDateString()}
              </Text>

              {user.authType && (
                <Text type="secondary" style={{ display: "block", marginTop: "4px" }}>
                  로그인 방식:{" "}
                  {user.authType === "EMAIL_PASSWORD"
                    ? "이메일/비밀번호"
                    : user.authType === "OAUTH"
                      ? "소셜 로그인"
                      : user.authType === "HYBRID"
                        ? "하이브리드"
                        : user.authType}
                </Text>
              )}
            </div>

            {/* 액션 버튼 섹션 */}
            <div>
              <Tooltip title={isOAuthUser ? "비밀번호 추가" : "비밀번호 변경"}>
                <Button
                  icon={isOAuthUser ? <PlusOutlined /> : <KeyOutlined />}
                  onClick={showPasswordModal}
                  style={{ marginBottom: "8px" }}
                >
                  {isOAuthUser ? "비밀번호 추가하기" : "비밀번호 변경"}
                </Button>
              </Tooltip>
              <br />
              <Button danger onClick={handleLogout}>
                로그아웃
              </Button>
            </div>
          </div>

          <Tabs defaultActiveKey="all" onChange={setActiveTab}>
            <TabPane
              tab={
                <span>
                  <BookOutlined />
                  모든 일상 기록
                </span>
              }
              key="all"
            >
              <div style={{ marginBottom: "16px" }}>
                <Button type="primary" onClick={() => router.push("/story/register")}>
                  새 일상 기록하기
                </Button>
              </div>

              {filteredStories && filteredStories.length > 0 ? (
                <List
                  itemLayout="horizontal"
                  dataSource={filteredStories}
                  renderItem={(story) => {
                    const statusConfig =
                      STATUS_CONFIG[story.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.ARCHIVED

                    return (
                      <List.Item
                        actions={[
                          story.status === "DRAFT" ? (
                            <Button key="continue" type="primary" onClick={() => continueDraftStory(story.id)}>
                              이어서 작성
                            </Button>
                          ) : (
                            <Button key="view" type="link" onClick={() => router.push(`/story/${story.id}`)}>
                              보기
                            </Button>
                          ),
                          <Button key="edit" type="link" onClick={() => router.push(`/story/edit/${story.id}`)}>
                            수정
                          </Button>,
                          <Button
                            key="delete"
                            type="link"
                            danger
                            icon={<DeleteOutlined />}
                            loading={deletingStoryId === story.id}
                            onClick={() => showDeleteConfirm(story.id)}
                          >
                            삭제
                          </Button>,
                        ]}
                      >
                        <List.Item.Meta
                          title={
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <span>{story.title}</span>
                              <Tag color="blue" style={{ marginLeft: "8px" }}>
                                {getStoryCategoryLabel(story.category)}
                                {/* {STORY_CATEGORIES[story.category] || story.category} */}
                              </Tag>
                              <Tag color={statusConfig.color} icon={statusConfig.icon} style={{ marginLeft: "8px" }}>
                                {statusConfig.text}
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
                    )
                  }}
                />
              ) : (
                <Empty description="작성한 일상 기록이 없습니다." />
              )}
            </TabPane>
            <TabPane
              tab={
                <span>
                  <ClockCircleOutlined />
                  임시저장
                </span>
              }
              key="DRAFT"
            >
              {filteredStories && filteredStories.length > 0 ? (
                <List
                  itemLayout="horizontal"
                  dataSource={filteredStories}
                  renderItem={(story) => (
                    <List.Item
                      actions={[
                        <Button key="continue" type="primary" onClick={() => continueDraftStory(story.id)}>
                          이어서 작성
                        </Button>,
                        <Button key="edit" type="link" onClick={() => router.push(`/story/edit/${story.id}`)}>
                          수정
                        </Button>,
                        <Button
                          key="delete"
                          type="link"
                          danger
                          icon={<DeleteOutlined />}
                          loading={deletingStoryId === story.id}
                          onClick={() => showDeleteConfirm(story.id)}
                        >
                          삭제
                        </Button>,
                      ]}
                    >
                      <List.Item.Meta
                        title={
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <span>{story.title}</span>
                            <Tag color="blue" style={{ marginLeft: "8px" }}>
                              {getStoryCategoryLabel(story.category)}
                              {/* {STORY_CATEGORIES[story.category] || story.category} */}
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
                <Empty description="임시저장된 일상 기록이 없습니다." />
              )}
            </TabPane>
            <TabPane
              tab={
                <span>
                  <CheckCircleOutlined />
                  완료된 기록
                </span>
              }
              key="ARCHIVED"
            >
              {filteredStories && filteredStories.length > 0 ? (
                <List
                  itemLayout="horizontal"
                  dataSource={filteredStories}
                  renderItem={(story) => (
                    <List.Item
                      actions={[
                        <Button key="view" type="link" onClick={() => router.push(`/story/${story.id}`)}>
                          보기
                        </Button>,
                        <Button key="edit" type="link" onClick={() => router.push(`/story/edit/${story.id}`)}>
                          수정
                        </Button>,
                        <Button
                          key="delete"
                          type="link"
                          danger
                          icon={<DeleteOutlined />}
                          loading={deletingStoryId === story.id}
                          onClick={() => showDeleteConfirm(story.id)}
                        >
                          삭제
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
                <Empty description="완료된 일상 기록이 없습니다." />
              )}
            </TabPane>
          </Tabs>
        </Card>
      </Content>

      {/* 비밀번호 변경/추가 모달 */}
      <Modal
        title={isOAuthUser ? "비밀번호 추가" : "비밀번호 변경"}
        open={isPasswordModalVisible}
        onCancel={() => setIsPasswordModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsPasswordModalVisible(false)}>
            취소
          </Button>,
          <Button key="submit" type="primary" onClick={handlePasswordChange} loading={passwordLoading}>
            {isOAuthUser ? "추가" : "변경"}
          </Button>,
        ]}
      >
        <Form form={passwordForm} layout="vertical">
          {/* OAuth 사용자가 아닌 경우에만 현재 비밀번호 입력 필드 표시 */}
          {!isOAuthUser && (
            <Form.Item
              name="currentPassword"
              label="현재 비밀번호"
              rules={[{ required: true, message: "현재 비밀번호를 입력해주세요!" }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="현재 비밀번호" />
            </Form.Item>
          )}

          <Form.Item
            name="newPassword"
            label="새 비밀번호"
            rules={[
              { required: true, message: "새 비밀번호를 입력해주세요!" },
              { min: 8, message: "비밀번호는 8자 이상이어야 합니다!" },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="새 비밀번호" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="비밀번호 확인"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "비밀번호를 다시 입력해주세요!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error("비밀번호가 일치하지 않습니다!"))
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="비밀번호 확인" />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="프로필 이미지 변경"
        open={isProfileImageModalVisible}
        onOk={handleProfileImageUpload}
        onCancel={() => setIsProfileImageModalVisible(false)}
        okText="변경"
        cancelText="취소"
        okButtonProps={{ loading: uploadLoading }}
      >
        <Upload listType="picture-card" maxCount={1} {...uploadProps}>
          <div>
            <UploadOutlined />
            <div style={{ marginTop: 8 }}>이미지 업로드</div>
          </div>
        </Upload>
        <p style={{ marginTop: 8, color: "#888" }}>* 2MB 이하의 이미지 파일만 업로드 가능합니다.</p>
      </Modal>
      <Modal
        title="일상 기록 삭제"
        open={isDeleteStoryModalVisible}
        okText="삭제"
        okType="danger"
        cancelText="취소"
        onOk={() => {
          handleDeleteStory(deletingStoryId as number);
          setIsDeleteStoryModalVisible(false);  // 모달 닫기
        }}
        onCancel={() =>{
          setDeletingStoryId(null)
          setIsDeleteStoryModalVisible(false)
        }}
        >
        <div>정말로 이 일상 기록을 삭제하시겠습니까?</div>
      </Modal>
    </Layout>
  )
}