"use client";

import { Skeleton } from "@/components";
import { CasesGridItem } from "@/features";
import { Suspense } from "react";
import useCasesGrid from "../api/use-cases";

export const CasesGrid = () => {
  const { data, isLoading, isError } = useCasesGrid();

  if (isError) return <>No cases are available.</>;

  if (isLoading)
    return (
      <div className="grid w-full grid-cols-2 gap-4 pt-10">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton
            key={`collection-grid-item-skeleton-id${index}`}
            className="h-[180px] w-full rounded-2xl"
          />
        ))}
      </div>
    );

  return (
    <div style={{ height: 700 }} className="overflow-hidden">
      <div className="grid h-full w-full grid-cols-2 gap-4 overflow-y-auto pb-[100px]">
        {data
          ?.sort((a, b) => b.price - a.price)
          .map((item) => (
            // {CASES_GRID_ITEMS.map((item) => (
            <Suspense
              key={`case-item-grid-${item.id}`}
              fallback={<Skeleton className="h-[180px] w-full rounded-2xl" />}
            >
              <CasesGridItem
                lottie={item.lottie}
                id={item.id}
                img={item.img}
                price={item.price}
                name={item.name}
              />
            </Suspense>
          ))}
      </div>
    </div>
  );
};
