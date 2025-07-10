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

  if (!mounted) return null;

  return (
    <div className={styles.switch}>
      <input
        type="checkbox"
        id="toggle-switch"
        checked={theme === "dark"}
        onChange={() => setTheme(theme === "light" ? "dark" : "light")}
      />
      <label htmlFor="toggle-switch"></label>
    </div>
  );
};
