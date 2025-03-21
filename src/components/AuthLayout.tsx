
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

type AuthLayoutProps = {
  children: ReactNode;
  className?: string;
};

export const AuthLayout = ({ children, className }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-b from-background to-secondary/20 relative transition-colors duration-300">
      <ThemeToggle />
      <div className={cn(
        "w-full max-w-md rounded-2xl p-8 shadow-lg",
        "glassmorphism bg-background/80 backdrop-blur-lg",
        "animate-fade-in transition-all duration-300",
        className
      )}>
        {children}
      </div>
    </div>
  );
};
