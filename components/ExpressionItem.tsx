import React from "react";
import { cn } from "@/lib/utils";

interface ExpressionItemProps {
  icon?: React.ReactNode;
  english: string;
  chinese: string;
  className?: string;
}

export const ExpressionItem: React.FC<ExpressionItemProps> = ({
  icon,
  english,
  chinese,
  className,
}) => {
  return (
    <div className={cn("flex items-start gap-2 mb-2", className)}>
      {icon && <span className="mt-1">{icon}</span>}
      <div>
        <span className="text-orange-400">{english}</span>
        <span className="text-gray-300 ml-2">{chinese}</span>
      </div>
    </div>
  );
};
