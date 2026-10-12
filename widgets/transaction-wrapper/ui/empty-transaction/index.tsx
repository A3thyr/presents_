"use client";

import { useTranslations } from "next-intl";

export const EmptyTransactions = () => {
  const t = useTranslations("widgets.transaction-wrapper");
  return <div className="w-full text-center text-white/30 font-bold">{t("empty")}</div>;
};
