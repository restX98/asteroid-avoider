import React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

const CustomSheet = ({ children }) => {
  const [open, setOpen] = React.useState(false);

  const enhancedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    if (child.type === CustomSheetTrigger) {
      return React.cloneElement(child, {
        onClick: () => setOpen(true),
      });
    }

    if (child.type === CustomSheetContent) {
      return React.cloneElement(child, {
        open,
        onClose: () => setOpen(false),
      });
    }

    return child;
  });

  return <>{enhancedChildren}</>;
};

const CustomSheetTrigger = ({
  children,
  onClick,
  variant = "default",
  className,
}) => {
  return (
    <Button onClick={onClick} variant={variant} className={className}>
      {children}
    </Button>
  );
};

const CustomSheetContent = ({ open, onClose, children, className }) => {
  return createPortal(
    <div>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/80 transition-opacity",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sheet Panel */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-md bg-background border-l shadow-lg transition-transform transform",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className={cn("relative h-full p-6", className)}>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
          >
            <X size={20} />
          </button>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export { CustomSheet, CustomSheetTrigger, CustomSheetContent };
