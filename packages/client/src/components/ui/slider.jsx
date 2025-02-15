import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef(
  ({ className, defaultValue, min = 0, max = 100, ...props }, ref) => {
    const defaultPercentage = ((defaultValue[0] - min) / (max - min)) * 100;
    return (
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className
        )}
        defaultValue={defaultValue}
        min={min}
        max={max}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary">
          <SliderPrimitive.Range className="absolute h-full" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />

        {defaultValue !== undefined && (
          <div
            className="absolute transform -translate-x-1/2 "
            style={{ left: `${defaultPercentage}%` }}
          >
            <div className="h-8 w-8 rounded-full border-2 border-primary/50" />
          </div>
        )}
      </SliderPrimitive.Root>
    );
  }
);
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
