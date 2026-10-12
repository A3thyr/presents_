"use client";

import { Typography } from "@/components";
import { useCaseStore } from "@/entities/collection";
import { InventoryItemGrid } from "@/features";
import { useTranslations } from "next-intl";
import { FC } from "react";

export const LootList: FC = () => {
  const t = useTranslations("widgets.loot-list");
  const { caseData } = useCaseStore();

  if (!caseData) return <div>Loot data is not available idk why</div>;

  return (
    <div className="flex w-full flex-col items-start gap-4 pt-10">
      <Typography tag="h1" className="w-full text-center text-[14px] leading-[16px] font-medium">
        {t("title")}
      </Typography>
      <div className="grid w-full grid-cols-3 gap-3">
        {caseData?.items
          .sort((a, b) => b.price - a.price)
          .map((item) => (
            <InventoryItemGrid
              key={`inventory-item-id${item.id}`}
              name={item.name}
              img={item.img}
              drop_rate={item.drop_rate}
              id={item.id}
              price={item.price}
              type={item.type}
            />
          ))}
      </div>
    </div>
  );
};
