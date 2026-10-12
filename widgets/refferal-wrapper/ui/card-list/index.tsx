import { RefferalService } from "@/entities/refferal/refferla.service"
import { useQuery } from "@tanstack/react-query"
import { RefferalPointerCard } from "../card-item"

export const RefferalPointersCardList = () => {

    const query = useQuery({
      queryKey: ["refs/statistic"],
      queryFn: RefferalService.getRefferals
    })
  
    if (query.isLoading || !query.data) return null
  
    return (
      <div className="flex gap-2 w-full">
          <RefferalPointerCard title="total" data={query.data.totalRefferals.length}/>
          <RefferalPointerCard title="activity" data={query.data.refferalsProfit}/>
          <RefferalPointerCard title="totalBalance" data={query.data.userProfit}/>
      </div>
    )
  
  }