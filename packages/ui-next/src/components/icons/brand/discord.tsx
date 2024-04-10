import { forwardRef, memo } from "react";
import { iconVariants } from "../utils";
import { IconProps } from "../types";

export const DiscordIcon = memo(
  forwardRef<SVGSVGElement, IconProps>(
    ({ className, size, ...props }, forwardedRef) => (
      <svg
        viewBox="0 0 24 24"
        className={iconVariants({ size, className })}
        ref={forwardedRef}
        {...props}
      >
        <path
          d="M17.9351 6.59794C17.9303 6.58875 17.9225 6.58155 17.9129 6.57763C16.8067 6.07006 15.6392 5.70813 14.4399 5.50089C14.429 5.49886 14.4177 5.50032 14.4077 5.50506C14.3977 5.5098 14.3894 5.51758 14.3841 5.52729C14.2251 5.81582 14.0808 6.11218 13.9517 6.41524C12.6589 6.21899 11.3438 6.21899 10.0509 6.41524C9.92099 6.11141 9.77437 5.81497 9.61176 5.52729C9.60618 5.51779 9.59787 5.5102 9.58791 5.50549C9.57795 5.50078 9.56681 5.49917 9.55593 5.50089C8.35643 5.7077 7.18894 6.06966 6.08283 6.57766C6.07336 6.58167 6.06537 6.58852 6.05996 6.59727C3.84795 9.90062 3.242 13.1227 3.53926 16.305C3.5401 16.3128 3.54249 16.3203 3.54631 16.3272C3.55012 16.334 3.55527 16.34 3.56146 16.3449C4.84949 17.2986 6.29017 18.0265 7.82202 18.4977C7.83281 18.5009 7.84432 18.5008 7.85503 18.4973C7.86573 18.4938 7.8751 18.4871 7.88188 18.4781C8.21089 18.0304 8.50241 17.5564 8.75349 17.0608C8.75694 17.054 8.75891 17.0465 8.75927 17.0389C8.75963 17.0313 8.75837 17.0237 8.75558 17.0166C8.75279 17.0095 8.74852 17.0031 8.74306 16.9977C8.73761 16.9924 8.73108 16.9883 8.72392 16.9857C8.26421 16.8098 7.81915 16.5977 7.39293 16.3515C7.38519 16.347 7.37868 16.3406 7.374 16.3329C7.36931 16.3253 7.36658 16.3166 7.36605 16.3076C7.36552 16.2986 7.3672 16.2897 7.37095 16.2815C7.37471 16.2734 7.38041 16.2663 7.38756 16.2608C7.47699 16.1938 7.56649 16.1241 7.65189 16.0537C7.65947 16.0475 7.66865 16.0435 7.67839 16.0422C7.68814 16.0408 7.69805 16.0423 7.70702 16.0463C10.4994 17.3207 13.5225 17.3207 16.2818 16.0463C16.2908 16.042 16.3008 16.0404 16.3107 16.0416C16.3206 16.0428 16.3299 16.0468 16.3377 16.0531C16.4231 16.1235 16.5125 16.1938 16.6026 16.2608C16.6098 16.2662 16.6156 16.2733 16.6194 16.2814C16.6232 16.2895 16.625 16.2985 16.6245 16.3074C16.624 16.3164 16.6214 16.3251 16.6167 16.3328C16.6121 16.3405 16.6056 16.3469 16.5979 16.3515C16.1727 16.5998 15.7272 16.8117 15.2663 16.985C15.2592 16.9877 15.2526 16.9919 15.2472 16.9973C15.2418 17.0027 15.2376 17.0092 15.2348 17.0164C15.2321 17.0235 15.2309 17.0312 15.2313 17.0388C15.2318 17.0465 15.2338 17.054 15.2373 17.0608C15.4926 17.5536 15.7837 18.027 16.1082 18.4773C16.1148 18.4865 16.1241 18.4934 16.1349 18.4971C16.1456 18.5007 16.1573 18.5009 16.1681 18.4976C17.7027 18.028 19.1459 17.3 20.4355 16.3449C20.4418 16.3403 20.447 16.3344 20.4509 16.3276C20.4547 16.3209 20.457 16.3134 20.4577 16.3056C20.8136 12.6266 19.8619 9.43093 17.9351 6.59794ZM9.17051 14.3673C8.3298 14.3673 7.63709 13.5958 7.63709 12.6483C7.63709 11.7008 8.31637 10.9293 9.17051 10.9293C10.0313 10.9293 10.7173 11.7075 10.7039 12.6483C10.7039 13.5958 10.0246 14.3673 9.17051 14.3673ZM14.84 14.3673C13.9994 14.3673 13.3066 13.5958 13.3066 12.6483C13.3066 11.7008 13.9859 10.9293 14.84 10.9293C15.7009 10.9293 16.3869 11.7075 16.3735 12.6483C16.3735 13.5958 15.7009 14.3673 14.84 14.3673Z"
          className="fill-current"
        />
      </svg>
    ),
  ),
);

DiscordIcon.displayName = "DiscordIcon";
