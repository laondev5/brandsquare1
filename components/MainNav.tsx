"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  //NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type HeaderProps = {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

const SearchBar = ({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}) => (
  <div className="relative flex-grow md:flex-grow-0">
    <Input
      type="text"
      placeholder="Search products..."
      className="w-full md:w-64"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <Search className="absolute right-3 top-2.5 text-muted-foreground" />
  </div>
);

const Navbar = () => (
  <NavigationMenu>
    <NavigationMenuList>
      {["Home", "Shop", "Blog", "About", "Contact"].map((item) => (
        <NavigationMenuItem key={item}>
          <Link
            href={
              item.toLowerCase() === "home" ? "/" : `/${item.toLowerCase()}`
            }
            legacyBehavior
            passHref
          >
            <Button variant="ghost">{item}</Button>
          </Link>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  </NavigationMenu>
);

export default function MainNav({
  cart,
  setCart,
  searchTerm,
  setSearchTerm,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const removeFromCart = (id: number) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <header
      className={`sticky top-0 z-50 ${
        isScrolled ? "bg-yellow-400 shadow-md" : "bg-yellow-400"
      } transition-all duration-300`}
    >
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap justify-between items-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-black"
          >
            <Link href="/">BrandSquare</Link>
          </motion.h1>
          <div className="flex items-center space-x-4">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex space-x-2"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCartOpen(true)}
                className="relative"
              >
                <ShoppingCart className="h-5 w-5" />
                {cart && cart.length > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 px-1 min-w-[1.25rem] h-5"
                  >
                    {cart
                      ? cart.reduce((total, item) => total + item.quantity, 0)
                      : 0}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
        <div className="mt-4">
          <Navbar />
        </div>
      </div>

      <AnimatePresence>
        {isCartOpen && (
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetContent>
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <SheetHeader>
                  <SheetTitle>Your Cart</SheetTitle>
                </SheetHeader>
                {cart.length === 0 ? (
                  <p>Your cart is empty.</p>
                ) : (
                  <>
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center justify-between border-b border-gray-200 py-4"
                      >
                        <div className="flex items-center">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                            className="mr-4"
                          />
                          <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-gray-600">
                              ${item.price} x {item.quantity}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </Button>
                      </motion.div>
                    ))}
                    <div className="mt-4">
                      <p className="text-xl font-bold">
                        Total: ${getTotalPrice()}
                      </p>
                    </div>
                    <div className="mt-6 space-y-2">
                      <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500">
                        View Cart
                      </Button>
                      <Button className="w-full bg-black text-white hover:bg-gray-800">
                        Checkout
                      </Button>
                    </div>
                  </>
                )}
              </motion.div>
            </SheetContent>
          </Sheet>
        )}
      </AnimatePresence>
    </header>
  );
}
