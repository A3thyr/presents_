import { Typography } from "@/components"
import { Level } from "@/shared/interface"
import { cn } from "@/shared/utils/cn"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Star } from "lucide-react"
import { useTranslations } from "next-intl"
import Lottie from "lottie-react"
import { useUserStore } from "@/entities/user"
import { RefferalService } from "@/entities/refferal/refferla.service"
import { LEVEL_COLORS } from "@/shared/constants/level-colors"
import { LEVEL_IMG } from "@/shared/constants/level-pic"

interface LevelCardProps {
  level?: Level;
  className?: string;
}

type LevelCardComponent = React.FC<LevelCardProps>;

//widgets/refferal wrapper
export const LevelCard: LevelCardComponent = (props) => {
  
  
    const {level} = props
    const t = useTranslations()


    const {user} = useUserStore()

    const query = useQuery({
      queryKey: ["levels"],
      queryFn: RefferalService.getLevels,
      staleTime: 5 * 60 * 1000,
    });


    if (!query.data) return null

  
    if (user?.level! === 0 && !level) return (
      <div className={cn(" relative rounded-xl h-[120px] px-4 flex flex-col justify-end py-1", props.className, "border-[1px] border-white/10 overflow-hidden")}>
      <div className="w-full h-full absolute top-0 rounded-xl left-0 bg-gradient-to-bl from-black/40 to-transparent"/>
      <img src={LEVEL_IMG[user?.level! + 1  as keyof typeof LEVEL_IMG]} alt={"level"} className="absolute -top-10 rotate-12 opacity-25 -right-14 w-[300px] h-[300px]" />


      <Typography tag="span" className="text-[18px] font-bold">{t("levels.level")}{" "}{0} </Typography>
      <Typography tag="span" className="w-full flex gap-2 opacity-40 font-bold text-[14px]  mb-4 items-center"><Star size={17}/> {0}% {t("referral.profit")}</Typography>
     
    </div>
    )
    
    if (!level) return (
      <div className={cn(" relative rounded-xl h-[120px] px-4 flex flex-col justify-end py-1", props.className, "border-[1px] border-white/10 overflow-hidden")}>
        <div className="w-full h-full absolute top-0 rounded-xl left-0 bg-gradient-to-bl from-black/40 to-transparent"/>
        <img src={LEVEL_IMG[user?.level!  as keyof typeof LEVEL_IMG]} alt={"level"} className="absolute -top-10 rotate-12 opacity-25 -right-14 w-[300px] h-[300px]" />


        <Typography tag="span" className="text-[18px] font-bold">{t("levels.level")}{" "}{user?.level!} </Typography>
        <Typography tag="span" className="w-full flex gap-2 opacity-40 font-bold text-[14px]  mb-4 items-center"><Star size={17}/> {query.data[user?.level! - 1].percent * 100}% {t("referral.profit")}</Typography>
       
      </div>
    )
  
    return (
      <div className={cn(" min-h-[150px] relative rounded-xl px-4 flex flex-col justify-center overflow-hidden", props.className)}>
        <div className="w-full h-full absolute top-0 rounded-xl left-0 bg-gradient-to-bl from-black/40 to-transparent"/>
        <img src={LEVEL_IMG[level.level as keyof typeof LEVEL_IMG]} alt={level.nameKey} className="absolute -top-10 rotate-12 -right-14 w-[300px] h-[300px]" />
        <Typography tag="span" className="text-[18px] font-bold">{t(level.nameKey)}</Typography>
        <Typography tag="span" className="w-full flex gap-2 opacity-40 font-bold text-[14px]  mb-4 items-center"><Star size={17}/> {level.percent * 100}% {t("referral.profit")}</Typography>
        <div className="flex w-full flex-col justify-between">
          <Typography tag="span" className="font-bold opacity-50 text-sm">
            {level.requiredRefs}+ ref
          </Typography>
          <Typography tag="span" className="font-bold opacity-50 text-sm">
            {t("shared.level-card.or")}
          </Typography>
          <Typography tag="span" className="text-[14px] font-bold">
            {level.requiredTon} TON
          </Typography>
        </div>
    </div>
  );
};