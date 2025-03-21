
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type AuthLayoutProps = {
  children: ReactNode;
  className?: string;
};

export const AuthLayout = ({ children, className }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-b from-background to-secondary/20">
      <div className={cn(
        "w-full max-w-md rounded-2xl p-8 shadow-lg animate-fade-in",
        "glassmorphism bg-background/80 backdrop-blur-lg",
        className
      )}>
        {children}
      </div>
    </div>
  );
};
