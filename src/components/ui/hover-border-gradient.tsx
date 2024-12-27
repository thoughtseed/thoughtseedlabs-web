import React from "react";
import { cn } from "../../utils/helper-functions.js";

interface HoverBorderGradientProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  containerClassName?: string;
}

export const HoverBorderGradient: React.FC<HoverBorderGradientProps> = ({
  className,
  containerClassName,
  children,
  ...props
}) => {
  return (
    <div className={cn("relative group inline-flex", containerClassName)}>
      <div
        className="absolute -inset-[1px] bg-gradient-to-r from-blue-600 to-purple-600 
        rounded-lg blur-[2px] opacity-0 group-hover:opacity-75 transition duration-200"
      />
      <button
        className={cn(
          "relative w-full px-4 py-2 rounded-lg leading-none",
          "bg-white/5 backdrop-blur-sm border border-white/20",
          "flex items-center justify-left gap-2",
          "hover:bg-white/10 transition-colors",
          className
        )}
        {...props}
      >
        {children}
      </button>
    </div>
  );
};
