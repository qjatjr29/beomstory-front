
// "use client"

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import Image from "next/image"
// import { Layout, Menu, Button, Input, Drawer, Divider, Avatar, Dropdown, Modal, message } from "antd"
// import { MenuOutlined, UserOutlined, LogoutOutlined, BookOutlined } from "@ant-design/icons"
// import styles from "@/styles/header.module.css"
// import { userApi } from "@api/api-client"
// import { useAuth } from "@/components/auth/AuthContext"
// import TokenStorage from "@/utils/storage/tokenStorage"
// import UserStorage from "@/utils/storage/userStorage"

// const { Header: AntHeader } = Layout
// const { Search } = Input

// interface HeaderProps {
//   full?: boolean
//   isLoading?: boolean
// }

// export default function Header({ full, isLoading = false }: HeaderProps) {
//   const router = useRouter()
//   const { isLoggedIn, user, logout: authLogout } = useAuth() // AuthContext에서 상태 가져오기
//   const [drawerVisible, setDrawerVisible] = useState(false)
//   const [modalVisible, setModalVisible] = useState(false)
//   const [logoutModalVisible, setLogoutModalVisible] = useState(false)
//   const [localIsLoggedIn, setLocalIsLoggedIn] = useState(false)
//   const [localUser, setLocalUser] = useState<any>(null)

//   // 컴포넌트 마운트 시 로그인 상태 확인
//   useEffect(() => {
//     const checkLoginStatus = () => {
//       const token = TokenStorage.getToken()
//       const storedUser = UserStorage.getUser()

//       setLocalIsLoggedIn(!!token && !!storedUser)
//       setLocalUser(storedUser)

//     }

//     // 초기 로드 시 확인
//     checkLoginStatus()

//     // 스토리지 변경 이벤트 리스너 추가
//     const handleStorageChange = () => {
//       checkLoginStatus()
//     }

//     window.addEventListener("storage", handleStorageChange)

//     // 주기적으로 로그인 상태 확인 (1초마다)
//     // const intervalId = setInterval(checkLoginStatus, 1000)

//     return () => {
//       window.removeEventListener("storage", handleStorageChange)
//       // clearInterval(intervalId)
//     }
//   }, [])

//   // AuthContext의 상태가 변경될 때마다 로컬 상태 업데이트
//   useEffect(() => {
//     setLocalIsLoggedIn(isLoggedIn)
//     setLocalUser(user)

//   }, [isLoggedIn, user])

//   const showDrawer = () => {
//     setDrawerVisible(true)
//   }

//   const closeDrawer = () => {
//     setDrawerVisible(false)
//   }

//   const handleSearch = (value: string) => {
//     if (value) {
//       router.push(`/search?keyword=${encodeURIComponent(value)}`)
//       closeDrawer()
//     }
//   }

//   const handleGoLogin = () => {
//     setModalVisible(false)
//     router.push("/login")
//   }

//   const onClickCreate = () => {
//     if (!localIsLoggedIn) {
//       setModalVisible(true)
//       return
//     }
//     router.push("/story/register")
//   }

//   // 로그아웃 모달 표시
//   const showLogoutModal = () => {
//     setLogoutModalVisible(true)
//   }

//   // 로그아웃 처리 함수 수정
//   const performLogout = async () => {
//     try {
//       // 서버에 로그아웃 요청
//       await userApi.logout()
//     } catch (error) {
//       console.error("로그아웃 API 호출 실패:", error)
//     } finally {
//       // AuthContext의 logout 함수 호출
//       authLogout()

//       setLogoutModalVisible(false)
//       message.success("로그아웃되었습니다.")

//       // 홈페이지로 리다이렉트
//       router.push("/")

//       // 페이지 새로고침 (확실한 로그아웃을 위해)
//       setTimeout(() => {
//         window.location.href = "/"
//       }, 100)
//     }
//   }

//   const menuItems = [{ key: "all-stories", label: <Link href="/story">모든 일상 기록 보기</Link> }]

//   // 로그인한 사용자를 위한 드롭다운 메뉴 아이템
//   const userMenuItems = [
//     {
//       key: "my-stories",
//       icon: <BookOutlined />,
//       label: "내 일상 기록 보기",
//       onClick: () => router.push("/user/profile#stories"),
//     },
//     {
//       key: "profile",
//       icon: <UserOutlined />,
//       label: "내 정보 보기",
//       onClick: () => router.push("/user/profile"),
//     },
//     {
//       key: "logout",
//       icon: <LogoutOutlined />,
//       label: "로그아웃",
//       onClick: showLogoutModal,
//     },
//   ]

//   // 사용자 정보 가져오기
//   const nickname = localUser?.nickname || ""
//   const profileImage = localUser?.profileImage || null
//   const userId = localUser?.id ? String(localUser.id) : null

//   if (full) {
//     return (
//       <AntHeader className={styles.headerContainer}>
//         <div className={styles.fullInner}>
//           <div className={styles.leftArea}>
//             <Link href="/">
//               <Image src="/images/logo.png" alt="로고" width={130} height={35}/>
//             </Link>
//           </div>
//           <div className={styles.buttons}>
//             {localIsLoggedIn && (
//               <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
//                 <Avatar
//                   src={profileImage}
//                   icon={!profileImage ? <UserOutlined /> : undefined}
//                   style={{ cursor: "pointer" }}
//                 />
//               </Dropdown>
//             )}
//           </div>
//         </div>
//       </AntHeader>
//     )
//   }

//   return (
//     <>
//       {/* 로그인 필요 모달 */}
//       <Modal
//         title="로그인 필요"
//         open={modalVisible}
//         onCancel={() => setModalVisible(false)}
//         onOk={handleGoLogin}
//         okText="확인"
//         cancelText="취소"
//       >
//         <p>로그인이 필요한 서비스입니다.</p>
//         <p>로그인 페이지로 이동할까요?</p>
//       </Modal>

//       {/* 로그아웃 확인 모달 - 정적 함수 대신 컴포넌트 사용 */}
//       <Modal
//         title="로그아웃"
//         open={logoutModalVisible}
//         onCancel={() => setLogoutModalVisible(false)}
//         onOk={performLogout}
//         okText="확인"
//         cancelText="취소"
//       >
//         <p>정말 로그아웃하시겠습니까?</p>
//       </Modal>

//       <Drawer title="메뉴" placement="left" onClose={closeDrawer} open={drawerVisible} width={280}>
//         <Menu mode="vertical" items={menuItems} style={{ border: "none" }} onClick={closeDrawer} />

//         {localIsLoggedIn && (
//           <>
//             <Divider />
//             <Menu
//               mode="vertical"
//               style={{ border: "none" }}
//               items={[
//                 {
//                   key: "my-stories",
//                   icon: <BookOutlined />,
//                   label: "내 일상 기록 보기",
//                   onClick: () => {
//                     router.push("/user/profile#stories")
//                     closeDrawer()
//                   },
//                 },
//                 {
//                   key: "profile",
//                   icon: <UserOutlined />,
//                   label: "내 정보 보기",
//                   onClick: () => {
//                     router.push("/user/profile")
//                     closeDrawer()
//                   },
//                 },
//               ]}
//             />
//           </>
//         )}

//         <Divider />

//         <div className={styles.drawerSearch}>
//           <Search placeholder="일상 기록을 검색해보세요" onSearch={handleSearch} style={{ marginTop: 16 }} />
//         </div>

//         <div className={styles.drawerButtons}>
//           <Button
//             type="primary"
//             onClick={() => {
//               onClickCreate()
//               closeDrawer()
//             }}
//             style={{ marginTop: 16, width: "100%" }}
//           >
//             일상 기록
//           </Button>

//           {!localIsLoggedIn && !isLoading && (
//             <Link href="/login">
//               <Button style={{ marginTop: 16, width: "100%" }}>로그인</Button>
//             </Link>
//           )}

//           {!localIsLoggedIn && !isLoading && (
//             <Link href="/signup">
//               <Button style={{ marginTop: 16, width: "100%" }}>회원가입</Button>
//             </Link>
//           )}

//           {localIsLoggedIn && (
//             <Button
//               danger
//               onClick={() => {
//                 showLogoutModal()
//                 closeDrawer()
//               }}
//               style={{ marginTop: 16, width: "100%" }}
//             >
//               로그아웃
//             </Button>
//           )}
//         </div>
//       </Drawer>

//       <AntHeader className={styles.headerContainer}>
//         <div className={styles.pageContainer}>
//           <div className={styles.inner}>
//             {/* 왼쪽 섹션: 로고와 메뉴 */}
//             <div className={styles.leftSection}>
//               <div className={styles.logoContainer}>
//                 <Link href="/">
//                   <Image src="/images/logo.png" alt="로고" width={60} height={35} />
                
//                 </Link>
//               </div>

//               {/* 햄버거 메뉴 (모바일) */}
//               <Button type="text" icon={<MenuOutlined />} onClick={showDrawer} className={styles.mobileMenuButton} />

//               {/* 데스크탑 메뉴 */}
//               <div className={styles.menuContainer}>
//                 <Menu mode="horizontal" items={menuItems} className={styles.menu} disabledOverflow />
//               </div>
//             </div>

//             <div className={styles.centerSection}>
//               <div className={styles.searchContainer}>
//                 <Search
//                   placeholder="일상 기록을 검색해보세요."
//                   onSearch={handleSearch}
//                   className={styles.searchInput}
//                   style={{ margin: "0 auto", display: "flex" }}
//                 />
//               </div>
//             </div>

//             {/* 오른쪽 섹션: 액션 버튼들 */}
//             <div className={styles.rightSection}>
//               <div className={styles.actionButtons}>
//                 <Button type="primary" onClick={onClickCreate} className={styles.registerButton}>
//                   일상 기록
//                 </Button>

//                 {!localIsLoggedIn && !isLoading && (
//                   <Link href="/login" className={styles.loginButton}>
//                     <Button>로그인</Button>
//                   </Link>
//                 )}

//                 {!localIsLoggedIn && !isLoading && (
//                   <Link href="/signup" className={styles.loginButton}>
//                     <Button>회원가입</Button>
//                   </Link>
//                 )}

//                 {localIsLoggedIn && !isLoading && userId && (
//                   <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
//                     <Link href={`/user/${userId}`}>
//                       <Avatar
//                         src={profileImage}
//                         icon={!profileImage ? <UserOutlined /> : undefined}
//                         style={{ cursor: "pointer" }}
//                       />
//                     </Link>
//                   </Dropdown>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </AntHeader>
//     </>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Layout, Menu, Button, Input, Drawer, Divider, Avatar, Dropdown, Modal, message } from "antd"
import { MenuOutlined, UserOutlined, LogoutOutlined, BookOutlined } from "@ant-design/icons"
import styles from "@/styles/header.module.css"
import { userApi } from "@api/api-client"
import { useAuth } from "@/components/auth/AuthContext"
import TokenStorage from "@/utils/storage/tokenStorage"
import UserStorage from "@/utils/storage/userStorage"

const { Header: AntHeader } = Layout
const { Search } = Input

interface HeaderProps {
  full?: boolean
  isLoading?: boolean
}

export default function Header({ full, isLoading = false }: HeaderProps) {
  const router = useRouter()
  const { isLoggedIn, user, logout: authLogout } = useAuth() // AuthContext에서 상태 가져오기
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [logoutModalVisible, setLogoutModalVisible] = useState(false)
  const [localIsLoggedIn, setLocalIsLoggedIn] = useState(false)
  const [localUser, setLocalUser] = useState<any>(null)

  // 컴포넌트 마운트 시 로그인 상태 확인
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = TokenStorage.getToken()
      const storedUser = UserStorage.getUser()

      setLocalIsLoggedIn(!!token && !!storedUser)
      setLocalUser(storedUser)

      // console.log("Header - 로그인 상태 확인:", !!token && !!storedUser)
      // console.log("Header - 사용자 정보:", storedUser)
    }

    // 초기 로드 시 확인
    checkLoginStatus()

    // 스토리지 변경 이벤트 리스너 추가
    const handleStorageChange = () => {
      checkLoginStatus()
    }

    window.addEventListener("storage", handleStorageChange)

    // 주기적으로 로그인 상태 확인 (1초마다)
    const intervalId = setInterval(checkLoginStatus, 1000)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      clearInterval(intervalId)
    }
  }, [])

  // AuthContext의 상태가 변경될 때마다 로컬 상태 업데이트
  useEffect(() => {
    setLocalIsLoggedIn(isLoggedIn)
    setLocalUser(user)

    console.log("Header - AuthContext 상태 변경:", isLoggedIn, user)
  }, [isLoggedIn, user])

  const showDrawer = () => {
    setDrawerVisible(true)
  }

  const closeDrawer = () => {
    setDrawerVisible(false)
  }

  const handleSearch = (value: string) => {
    if (value) {
      router.push(`/search?keyword=${encodeURIComponent(value)}`)
      closeDrawer()
    }
  }

  const handleGoLogin = () => {
    setModalVisible(false)
    router.push("/login")
  }

  const onClickCreate = () => {
    if (!localIsLoggedIn) {
      setModalVisible(true)
      return
    }
    router.push("/story/register")
  }

  // 로그아웃 모달 표시
  const showLogoutModal = () => {
    setLogoutModalVisible(true)
  }

  // 로그아웃 처리 함수 수정
  const performLogout = async () => {
    try {
      // 서버에 로그아웃 요청
      await userApi.logout()
    } catch (error) {
      console.error("로그아웃 API 호출 실패:", error)
    } finally {
      // AuthContext의 logout 함수 호출
      authLogout()

      setLogoutModalVisible(false)
      message.success("로그아웃되었습니다.")

      // 홈페이지로 리다이렉트
      router.push("/")

      // 페이지 새로고침 (확실한 로그아웃을 위해)
      setTimeout(() => {
        window.location.href = "/"
      }, 100)
    }
  }

  const menuItems = [{ key: "all-stories", label: <Link href="/story">모든 일상 기록 보기</Link> }]

  // 로그인한 사용자를 위한 드롭다운 메뉴 아이템
  const userMenuItems = [
    {
      key: "my-stories",
      icon: <BookOutlined />,
      label: "내 일상 기록 보기",
      onClick: () => router.push("/user/profile#stories"),
    },
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "내 정보 보기",
      onClick: () => router.push("/user/profile"),
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "로그아웃",
      onClick: showLogoutModal,
    },
  ]

  // 사용자 정보 가져오기
  const nickname = localUser?.nickname || ""
  const profileImage = localUser?.profileImage || null
  const userId = localUser?.id ? String(localUser.id) : null

  if (full) {
    return (
      <AntHeader className={styles.headerContainer}>
        <div className={styles.fullInner}>
          <div className={styles.leftArea}>
            <Link href="/">
              <Image src="images/logo.png" alt="로고" width={130} height={35} objectFit={"contain"} />
              {/* <img src="/logo.png" alt="로고" style={{ width: 130, height: 35, objectFit: "contain" }} /> */}
            </Link>
          </div>
          <div className={styles.buttons}>
            {localIsLoggedIn && (
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                <Avatar
                  src={profileImage}
                  icon={!profileImage ? <UserOutlined /> : undefined}
                  style={{ cursor: "pointer" }}
                />
              </Dropdown>
            )}
          </div>
        </div>
      </AntHeader>
    )
  }

  return (
    <>
      {/* 로그인 필요 모달 */}
      <Modal
        title="로그인 필요"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleGoLogin}
        okText="확인"
        cancelText="취소"
      >
        <p>로그인이 필요한 서비스입니다.</p>
        <p>로그인 페이지로 이동할까요?</p>
      </Modal>

      {/* 로그아웃 확인 모달 - 정적 함수 대신 컴포넌트 사용 */}
      <Modal
        title="로그아웃"
        open={logoutModalVisible}
        onCancel={() => setLogoutModalVisible(false)}
        onOk={performLogout}
        okText="확인"
        cancelText="취소"
      >
        <p>정말 로그아웃하시겠습니까?</p>
      </Modal>

      <Drawer title="메뉴" placement="left" onClose={closeDrawer} open={drawerVisible} width={280}>
        <Menu mode="vertical" items={menuItems} style={{ border: "none" }} onClick={closeDrawer} />

        {localIsLoggedIn && (
          <>
            <Divider />
            <Menu
              mode="vertical"
              style={{ border: "none" }}
              items={[
                {
                  key: "my-stories",
                  icon: <BookOutlined />,
                  label: "내 일상 기록 보기",
                  onClick: () => {
                    router.push("/user/profile#stories")
                    closeDrawer()
                  },
                },
                {
                  key: "profile",
                  icon: <UserOutlined />,
                  label: "내 정보 보기",
                  onClick: () => {
                    router.push("/user/profile")
                    closeDrawer()
                  },
                },
              ]}
            />
          </>
        )}

        <Divider />

        <div className={styles.drawerSearch}>
          <Search placeholder="일상 기록을 검색해보세요" onSearch={handleSearch} style={{ marginTop: 16 }} />
        </div>

        <div className={styles.drawerButtons}>
          <Button
            type="primary"
            onClick={() => {
              onClickCreate()
              closeDrawer()
            }}
            style={{ marginTop: 16, width: "100%" }}
          >
            일상 기록
          </Button>

          {!localIsLoggedIn && !isLoading && (
            <Link href="/login">
              <Button style={{ marginTop: 16, width: "100%" }}>로그인</Button>
            </Link>
          )}

          {!localIsLoggedIn && !isLoading && (
            <Link href="/signup">
              <Button style={{ marginTop: 16, width: "100%" }}>회원가입</Button>
            </Link>
          )}

          {localIsLoggedIn && (
            <Button
              danger
              onClick={() => {
                showLogoutModal()
                closeDrawer()
              }}
              style={{ marginTop: 16, width: "100%" }}
            >
              로그아웃
            </Button>
          )}
        </div>
      </Drawer>

      <AntHeader className={styles.headerContainer}>
        <div className={styles.pageContainer}>
          <div className={styles.inner}>
            {/* 왼쪽 섹션: 로고와 메뉴 */}
            <div className={styles.leftSection}>
              <div className={styles.logoContainer}>
                <Link href="/">
                  <Image src="/images/logo.png" alt="로고" width={50} height={35} objectFit="contain"  margin-top="2px" />             
  
                </Link>
              </div>

              {/* 햄버거 메뉴 (모바일) */}
              <Button type="text" icon={<MenuOutlined />} onClick={showDrawer} className={styles.mobileMenuButton} />

              {/* 데스크탑 메뉴 */}
              {/* <div className={styles.menuContainer}>
                <Menu mode="horizontal" items={menuItems} className={styles.menu} disabledOverflow />
              </div> */}
            </div>

            <div className={styles.centerSection}>
              <div className={styles.searchContainer}>
                <Search
                  placeholder="일상 기록을 검색해보세요."
                  onSearch={handleSearch}
                  className={styles.searchInput}
                  style={{ margin: "0 auto", display: "flex" }}
                />
              </div>
            </div>

            {/* 오른쪽 섹션: 액션 버튼들 */}
            <div className={styles.rightSection}>
              <div className={styles.actionButtons}>
                <Button type="primary" onClick={onClickCreate} className={styles.registerButton}>
                  일상 기록
                </Button>

                {!localIsLoggedIn && !isLoading && (
                  <Link href="/login" className={styles.loginButton}>
                    <Button>로그인</Button>
                  </Link>
                )}

                {!localIsLoggedIn && !isLoading && (
                  <Link href="/signup" className={styles.loginButton}>
                    <Button>회원가입</Button>
                  </Link>
                )}

                {localIsLoggedIn && !isLoading && userId && (
                  <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                    <Link href={`/user/${userId}`}>
                      <Avatar
                        src={profileImage}
                        icon={!profileImage ? <UserOutlined /> : undefined}
                        style={{ cursor: "pointer" }}
                      />
                    </Link>
                  </Dropdown>
                )}
              </div>
            </div>
          </div>
        </div>
      </AntHeader>
    </>
  )
}
