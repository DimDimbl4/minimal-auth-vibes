
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Toggle } from "./ui/toggle";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Toggle 
      variant="theme" 
      pressed={theme === "dark"} 
      onPressedChange={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="Переключить тему"
      className="transition-all duration-300 hover:rotate-12"
    >
      <div className="relative w-5 h-5">
        <Moon className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${theme === "light" ? "opacity-100 rotate-0" : "opacity-0 rotate-90"}`} />
        <Sun className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${theme === "dark" ? "opacity-100 rotate-0" : "opacity-0 rotate-90"}`} />
      </div>
    </Toggle>
  );
}
