import { ArrowLeft } from "lucide-react";
import emitter from "@/lib/emitter";
import { cn } from "@/lib/utils";

function BackButton({ className }) {
  return (
    <button
      className={cn(
        "p-2 rounded-full text-muted-foreground transition-colors hover:text-foreground",
        className
      )}
    >
      <ArrowLeft
        className="w-6 h-6 stroke-[2.5]"
        onClick={() => {
          emitter.emit("unselectPlanet");
        }}
      />
    </button>
  );
}

export default BackButton;
