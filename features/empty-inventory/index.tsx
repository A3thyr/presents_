"use client";

import { Typography } from "@/components";
import GiftImage from "@/public/images/features/empty-inventory/gift_box.png";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import GiftIcon from "@/shared/assets/features/empty-inventory/gift_svg.svg";
import "./module.styles.css";

export const EmptyInventory = () => {
  const t = useTranslations("features.empty-inventory");

  return (
    <div className="flex flex-col items-center justify-center gap-10 pt-21">
      <div className="flex flex-col items-center justify-center gap-10">
        {/* <Package width={64} height={64} className="text-inactive-grey" /> */}
        <Image src={GiftImage} width={100} height={100} alt="gift-box" />
        <Typography tag="h2" className="text-[18px] leading-[21px] font-medium">
          {t("title")}
        </Typography>

        <div className="flex flex-col items-center justify-center gap-1">
          <Typography tag="h1" className="text-[18px] leading-[21px] font-medium">
            {t("any-gifts")}
          </Typography>
          <Typography tag="span" className="text-[14px] leading-[16px] font-medium opacity-60">
            {t("add-gifts")}
          </Typography>
        </div>
      </div>
      <div className="inline-flex w-full items-center gap-3">
        <Link
          href={"/"}
          className="glass-button bg-semitransparent-black flex w-full items-center justify-center gap-2 rounded-[40px] text-white transition-all duration-200 hover:scale-105"
        >
          <div className="absolute inset-[1px] z-2 flex items-center justify-center rounded-[40px] bg-black">
            <Typography tag="span" className="text-center text-[12px] leading-[14px] font-semibold">
              {t("btns.cases")}
            </Typography>
          </div>
        </Link>
        <a
          href="https://t.me/stonksgifts"
          className="bg-dark-blue flex w-full items-center justify-center gap-2 rounded-[40px] px-6 py-3 transition-all duration-200 hover:scale-105"
        >
          {/* <Send width={18} height={18} /> */}
          <GiftIcon />
          <Typography tag="span" className="text-[12px] leading-[14px] font-semibold text-nowrap">
            {t("btns.send-gifts")}
          </Typography>
        </a>
      </div>
    </div>
  );
};
