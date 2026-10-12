"use client";

import { Users } from "lucide-react";
import TonIcon from "@/shared/assets/tonsymbolsmall.svg";
import { Typography } from "@/components";
import { useTranslations } from "next-intl";

type RefferalPointerCardTitle = "total" | "activity" | "totalBalance";

interface RefferalPointerCardProps {
  title: RefferalPointerCardTitle;
  data: number;
}

export const RefferalPointerCard: React.FC<RefferalPointerCardProps> = ({
  title,
  data,
}) => {
  const t = useTranslations("widgets.referral-wrapper.card");

  const TITLE: Record<RefferalPointerCardTitle, string> = {
    total: "total",
    activity: "activity",
    totalBalance: "totalBalance",
  };

  const ICON: Record<RefferalPointerCardTitle, React.ReactNode> = {
    total: <Users color="oklch(70.7% 0.165 254.624)" size={15} />,
    activity: <TonIcon />,
    totalBalance: <TonIcon />,
  };

  return (
    <div className="flex flex-col flex-1 items-center py-2 rounded-xl px-1">
      <Typography tag="span" className="mb-2">
        {ICON[title]}
      </Typography>
      <Typography tag="span" className="mb-2 font-bold font-sans ">
        {data}
      </Typography>
      <Typography tag="span" className="text-center text-[12px] text-zinc-500">
        {t(TITLE[title])}
      </Typography>
    </div>
  );
};
