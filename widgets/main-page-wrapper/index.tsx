"use client";

import { CollectionWrapper, useCollectionToggle } from "@/features";
import { COLLECTION_TOGGLE_DATA } from "@/shared/constants";
import React from "react";

export const MainPageWrapper = () => {
  const { collection } = useCollectionToggle();

  if (collection === "all") {
    return (
      <div
        style={{ height: 800 }}
        className="z-[5] mt-[6px] overflow-hidden rounded-t-[24px] bg-black px-4 pt-4"
      >
        <div className="flex h-full w-full flex-col items-center justify-center gap-6 overflow-y-auto pt-[220px] pb-[200px]">
          {COLLECTION_TOGGLE_DATA.slice(1, 4).map((item) => (
            <CollectionWrapper key={`collection-wrapper-id${item.id}`} name={item.type} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="z-[5] mt-[6px] flex flex-col items-center justify-center gap-6 rounded-t-[24px] bg-black px-4 pt-4">
      {COLLECTION_TOGGLE_DATA.slice(1, 4).map((item) => (
        <CollectionWrapper key={`collection-wrapper-id${item.id}`} name={item.type} />
      ))}
    </div>
  );
};
