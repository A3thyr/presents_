"use client";

import { View } from "@/shared/layouts/view.layout";
import { useTgBackButton } from "@/shared/lib/hooks/use-tg-back-btn";
import { Loader } from "@/shared/ui";
import { CaseRoulette, LootList } from "@/widgets";
import useCaseById from "@/widgets/cases-grid/api/use-case-id";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import CaseIdBackground from "@/public/images/pages/case-id/case-id-page-background.png";

export default function CaseIdPage() {
  const { id } = useParams<{ id: string }>();
  const { isLoading, data: caseData } = useCaseById(id);
  const t = useTranslations("pages.case-id");
  // const { isSpinEnded, isSpinning, multiplier } = useSpin();
  useTgBackButton("/");

  // Reset spin results if they belong to a different case

  if (isLoading) return <Loader fullScreen={false} />;

  if (!caseData)
    return (
      <div className="flex h-screen w-full items-center justify-center">{t("not-available")}</div>
    );

  return (
    <View style={{ backgroundImage: `url(${CaseIdBackground.src})`, backgroundSize: "cover" }}>
      <CaseRoulette />
      <LootList />
    </View>
  );
}
