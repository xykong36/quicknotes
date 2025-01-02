import { memo } from "react";
import { Search } from "lucide-react";

export const SearchIcon = memo(() => (
  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
));

SearchIcon.displayName = "SearchIcon";
