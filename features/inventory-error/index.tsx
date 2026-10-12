"use client";

import { Button, Typography } from "@/components";
import { Gift, Package, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

export const InventoryError = () => {
  const t = useTranslations("features.inventory-error");
  return (
    <div className="px-6 pt-24 flex flex-col  items-center justify-center gap-4">
      <Package width={64} height={64} className="text-red-500" />
      <Typography tag="h2" className="text-xl font-bold">
        {t("title")}
      </Typography>
      <Button className="gap-2 w-full px-6 py-3 rounded-xl transition-all bg-blue duration-200 hover:scale-105">
        <Gift width={18} height={18} />
        <Typography tag="span" className="text-[16px] leading-[24px] font-bold">
          {t("btns.cases")}
        </Typography>
      </Button>
      <Button className="gap-2 w-full px-6 py-3 rounded-xl border-[1px] bg-transparent border-white/20 transition-all duration-200 hover:scale-105">
        <Send width={18} height={18} />
        <Typography tag="span" className="text-[16px] leading-[24px] font-bold">
          {t("btns.send-gifts")}
        </Typography>
      </Button>
    </div>
  );
};
