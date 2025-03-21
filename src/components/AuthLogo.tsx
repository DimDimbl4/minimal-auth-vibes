
import { cn } from "@/lib/utils";

type AuthLogoProps = {
  className?: string;
};

export const AuthLogo = ({ className }: AuthLogoProps) => {
  return (
    <div className={cn("flex items-center justify-center mb-6", className)}>
      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
        <span className="text-primary-foreground text-xl font-semibold">A</span>
      </div>
    </div>
  );
};
