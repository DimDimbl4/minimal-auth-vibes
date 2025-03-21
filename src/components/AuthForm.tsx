
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Building, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AuthFormProps = {
  className?: string;
};

export const AuthForm = ({
  className
}: AuthFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [domain, setDomain] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      email,
      password,
      domain
    });
    // Domain authentication logic would go here
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
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input 
              type="text" 
              placeholder="Домен организации" 
              value={domain} 
              onChange={(e) => setDomain(e.target.value)} 
              required 
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input 
              type="email" 
              placeholder="Корпоративная почта" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="pl-10"
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
            />
            <button 
              type="button" 
              onClick={togglePasswordVisibility} 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
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
        
        <Button type="submit" className="w-full" size="lg">
          Авторизоваться в системе
        </Button>
      </form>
      
      <div className="mt-8 text-center text-sm text-muted-foreground animate-fade-in">
        <p>Сервис предназначен для корпоративных пользователей</p>
        <p className="mt-2">Для получения сертификата необходима авторизация через домен организации</p>
      </div>
    </div>
  );
};
