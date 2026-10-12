"use client";

import { Button, Input } from "@/components";
import { cn } from "@/shared/utils/cn";
import useInventory from "@/widgets/inventory/api/use-inventory";
import { LayoutGrid, Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC } from "react";

export const SortInventory: FC = () => {
  const { view, setView, updateSearchValue } = useInventory();
  const t = useTranslations("features.sort-inventory");
  return (
    <div className="inline-flex w-full items-start justify-between pb-8">
      <div className="inline-flex items-center justify-center gap-2">
        <Input
          name="title"
          onChange={updateSearchValue}
          placeholder={t("title-search-placeholder")}
          className="bg-semitransparent-black w-fit max-w-[120px] rounded-[40px] border-white/40 px-3 py-2 text-[10px] leading-[12px] font-normal backdrop-blur-md"
        />
        <Input
          name="price"
          readOnly // нужно понять, какая фильтрация по цене должна быть
          placeholder={t("price-search-placeholder")}
          className="bg-semitransparent-black w-fit max-w-[85px] rounded-[40px] border-white/40 px-7 py-2 text-[10px] leading-[12px] font-normal backdrop-blur-md"
        />
      </div>
      <div className="inline-flex items-center justify-center gap-3">
        <Button
          onClick={() => setView("full")}
          className={cn("opacity-40", view === "full" && "opacity-100")}
        >
          <Menu />
        </Button>
        <Button
          onClick={() => setView("grid")}
          className={cn("opacity-40", view === "grid" && "opacity-100")}
        >
          <LayoutGrid />
        </Button>
      </div>
    </div>
  );
};
