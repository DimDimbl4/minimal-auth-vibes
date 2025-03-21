
import { cn } from "@/lib/utils";
import { FileCheck } from "lucide-react";

type AuthLogoProps = {
  className?: string;
};

export const AuthLogo = ({ className }: AuthLogoProps) => {
  return (
    <div className={cn("flex flex-col items-center justify-center mb-8", className)}>
      <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-2">
        <FileCheck className="h-8 w-8 text-primary" />
      </div>
      <h2 className="text-xl font-semibold text-center">Система сертификации</h2>
      <p className="text-sm text-muted-foreground">Корпоративный центр выдачи сертификатов</p>
    </div>
  );
};
