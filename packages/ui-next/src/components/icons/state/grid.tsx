import { forwardRef, memo } from "react";
import { iconVariants } from "../utils";
import { StateIconProps } from "../types";

export const GridIcon = memo(
  forwardRef<SVGSVGElement, StateIconProps>(
    ({ className, size, variant, ...props }, forwardedRef) => (
      <svg
        viewBox="0 0 24 24"
        className={iconVariants({ size, className })}
        ref={forwardedRef}
        {...props}
      >
        {(() => {
          switch (variant) {
            case "solid":
              return (
                <path
                  className="fill-current"
                  d="M10.929 6.107c0-.887-.72-1.607-1.608-1.607H6.107C5.22 4.5 4.5 5.22 4.5 6.107v3.214c0 .888.72 1.608 1.607 1.608h3.214c.888 0 1.608-.72 1.608-1.608V6.107Zm0 8.572c0-.888-.72-1.608-1.608-1.608H6.107c-.887 0-1.607.72-1.607 1.608v3.214c0 .887.72 1.607 1.607 1.607h3.214c.888 0 1.608-.72 1.608-1.607v-3.214Zm2.142-8.572v3.214c0 .888.72 1.608 1.608 1.608h3.214c.887 0 1.607-.72 1.607-1.608V6.107c0-.887-.72-1.607-1.607-1.607h-3.214c-.888 0-1.608.72-1.608 1.607ZM19.5 14.68c0-.888-.72-1.608-1.607-1.608h-3.214c-.888 0-1.608.72-1.608 1.608v3.214c0 .887.72 1.607 1.608 1.607h3.214c.887 0 1.607-.72 1.607-1.607v-3.214Z"
                />
              );
            case "line":
              return (
                <path
                  className="fill-current"
                  d="M4.5 6.107c0-.887.72-1.607 1.607-1.607h3.214c.888 0 1.608.72 1.608 1.607v3.214c0 .888-.72 1.608-1.608 1.608H6.107c-.887 0-1.607-.72-1.607-1.608V6.107Zm1.071 0v3.214c0 .295.24.536.536.536h3.214a.537.537 0 0 0 .536-.536V6.107a.536.536 0 0 0-.536-.536H6.107a.536.536 0 0 0-.536.536ZM4.5 14.68c0-.888.72-1.608 1.607-1.608h3.214c.888 0 1.608.72 1.608 1.608v3.214c0 .887-.72 1.607-1.608 1.607H6.107c-.887 0-1.607-.72-1.607-1.607v-3.214Zm1.071 0v3.214c0 .294.24.536.536.536h3.214a.537.537 0 0 0 .536-.536v-3.214a.537.537 0 0 0-.536-.536H6.107a.536.536 0 0 0-.536.536ZM17.893 4.5c.887 0 1.607.72 1.607 1.607v3.214c0 .888-.72 1.608-1.607 1.608h-3.214c-.888 0-1.608-.72-1.608-1.608V6.107c0-.887.72-1.607 1.608-1.607h3.214Zm0 1.071h-3.214a.536.536 0 0 0-.536.536v3.214c0 .295.24.536.536.536h3.214a.537.537 0 0 0 .536-.536V6.107a.536.536 0 0 0-.536-.536ZM13.07 14.68c0-.888.72-1.608 1.608-1.608h3.214c.887 0 1.607.72 1.607 1.608v3.214c0 .887-.72 1.607-1.607 1.607h-3.214c-.888 0-1.608-.72-1.608-1.607v-3.214Zm1.072 0v3.214c0 .294.24.536.536.536h3.214a.537.537 0 0 0 .536-.536v-3.214a.537.537 0 0 0-.536-.536h-3.214a.537.537 0 0 0-.536.536Z"
                />
              );
          }
        })()}
      </svg>
    ),
  ),
);

GridIcon.displayName = "GridIcon";
