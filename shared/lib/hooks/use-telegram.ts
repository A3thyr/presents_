"use client";

import { Telegram } from "@twa-dev/types";
import { useEffect, useState } from "react";

/**
 * WebApp telegram в окне своего приложения предоставляет доступ к
 * инстансу Telegram WebApp в глобальном объекте window. Данный хук
 * предоставляет доступ к этому инстансу.
 */
export const useTelegram = () => {
  const [telegram, setTelegram] = useState<Telegram["WebApp"] | null>(null);
  useEffect(() => {
    setTelegram(window.Telegram?.WebApp);
  }, []);

  return telegram;
};
