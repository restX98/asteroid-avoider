import { cn } from "@/lib/utils";

const TopBar = ({ children, className }) => {
  return (
    <nav className={cn("absolute top-0 left-0 w-full p-4", className)}>
      {children}
    </nav>
  );
};

const BottomBar = ({ children, className }) => {
  return (
    <nav className={cn("absolute bottom-0 w-full p-4", className)}>
      {children}
    </nav>
  );
};

export { TopBar, BottomBar };
