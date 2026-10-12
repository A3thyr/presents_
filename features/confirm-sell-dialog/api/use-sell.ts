import { ItemsService } from "@/entities/items/items.service";
import { useUserStore } from "@/entities/user";
import useInventory from "@/widgets/inventory/api/use-inventory";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "react-toastify";

export function useSell(id: string) {
  const [isLoading, setIsLoading] = useState<boolean>();

  const { setUser, user } = useUserStore();
  const {
    inventory: { refetch },
  } = useInventory();

  const t = useTranslations("features.confirm-sell-dialog.toast");

  const handleSell = async () => {
    setIsLoading(true);
    try {
      const res = await ItemsService.sellItem(id);
      if (user) setUser({ ...user, balance: res.newBalance });
      toast.success(t("success"));
      // рефетч инвентаря
      refetch();
      return true;
    } catch (error) {
      console.log("Sell error:", error);
      toast.error("error");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSell, isLoading };
}
