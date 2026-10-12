"use client";

import { SpinService, useSpinStore } from "@/entities/spin";
import { CaseItem } from "@/shared/interface";
import { useAuth } from "@/shared/lib/hooks/use-auth";

export interface SpinState {
  offset: number;
  items: CaseItem[];
  wonItem: CaseItem | null;
  spinning: boolean;
}

export default function useSpin() {
  // const [multiplier, setMultiplier] = useState<number>(1);
  // const [spinners, setSpinners] = useState<SpinState[]>([]);
  // const [isSpinning, setIsSpinning] = useState(false);
  // const [isSpinEnded, setIsSpinEnded] = useState(false);

  const {
    isSpinEnded,
    isSpinning,
    multiplier,
    setIsSpinEnded,
    setIsSpinning,
    setMultiplier,
    setSpinners,
    spinners,
    isDemo,
    currentCaseId,
    setCurrentCaseId
  } = useSpinStore();

  // const isSpinEnded = spinners.length > 0 && !isSpinning;

  // useEffect(() => {
  //   console.log("isSpinEnded:", isSpinEnded);
  // }, [isSpinEnded]);
  const {userQuery} = useAuth()



  const spinCase = async (
    id: string,
    spins: number,
    containerWidth: number
  ) => {
    if (isSpinning) return;

    setIsSpinning(true);
    setCurrentCaseId(id); // Set current case ID
    const spinStartTime = Date.now(); // Track when we started
    console.log("containerWidth", containerWidth);

    try {
      const spinResults = isDemo ? await SpinService.postSpinDemo(id, spins) : await SpinService.postSpin(id, spins);
      const apiCallDuration = Date.now() - spinStartTime; // How long API took

      const updatedSpinners = spinResults.map((result) => {
        const displayItems = result.spinArr

        const itemWidth = 98; // ширина одного айтема
        const centerOffset = containerWidth / 2 - itemWidth / 2;

        // отступ = ширина всех айтемов - позиция выигрыша - центр
        const randomOffset = Math.floor(Math.random() * 31) - 30; // от -15 до +15

        const finalPosition =
          result.indexOfWinItem * itemWidth - centerOffset + randomOffset;





        return {
          // ...initialSpinners[index],
          offset: -finalPosition,
          items: displayItems,
          wonItem: result.winItem,
          spinning: true,
        };
      });

      setSpinners(updatedSpinners);

      const remainingAnimationTime = Math.max(7500 - apiCallDuration, 0);

      const spinTimer = setTimeout(() => {
        setSpinners(
          updatedSpinners.map((spinner) => ({
            ...spinner,
            spinning: false,
          }))
        );

        setIsSpinning(false);
        setIsSpinEnded(true);
      }, remainingAnimationTime);

      return () => clearTimeout(spinTimer);
    } catch (error) {
      console.error("Spin failed:", error);
      setIsSpinning(false);
    }
  };

  const resetSpin = async () => {
    setSpinners([]);
    setIsSpinEnded(false);
    setCurrentCaseId(null); // Clear current case ID
  };

  const handleSpin = async (
    id: string,
    spins: number,
    containerWidth: number
  ) => {
    await resetSpin();
    await spinCase(id, spins, containerWidth);
    userQuery.refetch()
  };

  return {
    spinCase,
    resetSpin,
    isSpinning,
    setIsSpinning,
    spinners,
    multiplier,
    setMultiplier,
    isSpinEnded,
    handleSpin,
    currentCaseId,
  };
}
