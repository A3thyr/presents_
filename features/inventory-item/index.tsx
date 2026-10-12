/* eslint-disable @next/next/no-img-element */
"use client";

import { Button, Typography } from "@/components";
import TonIcon from "@/shared/assets/ton_symbol_10x10.svg";
import Image from "next/image";
import { FC } from "react";
import GiftChest from "@/public/images/features/inventory-item/gift-chest-2.png";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/utils/cn";
import { getColorByPrice } from "./ui/item-color";

export type InventoryItemProps = {
  id: string;
  name: string;
  img: string;
  drop_rate: number;
  price: number;
  type?: string;
};

export const InventoryItemGrid: FC<
  InventoryItemProps & { lottieJsonData?: JSON | undefined; parentClassName?: string }
> = ({
  // drop_rate,
  img,
  name,
  // id,
  price,
  type = "unique",
  parentClassName,
}) => {
  // const [isShown, setIsShown] = useState<string | null>(null);

  // const handleClick = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   if (isShown !== id) {
  //     setIsShown(id);
  //   } else {
  //     setIsShown(null);
  //   }
  // };

  return (
    <div
      className={cn(
        "group relative flex h-full w-full flex-col items-center justify-between overflow-hidden rounded-xl border-[1px] border-white/20 p-[6px] transition-all duration-300 ease-out",
        parentClassName,
        getColorByPrice(price),
      )}
    >
      {/* <AnimatePresence>
        {isShown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute left-[50%] z-[10] backdrop-blur-3xl bg-black/5 -translate-x-1/2 top-2 px-1.5 py-0.5 rounded-full text-xs font-bold"
          >
            {drop_rate.toFixed(4)}%
          </motion.div>
        )}
      </AnimatePresence>
      <div
        onClick={(e) => handleClick(e)}
        className={cn(
          "absolute top-2 right-2 z-[10] w-5 flex items-center justify-center h-5 rounded-full hover:scale-110 bg-black/70 text-white",
          isShown === id && "border-[1px] border-white"
        )}
      >
        <Info width={10} height={10} />
      </div> */}

      <Typography
        tag="h2"
        className="mt-[6px] line-clamp-1 w-full text-center text-[12px] leading-[14px] font-bold"
      >
        {name}
      </Typography>

      {type === "unique" ? (
        <div className="flex h-[100px] w-[100px] items-center justify-center">
          <img src={img} alt={name} className="h-[100px] w-[100px]" />
        </div>
      ) : (
        <div className="flex h-[64px] w-[64px] items-center justify-center">
          <img src={img} alt={name} className="h-[64px] w-[64px] object-cover" />
        </div>
      )}

      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row items-center justify-center gap-1 rounded-xl transition-all duration-300 group-hover:scale-105">
          <Typography tag="span" className="pt-[2px] text-[14px] leading-[14px] font-bold">
            {price}
          </Typography>
          <TonIcon />
        </div>
      </div>
    </div>
  );
};

export const InventoryItemFull: FC<InventoryItemProps & { lottieJsonData?: JSON | undefined }> = ({
  lottieJsonData,
  drop_rate,
  img,
  name,
  id,
  price,
  type = "unique",
}) => {
  const t = useTranslations("features.inventory-item");
  return (
    <div className="group relative flex h-[126px] w-full flex-row items-center justify-start rounded-xl border-[1px] border-white/20">
      <InventoryItemGrid
        drop_rate={drop_rate}
        id={id}
        img={img}
        name={name}
        price={price}
        lottieJsonData={lottieJsonData}
        type={type}
        parentClassName="max-w-[126px] bg-transparent pt-0"
      />
      <Image
        src={GiftChest}
        height={105}
        alt="gift-chests"
        className="absolute left-[126px] !max-h-[105px] !max-w-[178px]"
      />
      <div className="flex h-full w-full items-end p-[6px]">
        <div className="inline-flex gap-[6px]">
          <Button className="bg-semitransparent-black rounded-[10px] px-[12.5px] py-3 text-[12px] leading-[14px] font-semibold backdrop-blur-xs">
            {t("open")}
          </Button>
          <Button className="bg-semitransparent-black rounded-[10px] px-[22.5px] py-3 text-[12px] leading-[14px] font-semibold backdrop-blur-xs">
            {t("gift")}
          </Button>
        </div>
      </div>
    </div>
  );
};
