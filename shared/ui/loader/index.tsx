"use client";
import LoaderGIF from "@/public/gifs/load2.gif";
import { usePlatform } from "@/shared/lib/hooks/use-platform";
import { useTelegram } from "@/shared/lib/hooks/use-telegram";
import Image from "next/image";
import { FC, useEffect } from "react";

type LoaderProps = {
  fullScreen: boolean;
  name?: string;
};

export const Loader: FC<LoaderProps> = ({ fullScreen, name }) => {
  // const { data, isLoading, isError } = useCasesGrid();

  const telegram = useTelegram();
  const platform = usePlatform();

  useEffect(() => {
    if (telegram && platform !== "tdesktop" && platform !== "macos") {
      telegram?.disableVerticalSwipes();
      telegram?.ready();
      telegram?.expand();

      if (telegram.requestFullscreen) {
        try {
          const version = telegram.version ? parseFloat(telegram.version) : 6.0;

          if (version >= 8.0) telegram.requestFullscreen();
        } catch (error) {
          console.warn("Error occured while requesting a full screen:", error);
        }
      }
    }
  }, [telegram, platform]);

  switch (fullScreen) {
    case true:
      return (
        <div className="bg-background fixed top-0 left-0 z-[100] flex h-screen w-screen items-center justify-center">
          <Image src={LoaderGIF} alt="loader-gif" />
        </div>
      );

    case false:
      return (
        <div className="flex h-screen w-full items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500" />
            <div className="text-lg">Loading {name}...</div>
          </div>
        </div>
      );
  }
};
