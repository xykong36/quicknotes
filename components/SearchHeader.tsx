import { Search, Menu, X } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { memo } from "react";

interface SearchHeaderProps {
  isSidebarOpen: boolean;
  onToggle: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const MenuButton = memo(
  ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className="p-2 hover:bg-gray-100 rounded-lg md:hidden"
    >
      {isOpen ? <X size={20} /> : <Menu size={20} />}
    </button>
  )
);

MenuButton.displayName = "MenuButton";

const LogoIcon = memo(() => (
  <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
    <Search className="w-4 h-4 text-white" />
  </div>
));

LogoIcon.displayName = "LogoIcon";

const Title = memo(() => <h1 className="text-xl font-bold">英语素材库</h1>);

Title.displayName = "Title";

export const SearchHeader = memo(
  ({
    isSidebarOpen,
    onToggle,
    searchQuery,
    onSearchChange,
  }: SearchHeaderProps) => (
    <header className="sticky top-0 bg-white border-b border-gray-200 z-40">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <MenuButton isOpen={isSidebarOpen} onClick={onToggle} />
          <LogoIcon />
          <Title />
        </div>
      </div>
      <SearchBar value={searchQuery} onChange={onSearchChange} />
    </header>
  )
);

SearchHeader.displayName = "SearchHeader";
