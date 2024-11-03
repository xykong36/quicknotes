import type { Example } from "@/types";
import { ExampleCard } from "./ExampleCard";

interface ExampleGridProps {
  examples: Example[];
}

export const ExampleGrid = ({ examples }: ExampleGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {examples.map((example) => (
        <ExampleCard key={example.id} example={example} />
      ))}
    </div>
  );
};
