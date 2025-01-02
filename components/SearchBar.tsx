import { Search } from "lucide-react";
import { memo, ChangeEvent } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchIcon = memo(() => (
  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
));

SearchIcon.displayName = "SearchIcon";

const SearchInput = memo(({ value, onChange }: SearchBarProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.value);

  return (
    <input
      type="text"
      placeholder="Search creator or topic..."
      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      value={value}
      onChange={handleChange}
    />
  );
});

SearchInput.displayName = "SearchInput";

export const SearchBar = memo(({ value, onChange }: SearchBarProps) => (
  <div className="p-4 ">
    <div className="relative">
      <SearchIcon />
      <SearchInput value={value} onChange={onChange} />
    </div>
  </div>
));

SearchBar.displayName = "SearchBar";
