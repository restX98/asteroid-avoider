import { cn } from "@/lib/utils";

function TopBar({ children, className }) {
  return (
    <nav
      className={cn(
        "absolute top-0 left-0 w-full p-4 flex items-center",
        className
      )}
    >
      {children}
    </nav>
  );
}

export default TopBar;
