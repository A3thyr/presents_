"use client";

import { Button, Skeleton, Typography } from "@/components";
import { useCollectionToggle } from "@/features/case-collection-toggle";
import { CasesGridItem } from "@/features/case-grid-item";
import { CollectionToggle } from "@/shared/constants";
import { CasesGrid } from "@/widgets";
import useCasesGrid from "@/widgets/cases-grid/api/use-cases";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC } from "react";

type CollectionWrapperProps = {
  name: CollectionToggle["type"];
};

export const CollectionWrapper: FC<CollectionWrapperProps> = ({ name }) => {
  const t = useTranslations("features.case-collection-toggle");
  const { data, isLoading, isError } = useCasesGrid();
  const { collection, setCollection } = useCollectionToggle();

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

  if (collection === "all") {
    return (
      <div className="flex w-full flex-col gap-2">
        <div className="inline-flex w-full items-center justify-between">
          <Typography tag="h2" className="text-[14px] leading-[16px] font-medium">
            {t(name)}
          </Typography>
          <Button onClick={() => setCollection(name)}>
            <ArrowRight width={16} height={16} />
          </Button>
        </div>
        <div className="bg-case-wrapper-background relative z-[10] w-full overflow-hidden rounded-[16px] border-[1px] border-white/40 px-5 py-4">
          <div className="relative z-[9] inline-flex w-full snap-x snap-proximity gap-2 overflow-auto pr-[10px]">
            {data?.slice(0, 4).map((item) => (
              <CasesGridItem
                key={`${collection}-case-item-id${item.id}`}
                lottie={item.lottie}
                id={item.id}
                img={item.img}
                name={item.name}
                price={item.price}
                customClassName="!w-[165px] !h-[190px] shrink-0"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="relative inline-flex items-center justify-center">
        <Button onClick={() => setCollection("all")} className="absolute left-0">
          <ArrowLeft />
        </Button>
        <Typography tag="h1" className="text-[14px] leading-[16px] font-medium">
          {t(collection)}
        </Typography>
      </div>
      <CasesGrid />
    </div>
  );
};
