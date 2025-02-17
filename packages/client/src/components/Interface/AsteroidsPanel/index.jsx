import { useState, useMemo, useEffect, useRef } from "react";

import { useAsteroids } from "@/hooks/useAsteroids";
import { useToast } from "@/hooks/use-toast";

import AsteroidIcon from "@/components/icons/AsteroidIcon";
import CustomSheet from "@/components/ui/custom-sheet";
import RangeDatePicker from "@/components/ui/range-date-picker";
import AsteroidList from "./AsteroidList";

function AsteroidsPanel({ className }) {
  const { toast } = useToast();

  const nowDate = useMemo(() => new Date(), []);

  const [dates, setDates] = useState({
    from: nowDate,
    to: nowDate,
  });

  const rollbackDates = useRef();

  const { asteroids, error } = useAsteroids({
    startDate: dates.from,
    endDate: dates.to,
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Error fetching asteroids list",
        description:
          error?.message || "An error occurred while fetching asteroids list.",
      });
      setDates({
        from: rollbackDates.current.from,
        to: rollbackDates.current.to,
      });
      return;
    }
  }, [error]);

  useEffect(() => {
    rollbackDates.current = {
      from: dates.from,
      to: dates.to,
    };
  }, [asteroids]);

  return (
    <CustomSheet>
      <CustomSheet.Trigger variant="outline" className={className}>
        <AsteroidIcon />
        <span className="hidden md:inline">Asteroids</span>
      </CustomSheet.Trigger>
      <CustomSheet.Content className="flex flex-col">
        <h2 className="text-lg font-semibold text-foreground">Asteroids</h2>

        <RangeDatePicker dates={dates} setDates={setDates} />

        {asteroids && <AsteroidList className="flex-1" asteroids={asteroids} />}
      </CustomSheet.Content>
    </CustomSheet>
  );
}

export default AsteroidsPanel;
