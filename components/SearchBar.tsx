import React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const SearchBar = ({
  searchTerm,
  handleSearch,
}: {
  searchTerm: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    className="relative flex-grow md:flex-grow-0"
  >
    <input
      type="text"
      placeholder="Search products..."
      className="p-2 rounded-full w-full md:w-64"
      value={searchTerm}
      onChange={handleSearch}
    />
    <Search className="absolute right-3 top-2.5 text-gray-400" />
  </motion.div>
);

export default SearchBar;
