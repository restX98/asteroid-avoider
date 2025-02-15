import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
        {/* Name or ID */}
        <Input
          id="search"
          value={filters.search}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, search: e.target.value }))
          }
          placeholder="Search by name or ID"
        />
        <div className="pt-2 flex flex-wrap gap-y-2 justify-between">
          {/* Velocity */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-auto justify-start text-left font-normal"
              >
                Valocity
              </Button>
            </PopoverTrigger>
            <PopoverContent className="flex space-x-2 p-2 w-44" align="start">
              <Input
                type="number"
                value={filters.velocityMin}
                min="0"
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    velocityMin: e.target.value,
                  }))
                }
                placeholder="Min"
              />
              <Input
                type="number"
                value={filters.velocityMax}
                min="0"
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    velocityMax: e.target.value,
                  }))
                }
                placeholder="Max"
              />
            </PopoverContent>
          </Popover>

          {/* Lower Diameter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-auto justify-start text-left font-normal"
              >
                Lower Diameter
              </Button>
            </PopoverTrigger>
            <PopoverContent className="flex space-x-2 p-2 w-44" align="start">
              <Input
                type="number"
                value={filters.lowerDiameterMin}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    lowerDiameterMin: e.target.value,
                  }))
                }
                placeholder="Min"
              />
              <Input
                type="number"
                value={filters.lowerDiameterMax}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    lowerDiameterMax: e.target.value,
                  }))
                }
                placeholder="Max"
              />
            </PopoverContent>
          </Popover>

          {/* Higher Diameter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-auto justify-start text-left font-normal"
              >
                Higher Diameter
              </Button>
            </PopoverTrigger>
            <PopoverContent className="flex space-x-2 p-2 w-44" align="start">
              <Input
                type="number"
                value={filters.higherDiameterMin}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    higherDiameterMin: e.target.value,
                  }))
                }
                placeholder="Min"
              />
              <Input
                type="number"
                value={filters.higherDiameterMax}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    higherDiameterMax: e.target.value,
                  }))
                }
                placeholder="Max"
              />
            </PopoverContent>
          </Popover>

          {/* Miss Distance */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-auto justify-start text-left font-normal"
              >
                Miss Distance
              </Button>
            </PopoverTrigger>
            <PopoverContent className="flex space-x-2 p-2 w-44" align="start">
              <Input
                type="number"
                value={filters.missDistanceMin}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    missDistanceMin: e.target.value,
                  }))
                }
                placeholder="Min"
              />
              <Input
                type="number"
                value={filters.missDistanceMax}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    missDistanceMax: e.target.value,
                  }))
                }
                placeholder="Max"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}

export default AsteroidFilterBar;
