"use client";

import { ItemsService } from "@/entities/items/items.service";
import { useQuery } from "@tanstack/react-query";

export function usePrizesList() {
  // const [prizes, setPrizes] = useState<LivePrizeItemProps[]>([]);
  // const [isMounted, setIsMounted] = useState(false);

  const prizes = useQuery({
    queryKey: ["prizes"],
    queryFn: () => ItemsService.getItemsLast(),
    refetchInterval: 10 * 1000,
    staleTime: 10 * 1000,
  });

  // useEffect(() => {
  //   setIsMounted(true);
  //   setPrizes(LIVE_PRIZES_MOCK); // Initialize with mock data

  //   const interval = setInterval(() => {
  //     const newPrize = {
  //       id: Date.now().toString(), // Unique ID
  //       title: `Player${Math.floor(Math.random() * 100)}`,
  //       img: YeDag,
  //     };
  //     setPrizes((prev) => [newPrize, ...prev.slice(0, 7)]); // Keep last 8 items
  //   }, 15000);

  //   return () => clearInterval(interval);
  // }, []);

  return prizes;
}
