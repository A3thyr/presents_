"use client";

import { Typography } from "@/components";
import TonIcon from "@/shared/assets/tonsymbolsmall.svg";
import { cn } from "@/shared/utils/cn";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Lottie from "lottie-react";
import { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";

export type CasesGridItemProps = {
  id: string | number;
  name: string;
  img: string | StaticImageData;
  price: string | number;
  lottie: string;
  customClassName?: string;
};

export const CasesGridItem: FC<CasesGridItemProps> = ({
  id,
  //  img,
  price,
  name,
  lottie,
  customClassName,
}) => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const lottieJson = useQuery({
    queryKey: [`lottie/${id}`],
    queryFn: async () => {
      const str = lottie.split("/");
      return axios.get(`/s3/${str[5]}`).then((res) => res.data);
    },
    staleTime: 10 * 60 * 1000,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1, // Элемент считается видимым когда 10% его площади видно
        rootMargin: "50px", // Добавляем небольшой отступ для более плавного переключения
      },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={elementRef}
      onClick={() => router.push(`/case/${id}`)}
      className={cn(
        "group relative h-[250px] cursor-pointer rounded-2xl border-[1px] border-white/20 bg-transparent transition-all duration-500 ease-out",
        customClassName,
      )}
    >
      <div className="relative flex h-full w-full flex-col p-3 py-2">
        <Typography tag="h2" className="w-full pb-1 text-center text-sm font-semibold">
          {name}
        </Typography>
        <div className="relative flex w-full flex-1 items-center justify-center pt-1 pb-2">
          {lottie && lottieJson.data ? (
            <Lottie
              animationData={lottieJson.data}
              loop={isVisible}
              autoplay={isVisible}
              className="max-h-[104px] max-w-[136px]"
            />
          ) : (
            <div className="h-[100px] w-[100px] bg-transparent" />
          )}
        </div>
        <div className="flex flex-row items-center justify-center gap-1 rounded-xl px-3 py-1.5 backdrop-blur-md transition-all duration-300 group-hover:scale-105">
          <Typography tag="span" className="pt-[2px] text-[14px] font-bold">
            {price}
          </Typography>
          <TonIcon />
        </div>
      </div>
    </div>
  );
};
