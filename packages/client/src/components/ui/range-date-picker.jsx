import { useMemo } from "react";
import { format, addDays } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { MAX_RANGE_DATE } from "@/data/config";

function RangeDatePicker({ dates, setDates }) {
  const disabledStartDates = useMemo(() => {
    if (dates.to) {
      const after = new Date(dates.to);
      const before = addDays(after, -MAX_RANGE_DATE);
      return {
        before,
        after,
      };
    }
    return {};
  });

  const disabledEndDates = useMemo(() => {
    if (dates.from) {
      const before = new Date(dates.from);
      const after = addDays(before, MAX_RANGE_DATE);
      return {
        before,
        after,
      };
    }
    return {};
  });

  return (
    <div className="flex gap-x-2 py-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !dates.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {dates.from ? (
              <>{format(dates.from, "LLL dd, y")}</>
            ) : (
              <span>Pick start date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            defaultMonth={dates.from}
            disabled={disabledStartDates}
            selected={dates.from}
            onSelect={(date) => {
              setDates((prev) => ({ ...prev, from: date }));
            }}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !dates.to && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {dates.to ? (
              <>{format(dates.to, "LLL dd, y")}</>
            ) : (
              <span>Pick end date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            defaultMonth={dates.to}
            disabled={disabledEndDates}
            selected={dates.to}
            onSelect={(date) => {
              setDates((prev) => ({ ...prev, to: date }));
            }}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default RangeDatePicker;
