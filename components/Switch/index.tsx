"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export const Switch = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <span className="text16">
        {theme === "light" ? "Светлая тема" : "Тёмная тема"}
      </span>
      <div className="switch">
        <input
          type="checkbox"
          id="toggle-switch"
          checked={theme === "dark"}
          onChange={() => setTheme(theme === "light" ? "dark" : "light")}
        />
        <label htmlFor="toggle-switch"></label>
      </div>
    </>
  );
};
