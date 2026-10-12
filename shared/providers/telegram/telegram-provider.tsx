"use client";

import { useEffect } from "react";

export function TelegramProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      document.documentElement.style.setProperty(
        "--tg-viewport-height",
        `${tg.viewportHeight}px`
      );
      document.documentElement.style.setProperty(
        "--tg-viewport-stable-height",
        `${tg.viewportStableHeight}px`
      );
      tg.expand();
    }
  }, []);

  return <>{children}</>;
}
