"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import MainNav from "./MainNav";
import Footer from "./Footer";
import { CartItem } from "@/app/utility/products";

const teamMembers = [
  {
    name: "John Doe",
    role: "CEO",
    image: "/placeholder.svg?height=200&width=200&text=John+Doe",
  },
  {
    name: "Jane Smith",
    role: "CTO",
    image: "/placeholder.svg?height=200&width=200&text=Jane+Smith",
  },
  {
    name: "Mike Johnson",
    role: "COO",
    image: "/placeholder.svg?height=200&width=200&text=Mike+Johnson",
  },
  {
    name: "Sarah Brown",
    role: "CMO",
    image: "/placeholder.svg?height=200&width=200&text=Sarah+Brown",
  },
];

export default function About() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <MainNav
        cart={cart}
        setCart={setCart}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <main className="container mx-auto p-4">
        {/* <motion.h1
          className="text-3xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Zeomart
        </motion.h1> */}

        <motion.section
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-700 mb-4">
                Zeomart was founded in 2020 with a vision to revolutionize the
                e-commerce industry. Our mission is to provide a seamless
                shopping experience for our customers while offering a wide
                range of high-quality products at competitive prices.
              </p>
              <p className="text-gray-700">
                Since our inception, weve grown from a small startup to a
                leading online marketplace, serving thousands of customers
                worldwide. Our success is built on our commitment to customer
                satisfaction, innovation, and sustainable business practices.
              </p>
            </CardContent>
          </Card>
        </motion.section>

        <motion.section
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-700">
                At Zeomart, our mission is to empower both buyers and sellers by
                creating a trusted and efficient online marketplace. We strive
                to:
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                <li>Offer a diverse range of products to meet every need</li>
                <li>
                  Ensure the highest standards of quality and customer service
                </li>
                <li>Foster innovation in e-commerce technology</li>
                <li>Promote sustainable and ethical business practices</li>
                <li>Support small businesses and independent sellers</li>
              </ul>
            </CardContent>
          </Card>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <Card>
                  <CardContent className="p-4 text-center">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={150}
                      height={150}
                      className="rounded-full mx-auto mb-4"
                    />
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className="text-gray-600">{member.role}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}
