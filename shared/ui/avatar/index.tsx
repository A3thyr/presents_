import { useUserStore } from "@/entities/user"
import { cn } from "@/shared/utils/cn"

interface UserAvatarProps {
    className?: string
    img: string
  }
  
  type UserAvatarComponent = React.FC<UserAvatarProps>
  
export const UserAvatar: UserAvatarComponent = ({className, img}) => {

    const {user} = useUserStore()

    if (!img) {
      if (!user) return
      const name = user?.username.split(" ")
      return (
      <div className={cn("flex items-center justify-center text-2xl bg-linear-30 from-zinc-900 to-blue-900 font-bold rounded-full ", className)}>
        <span>{name[0][0]}</span>      
      </div>
    )
  }
    return <img src={img} alt="avatar" className={cn("rounded-full", className)}/>
  }
  
  