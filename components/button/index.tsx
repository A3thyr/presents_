import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/utils/cn";
import { useTelegram } from "@/shared/lib/hooks/use-telegram";

const buttonVariants = cva(
  "flex items-center justify-center cursor-pointer focus:outline-none transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none ",
  {
    variants: {
      variant: {
        default: "",
        navbar: "flex-col gap-1",
      },
      size: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  const telegram = useTelegram()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    telegram?.HapticFeedback.impactOccurred("medium")
    console.log("vibro")
    props.onClick?.(e);
  };

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
      onClick={handleClick}
    />
  );
}

export { Button, buttonVariants };
