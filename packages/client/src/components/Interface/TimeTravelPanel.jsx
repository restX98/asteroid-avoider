import { useState, useEffect } from "react";
import { format } from "date-fns";

import { useSolarSystemInfoContext } from "@/context/solar-system-info-context";
import { Slider } from "@/components/ui/slider";

import { TIME_MAPPING } from "@/data/config";

function CurrentDate() {
  const { simulationTimeRef } = useSolarSystemInfoContext();

  const [displayTime, setDisplayTime] = useState(simulationTimeRef.current);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayTime(new Date(simulationTimeRef.current));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return <span>{format(displayTime, "d/M/y H:mm:ss")}</span>;
}

const TimeTravelPanel = ({ className }) => {
  const { multiplierRef } = useSolarSystemInfoContext();

  const [sliderIndex, setSliderIndex] = useState({
    value: 0,
    isForward: 1,
  });
  const selected = TIME_MAPPING[sliderIndex.value];

  useEffect(() => {
    multiplierRef.current = selected.multiplier * sliderIndex.isForward;
  }, [sliderIndex]);

  return (
    <div className="flex flex-col justify-center items-center mx-auto lg:w-1/2 md:w-2/3 w-4/5">
      <CurrentDate />
      <span className="mb-4 text-2xl">
        {sliderIndex.isForward === -1 ? "-" : ""}
        {selected?.label}
      </span>
      <Slider
        className={className}
        value={[sliderIndex.value * sliderIndex.isForward]}
        defaultValue={[0]}
        min={-(TIME_MAPPING.length - 1)}
        max={TIME_MAPPING.length - 1}
        step={1}
        onValueChange={(value) => {
          setSliderIndex((prev) => {
            const isForward = value[0] >= 0 ? 1 : -1;
            return { value: value[0] * isForward, isForward: isForward };
          });
        }}
      />
    </div>
  );
};

export default TimeTravelPanel;
