
import { AuthForm } from "@/components/AuthForm";
import { AuthLayout } from "@/components/AuthLayout";
import { AuthLogo } from "@/components/AuthLogo";

const Index = () => {
  return (
    <main className="min-h-screen">
      <AuthLayout>
        <AuthLogo />
        <AuthForm />
      </AuthLayout>
    </main>
  );
};

export default Index;
