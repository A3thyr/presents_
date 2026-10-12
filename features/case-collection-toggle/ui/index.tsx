"use client";

import { Button, Typography } from "@/components";
import { COLLECTION_TOGGLE_DATA } from "@/shared/constants";
import { cn } from "@/shared/utils/cn";
import { useTranslations } from "next-intl";
import React from "react";
import { useCollectionToggle } from "../api/use-collection-toggle";

export const CaseCollectionToggle = () => {
  const t = useTranslations("features.case-collection-toggle");
  const { collection, setCollection } = useCollectionToggle();
  return (
    <div className="z-[5] flex flex-col items-center justify-center gap-6">
      <Typography tag="h1" className="text-[18px] leading-[21px] font-medium">
        {t("title")}
      </Typography>
      <div className="relative flex h-fit w-full max-w-full flex-row overflow-hidden px-4">
        <div className="relative flex w-full snap-x snap-proximity flex-row gap-[10px] overflow-auto">
          {COLLECTION_TOGGLE_DATA.map((item) => (
            <Button
              key={`collection-toggle-id${item.id}`}
              onClick={() => setCollection(item.type)}
              className={cn(
                "bg-semitransparent-black rounded-[40px] border-[1px] border-white/30 px-3 py-2 text-[10px] leading-[12px]",
                collection === item.type && "bg-dark-blue",
              )}
            >
              {t(item.name)}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
