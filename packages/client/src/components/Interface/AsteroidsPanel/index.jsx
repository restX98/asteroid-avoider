import { useState, useMemo } from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import AsteroidIcon from "@/components/icons/AsteroidIcon";
import { Button } from "@/components/ui/button";

import CustomSheet from "@/components/ui/custom-sheet";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import AsteroidList from "./AsteroidList";

import { useAsteroids } from "@/hooks/useAsteroids";
import { cn } from "@/lib/utils";

function AsteroidsPanel({ className }) {
  const nowDate = useMemo(() => new Date(), []);

  const [date, setDate] = useState({
    from: nowDate,
    to: addDays(nowDate, 1),
  });

  const { asteroids, loading, error } = useAsteroids({
    startDate: date?.from,
    endDate: date?.to,
  });

  return (
    <CustomSheet>
      <CustomSheet.Trigger variant="outline" className={className}>
        <AsteroidIcon />
        <span className="hidden md:inline">Asteroids</span>
      </CustomSheet.Trigger>
      <CustomSheet.Content className="flex flex-col">
        <h2 className="text-lg font-semibold text-foreground">Asteroids</h2>
        <div className="py-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {date?.from && date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={(rangeDate) => {
                  if (!rangeDate) return;
                  setDate({ from: rangeDate.from, to: rangeDate.to });
                }}
                numberOfMonths={1}
                max={31}
              />
            </PopoverContent>
          </Popover>
        </div>
        {asteroids && <AsteroidList className="flex-1" asteroids={asteroids} />}
      </CustomSheet.Content>
    </CustomSheet>
  );
}

export default AsteroidsPanel;
