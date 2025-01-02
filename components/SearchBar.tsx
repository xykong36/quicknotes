import { memo } from "react";
import { SearchIcon } from "./SearchIcon";
import { SearchInput } from "./SearchInput";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const SearchBar = memo(
  ({ value, onChange, className = "" }: SearchBarProps) => (
    <div className={`p-4 ${className}`}>
      <div className="relative">
        <SearchIcon />
        <SearchInput value={value} onChange={onChange} />
      </div>
    </div>
  )
);

SearchBar.displayName = "SearchBar";
