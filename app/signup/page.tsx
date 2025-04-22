import SignupForm from '@components/forms/SignupForm';
import AuthRedirect from "@/components/auth/AuthRedirect"

export default function SignupPage() {
  return (
    <AuthRedirect>
      <SignupForm />
    </AuthRedirect>
  )
}