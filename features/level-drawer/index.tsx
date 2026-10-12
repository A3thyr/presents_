"use client";

import { LEVEL_COLORS } from "@/shared/constants";
import { Level } from "@/shared/interface";
import { LevelCard } from "@/shared/ui";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Drawer } from "vaul";

interface LevelDrawerProps {
  levels: Level[];
}

type LevelDrawerComponent = React.FC<LevelDrawerProps>;

export const LevelDrawer: LevelDrawerComponent = ({ levels }) => {
  const t = useTranslations("features.level-drawer");
  return (
    <Drawer.Root>
      <Drawer.Trigger className="relative  text-blue-500 flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full  px-4 text-sm font-medium shadow-sm transition-all  dark:text-blue-400">
        {t("title")} <ArrowRight />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/80" />
        <Drawer.Content className="flex z-30 bg-black flex-col py-4 rounded-t-[10px] mt-24 h-[80%] lg:h-[320px] fixed bottom-0 left-0 right-0 outline-none">
          <Drawer.Title className="flex justify-center">
            <div className="bg-black h-1 rounded-full border-[1px] w-[70px]" />
          </Drawer.Title>
          <Drawer.Title className="font-bold text-center mt-5 text-[20px]">
            {t("title")}
          </Drawer.Title>

          <div className="p-4 rounded-t-[10px] flex-1 flex flex-col gap-4 overflow-y-auto">
            {levels.map((el, i) => (
              <LevelCard
                className={`py-5 ${LEVEL_COLORS[i].backgorund}`}
                level={el}
                key={i}
              />
            ))}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
