import { SearchIcon } from "lucide-react";
import React from "react";

const SearchBar = () => {
  return (
    <div className="relative flex-1 bg-white dark:bg-gray-800">
      <input
        type="text"
        placeholder="Search..."
        className="pl-10 pr-4 py-2 border rounded-md w-full"
      />
      <SearchIcon className="absolute right-2 top-3 h-5 w-5 text-gray-500" />
    </div>
  );
};

export default SearchBar;
