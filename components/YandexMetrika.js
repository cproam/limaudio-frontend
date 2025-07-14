"use client";
import { YMInitializer } from "react-yandex-metrika";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const YANDEX_ID = [103022816];

const YandexMetrika = () => {
  const pathname = usePathname();

  const trackGoal = (goalName) => {
    if (typeof window !== "undefined" && window.ym) {
      window.ym(YANDEX_ID[0], "reachGoal", goalName);
    }
  };

  useEffect(() => {
    if (pathname === "/thanks") {
      trackGoal("goalLeads");
    }
  }, [pathname]);

  return (
    <YMInitializer
      accounts={YANDEX_ID}
      options={{
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
      }}
      version="2"
    />
  );
};

export default YandexMetrika;
