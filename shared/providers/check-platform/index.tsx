import { useTelegram } from "@/shared/lib/hooks/use-telegram";
import { Platforms } from "@twa-dev/types";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const allowedPlatforms: Platforms[] = ["android", "android_x", "ios"];

export const CheckPlatform = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const telegram = useTelegram();

  useEffect(() => {
    /**
     * Проверка авторизации:
     * - получаем информацию пользователя /users/get-me
     * - если есть пользователь в /users/get-me то осуществляем вход в приложение (страница main)
     * - если есть пользователь не найден переходим на страницу onboarding
     */

    (async () => {
      // для запуска платформы в браузере во время дебага
      const isDebug = parseInt(process.env.NEXT_PUBLIC_IS_DEBUG || "0");
      const initData = window.Telegram.WebApp.initData;
      if (!isDebug) {
        if (!telegram?.platform) return;
        if (!allowedPlatforms.includes(telegram.platform) || !initData) {
          return router.push("/not-allowed-platform");
        }
      }
    })();
  }, [telegram?.platform]);
  return <>{children}</>;
};
