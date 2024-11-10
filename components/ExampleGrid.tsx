import { ExampleCard } from "./ExampleCard";
import { YoutubeVideo } from "@/types";

interface ExampleGridProps {
  examples: YoutubeVideo[];
}

export const ExampleGrid = ({ examples }: ExampleGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {examples.map((example) => (
        <ExampleCard key={example.video_id} example={example} />
      ))}
    </div>
  );
};
