"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, User, ChevronRight } from "lucide-react";
import Image from "next/image";
import MainNav from "./MainNav";

// Dummy blog data
const blogPosts = [
  {
    id: 1,
    title: "The Future of E-commerce: Trends to Watch",
    excerpt:
      "Explore the emerging trends that are shaping the future of online shopping and digital marketplaces.",
    author: "Jane Doe",
    date: "2023-05-15",
    category: "E-commerce",
    image: "/placeholder.svg?height=400&width=600&text=E-commerce+Trends",
  },
  {
    id: 2,
    title: "Sustainable Fashion: A New Era of Conscious Shopping",
    excerpt:
      "Discover how sustainable fashion is changing the retail landscape and influencing consumer choices.",
    author: "John Smith",
    date: "2023-05-10",
    category: "Fashion",
    image: "/placeholder.svg?height=400&width=600&text=Sustainable+Fashion",
  },
  {
    id: 3,
    title: "Maximizing Your Online Store's Conversion Rate",
    excerpt:
      "Learn effective strategies to boost your e-commerce conversion rates and increase sales.",
    author: "Emily Johnson",
    date: "2023-05-05",
    category: "Marketing",
    image:
      "/placeholder.svg?height=400&width=600&text=Conversion+Rate+Optimization",
  },
  {
    id: 4,
    title: "The Rise of Mobile Shopping: Optimizing for Small Screens",
    excerpt:
      "Explore the growing importance of mobile commerce and how to optimize your online store for mobile users.",
    author: "Michael Brown",
    date: "2023-04-30",
    category: "Mobile",
    image: "/placeholder.svg?height=400&width=600&text=Mobile+Shopping",
  },
  {
    id: 5,
    title:
      "Artificial Intelligence in Retail: Personalizing the Shopping Experience",
    excerpt:
      "Discover how AI is revolutionizing the retail industry by offering personalized recommendations and experiences.",
    author: "Sarah Lee",
    date: "2023-04-25",
    category: "Technology",
    image: "/placeholder.svg?height=400&width=600&text=AI+in+Retail",
  },
  {
    id: 6,
    title: "Building Customer Loyalty in the Digital Age",
    excerpt:
      "Learn strategies to foster customer loyalty and create long-lasting relationships in the competitive online marketplace.",
    author: "David Wilson",
    date: "2023-04-20",
    category: "Customer Relations",
    image: "/placeholder.svg?height=400&width=600&text=Customer+Loyalty",
  },
];

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export default function BlogPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
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
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-6"
        >
          Blog
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <Image
                src={post.image}
                alt={post.title}
                width={600}
                height={400}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{post.author}</span>
                  <span>{post.date}</span>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="bg-yellow-200 text-yellow-800 text-xs font-semibold px-2 py-1 rounded">
                    {post.category}
                  </span>
                  <button className="text-yellow-600 hover:text-yellow-800 font-semibold flex items-center">
                    Read More
                    <ChevronRight className="ml-1 w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.article>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
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
                      <button className="text-red-500">Remove</button>
                    </div>
                  ))}
                  <div className="mt-4">
                    <p className="text-xl font-bold">
                      Total: $
                      {cart.reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                      )}
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
