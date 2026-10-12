"use client";

import { Settings } from "lucide-react";
import React from "react";
import { Drawer } from "vaul";
import { LocaleSwitcher } from "../locale-switcher";
import { Typography } from "@/components";
import { useTranslations } from "next-intl";

export const SettingsDrawer = () => {
  const t = useTranslations("features.settings-drawer");
  return (
    <Drawer.Root>
      <Drawer.Trigger>
        <Settings />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/80" />
        <Drawer.Content className="flex z-30 bg-black flex-col py-4 rounded-t-[10px] mt-24 h-[64%] lg:h-[320px] fixed bottom-0 left-0 right-0 outline-none">
          <Drawer.Title className="font-bold text-center mt-5 text-[20px]">
            {t("title")}
          </Drawer.Title>
          <div className="flex flex-col items-start justify-start gap-2 pb-2 pt-6 px-7">
            <Typography tag="h2" className="text-lg font-semibold">
              {t("language")}
            </Typography>
            <Typography tag="h3" className="text-sm text-white/40">
              {t("ui")}
            </Typography>
          </div>
          <div className="p-4 rounded-t-[10px] flex-1 flex flex-col gap-4 ">
            <LocaleSwitcher />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
