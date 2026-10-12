"use client";

import { Skeleton, Typography } from "@/components";
import { useContainerWidth } from "@/shared/lib/hooks/use-container-width";
import useSpin from "@/widgets/case-roulette/api/use-spin";
import { AnimatePresence, motion, Easing } from "framer-motion";
import { useEffect, useState, useMemo, useCallback } from "react";
import TonIcon from "@/shared/assets/ton_symbol_10x10.svg";
import { useCaseStore } from "@/entities/collection";
import { useQueryClient } from "@tanstack/react-query";
import Lottie from "lottie-react";
import Image from "next/image";

// Memoized skeleton component
const SpinnerSkeleton = ({ index }: { index: number }) => (
  <div
    key={`prize-item-skeleton-${index}`}
    className="shrink-0 cursor-pointer transition-all ease-in"
  >
    <Skeleton
      className="bg-prize-card-background relative flex h-[100px] w-[90px] flex-col items-center justify-center overflow-hidden rounded-[12px] [background-image:var(--prize-card-gradient)]"
      style={{
        backgroundImage:
          "var(--prize-card-gradient, radial-gradient(circle, #006fff33, #00020633))",
      }}
    />
  </div>
);

// Memoized prize item component
const SpinnerPrizeItem = ({
  prize,
  index,
  type = "unique",
}: {
  prize: any;
  index: number;
  type?: string;
}) => {
  return (
    <motion.div
      key={`prize-item-${index}`}
      layout
      className="shrink-0 cursor-pointer transition-all ease-in"
    >
      <div
        className="bg-prize-card-background relative flex h-[100px] w-[90px] flex-col overflow-hidden rounded-[12px] border-[1px] border-blue-100/20 [background-image:var(--prize-card-gradient)]"
        style={{
          backgroundImage:
            "var(--prize-card-gradient, radial-gradient(circle, #006fff33, #00020633))",
        }}
      >
        {/* <Lottie
          animationData={lottieJson}
          className="w-[60px] h-[60px]"
          autoplay={false}
          loop={false}
          initialSegment={[0, 1]}
        /> */}

        {type === "unique" ? (
          <Image
            alt="img"
            className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-[50%]"
            src={prize.img}
            width={64}
            height={64}
          />
        ) : (
          <Image
            alt="img"
            className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-[50%]"
            src={prize.img}
            width={40}
            height={40}
          />
        )}

        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 flex-row items-center justify-center gap-1 rounded-xl px-3 backdrop-blur-md transition-all duration-300 group-hover:scale-105">
          <Typography tag="span" className="pt-[2px] text-[10px] font-bold">
            {prize.price}
          </Typography>
          <TonIcon />
        </div>
      </div>
    </motion.div>
  );
};

// Memoized spinner component
const SpinnerTape = ({
  spinner,
  spinnerIndex,
  containerRef,
}: {
  spinner: any;
  spinnerIndex: number;
  containerRef: any;
}) => {
  const client = useQueryClient();

  const items = useMemo(
    () => (spinner.spinning ? spinner.items : spinner.items),
    [spinner.spinning, spinner.items],
  );

  return (
    <div key={`spinner-${spinnerIndex}`} ref={containerRef} className="relative">
      {/* Left gradient */}
      <div className="pointer-events-none absolute top-0 bottom-0 left-[-1px] z-10 h-[100px] w-10 bg-gradient-to-r from-[#000510] to-transparent" />

      {/* Win slot indicator */}
      <div className="border-b-blue absolute top-1 left-1/2 z-10 h-1 w-1 -translate-x-1/2 rotate-180 transform border-r-4 border-b-8 border-l-4 border-r-transparent border-l-transparent"></div>

      {/* Tape */}
      <div className="overflow-x-auto overflow-y-hidden">
        <motion.div
          animate={{ x: spinner.offset }}
          transition={{
            duration: spinner.spinning ? 4 : 0.8,
            ease: spinner.spinning ? [0.15, 0.85, 0.25, 1] : "linear",
          }}
          style={{ x: spinner.offset }}
          className="flex items-start gap-2"
        >
          <AnimatePresence initial={false}>
            {items.map((prize: any, index: number) => (
              <SpinnerPrizeItem
                key={`prize-${spinnerIndex}-${index}`}
                prize={prize}
                type={prize.type}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Right gradient */}
      <div className="pointer-events-none absolute right-[-1px] bottom-0 z-10 h-[100px] w-10 bg-gradient-to-l from-[#000510] to-transparent" />
    </div>
  );
};

// Memoized skeleton wrapper
const SkeletonWrapper = () => (
  <div className="relative px-5 py-10">
    <div className="relative">
      <div className="pointer-events-none absolute top-0 bottom-0 left-[-1px] z-10 h-[100px] w-10 bg-gradient-to-r from-[#000510] to-transparent" />
      <div className="overflow-x-auto overflow-y-hidden">
        <div className="flex items-start gap-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <SpinnerSkeleton key={`skeleton-${index}`} index={index} />
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute right-[-1px] bottom-0 z-10 h-[100px] w-10 bg-gradient-to-l from-[#000510] to-transparent" />
    </div>
  </div>
);

export const SpinnerWrapper = ({ onWidthChange }: { onWidthChange?: (width: number) => void }) => {
  const { multiplier, spinners, resetSpin } = useSpin();
  const { caseData } = useCaseStore();
  const { containerRef: spinnerContainerRef, width } = useContainerWidth();
  const [mount, setMount] = useState<boolean>(false);

  // Memoize spinners data
  const spinnersData = useMemo(() => {
    return Array.from({ length: multiplier }).map((_, spinnerIndex) => {
      const spinner = spinners[spinnerIndex] || {
        offset: 0,
        items: caseData?.items,
        wonItem: null,
        spinning: false,
      };
      return { spinner, spinnerIndex };
    });
  }, [multiplier, spinners, caseData?.items]);

  // Memoize width change callback
  const handleWidthChange = useCallback(
    (width: number) => {
      if (width > 0 && onWidthChange) {
        onWidthChange(width);
      }
    },
    [onWidthChange],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setMount(true);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    handleWidthChange(width);
  }, [width, handleWidthChange]);

  // Early returns for loading states
  if (!mount) {
    return <SkeletonWrapper />;
  }

  if (!caseData) {
    return <SkeletonWrapper />;
  }

  return (
    <div className="relative px-5 py-10">
      {spinnersData.map(({ spinner, spinnerIndex }) => (
        <SpinnerTape
          key={`spinner-container-${spinnerIndex}`}
          spinner={spinner}
          spinnerIndex={spinnerIndex}
          containerRef={spinnerContainerRef}
        />
      ))}
    </div>
  );
};
