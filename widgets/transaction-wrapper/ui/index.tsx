"use client";

import { Typography } from "@/components";
import { TransactionList } from "./transaction-list";
import { useTranslations } from "next-intl";

export const TransactionWrapper = () => {
  const t = useTranslations("widgets.transaction-wrapper");
  return (
    <div className="p-6 rounded-xl">
      <Typography tag="h3" className="font-bold mb-5 text-xl ">
        {t("title")}
      </Typography>
      <TransactionList />
    </div>
  );
};
