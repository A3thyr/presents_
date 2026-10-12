"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components";
import { DialogClose } from "@radix-ui/react-dialog";
import { useTranslations } from "next-intl";
import React, { FC } from "react";
import { useSell } from "./api/use-sell";
import { useUiStore } from "./api/sell-item.store";

type ConfirmSellDialogProps = {
  id: string;
  price: number;
  name: string;
  //   onSuccess?: () => void;
};

export const ConfirmSellDialog: FC<ConfirmSellDialogProps> = ({
  id,
  //   price,
  //   name,
  //   onSuccess
}) => {
  const t = useTranslations();
  const { handleSell, isLoading } = useSell(id);
  const { isSellDialogOpen, setSellDialogOpen, closeAll, sellingItem } =
    useUiStore();

  const handleConfirm = async () => {
    const success = await handleSell();
    if (success) {
      closeAll();
    }
  };

  return (
    <Dialog open={isSellDialogOpen} onOpenChange={setSellDialogOpen}>
      <DialogTrigger asChild>
        <Button className="flex-1 bg-blue-400 py-2.5 rounded-lg ">
          {t("features.inventory-item-drawer.btns.sell")}
        </Button>
      </DialogTrigger>
      <DialogContent className="border-white/20 bg-black">
        <DialogHeader>
          <DialogTitle>{t("features.confirm-sell-dialog.title")}</DialogTitle>
          <DialogDescription>
            {t("features.confirm-sell-dialog.description")} {sellingItem?.name}{" "}
            {t("features.confirm-sell-dialog.for")} {sellingItem?.price} TON?
          </DialogDescription>
          <DialogFooter className="flex-row justify-center gap-10 pt-10">
            <DialogClose
              disabled={isLoading}
              className="flex-1  py-2.5 rounded-lg "
            >
              {t("features.confirm-sell-dialog.btns.cancel")}
            </DialogClose>
            <Button
              disabled={isLoading}
              onClick={handleConfirm}
              className="flex-1 bg-blue-400 py-2.5 rounded-lg "
            >
              {t("features.confirm-sell-dialog.btns.confirm")}
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
