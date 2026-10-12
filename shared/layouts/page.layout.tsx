"use client"

import { Header, Navbar } from "@/widgets";
import { useTelegram } from "../lib/hooks/use-telegram";
import { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import { cn } from "../utils/cn";
import { useFullscreen } from "../lib/hooks/use-fullscreen";

interface PageLayoutProps {
  children: React.ReactNode;
}

/**
 *
 * Основной лейаут для страниц
 *
 * @module Layouts
 * @example
 * <>
 *  <Header/>
 *  {children}
 * </>
 * @returns ReactNode
 *
 */
const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {


  const isFullscreen = useFullscreen()
  return (
    <main className={cn(isFullscreen &&`pt-14`, "font-sans")}>
      <ToastContainer autoClose={1000} className={"z-[120] pt-[100px] bg-black/80"} position="top-center" theme="black"/>
      <Header />
      {children}
      <Navbar />
    </main>
  );
};

export default PageLayout;
