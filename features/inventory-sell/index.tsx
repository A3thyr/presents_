import * as React from "react";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components";
import useInventory from "@/widgets/inventory/api/use-inventory";
import { ItemsService } from "@/entities/items/items.service";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { useAuth } from "@/shared/lib/hooks/use-auth";

export const InventorySell = () => {
  const {
    inventory: { data, refetch },
  } = useInventory();
  const { userQuery } = useAuth();

  const t = useTranslations("features.inventory-item-drawer");

  const totalPrice = data?.items.reduce((acc, item) => acc + item.price, 0);

  const handleSell = async () => {
    try {
      await ItemsService.sellAll();
      toast.success(t("sell-all.toast.success"), { progress: 0 });
      refetch();
      userQuery.refetch();
    } catch (error) {
      toast.error(t("sell-all.toast.error"), { progress: 0 });
      console.log("A sell error occured:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          asChild
          className="fixed right-6 bottom-32 z-20 rounded-2xl bg-blue-400/50 px-7 py-2 font-bold uppercase backdrop-blur-xl"
        >
          {t("sell-all.title")}
        </Button>
      </DialogTrigger>
      <DialogContent className="border-none bg-black/80">
        <DialogHeader>
          <DialogTitle>{t("sell-all.title")}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex flex-col items-center justify-center gap-4 text-white/60">
          {t("sell-all.description")}
          <span className="text-lg font-bold text-white">{totalPrice?.toFixed(2)} TON</span>
        </DialogDescription>
        <DialogFooter className="flex h-10 flex-row items-center justify-between">
          <DialogClose className="h-full flex-1">{t("sell-all.btns.cancel")}</DialogClose>
          <Button
            asChild
            onClick={handleSell}
            className="h-full flex-1 rounded-xl bg-blue-400 backdrop-blur-xl"
          >
            {t("sell-all.btns.sell")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
