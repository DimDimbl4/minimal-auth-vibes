
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, UserCircle, Mail, Phone, Building, Calendar, Shield, Download, Edit, CheckCircle, History } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  const userProfile = {
    name: "Алексей Смирнов",
    position: "Старший инженер",
    department: "ИТ-инфраструктура",
    email: "a.smirnov@company.com",
    phone: "+7 (926) 123-45-67",
    location: "Москва, Главный офис",
    joinDate: "01.03.2020",
    certificates: [
      { id: "cert-001", name: "Базовый сертификат доступа", date: "15.03.2023", expiry: "15.03.2024", status: "active" },
      { id: "cert-002", name: "VPN-доступ (уровень 2)", date: "10.01.2023", expiry: "10.01.2024", status: "active" },
    ],
    activity: [
      { id: "act-001", action: "Получение сертификата", certificate: "Базовый сертификат доступа", date: "15.03.2023" },
      { id: "act-002", action: "Прохождение курса ИБ", certificate: "-", date: "01.03.2023" },
      { id: "act-003", action: "Прохождение теста", certificate: "-", date: "28.02.2023" },
      { id: "act-004", action: "Получение сертификата", certificate: "VPN-доступ (уровень 2)", date: "10.01.2023" },
    ]
  };
  
  const handleEditProfile = () => {
    setIsEditing(true);
  };
  
  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Профиль обновлен",
      description: "Изменения в профиле успешно сохранены",
    });
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
  };
  
  const handleDownloadCertificate = (certId: string) => {
    toast({
      title: "Загрузка сертификата",
      description: "Сертификат будет скачан через несколько секунд",
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card className="animate-fade-in">
              <CardHeader>
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                      {userProfile.name.split(' ').map(name => name[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-center">{userProfile.name}</CardTitle>
                  <CardDescription className="text-center">
                    {userProfile.position}
                  </CardDescription>
                  <Badge className="mt-2">{userProfile.department}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{userProfile.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{userProfile.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{userProfile.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">В компании с {userProfile.joinDate}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleEditProfile} className="w-full gap-2">
                  <Edit className="h-4 w-4" />
                  Редактировать профиль
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Tabs defaultValue="certificates" className="animate-fade-in">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="certificates">
                  <Shield className="h-4 w-4 mr-2" />
                  Сертификаты
                </TabsTrigger>
                <TabsTrigger value="activity">
                  <History className="h-4 w-4 mr-2" />
                  История активности
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="certificates" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Ваши сертификаты</CardTitle>
                    <CardDescription>
                      Управление действующими сертификатами и доступ к истории
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userProfile.certificates.map(cert => (
                        <div key={cert.id} className="p-4 border rounded-lg">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                                <FileText className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-medium">{cert.name}</h4>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  <span className="text-xs text-muted-foreground">
                                    Выдан: {cert.date}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    Действителен до: {cert.expiry}
                                  </span>
                                </div>
                                <div className="mt-2">
                                  <Badge variant={cert.status === 'active' ? 'default' : 'outline'} className="text-xs">
                                    {cert.status === 'active' ? 'Активен' : 'Неактивен'}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleDownloadCertificate(cert.id)}
                              >
                                <Download className="h-4 w-4 mr-1" />
                                Скачать
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Информация о сертификатах</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                      <p>Ваши сертификаты используются для доступа к корпоративным системам и являются персональными.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                      <p>Сертификаты обновляются ежегодно. За месяц до истечения срока действия вы получите уведомление.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                      <p>В случае компрометации немедленно сообщите в службу ИБ для отзыва сертификата.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle>История активности</CardTitle>
                    <CardDescription>
                      История взаимодействий с системой сертификации
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative pl-6 border-l before:absolute before:left-[-5px] before:top-0 before:h-full before:w-10">
                      {userProfile.activity.map((activity, index) => (
                        <div 
                          key={activity.id} 
                          className="mb-6 relative before:absolute before:left-[-11px] before:top-2 before:h-3 before:w-3 before:bg-primary before:rounded-full"
                        >
                          <div className="bg-card p-4 rounded-lg border">
                            <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                              <div>
                                <h4 className="font-medium">{activity.action}</h4>
                                {activity.certificate !== "-" && (
                                  <p className="text-sm text-muted-foreground">
                                    Сертификат: {activity.certificate}
                                  </p>
                                )}
                              </div>
                              <div className="text-sm text-muted-foreground shrink-0">
                                {activity.date}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="justify-center">
                    <Button variant="outline" size="sm">
                      Показать полную историю
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
