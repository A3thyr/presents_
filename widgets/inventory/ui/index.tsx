"use client";

import { Skeleton } from "@/components";
import { EmptyInventory, InventoryError, InventoryItemDrawer, SortInventory } from "@/features";
import useInventory from "../api/use-inventory";
// import { useMemo } from "react";
import { InventorySell } from "@/features/inventory-sell";
// import { mockInventory } from "@/shared/constants";
import { cn } from "@/shared/utils/cn";

export const Inventory = () => {
  const {
    inventory: { data, isError, isLoading },
    view,
    filteredItems,
  } = useInventory();

  // const items = useMemo(() => data?.items || [], [data?.items]);

  if (isLoading)
    return (
      <div className="grid w-full grid-cols-3 gap-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton
            key={`inventory-item-skeleton-${index + 1}`}
            className="h-[140px] w-full rounded-xl"
          />
        ))}
      </div>
    );

  if (isError) return <InventoryError />;

  if (filteredItems.length === 0) return <EmptyInventory />;

  return (
    <>
      <InventorySell />
      <SortInventory />
      <div
        // в идеале сделать динмическую высоту
        style={{ height: 700 }}
        className="overflow-hidden"
      >
        <div
          className={cn(
            "h-full w-full overflow-y-auto pb-[100px]",
            view === "grid" && "grid grid-cols-2 gap-3",
            view === "full" && "flex flex-col gap-3",
          )}
        >
          {filteredItems.map((item) => (
            <InventoryItemDrawer
              key={`inventory-item-id${item.id}`}
              name={item.name}
              img={item.img}
              drop_rate={item.drop_rate}
              id={item.id}
              price={item.price}
              type={item.type}
            />
          ))}
        </div>
      </div>
    </>
  );
};
