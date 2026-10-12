import { useEffect, useState } from "react";
import { useTelegram } from "./use-telegram";

export function usePlatform() {
  const [platform, setPlatform] = useState<string | null>(null);
  const telegram = useTelegram()

  useEffect(() => {
      setPlatform(window.Telegram?.WebApp.platform);
  }, []);

  return platform;
}
