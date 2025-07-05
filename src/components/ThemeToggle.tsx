
import { Sun, Moon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useTheme } from './ThemeProvider';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  
  // Convert system theme to actual theme for display
  const isDark = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
  };

  return (
    <div className="flex items-center gap-2 p-0.5 rounded-full border border-border/20 bg-secondary/30">
      <div className={`p-1 rounded-full border border-border/10 transition-all duration-300 ${
        !isDark 
          ? 'bg-foreground/5 text-foreground' 
          : 'text-muted-foreground hover:text-foreground/70'
      }`}>
        <Sun className="h-3 w-3" />
      </div>
      
      <Switch
        checked={isDark}
        onCheckedChange={toggleTheme}
        aria-label="Toggle theme"
        className="h-4 w-7 border border-border/20"
      />
      
      <div className={`p-1 rounded-full border border-border/10 transition-all duration-300 ${
        isDark 
          ? 'bg-foreground/5 text-foreground' 
          : 'text-muted-foreground hover:text-foreground/70'
      }`}>
        <Moon className="h-3 w-3" />
      </div>
    </div>
  );
};

export default ThemeToggle;
