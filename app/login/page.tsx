import { LoginForm } from "@/components/login/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted/50 p-4">
      <LoginForm />
    </div>
  );
}