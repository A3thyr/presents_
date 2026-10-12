"use client";

import { Typography } from "@/components";
// import { LIVE_PRIZES_MOCK } from "@/shared/constants";
import {
  SpinnerControls,
  SpinnerResultsWrapper,
  SpinnerWrapper,
} from "@/features";
import { FC, useEffect, useState } from "react";
import useSpin from "../api/use-spin";
import { useCaseStore } from "@/entities/collection";
import { useSpinStore } from "@/entities/spin";
import { useParams } from "next/navigation";

/**
 *
 * @todo компоненты сделать, а не вот этот прикол
 * @returns FC
 */

export const CaseRoulette: FC = () => {
  const { caseData } = useCaseStore();
  const {isSpinEnded} = useSpinStore();
  const [containerWidth, setContainerWidth] = useState(358); // Default fallback

  const { currentCaseId } = useSpin();
  const {id} = useParams<{id: string}>()

  // if (!caseData) return <div>Case is not available right now</div>;

  useEffect(() => {
    console.log("isSpinEnded:", isSpinEnded)
    console.log("currentCaseId:", currentCaseId)
    console.log("id:", id)
    console.log("isSpinEnded && currentCaseId === id:", currentCaseId === id)
  }, [])


  return (
    <>
      <div className="w-full flex flex-col items-center justify-center gap-4 px-5">
        <Typography tag="h1" className="text-2xl font-bold">
          {caseData?.name || "case_name"}
        </Typography>
      </div>
      {(!isSpinEnded || currentCaseId !== id) && <SpinnerWrapper onWidthChange={setContainerWidth} />}
      {currentCaseId === id && <SpinnerResultsWrapper /> }
      <SpinnerControls containerWidth={containerWidth} />
    </>
  );
};
