"use client";

import { Button, Typography } from "@/components";
// import { NAVBAR_BTNS } from "@/shared/constants";
import { cn } from "@/shared/utils/cn";
import { LayoutDashboard, Package, User } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useEffect, useMemo } from "react";

/**
 *
 * Navbar - навбар для навигации по основным страницам приложения
 *
 * @returns React.FC
 */

export const Navbar: FC = () => {
  const pathname = usePathname();
  const t = useTranslations();
  const locale = useLocale();

  // HMR запретил срать(импортить пре рендерные иконки), SOLID - В С Ё
  const NAVBAR_BTNS = useMemo(
    () => [
      {
        id: 1,
        title: "widgets.navbar.inventory",
        icon: <Package />,
        link: "/inventory",
        route: `/${locale}/inventory`,
      },

      {
        id: 2,
        title: "widgets.navbar.home",
        icon: <LayoutDashboard />,
        link: "/",
        route: `/${locale}`,
      },

      {
        id: 3,
        title: "widgets.navbar.profile",
        icon: <User />,
        link: "/profile",
        route: `/${locale}/profile`,
      },
    ],
    [locale],
  );
  return (
    <nav className="fixed bottom-8 left-1/2 z-[31] m-[0_auto] mx-auto flex w-full max-w-[90svw] -translate-x-[50%] items-center justify-around rounded-2xl bg-black/30 px-5 py-3 backdrop-blur-[50px]">
      {NAVBAR_BTNS.map((btn) => (
        <Link href={btn.link} key={`btn-id-${btn.id}`} prefetch>
          <Button
            variant="navbar"
            className={cn(
              "text-inactive-grey min-w-14 rounded-xl bg-transparent py-2",
              pathname === btn.route && "text-white",
              pathname !== btn.route &&
                "hover:text-hovered-grey hover:scale-102 hover:transform hover:bg-white/5",
            )}
            style={{
              color: pathname === btn.route ? "#ffffff" : "var(--inactive-grey, #6b7280)",
            }}
          >
            {btn.icon}
            <Typography tag="span" className="text-[12px] leading-[18px] capitalize">
              {t(btn.title)}
            </Typography>
          </Button>
        </Link>
      ))}
    </nav>
  );
};
