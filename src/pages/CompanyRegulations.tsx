
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Search, Filter, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type Regulation = {
  id: string;
  title: string;
  category: string;
  department: string;
  date: string;
  status: "active" | "archived" | "draft";
};

const CompanyRegulations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const regulations: Regulation[] = [
    {
      id: "pol-001",
      title: "Политика информационной безопасности",
      category: "Информационная безопасность",
      department: "ИБ",
      date: "15.03.2023",
      status: "active"
    },
    {
      id: "pol-002",
      title: "Политика использования корпоративной почты",
      category: "Информационная безопасность",
      department: "ИБ",
      date: "10.01.2023",
      status: "active"
    },
    {
      id: "ins-001",
      title: "Инструкция по безопасной работе с персональными данными",
      category: "Персональные данные",
      department: "ИБ",
      date: "05.04.2023",
      status: "active"
    },
    {
      id: "ins-002",
      title: "Инструкция по установке сертификатов",
      category: "Техническая документация",
      department: "ИТ",
      date: "22.02.2023",
      status: "active"
    },
    {
      id: "reg-001",
      title: "Регламент доступа к корпоративным системам",
      category: "Доступ к системам",
      department: "ИТ",
      date: "30.11.2022",
      status: "active"
    },
    {
      id: "pol-003",
      title: "Политика использования мобильных устройств",
      category: "Информационная безопасность",
      department: "ИБ",
      date: "07.12.2022",
      status: "active"
    },
    {
      id: "reg-002",
      title: "Регламент резервного копирования",
      category: "Техническая документация",
      department: "ИТ",
      date: "14.01.2023",
      status: "active"
    }
  ];
  
  const categories = [...new Set(regulations.map(reg => reg.category))];
  
  const filteredRegulations = regulations.filter(regulation => {
    const matchesSearch = regulation.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || regulation.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Корпоративные регламенты и документы</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Поиск документов</CardTitle>
            <CardDescription>
              Найдите необходимые регламенты, инструкции и политики компании
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск по названию документа..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="relative">
                <div className="inline-flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Категория:</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge 
                    variant={selectedCategory === null ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedCategory(null)}
                  >
                    Все
                  </Badge>
                  {categories.map(category => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-4">
          {filteredRegulations.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Документы не найдены. Пожалуйста, измените критерии поиска.</p>
            </div>
          ) : (
            filteredRegulations.map(regulation => (
              <Card key={regulation.id} className="animate-fade-in">
                <div className="flex flex-col md:flex-row gap-4 p-6">
                  <div className="flex-1">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{regulation.title}</h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <Badge variant="outline">{regulation.category}</Badge>
                          <span className="text-xs text-muted-foreground">
                            Отдел: {regulation.department} • Обновлено: {regulation.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 md:self-center">
                    <Button size="sm" variant="outline" className="gap-1">
                      <Eye className="h-4 w-4" />
                      <span className="hidden sm:inline">Просмотр</span>
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1">
                      <Download className="h-4 w-4" />
                      <span className="hidden sm:inline">Загрузить</span>
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
        
        <div className="mt-8 p-4 bg-secondary/30 rounded-lg border">
          <h3 className="font-medium mb-2">Не нашли нужный документ?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Если вы не можете найти необходимый регламент или инструкцию, обратитесь в отдел ИБ или ИТ для получения дополнительной информации.
          </p>
          <Button variant="outline" size="sm">
            Запросить документ
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CompanyRegulations;
