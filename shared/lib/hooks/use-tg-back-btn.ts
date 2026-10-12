import { useEffect } from "react";
import { useTelegram } from "./use-telegram";
import { useRouter } from "next/navigation";

/**
 * @example
 * const Component = () => {
 *  useTgBackButton('/some-page') // return back to previous page
 *
 *  return (...)
 * }
 */
export const useTgBackButton = (link: string) => {
  const telegram = useTelegram();
  const router = useRouter();

  useEffect(() => {
    telegram?.BackButton.show();
    telegram?.BackButton.onClick(() => {
      router.push(link);
      telegram.BackButton.hide();
    });

    return () => {
      telegram?.BackButton.hide();
    };
  }, [link, router, telegram?.BackButton]);
};
