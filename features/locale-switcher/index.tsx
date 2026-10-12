"use client";

import { Button, Typography } from "@/components";
import { cn } from "@/shared/utils/cn";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import RuIcon from "@/shared/assets/russia.svg"
import EnIcon from "@/shared/assets/english.svg"

export const LocaleSwitcher = () => {
  const [isPending, startTransition] = useTransition();
  // const t = useTranslations("features.locale-switcher");
  const currentLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const onClickLocaleChange = (locale: string) => {
    startTransition(() => {
      router.replace(pathname.replace(currentLocale, locale));
    });
  };

  return (
    <div className="flex flex-col items-start justify-between gap-2 p-3">
      <p className="text-[11px] leading-4 text-gray-text"></p>
      <Button
        disabled={isPending}
        onClick={() => onClickLocaleChange("ru")}
        className={cn(
          `text-[16px] w-full justify-start  font-medium rounded-2xl leading-[24px] px-4 h-[80px] bg-gradient-to-b from-secondary-background to-background`,
          currentLocale === "ru" && "bg-blue"
        )}
      >
        <div className="flex flex-row items-center gap-4 justify-start">
          <Typography tag="span" className="text-2xl font-semibold uppercase">
            <RuIcon />
          </Typography>
          <div className="flex flex-col gap-1">
            <Typography tag="span" className="text-lg font-bold capitalize">
              Русский
            </Typography>
            {currentLocale === "ru" && (
              <Typography tag="span" className="text-white/80 text-sm">
                Выбрано
              </Typography>
            )}
          </div>
        </div>
      </Button>
      <Button
        disabled={isPending}
        onClick={() => onClickLocaleChange("en")}
        className={cn(
          `text-[16px]  w-full justify-start font-medium rounded-2xl leading-[24px] px-4 h-[80px] bg-gradient-to-b from-secondary-background to-background`,
          currentLocale === "en" && " bg-blue"
        )}
      >
        <div className="flex flex-row items-center gap-4 justify-start">
          <Typography tag="span" className="text-2xl font-semibold uppercase">
            <EnIcon />
          </Typography>
          <div className="flex flex-col gap-1">
            <Typography tag="span" className="text-lg font-bold capitalize">
              English
            </Typography>
            {currentLocale === "en" && (
              <Typography tag="span" className="text-white/80 text-sm">
                Selected
              </Typography>
            )}
          </div>
        </div>
      </Button>
    </div>
  );
};
