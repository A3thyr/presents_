import { Typography } from "@/components"
import { useUserStore } from "@/entities/user"
import { useTelegram } from "@/shared/lib/hooks/use-telegram"
import { Copy } from "lucide-react"
import { toast } from "react-toastify"

export const RefferalLink = () => {

    const user = useUserStore()
    const link = `https://t.me/StonksGiftBot?start=${user.user?.telegram_id}`
    const telegram = useTelegram()



    const handleCopy = async() => {
        navigator.clipboard.writeText(link).then(() => toast.success("Copied")).catch(e => toast.error("Error to copy"))
        telegram?.HapticFeedback.impactOccurred("medium")
        telegram?.shareMessage(link)
    }

    return (
      <div onClick={handleCopy} className="border-[1px] flex  items-center justify-between px-3  border-zinc-700 rounded-lg py-2 bg-black/20">
        <Typography tag="span" className="text-[12px] text-zinc-500">{link}</Typography>
        <Copy color="#71717b" size={14}/>
      </div>
    )
}