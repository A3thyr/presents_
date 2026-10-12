"use client";

import { Button, Typography } from "@/components";
import { useCaseStore } from "@/entities/collection";
import { useUserStore } from "@/entities/user";
import TonIcon from "@/shared/assets/tonsymbolsmall.svg";
import { cn } from "@/shared/utils/cn";
import useSpin from "@/widgets/case-roulette/api/use-spin";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

/**
 *
 * @todo приделать хэндлер для бесплатных кейсов
 * @returns React.FC
 */

export const SpinnerControls = ({ containerWidth }: { containerWidth: number }) => {
  const { isSpinEnded, multiplier, handleSpin, isSpinning, setMultiplier } = useSpin();
  const t = useTranslations("widgets.case-roulette");
  const { caseData } = useCaseStore();
  // const { isDemo, toggleDemo } = useSpinStore();
  const { user } = useUserStore();
  const { currentCaseId } = useSpin();
  const { id } = useParams<{ id: string }>();

  return (
    <>
      {(!isSpinEnded || currentCaseId !== id) && (
        <div className="flex w-full flex-col gap-4 pt-4">
          <div className="flex w-full flex-row items-center justify-between gap-2">
            <div className="flex items-center justify-between gap-2">
              {Array.from({ length: 3 }).map((_, index) => (
                <Button
                  // disabled={multiplier === index + 1}
                  onClick={() => setMultiplier(index + 1)}
                  key={`multiplier-btn-${index}`}
                  className={cn(
                    "bg-secondary-background w-[43px] flex-1 rounded-[40px] border-white/50 px-[10px] py-3 text-[12px] leading-[12px] font-semibold text-white duration-200 hover:scale-105",
                    multiplier === index + 1 && "bg-dark-blue border-transparent",
                  )}
                >
                  {index + 1}x
                </Button>
              ))}
            </div>

            {/* {isDemo ? (
              <Button
                onClick={() => handleSpin(caseData?.id || "", multiplier, containerWidth)}
                disabled={isSpinning}
                className="bg-background w-full items-center justify-center gap-2 rounded-xl border-[1px] border-white/50 py-2 transition-none"
              >
                <Typography tag="span" className="text-lg font-semibold text-white">
                  {t("demo")}
                </Typography>
              </Button>
            ) : ( */}
            <Button
              onClick={() => handleSpin(caseData?.id || "", multiplier, containerWidth)}
              disabled={
                (isSpinning && currentCaseId === id) ||
                user?.balance.ton! <= 0 ||
                user?.balance.ton! < caseData?.price!
              }
              className="bg-dark-blue items-center justify-center gap-2 rounded-[40px] border-[1px] border-transparent px-[47.5px] py-2 transition-none"
            >
              <Typography
                tag="span"
                className="text-[12px] leading-[14px] font-semibold text-white"
              >
                {`${t("open")} ${multiplier}x ${t("for")} ${((caseData?.price || 1) * multiplier).toFixed(1)}`}
              </Typography>
              <TonIcon />
            </Button>
            {/* )} */}
          </div>

          {/* <div className="inline-flex items-center justify-center gap-2">
            <Typography tag="span" className="text-sm font-medium">
              {t("demo")}
            </Typography>
            <Switch disabled={isSpinning} onClick={toggleDemo} checked={isDemo} />
          </div> */}
        </div>
      )}
    </>
  );
};

/**
 * 
 * 
 *  
            <Button
              onClick={() =>
                handleSpin(caseData?.id || "", multiplier, containerWidth)
              }
              disabled={isSpinning}
              className="w-full transition-all duration-200 hover:scale-105 py-2 bg-background rounded-xl border-white/50 border-[1px] items-center justify-center gap-2"
            >
              <Typography
                tag="span"
                className="font-semibold text-lg text-white "
              >
                {

                t("demo")
                }
              </Typography>
            </Button>
        
 */
