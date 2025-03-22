
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCheck, FileText, FileWarning } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { toast } = useToast();
  
  const handleCertificateClick = (id: string, isAvailable: boolean) => {
    if (!isAvailable) {
      toast({
        title: "Сертификат недоступен",
        description: "Для получения этого сертификата требуется выполнение дополнительных условий.",
        variant: "destructive",
      });
      return;
    }
  };

  return (
    <DashboardLayout>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-6">Доступные сертификаты</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="animate-slide-up">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 bg-secondary/50 rounded-lg flex items-center justify-center mb-2">
                  <FileCheck className="h-6 w-6" />
                </div>
                <div className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                  Доступен
                </div>
              </div>
              <CardTitle className="text-lg">Доступ к корпоративным сервисам</CardTitle>
              <CardDescription>
                Корпоративный сертификат для доступа к VPN, Wi-Fi и Outlook
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>Этот сертификат обеспечивает безопасный доступ к корпоративным сервисам и сетям компании.</p>
            </CardContent>
            <CardFooter>
              <Button
                variant="default"
                className="w-full"
                asChild
              >
                <Link to="/certificate/access">Получить сертификат</Link>
              </Button>
            </CardFooter>
          </Card>
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
                { action: "Запрос на получение сертификата доступа", date: "Вчера, 15:45" },
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
    </DashboardLayout>
  );
};

export default Dashboard;
