"use client";

import { motion } from "framer-motion";
import { StaticImageData } from "next/image";
import React, { FC } from "react";

export type LivePrizeItemProps = {
  id: number | string;
  img: string | StaticImageData;
  title: string;
  type?: string;
};

export const LivePrizeItem: FC<LivePrizeItemProps> = ({ id, img, title, type = "unique" }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: "linear", duration: 0.6 }}
      className="shrink-0 cursor-pointer transition-all ease-in"
    >
      <div
        className="relative flex flex-col items-center justify-center overflow-hidden rounded-[12px] border-[1px] border-white/80 px-7 py-10 backdrop-blur-[100px]"
        // style={{
        //   backgroundImage:
        //     "var(--prize-card-gradient, radial-gradient(circle, #006fff33, #00020633))",
        // }}
      >
        {type === "unique" ? (
          <div className="flex h-full min-h-[50px] w-full min-w-[50px] items-center justify-center">
            <img src={img as string} alt={title} className="h-[110px] w-[110px] object-contain" />
          </div>
        ) : (
          <div className="flex h-full min-h-[50px] w-full min-w-[50px] items-center justify-center">
            <img src={img as string} alt={title} className="h-[50px] w-[50px] object-contain" />
          </div>
        )}

        {/* <Typography
          tag="p"
          className="text-white text-center pt-2 text-ellipsis whitespace-nowrap w-full text-[10px] leading-[12px] font-semibold  overflow-hidden "
        >
          {title}
        </Typography> */}
      </div>
    </motion.div>
  );
};
