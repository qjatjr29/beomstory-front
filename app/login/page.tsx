// import LoginForm from '@components/forms/LoginForm';

// export default function LoginPage() {
//   return <LoginForm />;
// }

import LoginForm from "@/components/forms/LoginForm"
import AuthRedirect from "@/components/auth/AuthRedirect"

export default function LoginPage() {
  return (
    <AuthRedirect>
      <LoginForm />
    </AuthRedirect>
  )
}