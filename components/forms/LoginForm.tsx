// "use client"

// import { Button, Card, Form, Input, Typography, Divider, message, Checkbox } from "antd"
// import { GoogleOutlined } from "@ant-design/icons"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { userApi } from "@api/api-client"
// import TokenStorage from "@/utils/storage/tokenStorage"
// import UserStorage from "@/utils/storage/userStorage"
// import styles from "@/styles/auth.module.css"

// const { Title, Text } = Typography

// interface LoginResponse {
//   id: number
//   email: string
//   nickname: string
//   accessToken: string | null
// }

// const LoginForm = () => {
//   const router = useRouter()

//   const onFinish = async (values: { email: string; password: string; rememberMe?: boolean }) => {
//     try {
//       // 로그인 API 호출
//       const response = await userApi.login(values)
//       const userData: LoginResponse = response.data

//       // 토큰 저장 (rememberMe 옵션 전달)
//       if (userData.accessToken) {
//         // 토큰에서 Bearer 접두사 제거 (이미 있는 경우)
//         const token = userData.accessToken.startsWith("Bearer ")
//           ? userData.accessToken.substring(7)
//           : userData.accessToken

//         TokenStorage.setToken(token, values.rememberMe || false)
//       }

//       // 사용자 정보 저장
//       UserStorage.setUser({
//         id: userData.id,
//         email: userData.email,
//         nickname: userData.nickname,
//       })

//       message.success("로그인에 성공했습니다.")
//       router.push("/")
//     } catch (error) {
//       console.error("로그인 실패:", error)
//       message.error("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.")
//     }
//   }

//   const handleSocialLogin = (provider: string) => {
//     // OAuth 로그인 처리 - 서버의 인증 URL로 리다이렉트
//     window.location.href = `/user-service/oauth2/authorize/${provider}`
//   }

//   return (
//     <div className={styles.container}>
//       <Card className={styles.card}>
//         <Title level={3} className={styles.title}>
//           로그인
//         </Title>

//         <Form name="login" onFinish={onFinish} layout="vertical" size="large">
//           <Form.Item label="이메일" name="email" rules={[{ required: true, message: "이메일을 입력하세요!" }]}>
//             <Input placeholder="example@email.com" />
//           </Form.Item>

//           <Form.Item label="비밀번호" name="password" rules={[{ required: true, message: "비밀번호를 입력하세요!" }]}>
//             <Input.Password placeholder="비밀번호" />
//           </Form.Item>

//           <Form.Item name="rememberMe" valuePropName="checked">
//             <Checkbox>로그인 상태 유지</Checkbox>
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary" htmlType="submit" block>
//               로그인
//             </Button>
//           </Form.Item>
//         </Form>

//         <Divider>또는 소셜 로그인</Divider>

//         <div className={styles.socialButtons}>
//           <Button icon={<GoogleOutlined />} onClick={() => handleSocialLogin("google")} block>
//             Google로 로그인
//           </Button>

//           <Button
//             icon={<img src="/naver_logo.png" alt="naver" className={styles.socialButtonIcon} />}
//             onClick={() => handleSocialLogin("naver")}
//             block
//             className={styles.naverButton}
//           >
//             네이버로 로그인
//           </Button>

//           <Button
//             icon={<img src="/kakao_logo.png" alt="kakao" className={styles.socialButtonIcon} />}
//             onClick={() => handleSocialLogin("kakao")}
//             block
//             className={styles.kakaoButton}
//           >
//             카카오로 로그인
//           </Button>
//         </div>

//         <div className={styles.footer}>
//           <Text>계정이 없으신가요? </Text>
//           <Link href="/signup" className="text-blue-500">
//             회원가입
//           </Link>
//         </div>
//       </Card>
//     </div>
//   )
// }

// export default LoginForm

"use client"

import { Button, Card, Form, Input, Typography, Divider, message, Checkbox } from "antd"
import { GoogleOutlined } from "@ant-design/icons"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { userApi } from "@api/api-client"
import styles from "@/styles/auth.module.css"
// 상단에 useAuth import 추가
import { useAuth } from "@/components/auth/AuthContext"

const { Title, Text } = Typography

interface LoginResponse {
  id: number
  email: string
  nickname: string
  accessToken: string | null
  authType: string
}

// LoginForm 컴포넌트 내부에서 useAuth 사용
const LoginForm = () => {
  const router = useRouter()
  const { login } = useAuth() // AuthContext에서 login 함수 가져오기

  const onFinish = async (values: { email: string; password: string; rememberMe?: boolean }) => {
    try {
      // 로그인 API 호출
      const response = await userApi.login(values)
      const userData: LoginResponse = response.data

      // 토큰 저장 및 사용자 정보 저장 (AuthContext 사용)
      if (userData.accessToken) {
        // 토큰에서 Bearer 접두사 제거 (이미 있는 경우)
        const token = userData.accessToken.startsWith("Bearer ")
          ? userData.accessToken.substring(7)
          : userData.accessToken

        // AuthContext의 login 함수 호출
        login(
          {
            id: userData.id,
            email: userData.email,
            nickname: userData.nickname,
            authType: userData.authType
          },
          token,
          values.rememberMe || false,
        )
      }

      message.success("로그인에 성공했습니다.")
      
      router.push("/")
    } catch (error) {
      console.error("로그인 실패:", error)
      message.error("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.")
    }
  }

  const handleSocialLogin = (provider: string) => {
    // 절대 경로 사용
    window.location.href = `/user-service/oauth2/authorize/${provider}`
  }

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Title level={3} className={styles.title}>
          로그인
        </Title>

        <Form name="login" onFinish={onFinish} layout="vertical" size="large">
          <Form.Item label="이메일" name="email" rules={[{ required: true, message: "이메일을 입력하세요!" }]}>
            <Input placeholder="example@email.com" />
          </Form.Item>

          <Form.Item label="비밀번호" name="password" rules={[{ required: true, message: "비밀번호를 입력하세요!" }]}>
            <Input.Password placeholder="비밀번호" />
          </Form.Item>

          <Form.Item name="rememberMe" valuePropName="checked">
            <Checkbox>로그인 상태 유지</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              로그인
            </Button>
          </Form.Item>
        </Form>

        <Divider>또는 소셜 로그인</Divider>

        <div className={styles.socialButtons}>
          <Button icon={<GoogleOutlined />} onClick={() => handleSocialLogin("google")} block>
            Google로 로그인
          </Button>

          <Button
            icon={<img src="/naver_logo.png" alt="naver" className={styles.socialButtonIcon} />}
            onClick={() => handleSocialLogin("naver")}
            block
            className={styles.naverButton}
          >
            네이버로 로그인
          </Button>

          <Button
            icon={<img src="/kakao_logo.png" alt="kakao" className={styles.socialButtonIcon} />}
            onClick={() => handleSocialLogin("kakao")}
            block
            className={styles.kakaoButton}
          >
            카카오로 로그인
          </Button>
        </div>

        <div className={styles.footer}>
          <Text>계정이 없으신가요? </Text>
          <Link href="/signup" className="text-blue-500">
            회원가입
          </Link>
        </div>
      </Card>
    </div>
  )
}

export default LoginForm

