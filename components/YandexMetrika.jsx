"use client";
import { YANDEX_ID } from "@/lib/breadcrumbs";
import { useEffect } from "react";

export const trackGoal = (goalName) => {
  if (typeof window !== "undefined" && window.ym) {
    window.ym(YANDEX_ID[0], "reachGoal", goalName);
  }
};

const YandexMetrika = () => {
  useEffect(() => {
    const trackPageLoad = () => {
      if (typeof window !== "undefined" && window.ym) {
        trackGoal("pageLoad");
      } else {
        const script = document.getElementById("yandex-metrika");
        if (script) {
          const handleLoad = () => {
            if (window.ym) {
              trackGoal("pageLoad");
            }
          };
          script.addEventListener("load", handleLoad);
          return () => script.removeEventListener("load", handleLoad);
        }
      }
    };

    trackPageLoad();

    return () => {};
  }, []);

  return null;
};

export default YandexMetrika;
