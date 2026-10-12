import { cn } from "@/shared/utils/cn";
import { FC } from "react";

type GradientProps = {
  className?: string;
};

export const Gradient: FC<GradientProps> = (props) => {
  return (
    <div
      className={cn(
        "bg-lighter-blue fixed z-[0] h-[330px] w-[335px] rounded-full blur-[70px]",
        props.className,
      )}
    />
  );
};
