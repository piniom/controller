import { forwardRef, memo } from "react";
import { iconVariants } from "../utils";
import { IconProps } from "../types";

export const MysteryIcon = memo(
  forwardRef<SVGSVGElement, IconProps>(
    ({ className, size, ...props }, forwardedRef) => (
      <svg
        viewBox="0 0 24 24"
        className={iconVariants({ size, className })}
        ref={forwardedRef}
        {...props}
      >
        <path
          d="M10.8571 8.57143C10.225 8.57143 9.71429 9.08214 9.71429 9.71429V10C9.71429 10.3143 9.45714 10.5714 9.14286 10.5714C8.82857 10.5714 8.57143 10.3143 8.57143 10V9.71429C8.57143 8.45357 9.59643 7.42857 10.8571 7.42857H13.1429C14.4036 7.42857 15.4286 8.45357 15.4286 9.71429V9.88571C15.4286 10.6893 15.0071 11.4321 14.3179 11.8464L12.5714 12.8964V13.4286C12.5714 13.7429 12.3143 14 12 14C11.6857 14 11.4286 13.7429 11.4286 13.4286V12.5714C11.4286 12.3714 11.5321 12.1857 11.7071 12.0821L13.7321 10.8679C14.075 10.6607 14.2536 10.2893 14.2536 9.88571V9.71429C14.2536 9.08214 13.775 8.57143 13.1107 8.57143H10.8571ZM11.1429 16C11.1429 15.525 11.525 15.1429 12 15.1429C12.475 15.1429 12.8571 15.525 12.8571 16C12.8571 16.475 12.475 16.8571 12 16.8571C11.525 16.8571 11.1429 16.475 11.1429 16ZM8 7.14286C8 7.61786 7.61786 8 7.14286 8C6.66964 8 6.28571 7.61786 6.28571 7.14286C6.28571 6.66786 6.66964 6.28571 7.14286 6.28571C7.61786 6.28571 8 6.66786 8 7.14286ZM16 7.14286C16 6.66786 16.3821 6.28571 16.8571 6.28571C17.3321 6.28571 17.7143 6.66786 17.7143 7.14286C17.7143 7.61786 17.3321 8 16.8571 8C16.3821 8 16 7.61786 16 7.14286ZM8 16.8571C8 17.3321 7.61786 17.7143 7.14286 17.7143C6.66964 17.7143 6.28571 17.3321 6.28571 16.8571C6.28571 16.3821 6.66964 16 7.14286 16C7.61786 16 8 16.3821 8 16.8571ZM16 16.8571C16 16.3821 16.3821 16 16.8571 16C17.3321 16 17.7143 16.3821 17.7143 16.8571C17.7143 17.3321 17.3321 17.7143 16.8571 17.7143C16.3821 17.7143 16 17.3321 16 16.8571ZM17.7143 4C18.975 4 20 5.02321 20 6.28571V17.7143C20 18.975 18.975 20 17.7143 20H6.28571C5.02321 20 4 18.975 4 17.7143V6.28571C4 5.02321 5.02321 4 6.28571 4H17.7143ZM17.7143 5.14286H6.28571C5.65464 5.14286 5.14286 5.65464 5.14286 6.28571V17.7143C5.14286 18.3464 5.65464 18.8571 6.28571 18.8571H17.7143C18.3464 18.8571 18.8571 18.3464 18.8571 17.7143V6.28571C18.8571 5.65464 18.3464 5.14286 17.7143 5.14286Z"
          fill="currentColor"
        />
      </svg>
    ),
  ),
);

MysteryIcon.displayName = "MysteryIcon";
