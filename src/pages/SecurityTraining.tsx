
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Book, CheckCircle, LockKeyhole, ShieldAlert, HelpCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

type Question = {
  id: number;
  text: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
};

const SecurityTraining = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("learning");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [testSubmitted, setTestSubmitted] = useState(false);
  
  const securityTopics = [
    {
      id: "passwords",
      title: "Парольная политика",
      icon: <LockKeyhole className="h-5 w-5" />,
      content: `
        <h3 class="text-lg font-medium mb-2">Правила создания надежных паролей</h3>
        <ul class="list-disc pl-5 space-y-1 mb-4 text-sm">
          <li>Используйте пароли длиной не менее 12 символов</li>
          <li>Используйте комбинацию букв в разных регистрах, цифр и специальных символов</li>
          <li>Не используйте личную информацию в паролях</li>
          <li>Используйте уникальные пароли для разных сервисов</li>
          <li>Меняйте пароли каждые 90 дней</li>
        </ul>
        <p class="text-sm mb-2">Для корпоративных систем необходимо использовать пароли, соответствующие этим требованиям. Рекомендуется использовать менеджер паролей для генерации и хранения сложных паролей.</p>
      `
    },
    {
      id: "phishing",
      title: "Защита от фишинга",
      icon: <ShieldAlert className="h-5 w-5" />,
      content: `
        <h3 class="text-lg font-medium mb-2">Как распознать фишинговые письма</h3>
        <ul class="list-disc pl-5 space-y-1 mb-4 text-sm">
          <li>Проверяйте адрес отправителя на опечатки и подмены</li>
          <li>Обращайте внимание на срочные запросы и угрозы</li>
          <li>Не открывайте вложения из подозрительных писем</li>
          <li>Проверяйте URL-адреса перед переходом по ссылкам</li>
          <li>При сомнениях обращайтесь в службу ИБ</li>
        </ul>
        <p class="text-sm">Помните, что корпоративная служба ИБ никогда не запрашивает пароли или личную информацию по электронной почте.</p>
      `
    },
    {
      id: "data-protection",
      title: "Защита данных",
      icon: <FileText className="h-5 w-5" />,
      content: `
        <h3 class="text-lg font-medium mb-2">Правила обращения с конфиденциальной информацией</h3>
        <ul class="list-disc pl-5 space-y-1 mb-4 text-sm">
          <li>Храните конфиденциальные документы только в защищенных местах</li>
          <li>Не передавайте конфиденциальную информацию через незащищенные каналы</li>
          <li>Шифруйте данные при передаче за пределы компании</li>
          <li>Не оставляйте документы без присмотра на рабочем месте</li>
          <li>Уничтожайте бумажные документы с помощью шредера</li>
        </ul>
        <p class="text-sm">Классификация данных в компании делится на: общедоступную, конфиденциальную и строго конфиденциальную информацию. Каждая категория требует своего уровня защиты.</p>
      `
    }
  ];
  
  const questions: Question[] = [
    {
      id: 1,
      text: "Какая минимальная длина пароля требуется согласно корпоративной политике?",
      options: [
        { id: "a", text: "8 символов" },
        { id: "b", text: "10 символов" },
        { id: "c", text: "12 символов" },
        { id: "d", text: "16 символов" }
      ],
      correctAnswer: "c"
    },
    {
      id: 2,
      text: "Как часто следует менять пароли в корпоративных системах?",
      options: [
        { id: "a", text: "Каждые 30 дней" },
        { id: "b", text: "Каждые 60 дней" },
        { id: "c", text: "Каждые 90 дней" },
        { id: "d", text: "Каждые 180 дней" }
      ],
      correctAnswer: "c"
    },
    {
      id: 3,
      text: "Какое действие следует предпринять при получении подозрительного письма?",
      options: [
        { id: "a", text: "Открыть вложение, чтобы проверить содержимое" },
        { id: "b", text: "Переслать письмо коллегам для консультации" },
        { id: "c", text: "Сообщить в службу информационной безопасности" },
        { id: "d", text: "Ответить отправителю для подтверждения" }
      ],
      correctAnswer: "c"
    }
  ];
  
  const handleSectionToggle = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };
  
  const handleAnswerSelect = (questionId: number, answerId: string) => {
    if (testSubmitted) return;
    
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerId
    });
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleSubmitTest = () => {
    // Check if all questions are answered
    if (Object.keys(selectedAnswers).length < questions.length) {
      toast({
        title: "Не все вопросы отвечены",
        description: "Пожалуйста, ответьте на все вопросы теста",
        variant: "destructive"
      });
      return;
    }
    
    setTestSubmitted(true);
    
    // Calculate score
    const correctAnswers = questions.filter(
      q => selectedAnswers[q.id] === q.correctAnswer
    ).length;
    
    const percentage = Math.round((correctAnswers / questions.length) * 100);
    
    if (percentage >= 70) {
      toast({
        title: "Тест успешно пройден!",
        description: `Вы ответили правильно на ${correctAnswers} из ${questions.length} вопросов (${percentage}%)`,
      });
    } else {
      toast({
        title: "Тест не пройден",
        description: `Вы ответили правильно на ${correctAnswers} из ${questions.length} вопросов (${percentage}%). Необходимо набрать минимум 70%`,
        variant: "destructive"
      });
    }
  };
  
  const handleResetTest = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setTestSubmitted(false);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Обучение по информационной безопасности</h1>
        
        <Tabs defaultValue="learning" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="learning">
              <Book className="h-4 w-4 mr-2" />
              Материалы
            </TabsTrigger>
            <TabsTrigger value="testing">
              <HelpCircle className="h-4 w-4 mr-2" />
              Тестирование
            </TabsTrigger>
            <TabsTrigger value="certificates">
              <CheckCircle className="h-4 w-4 mr-2" />
              Достижения
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="learning" className="space-y-6 animate-fade-in">
            <div className="space-y-4">
              {securityTopics.map(topic => (
                <Collapsible
                  key={topic.id}
                  open={expandedSection === topic.id}
                  onOpenChange={() => handleSectionToggle(topic.id)}
                  className="border rounded-lg overflow-hidden"
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full flex items-center justify-between p-4 hover:bg-secondary/50"
                    >
                      <div className="flex items-center gap-2">
                        {topic.icon}
                        <span>{topic.title}</span>
                      </div>
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`transform transition-transform ${
                          expandedSection === topic.id ? "rotate-180" : ""
                        }`}
                      >
                        <path
                          d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-4 pt-0 bg-secondary/10">
                    <div dangerouslySetInnerHTML={{ __html: topic.content }} />
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Дополнительные материалы</CardTitle>
                <CardDescription>
                  Ознакомьтесь с дополнительными руководствами и инструкциями по информационной безопасности
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-secondary/20 rounded-lg">
                  <FileText className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Руководство по двухфакторной аутентификации</h4>
                    <p className="text-sm text-muted-foreground">Настройка 2FA для корпоративных систем</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-secondary/20 rounded-lg">
                  <FileText className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Правила использования VPN</h4>
                    <p className="text-sm text-muted-foreground">Инструкция по настройке и использованию VPN</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-secondary/20 rounded-lg">
                  <FileText className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Классификация и обработка информации</h4>
                    <p className="text-sm text-muted-foreground">Полное руководство по работе с корпоративными данными</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="testing" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Проверочный тест по информационной безопасности</CardTitle>
                <CardDescription>
                  Проверьте ваши знания в области информационной безопасности. 
                  Для успешного прохождения теста необходимо набрать не менее 70%.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Прогресс</span>
                    <span className="text-sm">{currentQuestionIndex + 1} из {questions.length}</span>
                  </div>
                  <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="h-2" />
                </div>
                
                {questions.map((question, index) => (
                  <div 
                    key={question.id} 
                    className={`space-y-4 ${index === currentQuestionIndex ? "block" : "hidden"}`}
                  >
                    <h3 className="font-medium">Вопрос {question.id}: {question.text}</h3>
                    <div className="space-y-2">
                      {question.options.map((option) => {
                        const isSelected = selectedAnswers[question.id] === option.id;
                        const isCorrect = testSubmitted && option.id === question.correctAnswer;
                        const isWrong = testSubmitted && isSelected && !isCorrect;
                        
                        return (
                          <button
                            key={option.id}
                            className={`w-full text-left p-3 rounded-md border ${
                              isSelected 
                                ? isCorrect 
                                  ? "bg-green-100 border-green-300 dark:bg-green-900/30 dark:border-green-700"
                                  : isWrong 
                                    ? "bg-red-100 border-red-300 dark:bg-red-900/30 dark:border-red-700"
                                    : "bg-primary/10 border-primary/30"
                                : "bg-secondary/20 border-border hover:bg-secondary/30"
                            } transition-colors`}
                            onClick={() => handleAnswerSelect(question.id, option.id)}
                            disabled={testSubmitted}
                          >
                            <div className="flex items-start gap-2">
                              <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                                isSelected ? "bg-primary text-primary-foreground" : "border border-primary/20"
                              }`}>
                                {isSelected && (
                                  <CheckCircle className="h-3 w-3" />
                                )}
                              </div>
                              <span>{option.text}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0 || testSubmitted}
                >
                  Предыдущий
                </Button>
                
                <div className="flex gap-2">
                  {testSubmitted ? (
                    <Button onClick={handleResetTest}>
                      Пройти тест снова
                    </Button>
                  ) : (
                    currentQuestionIndex === questions.length - 1 ? (
                      <Button onClick={handleSubmitTest}>
                        Завершить тест
                      </Button>
                    ) : (
                      <Button onClick={handleNextQuestion}>
                        Следующий
                      </Button>
                    )
                  )}
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="certificates" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Ваши достижения</CardTitle>
                <CardDescription>
                  Отслеживайте прогресс обучения и полученные сертификаты
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Базовый курс ИБ</h4>
                        <p className="text-sm text-muted-foreground">Пройден 10.01.2023</p>
                      </div>
                    </div>
                    <span className="text-sm bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full">
                      Завершен
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                        <FileText className="h-5 w-5 text-secondary-foreground" />
                      </div>
                      <div>
                        <h4 className="font-medium">Продвинутый курс ИБ</h4>
                        <p className="text-sm text-muted-foreground">В процессе</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 px-2 py-1 rounded-full">
                        60% выполнено
                      </span>
                      <Progress value={60} className="h-2 w-24 mt-1" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-secondary/50 rounded-full flex items-center justify-center">
                        <LockKeyhole className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="font-medium">Специалист по защите данных</h4>
                        <p className="text-sm text-muted-foreground">Требуется завершение предыдущих курсов</p>
                      </div>
                    </div>
                    <span className="text-sm bg-secondary text-muted-foreground px-2 py-1 rounded-full">
                      Недоступен
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SecurityTraining;
