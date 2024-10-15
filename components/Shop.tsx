"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Filter } from "lucide-react";
import Image from "next/image";
import MainNav from "./MainNav";

// Generate 100 dummy products
const generateDummyProducts = () => {
  const categories = [
    "Electronics",
    "Clothing",
    "Home & Garden",
    "Sports",
    "Books",
    "Toys",
    "Beauty",
    "Automotive",
  ];
  const products = [];
  for (let i = 1; i <= 100; i++) {
    products.push({
      id: i,
      name: `Product ${i}`,
      price: Math.floor(Math.random() * 1000) + 1,
      category: categories[Math.floor(Math.random() * categories.length)],
      image: `/placeholder.svg?height=200&width=200&text=Product${i}`,
    });
  }
  return products;
};

const products = generateDummyProducts();

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

const itemsPerPage = 20;

// const SearchBar = ({
//   searchTerm,
//   handleSearch,
// }: {
//   searchTerm: string;
//   handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }) => (
//   <motion.div
//     initial={{ opacity: 0, x: 20 }}
//     animate={{ opacity: 1, x: 0 }}
//     className="relative flex-grow md:flex-grow-0"
//   >
//     <input
//       type="text"
//       placeholder="Search products..."
//       className="p-2 rounded-full w-full md:w-64"
//       value={searchTerm}
//       onChange={handleSearch}
//     />
//     <Search className="absolute right-3 top-2.5 text-gray-400" />
//   </motion.div>
// );

export default function ShopPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (!selectedCategory || product.category === selectedCategory)
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
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
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <MainNav
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        cart={cart}
        setIsCartOpen={setIsCartOpen}
      />
      <main className="container mx-auto p-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-6"
        >
          Shop
        </motion.h2>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-yellow-400 text-black font-bold py-2 px-4 rounded flex items-center"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="mr-2" />
            {isFilterOpen ? "Hide Filters" : "Show Filters"}
          </motion.button>
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap gap-2"
              >
                <button
                  className={`py-1 px-3 rounded ${
                    selectedCategory === null
                      ? "bg-yellow-400 text-black"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setSelectedCategory(null)}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`py-1 px-3 rounded ${
                      selectedCategory === category
                        ? "bg-yellow-400 text-black"
                        : "bg-gray-200"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {paginatedProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
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
              <p className="text-gray-500 text-xs mb-2">{product.category}</p>
              <button
                onClick={() => addToCart(product)}
                className="mt-2 bg-yellow-400 text-black text-sm font-bold py-1 px-2 rounded w-full"
              >
                Add to Cart
              </button>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === page
                  ? "bg-yellow-400 text-black"
                  : "bg-gray-200"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </main>

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
    </div>
  );
}
