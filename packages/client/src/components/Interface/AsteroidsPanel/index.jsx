import { useState, useMemo } from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import AsteroidIcon from "@/components/icons/AsteroidIcon";
import { Button } from "@/components/ui/button";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import AsteroidList from "./AsteroidList";

import { useAsteroids } from "@/hooks/useAsteroids";
import { cn } from "@/lib/utils";

function AsteroidsPanel({ className, onToggleDetail }) {
  const nowDate = useMemo(() => new Date(), []);

  const [date, setDate] = useState({
    from: nowDate,
    to: addDays(nowDate, 1),
  });

  const { asteroids, loading, error } = useAsteroids({
    startDate: date.from,
    endDate: date.to,
  });

  return (
    <>
      <Button
        variant="outline"
        className={className}
        onClick={() => setOpen((prev) => !prev)}
      >
        <AsteroidIcon />
        <span className="hidden md:inline">Asteroids</span>
      </Button>

      <div className="fixed bottom-0 right-0 hidden">
        <div className="py-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
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
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
        {asteroids && (
          <AsteroidList className={"flex-1"} asteroids={asteroids} />
        )}
      </div>
    </>
  );
}

export default AsteroidsPanel;
