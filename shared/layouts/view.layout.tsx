import { CSSProperties, FC, ReactNode } from "react";

import { cn } from "../utils/cn";

type Props = {
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
};

/**
 * Обертка для страницы
 */
export const View: FC<Props> = (props) => {
  return (
    <main
      style={props.style}
      className={cn(
        `relative w-full overflow-x-hidden overflow-y-auto px-4 pt-30 pb-32`,
        props.className,
      )}
    >
      {props.children}
    </main>
  );
};
