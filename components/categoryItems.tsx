'use client'
import {CartItem, Product } from "@/app/utility/products";
import MainNav from "./MainNav";
import { motion } from "framer-motion";
import Footer from "./Footer";
import ChatButton from "./chatButton";




import React, { useEffect, useState } from 'react'
import Link from "next/link";
import { useProductStore } from "@/store/productStore";
import ProductCard from "./productCard";
import { addProductToCart } from "@/app/utility/productfn";
 interface categoryProps {
    category: string;
  }

 
const categoryItems: React.FC<categoryProps> = ({  category }) => {
  const [loading, setLoading] = useState(true);
  const { fetchProducts,   allProducts, isLoading  } = useProductStore();
  useEffect(() => {
    fetchProducts();

  }, [fetchProducts]);
    const filteredProducts = allProducts.filter((item) => item.category === category);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const handleAddToCart = (product: Product) => {
      const updatedCart = addProductToCart(product, 1, setCart);
      console.log(updatedCart);
    };

    useEffect(() => {
      // Update local loading state based on isLoading
      if (!isLoading) {
        setLoading(false);
      }
    }, [isLoading, loading]);
  
    


  return (<>  { loading ?  <span>Loading </span> :  
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
                <Link href={`/product/${product._id}`}>

                <ProductCard 
                key={product._id} 
                product={product} 
                onAddToCart={() => handleAddToCart(product)} 
                /> </Link>
                            ))}
            
            </div>
          </motion.section >   </div>
          <Footer />
          </div> }</>
  )
}

export default categoryItems