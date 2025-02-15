import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function AsteroidFilterBar({ filters, setFilters }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full pb-2">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Filters</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
          <span className="sr-only">Toggle</span>
        </Button>
      </div>

      <div className={!isOpen ? "hidden" : ""}>
        <Input
          id="search"
          value={filters.search}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, search: e.target.value }))
          }
          placeholder="Search by name or ID"
        />
      </div>
    </div>
  );
}

export default AsteroidFilterBar;
