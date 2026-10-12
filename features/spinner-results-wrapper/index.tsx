"use client";

import { Button, Typography } from "@/components";
import React from "react";
import TonIcon from "@/shared/assets/tonsymbolsmall.svg";
import useSpin from "@/widgets/case-roulette/api/use-spin";
import { motion } from "framer-motion";
import { LivePrizeItem } from "@/shared/ui";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Background from "@/public/images/features/spinner-results-wrapper/win-bg.png";
import { useCaseStore } from "@/entities/collection";
import { returnNames } from "./ui/return-names";

export const SpinnerResultsWrapper = () => {
  const { caseData } = useCaseStore();

  const { isSpinEnded, spinners, resetSpin, currentCaseId } = useSpin();
  const { id } = useParams<{ id: string }>();
  const t = useTranslations("features.spinners-results-wrapper");

  // Only show results if they belong to the current case
  const shouldShowResults = isSpinEnded && currentCaseId === id;

  // const handleSell = async() => {
  //   if (!spinners.every(spinner => spinner.wonItem?.id)) return
  //   await Promise.all(spinners.map(async (spinner) => {
  //     await ItemsService.sellItem(spinner.wonItem?.id!)
  //   }))
  //   toast.success(t("toast.success"))
  //   resetSpin()
  // }

  return (
    <>
      {/* Результат */}
      {shouldShowResults && (
        <div
          style={{ backgroundImage: `url(${Background.src})`, backgroundSize: "cover" }}
          className="fixed top-0 left-0 z-[20] flex h-screen w-screen items-center justify-center"
        >
          <div className="flex flex-col gap-12 px-6 py-4">
            <div className="flex w-full flex-col items-center justify-center gap-3">
              <Typography tag="h1" className="text-[20px] leading-[19px] font-bold">
                {caseData?.name}
              </Typography>
              <div className="flex flex-col items-center justify-center">
                <Typography tag="h2" className="text-[18px] leading-[21px] font-medium">
                  {t("title")}
                </Typography>
                <Typography tag="h2" className="text-center text-[18px] leading-[21px] font-medium">
                  <b>{returnNames(spinners)}</b> {t("in-your-inv")}!
                </Typography>
              </div>

              <Typography tag="span" className="inline-flex items-center justify-center gap-1">
                {t("value")}{" "}
                {spinners
                  .reduce((sum, spinner) => sum + (spinner.wonItem?.price ?? 0), 0)
                  .toFixed(2)}
                <TonIcon />
              </Typography>
            </div>
            <div className="flex items-center justify-center gap-3">
              {spinners.map((spinner, index) => (
                <motion.div
                  key={`spinner-result-${index + 1}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  {/* <Card className="bg-gray-800/70 border-gray-600 p-6 max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-white mb-4">Поздравляем!</h2>
                <div
                  className={`inline-block p-4 rounded-lg border-2 bg-opacity-20`}
                >
                  <Image
                    src={spinner.wonItem.img}
                    alt={spinner.wonItem.name}
                    className="w-24 h-16 object-contain mx-auto mb-2"
                  />
                  <div className="text-white font-bold">{spinner.wonItem.name}</div>
                </div>
              </Card> */}
                  {spinner.wonItem && (
                    <LivePrizeItem
                      key={`prize-id-${index}`}
                      id={spinner.wonItem?.id}
                      img={spinner.wonItem?.img}
                      title={spinner.wonItem?.name}
                      type={spinner.wonItem?.type}
                    />
                  )}
                </motion.div>
              ))}
            </div>
            <div className="inline-flex w-full items-center justify-between">
              <Button
                // onClick={}
                className="bg-semitransparent-black rounded-[40px] px-11 py-3 text-[12px] leading-[14px]"
              >
                {t("sell")}
              </Button>
              <Button
                onClick={resetSpin}
                className="bg-dark-blue rounded-[40px] px-8 py-3 text-[12px] leading-[14px] font-semibold transition-all duration-200 hover:scale-105"
              >
                {t("again")}
              </Button>
            </div>

            {/* <Button
            onClick={handleSell}
            className="px-4 py-3 w-full rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105 border-[1px] border-white/20 bg-white/5"
          >
            {t("sell")}
          </Button> */}
          </div>
        </div>
      )}
    </>
  );
};
