import { ArrowLeft } from "lucide-react";
import { useSolarSystemInfoContext } from "@/context/SolarSystemInfoContext";
import { cn } from "@/lib/utils";

function BackButton({ className }) {
  const { selectedPlanet, setSelectedPlanet } = useSolarSystemInfoContext();

  return (
    <button
      className={cn(
        "p-2 rounded-full text-muted-foreground transition-colors hover:text-foreground",
        !selectedPlanet && "invisible",
        className
      )}
    >
      <ArrowLeft
        className="w-6 h-6 stroke-[2.5]"
        onClick={() => {
          setSelectedPlanet(null);
        }}
      />
    </button>
  );
}

export default BackButton;
