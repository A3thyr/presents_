"use client";

import { Button, Typography } from "@/components";
import { TabName, usePaymentStore } from "@/entities/payment/payment.store";
import { cn } from "@/shared/utils/cn";
import { validateInputValue } from "@/shared/utils/validateInput";
import { ArrowUp, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Drawer } from "vaul";

import TonIcon from "@/shared/assets/tonsymbolsmall.svg";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useUserStore } from "@/entities/user";
import { useTranslations } from "next-intl";
import { useTelegram } from "@/shared/lib/hooks/use-telegram";
import { PaymentService } from "@/entities/payment/payment.service";
import { toast } from "react-toastify";


type PaymentDrawerProps = object;

type PaymentDrawerComponent = React.FC<PaymentDrawerProps>;

export const PaymentDrawer: PaymentDrawerComponent = () => {
  const t = useTranslations("features.payment-drawer");
  const [open, setIsOpen] = useState<boolean>(false)
  const telegram = useTelegram()
  const handleToggle = () => {
    telegram?.HapticFeedback.impactOccurred("medium")
    setIsOpen(true)
  }
  return (
    <Drawer.Root onClose={() => setIsOpen(false)} open={open}>
      <Drawer.Trigger onClick={handleToggle} className="relative border-2  text-blue-500 flex h-12 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-xl   px-4 text-sm font-medium shadow-sm transition-all  dark:text-blue-400">
        <ArrowUp />
        {t("title")}
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/80" />
        <Drawer.Content className="flex z-30 bg-black flex-col py-4 rounded-t-[10px] mt-24 h-[400px] lg:h-[320px] fixed bottom-0 left-0 right-0 outline-none">
          <Drawer.Title className="flex justify-center">
            <div className="bg-black h-1 rounded-full border-[1px] w-[70px]" />
          </Drawer.Title>
          <Drawer.Title className="font-bold text-center mt-5 text-[20px]">
            {t("balance")}
          </Drawer.Title>

          <div className="p-4 rounded-t-[10px] flex-1 flex flex-col gap-4 overflow-y-auto">
            <PaymentTabs />
            <PaymentForm setIsOpen={setIsOpen}/>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

type Tab = {
  value: TabName;
  title: string;
  sale: boolean | number;
};

const PAYMENT_TAB: Tab[] = [
  {
    value: "ton",
    title: "TON",
    sale: 0.1,
  },
  {
    value: "stars",
    title: "Stars",
    sale: false,
  },
];

const PaymentTabs = () => {
  const { selectedTab, setSelectedTab } = usePaymentStore();

  return (
    <div className="flex w-full">
      {PAYMENT_TAB.map((el, i) => {
        return (
          <button
            key={el.value + i}
            onClick={() => setSelectedTab(el.value)}
            className={cn(
              "flex-1 relative py-2 rounded-md transition-all duration-100",
              selectedTab === el.value && "bg-blue-400"
            )}
          >
            {typeof el.sale === "number" && (
              <div className="absolute z-2 -top-2 -right-2 bg-green-500 rounded-full px-2 py-0.5 text-[14px] font-semibold">
                +{el.sale * 100} %
              </div>
            )}
            {el.title}
          </button>
        );
      })}
    </div>
  );
};

const FORM_CONFIG = {
  ton: {
    min: 0.1,
    sale: 0.1,
  },
  stars: {
    min: 1,
    max: 400,
    sale: 0,
  },
};

const PaymentForm = ({setIsOpen}: {setIsOpen: (isOpen: boolean) => void}) => {
  const [value, setValue] = useState("");
  const { selectedTab } = usePaymentStore();
  const [tonConnectUI] = useTonConnectUI();
  const { user } = useUserStore();
  const telegram = useTelegram();

  const t = useTranslations("features.payment-drawer.payment-form");
  const tToast = useTranslations("features.payment-drawer.toast");

  // const waitInvoice = async () => {
  //   if (telegram) {
  //     telegram.onEvent("invoiceClosed", async (status) => {
  //       if (status.status === "paid") {
  //         const response = await requestService.requestById(
  //           id || "",
  //           window.Telegram?.WebApp.initData,
  //         );
  //         localStorage.setItem("id", "");
  //         setData(response.data);
  //         setIsPaid(response.data.boughtStatus === "FULL" ? true : false);
  //         responseData?.type === "ALREADY" &&
  //           responseData?.preferredGender === "MALE" &&
  //           router.push(`/${locale}/final-page/already-preg/boy-page`);
  //         responseData?.type === "ALREADY" &&
  //           responseData?.preferredGender === "FEMALE" &&
  //           router.push(`/${locale}/final-page/already-preg/girl-page`);
  //         responseData?.type === "PLANNED" &&
  //           responseData?.preferredGender === "MALE" &&
  //           router.push(`/${locale}/final-page`);
  //         responseData?.type === "PLANNED" &&
  //           responseData?.preferredGender === "FEMALE" &&
  //           router.push(`/${locale}/final-page/plan-preg`);
  //       } else if (status.status === "failed" || "cancelled") {
  //         router.push(`/${locale}/calculate/payment-error`);
  //         console.error("Оплата не удалась или была отменена");
  //       }
  //     });
  //   }
  // };

  const handleSubmit = async (data: unknown) => {
    console.log("data:", data);
    if (selectedTab === "ton") {
      if (!tonConnectUI.connected) {
        toast.error("Wallet connections")
        return
      }

      if ( Math.floor(Number(value)) < 0.1) {
        setValue("0.1")}


      if (user) {
       
        setIsOpen(false)

        try {
          await tonConnectUI.sendTransaction({
            messages: [
              {
                address: user.wallet,
                amount: (Number(value) * 1e9).toString(),
              },
            ],
           
            validUntil: Math.floor(Date.now() / 1000) + 5 * 60
          });
          toast.success(tToast("success"))
        } catch (error) {
          console.error("error sending a transaction:", error);
          toast.error(tToast("error"))
          setIsOpen(false)
        }
      }
    } else {
      try {
        const response = await PaymentService.createInvoice(Number(value));
        telegram?.openInvoice(`${response.invoice_link}`);
        setIsOpen(false)
      } catch (error: any) {
        throw error?.response?.data;
      }

      return;
    }
  };

  useEffect(() => {
    return () => {
      telegram?.offEvent("invoiceClosed", () => {});
    };
  }, [telegram]);

  return (
    <form onSubmit={
      (e) => {
        e.preventDefault()
        handleSubmit(e)
      }
      } className="flex-1">
      <div className="flex flex-col h-full gap-2">
        {/* Конейнер инпута */}
        <div className="relative flex">
          {selectedTab === "ton" && (
            <TonIcon className="absolute left-2 top-1/2 -translate-y-1/2" />
          )}
          {selectedTab === "stars" && (
            <Star className="absolute left-2 top-1/2 -translate-y-1/2 text-amber-300 " />
          )}
          <input
            value={value}
            placeholder={selectedTab === "ton" ? "0.1 TON" : "1 Stars"}
            onChange={(e) => {
              const res = validateInputValue(e.target.value);
              selectedTab === "stars" && Number(res) > 400 && setValue("400")
              setValue(res);
            }}
            inputMode="decimal"
            className="border-[1px] border-zinc-500 flex-1 py-[14px] rounded-lg px-10 outline-none"
          />
        </div>

        {/* Контейнер c суммами*/}
        <div className="flex gap-2">
          <Typography tag="span" className="text-zinc-500 text-[14px]">
            {t("min")} {FORM_CONFIG[selectedTab].min}
            {selectedTab === "ton" && <span className="pl-1">TON</span>}
          </Typography>
          {"max" in FORM_CONFIG[selectedTab] ? (
            <Typography tag="span" className="text-zinc-500 text-[14px]">
              {t("max")} {(FORM_CONFIG[selectedTab] as { max: number }).max}
              {selectedTab === "ton" && <span className="pl-1">TON</span>}
            </Typography>
          ) : null}
        </div>

        {/* Контейнер калькулятора ТОНА*/}
        {selectedTab === "ton" && (
          <div>
            {value && Number(value) > 0 && (
              <>
                <Typography
                  tag="span"
                  className="text-[14px] text-green-400 mr-1"
                >
                  💰 {t("income")}{" "}
                  {Number(value) +
                    Number(value) * FORM_CONFIG[selectedTab].sale}
                </Typography>
                {selectedTab === "ton" && (
                  <span className="text-[14px] text-green-400 mr-2">TON</span>
                )}
              </>
            )}
          </div>
        )}

        {/* Контейнер калькулятора Звезд */}
        {selectedTab === "stars" && (
          <div>
            {value && Number(value) > 0 && (
              <Typography tag="span">
                {(Number(value) * 0.0039).toFixed(3)} TON
              </Typography>
            )}
          </div>
        )}

        {/* Контейнер кнопок */}
        <div className="flex gap-2 mt-auto mb-3">
          <Drawer.Close className="text-white flex-1  py-2.5 rounded-lg">
            {t("btns.cancel")}
          </Drawer.Close>
          <Button
            type="button"
            onClick={handleSubmit}
            className="flex-1 bg-blue-400 py-2.5 rounded-lg "
          >
            {t("btns.deposit")}
          </Button>
        </div>
      </div>
    </form>
  );
};
