"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";
import MainNav from "./MainNav";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export default function AboutUs() {
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
          About Us
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold mb-4">Our Story</h3>
            <p className="mb-4">
              Zeomart was founded in 2020 with a vision to revolutionize the
              e-commerce industry. Our journey began when a group of tech
              enthusiasts and retail experts came together to create a platform
              that would make online shopping more accessible, enjoyable, and
              rewarding for everyone.
            </p>
            <p>
              Since our inception, we've grown from a small startup to a
              thriving marketplace, connecting thousands of sellers with
              millions of customers worldwide. Our commitment to innovation,
              customer satisfaction, and ethical business practices has been the
              cornerstone of our success.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
            <p className="mb-4">
              At Zeomart, our mission is to empower businesses of all sizes to
              thrive in the digital marketplace while providing customers with a
              seamless and delightful shopping experience. We strive to:
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="w-5 h-5 mr-2 text-green-500" />
                <span>Offer a diverse range of high-quality products</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 mr-2 text-green-500" />
                <span>Provide excellent customer service</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 mr-2 text-green-500" />
                <span>Foster a community of trusted sellers</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 mr-2 text-green-500" />
                <span>Innovate and improve the online shopping experience</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-white p-6 rounded-lg shadow-md"
        >
          <h3 className="text-xl font-semibold mb-4">Our Team</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                name: "John Doe",
                role: "CEO",
                image: "/placeholder.svg?height=150&width=150&text=John",
              },
              {
                name: "Jane Smith",
                role: "CTO",
                image: "/placeholder.svg?height=150&width=150&text=Jane",
              },
              {
                name: "Mike Johnson",
                role: "COO",
                image: "/placeholder.svg?height=150&width=150&text=Mike",
              },
              {
                name: "Sarah Brown",
                role: "CMO",
                image: "/placeholder.svg?height=150&width=150&text=Sarah",
              },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={150}
                  height={150}
                  className="rounded-full mx-auto mb-2"
                />
                <h4 className="font-semibold">{member.name}</h4>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </motion.div>
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
