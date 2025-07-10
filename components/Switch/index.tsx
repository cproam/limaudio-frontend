"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import styles from "./page.module.css";

export const Switch = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = () => {
    const scrollPosition = window.scrollY;
    setTheme(theme === "light" ? "dark" : "light");
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollPosition);
    });
  };

  if (!mounted) return null;

  return (
    <div className={styles.switch}>
      <input
        type="checkbox"
        id="toggle-switch"
        checked={theme === "dark"}
        onChange={handleThemeChange}
      />
      <label htmlFor="toggle-switch"></label>
    </div>
  );
};
