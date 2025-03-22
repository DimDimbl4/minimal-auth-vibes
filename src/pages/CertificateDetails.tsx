
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Copy, Download, Link as LinkIcon, QrCode, Shield } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const CertificateDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [certificate, setCertificate] = useState<{
    title: string;
    qrCode: string;
    passworkLink: string;
    description: string;
  } | null>(null);

  // Simulate backend processing with animated progress
  useEffect(() => {
    if (!id) {
      navigate("/dashboard");
      return;
    }

    // Reset states
    setLoading(true);
    setProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 150);
    
    // Simulate backend response after "loading"
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      
      // Simulate certificate data from backend
      setCertificate({
        title: id === "basic" ? "Базовый сертификат" : 
               id === "advanced" ? "Продвинутый сертификат" : 
               "Профессиональный сертификат",
        qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://example.com/certificates/" + id,
        passworkLink: "https://passwork.example.com/certificates/" + id,
        description: "Данный сертификат предназначен для доступа к корпоративным системам. Используйте его для подключения к WiFi, VPN и доступа к Outlook."
      });
      
      setLoading(false);
    }, 3000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [id, navigate]);

  const handleCopyLink = () => {
    if (certificate) {
      navigator.clipboard.writeText(certificate.passworkLink);
      toast({
        title: "Ссылка скопирована",
        description: "Ссылка на Passwork скопирована в буфер обмена"
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <Button
          variant="outline"
          onClick={() => navigate("/dashboard")}
          className="mb-6"
        >
          Назад к сертификатам
        </Button>

        {loading ? (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-center">Подготовка сертификата</CardTitle>
              <CardDescription className="text-center">
                Пожалуйста, подождите. Система генерирует ваш сертификат...
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-10 space-y-8">
              <div className="relative h-32 w-32">
                <Shield className="h-32 w-32 text-primary/20 animate-pulse" />
                <CheckCircle className="h-10 w-10 text-primary absolute bottom-0 right-0" 
                  style={{ opacity: progress > 70 ? 1 : 0, transition: 'opacity 0.5s ease' }} />
              </div>
              
              <div className="w-full max-w-md space-y-2">
                <Progress value={progress} className="h-2" />
                <p className="text-center text-sm text-muted-foreground">
                  {progress < 30 ? "Проверка учетных данных..." : 
                   progress < 60 ? "Генерация ключей сертификата..." : 
                   progress < 90 ? "Создание QR-кода..." : 
                   "Завершение подготовки..."}
                </p>
              </div>
            </CardContent>
          </Card>
        ) : certificate ? (
          <div className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{certificate.title}</CardTitle>
                <CardDescription>
                  {certificate.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6 items-center">
                <div className="flex flex-col items-center space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <img 
                      src={certificate.qrCode} 
                      alt="QR Code для сертификата" 
                      className="w-48 h-48 object-contain animate-scale-in"
                    />
                  </div>
                  <p className="text-sm text-center text-muted-foreground">
                    Отсканируйте QR-код камерой телефона для мобильного доступа
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Доступ к сертификату</h3>
                    <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
                      <LinkIcon className="h-5 w-5 text-muted-foreground shrink-0" />
                      <p className="text-sm truncate flex-1">{certificate.passworkLink}</p>
                      <Button variant="ghost" size="icon" onClick={handleCopyLink}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Перейдите по ссылке в систему Passwork для скачивания сертификата и получения пароля
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Как использовать сертификат</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>Используйте для подключения к корпоративной сети Wi-Fi</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>Требуется для настройки VPN подключения</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>Необходим для авторизации в Microsoft Outlook</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center pt-2">
                <Button className="gap-2">
                  <Download className="h-4 w-4" />
                  <span>Скачать инструкцию по установке</span>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Следующие шаги</CardTitle>
                <CardDescription>
                  После получения сертификата рекомендуем выполнить эти действия
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3 list-decimal list-inside text-sm">
                  <li>Скачайте сертификат из системы Passwork, используя ссылку выше</li>
                  <li>Установите сертификат, следуя инструкции для вашей операционной системы</li>
                  <li>Проверьте настройки VPN с помощью новых учетных данных</li>
                  <li>Настройте Outlook, используя полученный сертификат</li>
                  <li>В случае проблем обратитесь в IT-поддержку</li>
                </ol>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="text-center py-10">
            <p>Сертификат не найден. Пожалуйста, вернитесь на панель управления.</p>
            <Button onClick={() => navigate("/dashboard")} className="mt-4">
              Вернуться на панель управления
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CertificateDetails;
