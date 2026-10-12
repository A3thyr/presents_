import { Typography } from "@/components"
import { Transaction } from "@/shared/interface"
import { Check, CheckCheck, CircleX, Clock8, FileWarningIcon } from "lucide-react"

import { useTranslations } from "next-intl";
import { parseTitle } from "../../api/parse-title";

interface TransactionItemProps {
  transaction: Transaction;
}

type TransactionItemComponent = React.FC<TransactionItemProps>;

export const TransactionItem: TransactionItemComponent = ({ transaction }) => {
  const t = useTranslations("widgets.transaction-wrapper.item");

  const formatedData = new Date(transaction.created_at).toLocaleTimeString(
    "en-EN",
    {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  const ICON = {
    COMPLITED: <Check className="text-green-600" />,
    OPEN: <Clock8 className="text-zinc-400" />,
    REJECTED: <CircleX className="text-red-600" />,
  };

  return (
    <div className="bg-blend-color border-[1px] border-white/10  rounded-lg py-1 px-2">
      <div className="flex justify-between">
        <Typography tag="span">{t(parseTitle(transaction.title))}</Typography>

        <div className="flex gap-1">
          <Typography tag="span" className="font-bold font-sans">
            {Number(transaction.amount).toFixed(3)}
          </Typography>
          <Typography tag="span" className="mr-2 font-bold text-white/50 uppercase">
            {transaction.type}
          </Typography>
          <Typography tag="span" className="">
            {ICON[transaction.status]}
          </Typography>
        </div>
      </div>
      <Typography tag="span" className="text-[10px] text-zinc-400">
        {formatedData}
      </Typography>
    </div>
  );
};