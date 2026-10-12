"use client";

import { Button, Typography } from "@/components";
import { useUserStore } from "@/entities/user";
import TonBtnIcon from "@/shared/assets/tonsymbol 1 (1).svg";
import TonIcon from "@/shared/assets/tonsymbolsmall.svg";
import { parseTelegramInitData } from "@/shared/lib/hooks/parse-init-data";
import { useTelegram } from "@/shared/lib/hooks/use-telegram";
import { UserAvatar } from "@/shared/ui";
import { parseAddress } from "@/shared/utils/parse-ton-address";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useTonCallback } from "../api/use-ton-callback";
import { cn } from "@/shared/utils/cn";
import { useFullscreen } from "@/shared/lib/hooks/use-fullscreen";

// import { parseTelegramInitData } from "@/shared/lib/hooks/parse-init-data";

/**
 *
 * Header - функциональный компонент <header>
 *
 * @returns FC
 */

export const Header: FC = () => {
  const [tonConnectUI] = useTonConnectUI();

  const t = useTranslations("widgets.header");
  const telegram = useTelegram();
  const { wallet } = useTonCallback();
  const { user } = useUserStore();
  const router = useRouter();
  const isFullscreen = useFullscreen()

  return (
    <header className={cn("fixed z-[60] pb-1.5 top-0 backdrop-blur-lg w-full  flex px-4 items-center justify-between", isFullscreen ? "pt-[100px]" : "pt-[20px]")}>
      <Button
        onClick={() => router.push("/profile")}
        className="hover:opacity-80 flex items-center gap-2 "
      >
        <div className=" flex items-center justify-center gap-1.5">
          <UserAvatar
            img={
              parseTelegramInitData(telegram?.initData || "").user?.photo_url ||
              ""
            }
            className="w-[30px] h-[30px]"
          />

          <div className="flex flex-col items-start">
            <Typography
              tag="span"
              className="text-[11px] text-white/30 leading-[16px]"
            >
              {
                // parseTelegramInitData(telegram?.initData || "").user?.username ||
                //   "@tg_username"
                "@" + user?.username || "@tg_nickname"
              }
            </Typography>
            <div className="flex gap-1 items-center">
              <Typography
                tag="span"
                className="text-[12px] leading-[14px] font-bold text-white"
              >
                {user?.balance.ton.toFixed(2)}
              </Typography>
              <div className="w-[16px] h-[16px]">
                <TonIcon />
              </div>

              <div className="rounded-full bg-green-500 w-[16px] h-[16px] flex items-center justify-center hover:bg-green-600 hover:z-[2]">
                <Plus width={10} height={10} />
              </div>
            </div>
          </div>
        </div>
      </Button>
      {wallet ? (
        <div className="flex flex-col items-center justify-center gap-1">
          <Button
            onClick={() => tonConnectUI.disconnect()}
            className="bg-blue-400 rounded-[24px] px-4 py-2 gap-1"
          >
            <Typography
              tag="span"
              className="text-[15px] leading-[18px] text-white font-semibold"
            >
              <Typography tag="span" className="text-sm font-normal">
                {parseAddress(wallet.account.address).slice(0, 12)}...
              </Typography>
            </Typography>
          </Button>
        </div>
      ) : (
        <Button
          onClick={() => tonConnectUI.openModal()}
          className="bg-blue-400 rounded-[24px] px-4 py-2 gap-1"
        >
          <TonBtnIcon />
          <Typography
            tag="span"
            className="text-[15px] leading-[18px] text-white font-semibold"
          >
            {t("ton-btn-connect")}
          </Typography>
        </Button>
      )}
    </header>
  );
};
