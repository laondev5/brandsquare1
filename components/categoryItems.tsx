'use client'
import { products , CartItem } from "@/app/utility/products";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import MainNav from "./MainNav";
import { motion } from "framer-motion";
import Footer from "./Footer";
import ChatButton from "./chatButton";




import React, { useState } from 'react'
import Link from "next/link";
interface categoryProps {
    category: string;
  }

 
const categoryItems: React.FC<categoryProps> = ({  category }) => {
    const filteredProducts = products.filter((item) => item.category === category);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

 

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <ChatButton />
    <MainNav
      cart={cart}
      setCart={setCart}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
    />

    <div className="container mx-auto px-6"> 
        <motion.section initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}>
        <div>
            <h3 className="text-2xl font-bold mt-14">{category} Category</h3>
        </div>
 <div  className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14 mt-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="bg-white">
                <CardContent className="p-4">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="w-full h-48 object-cover mb-4 rounded"
                  />
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">${product.price}</p>
                  <Link href={`/product/${product.id}`}> 
                  <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500">
                    View Product
                  </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
            </div>
          </motion.section >   </div>
          <Footer />
          </div>
  )
}

export default categoryItems