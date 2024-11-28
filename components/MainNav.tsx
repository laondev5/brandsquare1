"use client";

import { useState, useEffect } from "react";
import { motion  } from "framer-motion";
import {
   ShoppingCart,
  User,
  
  LogOut,
  Settings,
} from "lucide-react";
import { IoMdSearch } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
// } from "@/components/ui/navigation-menu";
import { Badge } from "@/components/ui/badge";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
// } from "@/components/ui/sheet";
import { CartItem } from "@/app/utility/products";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NavItem from "./NavItem";

type HeaderProps = {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar = ({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}) => (
  <div className="relative  flex-grow mr-1  max-w-[500px]    ">
    <Input
      type="text"
      placeholder="Search products..."
      className=" md:py-4 py-1  text-gray-200"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <IoMdSearch  className=" sm:block hidden absolute right-3 top-2.5 text-muted-foreground font-bold" />
  </div>
);

const Navbar = () => <NavItem />;

export default function MainNav({
  cart,
   
  searchTerm,
  setSearchTerm,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // const updateQuantity = (id: number, change: number) => {
  //   setCart((prevCart) => {
  //     const newCart = prevCart
  //       .map((item) =>
  //         item.id === id
  //           ? { ...item, quantity: Math.max(0, item.quantity + change) }
  //           : item
  //       )
  //       .filter((item) => item.quantity > 0);
  //     localStorage.setItem("cart", JSON.stringify(newCart));
  //     return newCart;
  //   });
  // };

  // const getTotalPrice = () => {
  //   return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  // };

  const handleLogout = async () => {
    try {
      await signOut({
        callbackUrl: "/", // Redirect to home page after logout
        redirect: true,
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50    ${
        isScrolled ? "bg-[#000035] shadow-md" : "bg-[#000035]"
      } transition-all duration-300`}
    >
      <div className="container mx-auto px-4">
     
        <div className=" flex justify-between items-center w-full">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-white"
          >
            <Link href="/">
              <Image
                src="/images/logocopy.png"
                alt="logo"
                width={300}
                height={300}
                className="max-w-[7rem]"
              />
            </Link>
          </motion.h1>
           
          <div className="flex items-center  w-[70%]    ">
            <SearchBar  searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex  sm:space-x-2"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCartOpen(true)}
                className="relative text-white"
              >
              <Link href='/cart'> <ShoppingCart className="h-5 w-5" /> </Link>
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
              {session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-white ">
                      <User className="h-4 w-4 " />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => router.push("/profile")}>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/settings")}>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white"
                  onClick={() => router.push("/auth/signin")}
                >
                  <User className="h-4 w-4" />
                </Button>
              )}
            </motion.div>
            <div className="">
          <Navbar />
           
        </div>
          </div>
            
        </div>
         
        
      </div>

      {/* <AnimatePresence>
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
                            <p className="text-gray-600">₦{item.price}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="mx-2">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              updateQuantity(item.id, -item.quantity)
                            }
                            className="ml-2"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                    <div className="mt-4">
                      <p className="text-xl font-bold">
                        Total: ₦{getTotalPrice().toFixed(2)}
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
      </AnimatePresence> */}
    </header>
  );
}
