"use client";

import { LivePrizeItem } from "@/shared/ui/live-prize-item";
import { AnimatePresence, motion } from "framer-motion";
import { FC } from "react";
import { usePrizesList } from "../api/use-prizes";


export const LivePrizes: FC = () => {
  const { data: prizes } = usePrizesList();

  
  if (prizes?.length === 0) return null


  return (
    <div className=" py-4 relative ">
      <div className="relative">
        {/**левый градиент */}
        <div className="absolute left-[-1px] top-0 bottom-0 w-10 bg-gradient-to-r h-[100px] from-[#000510] to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute flex items-center gap-1 -top-6 font-bold text-green-600 left-2"
        >
          <div className="w-2 h-2 rounded-full bg-green-600 space-x-1 leading-1.5"/>
          LIVE
        </motion.div>

        {/** лента */}
        <div className=" overflow-x-auto overflow-y-hidden">

          <motion.div className="flex items-start gap-2">
            <AnimatePresence initial={false}>
              {/* {LIVE_PRIZES_MOCK.map((prize) => ( */}
              {prizes?.map((prize, index) => (
                <LivePrizeItem
                  key={`prize-item-${index}`}
                  id={index + 1}
                  title={prize.name}
                  type={prize.type}
                  img={prize.img}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
        {/** правый градиент */}
        <div className="absolute right-[-1px] bottom-0 w-10 bg-gradient-to-l h-[100px] from-[#000510] to-transparent z-10 pointer-events-none" />
      </div>
    </div>
  );
};
