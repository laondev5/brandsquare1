"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import Image from "next/image";
import Footer from "./Footer";
import MainNav from "./MainNav";

// Dummy data
const products = [
  {
    id: 1,
    name: "MacBook Pro",
    price: 1999,
    category: "Electronics",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Wireless Headphones",
    price: 199,
    category: "Electronics",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Modern Sofa",
    price: 899,
    category: "Furniture",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Face Cream",
    price: 29,
    category: "Health & Beauty",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    name: "Designer T-Shirt",
    price: 49,
    category: "Clothing",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    name: "Smart Watch",
    price: 299,
    category: "Electronics",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 7,
    name: "Coffee Table",
    price: 199,
    category: "Furniture",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 8,
    name: "Moisturizer",
    price: 19,
    category: "Health & Beauty",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 9,
    name: "Jeans",
    price: 79,
    category: "Clothing",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 10,
    name: "Smartphone",
    price: 799,
    category: "Electronics",
    image: "/placeholder.svg?height=200&width=200",
  },
];

const categories = ["Electronics", "Furniture", "Health & Beauty", "Clothing"];

const popularBrands = [
  { name: "Apple", image: "/placeholder.svg?height=50&width=50" },
  { name: "Samsung", image: "/placeholder.svg?height=50&width=50" },
  { name: "Sony", image: "/placeholder.svg?height=50&width=50" },
  { name: "LG", image: "/placeholder.svg?height=50&width=50" },
  { name: "Nike", image: "/placeholder.svg?height=50&width=50" },
  { name: "Adidas", image: "/placeholder.svg?height=50&width=50" },
];

export default function LandingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isMobile, setIsMobile] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered);
  };

  const addToCart = (product: (typeof products)[0]) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    //setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <MainNav
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        cart={cart}
        setIsCartOpen={setIsCartOpen}
      />

      <main className="container mx-auto p-4">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-4">MacBook Pro</h2>
            <p className="text-xl mb-4">Supercharged for pros</p>
            <button className="bg-yellow-400 text-black font-bold py-2 px-4 rounded">
              Shop Now
            </button>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold mb-4">Popular Brands</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {popularBrands.map((brand) => (
              <div
                key={brand.name}
                className="bg-white p-4 rounded-lg shadow text-center"
              >
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={50}
                  height={50}
                  className="mx-auto mb-2"
                />
                <p className="text-sm">{brand.name}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Best Sellers</h2>
            <button
              className="text-sm font-semibold flex items-center"
              onClick={() => setShowCategories(!showCategories)}
            >
              {showCategories ? "Hide" : "Show"} Categories
              {showCategories ? (
                <ChevronUp className="ml-1" />
              ) : (
                <ChevronDown className="ml-1" />
              )}
            </button>
          </div>
          {showCategories && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {categories.map((category) => (
                <button
                  key={category}
                  className="bg-white p-2 rounded-lg shadow text-center text-sm font-semibold"
                >
                  {category}
                </button>
              ))}
            </div>
          )}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {filteredProducts.slice(0, 5).map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-4 rounded-lg shadow"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="w-full h-40 object-cover mb-2 rounded"
                />
                <h3 className="font-semibold text-sm">{product.name}</h3>
                <p className="text-gray-600 text-sm">${product.price}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-2 bg-yellow-400 text-black text-sm font-bold py-1 px-2 rounded w-full"
                >
                  Add to Cart
                </button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {categories.map((category) => (
          <motion.section
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold mb-4">{category}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {filteredProducts
                .filter((product) => product.category === category)
                .slice(0, 5)
                .map((product) => (
                  <motion.div
                    key={product.id}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white p-4 rounded-lg shadow"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="w-full h-32 object-cover mb-2 rounded"
                    />
                    <h3 className="font-semibold text-sm">{product.name}</h3>
                    <p className="text-gray-600 text-sm">${product.price}</p>
                    <button
                      onClick={() => addToCart(product)}
                      className="mt-2 bg-yellow-400 text-black text-sm font-bold py-1 px-2 rounded w-full"
                    >
                      Add to Cart
                    </button>
                  </motion.div>
                ))}
            </div>
          </motion.section>
        ))}
      </main>

      {/* <footer className="bg-gray-800 text-white p-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <ul className="space-y-2">
              <li>Our Story</li>
              <li>Careers</li>
              <li>Press</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>Contact Us</li>
              <li>FAQs</li>
              <li>Shipping & Returns</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Policies</h3>
            <ul className="space-y-2">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Accessibility</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <ul className="space-y-2">
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; 2023 Zeomart. All rights reserved.</p>
        </div>
      </footer> */}
      <Footer />

      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween" }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-lg z-50 overflow-y-auto"
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Your Cart</h2>
                <button onClick={() => setIsCartOpen(false)}>
                  <X className="h-6 w-6" />
                </button>
              </div>
              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <>
                  {cart.map((item) => (
                    <div
                      key={item.id}
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
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <div className="mt-4">
                    <p className="text-xl font-bold">
                      Total: ${getTotalPrice()}
                    </p>
                  </div>
                  <div className="mt-6 space-y-2">
                    <button className="w-full bg-yellow-400 text-black font-bold py-2 px-4 rounded">
                      View Cart
                    </button>
                    <button className="w-full bg-black text-white font-bold py-2 px-4 rounded">
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* <Footer /> */}
    </div>
  );
}
