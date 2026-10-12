"use client";

import { Typography } from "@/components";
import { RefferalService } from "@/entities/refferal/refferla.service";
import { LevelDrawer } from "@/features";
import { LevelCard } from "@/shared/ui";
import { useQuery } from "@tanstack/react-query";
import { RefferalPointersCardList } from "./card-list";
import { useTranslations } from "next-intl";

export const RefferalWrapper = () => {
  const t = useTranslations("widgets.referral-wrapper");

  const query = useQuery({
    queryKey: ["levels"],
    queryFn: RefferalService.getLevels,
    staleTime: 5 * 60 * 1000,
  });

  if (query.isLoading || !query.data) return null;

  return (
    <div className="p-6 rounded-xl">
      <Typography tag="h3" className="font-bold mb-5 text-xl">
        {t("title")}
      </Typography>

      <div className="flex flex-col gap-4 justify-center">
        <LevelCard />
        <LevelDrawer levels={query?.data} />
        <RefferalPointersCardList />
        {/* <Typography tag="p" className="text-white/20 text-[15px] leading-5">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam
          obcaecati perferendis porro, praesentium iste eaque nulla
        </Typography> */}
      </div>
    </div>
  );
};
