
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

type AuthFormProps = {
  className?: string;
};

export const AuthForm = ({ className }: AuthFormProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password, isLogin });
    // Authentication logic would go here
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-2xl font-medium tracking-tight mb-2">
          {isLogin ? "С возвращением" : "Создайте аккаунт"}
        </h1>
        <p className="text-muted-foreground text-sm">
          {isLogin 
            ? "Введите свои данные для входа" 
            : "Введите данные для регистрации нового аккаунта"}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4 animate-slide-up">
        <div className="space-y-2">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="email"
              placeholder="Электронная почта"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input pl-10"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input pl-10"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        
        {isLogin && (
          <div className="flex justify-end">
            <button type="button" className="text-sm text-primary hover:underline">
              Забыли пароль?
            </button>
          </div>
        )}
        
        <button type="submit" className="auth-button mt-6">
          {isLogin ? "Войти" : "Зарегистрироваться"}
        </button>
      </form>
      
      <div className="mt-8 text-center text-sm text-muted-foreground animate-fade-in">
        {isLogin ? "Еще нет аккаунта?" : "Уже есть аккаунт?"}{" "}
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-primary font-medium hover:underline"
        >
          {isLogin ? "Зарегистрироваться" : "Войти"}
        </button>
      </div>
    </div>
  );
};
