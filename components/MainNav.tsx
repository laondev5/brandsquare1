import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart, User } from "lucide-react";
import SearchBar from "./SearchBar";
import NavItem from "./NavItem";
const MainNav = ({
  searchTerm,
  handleSearch,
  cart,
  setIsCartOpen,
}: {
  searchTerm: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  cart: CartItem[];
  setIsCartOpen: (isOpen: boolean) => void;
}) => (
  <header className="bg-yellow-400 p-4 sticky top-0 left-0 z-50">
    <div className="container mx-auto flex flex-wrap justify-between items-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold"
      >
        Zeomart
      </motion.h1>
      <div className="flex items-center space-x-4">
        <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex space-x-2"
        >
          <button onClick={() => setIsCartOpen(true)} className="relative">
            <ShoppingCart className="cursor-pointer" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </button>
          <User className="cursor-pointer" />
        </motion.div>
      </div>
    </div>
    <NavItem />
  </header>
);

export default MainNav;
