"use client";

import { Typography } from "@/components";
import { RefferalService } from "@/entities/refferal/refferla.service";
import { useUserStore } from "@/entities/user";
import TonIcon from "@/shared/assets/tonsymbolsmall.svg";
import { useQuery } from "@tanstack/react-query";
import { ArrowUp } from "lucide-react";
import { useTranslations } from "next-intl";

type RefferalLinkCardTitle = "available" | "total";

interface RefferalLinkCardProps {
  title: RefferalLinkCardTitle;
  data: number;
}

type RefferalLinkCardComponent = React.FC<RefferalLinkCardProps>;

export const RefferalLinkCard: RefferalLinkCardComponent = ({
  title,
  data,
}) => {
  const t = useTranslations("widgets.referral-link-wrapper.card");
  const TITLE: Record<RefferalLinkCardTitle, string> = {
    available: "available",
    total: "total",
  };

  return (
    <div className="flex-1 flex flex-col gap-0.5 items-center justify-center  rounded-xl h-[100px]">
      <Typography tag="span" className="text-center  text-[14px] text-zinc-500">
        {t(TITLE[title])}
      </Typography>
      <div className="flex justify-center items-center gap-2">
        <Typography tag="span" className="text-center text-[16px] font-bold">
          {data}
        </Typography>
        <TonIcon />
      </div>
    </div>
  );
};

export const RefferalLinkCardsList = () => {
  const query = useQuery({
    queryKey: ["refs/statistic"],
    queryFn: RefferalService.getRefferals
  })
  const {user} = useUserStore()
  return (
    <div className="flex w-full gap-4">
      <RefferalLinkCard title="available" data={user?.available_ref_balance || 0} />
      <RefferalLinkCard title="total" data={query.data?.userProfit || 0} />
    </div>
  );
};

export const EmptyRefferalBalance = () => {
  const t = useTranslations("widgets.referral-link-wrapper.empty");
  return (
    <div className="flex flex-col gap-2 mt-4">
      <Typography
        tag="span"
        className="flex  gap-2 justify-center items-center text-[14px] font-bold text-zinc-500"
      >
        <ArrowUp /> {t("no-balance")}
      </Typography>
      <Typography
        tag="span"
        className="flex  gap-2 justify-center items-center text-[12px]  text-zinc-500"
      >
        {t("invite")}
      </Typography>
    </div>
  );
};
