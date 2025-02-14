import { ArrowLeft } from "lucide-react";
import emitter from "@/utils/emitter";

function TopBar() {
  return (
    <nav className="fixed top-0 left-0 w-full p-4 flex items-center">
      <button className="p-2 rounded-full text-muted-foreground transition-colors hover:text-foreground">
        <ArrowLeft
          className="w-6 h-6 stroke-[2.5]"
          onClick={() => {
            emitter.emit("unselectPlanet");
          }}
        />
      </button>
    </nav>
  );
}

export default TopBar;
