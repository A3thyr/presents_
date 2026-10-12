"use client";

import { Typography } from "@/components";
import { useUserStore } from "@/entities/user";
import { PaymentDrawer, SettingsDrawer } from "@/features";
import { parseTelegramInitData } from "@/shared/lib/hooks/parse-init-data";
import { useTelegram } from "@/shared/lib/hooks/use-telegram";
import { UserAvatar } from "@/shared/ui";
import { Headphones } from "lucide-react";
import Link from "next/link";
// import ImgMock from "@/public/ye dag.jpg";

export const ProfileCard = () => {
  const telegram = useTelegram();
  const { user } = useUserStore();

  return (
    <div className="flex flex-col justify-between  p-6 rounded-xl gap-6">
      <div className="flex w-full justify-between">
        <Link href={"https://t.me/stonksgifts"}>
        <Headphones />
        </Link>
        <SettingsDrawer />
      </div>

      <div className="w-full items-center justify-center flex flex-col gap-2">
        <UserAvatar
          img={
            parseTelegramInitData(telegram?.initData || "").user?.photo_url || ""
          }
          className="w-24 h-24"
        />
        <Typography
          tag="span"
          className="text-[14px] text-white/30 leading-[16px]"
        >
          {/** из юзер стора через хук*/}
          {
            // parseTelegramInitData(telegram?.initData || "").user?.username
            user?.username || "@tg_username"
          }
        </Typography>

        <Typography
          tag="span"
          className="text-[20px] text-white font-bold leading-[16px]"
        >
          {/** из юзер стора через хук*/}
          {
            // parseTelegramInitData(telegram?.initData || "").user?.first_name
            user?.first_name || "Firstname"
          }
        </Typography>
      </div>
      <PaymentDrawer />
    </div>
  );
};
