"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode, Suspense } from "react";
// import { TelegramProvider } from "./telegram/telegram-provider";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
// import { CheckPlatform } from "./check-platform";
import { AuthProvider } from "./auth-provider";

const queryClient = new QueryClient();

export const AppProvider = ({
  children,
  locale,
  messages,
}: {
  children: ReactNode;
  locale: string;
  messages: Record<string, unknown>;
}) => {
  return (
    <Suspense fallback={<>Loading...</>}>
      <QueryClientProvider client={queryClient}>
        <NextIntlClientProvider
          locale={locale}
          messages={messages as Record<string, unknown>}
          timeZone="Europe/Berlin"
        >
          <TonConnectUIProvider
            manifestUrl="https://stonkscash.com/tonconnect-manifest.json"
            actionsConfiguration={{
              twaReturnUrl: "https://stonkscash.com",
            }}
          >
            {/* <TelegramProvider> */}
            {/* <CheckPlatform> */}
            <AuthProvider>{children}</AuthProvider>
            {/* </CheckPlatform> */}
            {/* </TelegramProvider> */}
          </TonConnectUIProvider>
        </NextIntlClientProvider>
      </QueryClientProvider>
    </Suspense>
  );
};
