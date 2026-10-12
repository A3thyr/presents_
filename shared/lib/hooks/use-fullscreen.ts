import { useEffect, useState } from "react";
import { useTelegram } from "./use-telegram";


export const useFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const telegram = useTelegram()

  useEffect(() => {
    telegram?.ready()
    setIsFullscreen(telegram?.isFullscreen || false);
  }, [telegram]);

  return isFullscreen;
}