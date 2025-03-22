
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { 
  FileCheck, 
  LogOut, 
  Settings, 
  User, 
  Shield, 
  FileText, 
  Home,
  UserCircle
} from "lucide-react";
import { useNavigate, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

type DashboardLayoutProps = {
  children: ReactNode;
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogout = () => {
    toast({
      title: "Выход из системы",
      description: "Вы успешно вышли из системы",
    });
    navigate("/");
  };

  const navItems = [
    { path: "/dashboard", label: "Главная", icon: <Home className="h-5 w-5" /> },
    { path: "/security-training", label: "Обучение ИБ", icon: <Shield className="h-5 w-5" /> },
    { path: "/company-regulations", label: "Регламенты", icon: <FileText className="h-5 w-5" /> },
    { path: "/profile", label: "Профиль", icon: <UserCircle className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <header className="w-full bg-background/80 backdrop-blur-lg border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCheck className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold animate-fade-in">Система сертификации</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <nav className="hidden md:flex mr-4">
              <ul className="flex space-x-1">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => cn(
                        "px-3 py-2 rounded-md text-sm flex items-center gap-1.5 transition-colors",
                        isActive 
                          ? "bg-primary/10 text-primary" 
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      )}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarFallback className="bg-primary/10 text-primary">
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8 animate-fade-in">
        {children}
      </main>
    </div>
  );
};
