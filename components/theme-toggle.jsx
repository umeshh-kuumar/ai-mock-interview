"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "/components/ui/button";

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const isDark = resolvedTheme === "dark";

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const themeButtonClasses =
    "h-9 w-9 rounded-full border border-input bg-background/85 text-foreground shadow-sm backdrop-blur transition hover:bg-accent/20 hover:text-accent-foreground";

  if (!mounted) {
    return (
      <Button
        type="button"
        variant="outline"
        size="icon"
        className={themeButtonClasses}
        aria-label="Toggle theme"
        title="Toggle theme"
      >
        <Moon className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className={themeButtonClasses}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}
