"use client";

import { CaseCollectionToggle } from "@/features";
import { View } from "@/shared/layouts/view.layout";
import { Gradient } from "@/shared/ui";
import { LivePrizes, MainPageWrapper } from "@/widgets";

export default function InitPage() {
  return (
    <View className="relative h-screen overflow-hidden px-0">
      <LivePrizes />
      <CaseCollectionToggle />
      <MainPageWrapper />
      <Gradient className="absolute top-[10%] left-[10%] z-[-1] rotate-45" />
    </View>
  );
}
