
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

type AuthFormProps = {
  className?: string;
};

export const AuthForm = ({
  className
}: AuthFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!login || !password) {
      toast({
        title: "Ошибка авторизации",
        description: "Пожалуйста, заполните все поля",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate authentication process
    setTimeout(() => {
      // In a real app, validate credentials against a backend
      console.log("Authentication successful for:", login);
      
      toast({
        title: "Успешная авторизация",
        description: "Добро пожаловать в систему сертификации",
      });
      
      setIsLoading(false);
      navigate("/dashboard");
    }, 1500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-2xl font-medium tracking-tight mb-2">
          Корпоративная авторизация
        </h1>
        <p className="text-muted-foreground text-sm">
          Войдите, чтобы получить доступ к сервису выдачи сертификатов
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4 animate-slide-up">
        <div className="space-y-2">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input 
              type="text" 
              placeholder="Логин" 
              value={login} 
              onChange={(e) => setLogin(e.target.value)} 
              required 
              className="pl-10"
              disabled={isLoading}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input 
              type={showPassword ? "text" : "password"} 
              placeholder="Пароль" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="pl-10"
              disabled={isLoading}
            />
            <button 
              type="button" 
              onClick={togglePasswordVisibility} 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              disabled={isLoading}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button type="button" className="text-sm text-primary hover:underline">
            Обратиться в IT-поддержку
          </button>
        </div>
        
        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
          {isLoading ? "Авторизация..." : "Авторизоваться в системе"}
        </Button>
      </form>
      
      <div className="mt-8 text-center text-sm text-muted-foreground animate-fade-in">
        <p>Сервис предназначен для корпоративных пользователей</p>
        <p className="mt-2">Для получения сертификата необходима корпоративная авторизация</p>
      </div>
    </div>
  );
};
