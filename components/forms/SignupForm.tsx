// "use client"

// import { Button, Form, Input, Typography, Divider, Modal, message } from "antd"
// import { GoogleOutlined } from "@ant-design/icons"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import styles from "@/styles/auth.module.css"
// import { userApi } from "@api/api-client"

// const { Title, Text } = Typography

// const SignupForm = () => {
//   const router = useRouter()

//   const showSuccessModal = () => {
//     Modal.success({
//       title: "회원가입 성공",
//       content: "회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.",
//       onOk: () => {
//         router.push("/login")
//       },
//     })
//   }

//   const onFinish = async (values: any) => {
//     try {
//       const { email, password, nickname } = values
//       const data = { email, password, username: nickname }

//       // API 호출 후 응답 처리
//       const response = await userApi.signup(data)

//       if (response.status === 200) {
//         // 회원가입 성공
//         showSuccessModal()
//       } else {
//         // 회원가입 실패
//         message.error(response.data.message || "회원가입에 실패했습니다.")
//       }
//     } catch (error: any) {
//       message.error(error.message || "회원가입 중 오류가 발생했습니다.")
//       console.error("회원가입 오류:", error)
//     }
//   }

//   const handleSocialLogin = (provider: string) => {
//     window.location.href = `http://localhost:8000/user-service/oauth2/authorize/${provider}`
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.card}>
//         <Title level={3} className={styles.title}>
//           회원가입
//         </Title>

//         <Form name="signup" onFinish={onFinish} layout="vertical" size="large">
//           <Form.Item
//             label="이메일"
//             name="email"
//             rules={[
//               { required: true, message: "이메일을 입력하세요!" },
//               { type: "email", message: "유효한 이메일 형식이 아닙니다!" },
//             ]}
//           >
//             <Input placeholder="example@email.com" />
//           </Form.Item>

//           <Form.Item
//             label="비밀번호"
//             name="password"
//             rules={[
//               { required: true, message: "비밀번호를 입력하세요!" },
//               { min: 8, message: "비밀번호는 8자 이상이어야 합니다!" },
//             ]}
//           >
//             <Input.Password placeholder="비밀번호" />
//           </Form.Item>

//           <Form.Item
//             label="비밀번호 확인"
//             name="confirmPassword"
//             dependencies={["password"]}
//             rules={[
//               { required: true, message: "비밀번호 확인을 입력하세요!" },
//               ({ getFieldValue }) => ({
//                 validator(_, value) {
//                   if (!value || getFieldValue("password") === value) {
//                     return Promise.resolve()
//                   }
//                   return Promise.reject(new Error("비밀번호가 일치하지 않습니다!"))
//                 },
//               }),
//             ]}
//           >
//             <Input.Password placeholder="비밀번호 확인" />
//           </Form.Item>

//           <Form.Item label="닉네임" name="nickname" rules={[{ required: true, message: "닉네임을 입력하세요!" }]}>
//             <Input placeholder="닉네임" />
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary" htmlType="submit" block>
//               회원가입
//             </Button>
//           </Form.Item>
//         </Form>

//         <Divider>또는 소셜 회원가입</Divider>

//         <div className={styles.socialButtons}>
//           <Button icon={<GoogleOutlined />} onClick={() => handleSocialLogin("google")} block>
//             Google로 회원가입
//           </Button>
//           <Button
//             icon={<img src="/naver_logo.png" alt="naver" className={styles.socialButtonIcon} />}
//             onClick={() => handleSocialLogin("naver")}
//             block
//             className={styles.naverButton}
//           >
//             네이버로 회원가입
//           </Button>
//           <Button
//             icon={<img src="/kakao_logo.png" alt="kakao" className={styles.socialButtonIcon} />}
//             onClick={() => handleSocialLogin("kakao")}
//             block
//             className={styles.kakaoButton}
//           >
//             카카오로 회원가입
//           </Button>
//         </div>

//         <div className={styles.footer}>
//           <Text>이미 계정이 있으신가요? </Text>
//           <Link href="/login" className="text-blue-500">
//             로그인
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SignupForm

"use client"

import { Button, Form, Input, Typography, Divider, Modal, message } from "antd"
import { GoogleOutlined } from "@ant-design/icons"
import Link from "next/link"
import { useRouter } from "next/navigation"
import styles from "@/styles/auth.module.css"
import { userApi } from "@api/api-client"

const { Title, Text } = Typography

const SignupForm = () => {
  const router = useRouter()

  const showSuccessModal = () => {
    Modal.success({
      title: "회원가입 성공",
      content: "회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.",
      onOk: () => {
        router.push("/login")
      },
    })
  }

  const onFinish = async (values: any) => {
    try {
      const { email, password, nickname } = values
      const data = { email, password, nickname: nickname }

      // API 호출 후 응답 처리
      const response = await userApi.signup(data)

      if (response.status === 200) {
        // 회원가입 성공
        showSuccessModal()
      } else {
        // 회원가입 실패
        message.error(response.data.message || "회원가입에 실패했습니다.")
        router.push("/")
      }
    } catch (error: any) {
      message.error(error.message || "회원가입 중 오류가 발생했습니다.")
      console.error("회원가입 오류:", error)
    }
  }

  const handleSocialLogin = (provider: string) => {
    // 서버의 OAuth 엔드포인트로 리다이렉트
    window.location.href = `http://localhost:8000/user-service/oauth2/authorize/${provider}`
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Title level={3} className={styles.title}>
          회원가입
        </Title>

        <Form name="signup" onFinish={onFinish} layout="vertical" size="large">
          <Form.Item
            label="이메일"
            name="email"
            rules={[
              { required: true, message: "이메일을 입력하세요!" },
              { type: "email", message: "유효한 이메일 형식이 아닙니다!" },
            ]}
          >
            <Input placeholder="example@email.com" />
          </Form.Item>

          <Form.Item
            label="비밀번호"
            name="password"
            rules={[
              { required: true, message: "비밀번호를 입력하세요!" },
              { min: 8, message: "비밀번호는 8자 이상이어야 합니다!" },
            ]}
          >
            <Input.Password placeholder="비밀번호" />
          </Form.Item>

          <Form.Item
            label="비밀번호 확인"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "비밀번호 확인을 입력하세요!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error("비밀번호가 일치하지 않습니다!"))
                },
              }),
            ]}
          >
            <Input.Password placeholder="비밀번호 확인" />
          </Form.Item>

          <Form.Item label="닉네임" name="nickname" rules={[{ required: true, message: "닉네임을 입력하세요!" }]}>
            <Input placeholder="닉네임" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              회원가입
            </Button>
          </Form.Item>
        </Form>

        <Divider>또는 소셜 회원가입</Divider>

        <div className={styles.socialButtons}>
          <Button icon={<GoogleOutlined />} onClick={() => handleSocialLogin("google")} block>
            Google로 회원가입
          </Button>
          <Button
            icon={<img src="/images/naver.png" alt="naver" className={styles.socialButtonIcon} />}
            onClick={() => handleSocialLogin("naver")}
            block
            className={styles.naverButton}
          >
            네이버로 회원가입
          </Button>
          <Button
            icon={<img src="/images/kakao-talk.png" alt="kakao" className={styles.socialButtonIcon} />}
            onClick={() => handleSocialLogin("kakao")}
            block
            className={styles.kakaoButton}
          >
            카카오로 회원가입
          </Button>
        </div>

        <div className={styles.footer}>
          <Text>이미 계정이 있으신가요? </Text>
          <Link href="/login" className="text-blue-500">
            로그인
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignupForm
