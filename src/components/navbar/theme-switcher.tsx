"use client";

import { IconMoon, IconSun } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import useSystemTheme from "~/hooks/use-system-theme";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useSystemTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? <IconSun /> : <IconMoon />}
    </button>
  );
}
