"use client";

import { Button, Typography } from "@/components";
import TonIcon from "@/shared/assets/tonsymbolsmall.svg";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { Drawer } from "vaul";
import { useUiStore } from "../confirm-sell-dialog/api/sell-item.store";
import { InventoryItemGrid, InventoryItemFull, InventoryItemProps } from "../inventory-item";
import { ItemsService } from "@/entities/items/items.service";
import { toast } from "react-toastify";
import { useAuth } from "@/shared/lib/hooks/use-auth";
import useInventory from "@/widgets/inventory/api/use-inventory";
import { UserService } from "@/entities/user";
import DrawerBackground from "@/public/images/features/inventory-item-drawer/drawer-background-image.png";

export const InventoryItemDrawer: FC<InventoryItemProps> = ({
  drop_rate,
  id,
  name,
  img,
  price,
  type = "unique",
}) => {
  const t = useTranslations("features.inventory-item-drawer");
  const { closeAll } = useUiStore();
  const { userQuery } = useAuth();
  const {
    inventory: { refetch },
    view,
  } = useInventory();

  const handleSendNft = async () => {
    try {
      await UserService.sentNft({ itemId: id });
      toast.success(t("successful_withdrawal"), { autoClose: 1000 });
      userQuery.refetch();
      refetch();
    } catch (error) {
      toast.error(t("withdrawal_failed"));
      console.log("Withdraw error occured:", error);
    } finally {
      closeAll();
    }
  };

  const handleSell = async () => {
    try {
      await ItemsService.sellItem(id);
      toast.success(t("successfully_sold"), { autoClose: 1000 });
      userQuery.refetch();
      refetch();
    } catch (error) {
      toast.error(t("sell_failed"));
      console.log("Sell error occured:", error);
    } finally {
      closeAll();
    }
  };

  const disbaleWithdraw =
    userQuery.data?.balance && userQuery.data?.balance.ton < 0.1 && type === "unique";

  return (
    <Drawer.Root>
      <Drawer.Trigger>
        {view === "grid" ? (
          <InventoryItemGrid
            drop_rate={drop_rate}
            name={name}
            price={price}
            id={id}
            img={img}
            type={type}
          />
        ) : (
          <InventoryItemFull
            drop_rate={drop_rate}
            name={name}
            price={price}
            id={id}
            img={img}
            type={type}
          />
        )}
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[11] hidden bg-black/80" />
        <Drawer.Content
          style={{ backgroundImage: `url(${DrawerBackground.src})`, backgroundSize: "cover" }}
          className="fixed right-0 bottom-0 left-0 z-30 mt-24 flex min-h-screen flex-col justify-center rounded-t-[10px] bg-black py-4 outline-none lg:h-[320px]"
        >
          {/**стоит display: none, ибо рудимент, но ебашит варнинг */}
          <Drawer.Title className="mt-5 hidden text-center text-[20px] font-bold">
            {name}
          </Drawer.Title>

          <div className="flex flex-col justify-center gap-[61px] px-4">
            <div className="flex w-full flex-col items-center justify-center gap-10">
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="flex flex-col items-center justify-center gap-1">
                  <Typography tag="h1" className="text-[20px] leading-[19px] font-bold">
                    {name}
                  </Typography>
                  <Typography
                    tag="span"
                    className="text-[14px] leading-[16px] font-medium opacity-40"
                  >
                    {t("span.from-case")} {/**здесь должно быть название кейса из апи */}
                  </Typography>
                </div>

                <Typography tag="h4" className="text-[18px] leading-[21px] font-medium">
                  {t("span.in-your-inv")}
                </Typography>

                <div className="inline-flex items-center gap-2">
                  <Typography tag="h2" className="text-lg font-semibold">
                    {t("span.price")}: {price}
                  </Typography>
                  <TonIcon />
                </div>

                {/* <Typography tag="h3" className="text-sm text-white/40">
                  {t("span.drop-rate")}: {drop_rate} %
                </Typography> */}
              </div>

              {/* Комиссия вывода уникальных предметов */}
              {/* {type === "unique" && (
                <Typography tag="h3" className="text-sm font-bold text-white/60">
                  {t("span.commision")}: {0.1} TON
                </Typography>
              )} */}

              {type === "unique" ? (
                <div className="flex items-center justify-center rounded-xl">
                  <img src={img as string} alt={name} className="h-[120px] w-[120px]" />
                </div>
              ) : (
                <div className="flex items-center justify-center rounded-xl border-[1px] border-white/90 bg-transparent px-7 py-10">
                  <img src={img as string} alt={name} className="h-[110px] w-[110px]" />
                </div>
              )}
            </div>
            <div className="flex max-h-[100px] w-full flex-1 flex-row items-center gap-2 rounded-t-[10px] px-4">
              <Button
                // здесь поставить продажу
                // onClick={handleSendNft}
                disabled={disbaleWithdraw}
                className="bg-semitransparent-black flex-1 rounded-[10px] py-3 text-[12px] leading-[14px] font-semibold text-white"
              >
                {t("btns.sell")}
              </Button>
              <Button
                // сменить функционал на открытие кейса, привязанного к айтему
                // onClick={handleSell}
                type="button"
                className="bg-dark-blue flex-1 rounded-[40px] px-8 py-3 text-[12px] leading-[14px] font-semibold text-nowrap"
              >
                {t("btns.open")}
              </Button>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
