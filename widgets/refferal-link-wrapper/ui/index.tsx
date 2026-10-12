"use client";

import { Button, Typography } from "@/components";
import { RefferalLink } from "@/features";
import {
  EmptyRefferalBalance,
  RefferalLinkCardsList,
} from "./refferal-card-list";
import { useTranslations } from "next-intl";
import { useUserStore } from "@/entities/user";
import { RefferalService } from "@/entities/refferal/refferla.service";
import { useAuth } from "@/shared/lib/hooks/use-auth";
import { toast } from "react-toastify";

export const RefferalLinkWrapper = () => {
  const t = useTranslations("widgets.referral-link-wrapper");
  const tToast = useTranslations("toasts");
  const {user} = useUserStore()
  const {userQuery} = useAuth()


  const handleTakeProfit = async() => {
    await RefferalService.getBalance()
    userQuery.refetch()
    toast.success(tToast("success"))
  } 

  return (
    <div className="p-6 rounded-xl">
      <Typography tag="h3" className="font-bold mb-5 text-xl ">
        {t("title")}
      </Typography>
      <div className="flex flex-col gap-4">
        <RefferalLink />
        <RefferalLinkCardsList />
        {user?.available_ref_balance! > 0 ? (
          <Button className="border border-blue-500 text-blue-500 font-bold py-3 rounded-xl "  onClick={handleTakeProfit}>
             {t("btn")}
          </Button>
        ) : (
         <EmptyRefferalBalance />
          
        )}
      </div>
    </div>
  );
};
