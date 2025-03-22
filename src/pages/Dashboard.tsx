
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCheck, FileText, FileWarning, LogOut, Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // In a real app, handle logout logic here
    console.log("Logging out...");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <header className="w-full bg-background/80 backdrop-blur-lg border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCheck className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">Система сертификации</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8 animate-fade-in">
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-6">Доступные сертификаты</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Базовый сертификат", status: "Доступен", icon: <FileText className="h-6 w-6" />, variant: "default" },
              { title: "Продвинутый сертификат", status: "Ожидание подтверждения", icon: <FileWarning className="h-6 w-6" />, variant: "outline" },
              { title: "Профессиональный сертификат", status: "Требуется предварительное обучение", icon: <FileText className="h-6 w-6" />, variant: "outline" },
            ].map((cert, index) => (
              <Card key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 bg-secondary/50 rounded-lg flex items-center justify-center mb-2">
                      {cert.icon}
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full ${cert.variant === "default" ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"}`}>
                      {cert.status}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{cert.title}</CardTitle>
                  <CardDescription>
                    Корпоративный сертификат для подтверждения квалификации
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>Этот сертификат подтверждает ваши навыки и знания в соответствии с корпоративными стандартами компании.</p>
                </CardContent>
                <CardFooter>
                  <Button variant={cert.variant === "default" ? "default" : "outline"} className="w-full">
                    {cert.variant === "default" ? "Получить сертификат" : "Подробнее"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Активность</h2>
          <Card>
            <CardHeader>
              <CardTitle>Последние действия</CardTitle>
              <CardDescription>История ваших взаимодействий с системой сертификации</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "Вход в систему", date: "Сегодня, 10:23" },
                  { action: "Запрос на получение базового сертификата", date: "Вчера, 15:45" },
                  { action: "Прохождение проверочного теста", date: "12.05.2023, 11:30" },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center pb-2 border-b border-border">
                    <span>{item.action}</span>
                    <span className="text-sm text-muted-foreground">{item.date}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
