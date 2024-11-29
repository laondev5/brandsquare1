"use client";

import React, { useState, useEffect } from "react";
import { 
  Trash2, 
  ShoppingCart, 
  Plus, 
  Minus, 
  CreditCard,
  ArrowRight 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import MainNav from "./MainNav";
import Footer from "./Footer";
// import { Product, CartItem } from '@/types/cart';
import ProductCard from './productCard';
import { addProductToCart } from '@/app/utility/productfn';
import  {CartItem, Product
} from "@/app/utility/products";

const topSellingItems: Product[] = [
    {
      id: 66,
      name: 'Classic Leather Jacket',
      price: 129.99,
      images: ['/images/happyman.png', '/images/happyman.png'],
      rating: 4.5,
      discount: 20,
      category: 'Jackets',
        colors: ['black', 'brown', 'blue'],
      description: 'This is a detailed description for Product 1. It\'s a high-quality item in the Clothing category.'
    },
    {
        id: 67,
        name: 'Elegant Evening Dress',
        price: 149.99,
        images: ['/images/evening-dress.png', '/images/evening-dress2.png'],
        rating: 4.8,
        discount: 25,
        category: 'Dresses',
        colors: ['red', 'green', 'gold'],
        description: 'A stunning evening dress designed for formal occasions, made from premium materials.',
      },
      {
        id: 68,
        name: 'Stylish Running Shoes',
        price: 89.99,
        images: ['/images/running-shoes.png', '/images/running-shoes2.png'],
        rating: 4.7,
        discount: 15,
        category: 'Footwear',
        colors: ['white', 'black', 'gray'],
        description: 'High-performance running shoes built for comfort and durability.',
      },

      {
        id: 69,
        name: 'Classic Denim Jacket',
        price: 99.99,
        images: ['/images/denim-jacket.png', '/images/denim-jacket2.png'],
        rating: 4.6,
        discount: 10,
        category: 'Jackets',
        colors: ['blue', 'light blue'],
        description: 'A classic denim jacket that pairs well with any casual outfit.',
      },
      {
        id: 70,
        name: 'Casual Polo Shirt',
        price: 39.99,
        images: ['/images/polo-shirt.png', '/images/polo-shirt2.png'],
        rating: 4.4,
        discount: 5,
        category: 'Shirts',
        colors: ['white', 'navy', 'black'],
        description: 'A breathable and comfortable polo shirt perfect for everyday wear.',
      },
      {
        id: 71,
        name: 'Modern Leather Handbag',
        price: 199.99,
        images: ['/images/leather-handbag.png', '/images/leather-handbag2.png'],
        rating: 4.9,
        discount: 30,
        category: 'Accessories',
        colors: ['brown', 'tan', 'black'],
        description: 'A sleek leather handbag for modern, stylish'
      }
     
  ];
  
  const youMayAlsoLike: Product[] = [
     
      {
        id: 69,
        name: 'Classic Denim Jacket',
        price: 99.99,
        images: ['/images/denim-jacket.png', '/images/denim-jacket2.png'],
        rating: 4.6,
        discount: 10,
        category: 'Jackets',
        colors: ['blue', 'light blue'],
        description: 'A classic denim jacket that pairs well with any casual outfit.',
      },
      {
        id: 70,
        name: 'Casual Polo Shirt',
        price: 39.99,
        images: ['/images/polo-shirt.png', '/images/polo-shirt2.png'],
        rating: 4.4,
        discount: 5,
        category: 'Shirts',
        colors: ['white', 'navy', 'black'],
        description: 'A breathable and comfortable polo shirt perfect for everyday wear.',
      },
      {
        id: 71,
        name: 'Modern Leather Handbag',
        price: 199.99,
        images: ['/images/leather-handbag.png', '/images/leather-handbag2.png'],
        rating: 4.9,
        discount: 30,
        category: 'Accessories',
        colors: ['brown', 'tan', 'black'],
        description: 'A sleek leather handbag for modern, stylish women.',
      },
      {
        id: 72,
        name: 'Oversized Wool Sweater',
        price: 79.99,
        images: ['/images/wool-sweater.png', '/images/wool-sweater2.png'],
        rating: 4.5,
        discount: 10,
        category: 'Sweaters',
        colors: ['cream', 'gray', 'navy'],
        description: 'A cozy oversized sweater perfect for chilly weather.',
      },
  ];

const CartPage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
 
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    setIsLoading(false);
  }, []);

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
 
  // Increase item quantity
  const increaseQuantity = (id: number) => {
    const updatedCart = cart.map(item => 
      item.id === id 
        ? { ...item, quantity: item.quantity + 1 } 
        : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Decrease item quantity
  const decreaseQuantity = (id: number) => {
    const updatedCart = cart
      .map(item => 
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0);
    
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Remove item from cart
  const removeItem = (id: number) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleAddToCart = (product: Product) => {
    const updatedCart = addProductToCart(product, 1, setCart);
    console.log(updatedCart);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <MainNav
        cart={cart}
        setCart={setCart}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <div className="container mx-auto px-4 md:px-12 my-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8"
        >
          {/* Cart Items Section */}
          <div className="w-full lg:w-3/4  ">
            <div className="text-gray-700 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xl font-semibold">
                <ShoppingCart size={24} className="text-gray-950" />
                <span>Cart</span>
                <span className="text-gray-950">({cart
                      ? cart.reduce((total, item) => total + item.quantity, 0)
                      : 0} items)</span>
              </div>
            </div>

            <div>
              <AnimatePresence>
                {cart.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-gray-500 py-12 bg-gray-50 rounded-lg"
                  >
                    <ShoppingCart size={64} className="mx-auto mb-4 text-gray-300" />
                    <p className="text-xl">Your cart is empty</p>
                  </motion.div>
                ) : (
                  cart.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white border-b border-gray-200 p-4 shadow-sm    flex items-center justify-between md:justify-center"
                    >
                      {/* Product Details */}
                      <div className=" md:flex-row flex-col flex items-start md:items-center   space-x-4 w-full  ">
                        <div className="w-20 h-20 relative flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                          />
                        </div>
                        <div className="flex-grow">
                          <h2 className="text-md md:text-lg font-bold text-[#000035]">
                            {item.name}
                          </h2>
                          <p className="text-gray-500">₦{item.price.toFixed(2)}</p>
                        </div>
                      </div>

                      {/* Quantity Control */}
                      <div className="flex items-center space-x-4 my-4 mr-2 md:my-0">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="bg-gray-100 text-[#000035] p-2 rounded-full hover:bg-gray-200 transition"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="text-md md:text-lg font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="bg-gray-100 text-[#000035] p-2 rounded-full hover:bg-gray-200 transition"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      {/* Item Total & Remove */}
                      <div className="flex items-center space-x-4">
                        <span className="text-md md:text-lg font-bold text-[#000035]">
                          ₦{(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-500 hover:text-red-500 transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Checkout Section */}
          {cart.length > 0 && (
            <div className="w-full   lg:w-1/3">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
              >
                <h3 className="text-lg md:text-xl font-bold pb-4 text-[#000035] border-b border-gray-200">
                  Order Summary
                </h3>
                
                <div className="py-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold text-[#000035]">
                      ₦{totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold text-[#000035]">₦0.00</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-4 flex justify-between items-center">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-lg font-bold text-[#000035]">
                    ₦{totalPrice.toFixed(2)}
                  </span>
                </div>
                
                <button className="w-full mt-6 flex items-center justify-center bg-yellow-400 text-black font-bold px-6 py-3 rounded-full hover:bg-yellow-500 transition">
                  <CreditCard size={20} className="mr-2" />
                  Proceed to Checkout
                </button>
              </motion.div>
            </div>
          )}
        </motion.div>

        {/* Top Selling & You May Also Like sections remain the same */}
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            {/* Top Selling Items */}
            <section className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-[#000035]">
                  Top Selling Items
                </h2>
                <button className="flex items-center text-[#000035] hover:text-yellow-600 transition">
                  View All <ArrowRight size={20} className="ml-2" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {topSellingItems.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={() => handleAddToCart(product)} 
                  />
                ))}
              </div>
            </section>

            {/* You May Also Like */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-[#000035]">
                  You May Also Like
                </h2>
                <button className="flex items-center text-[#000035] hover:text-yellow-600 transition">
                  View More <ArrowRight size={20} className="ml-2" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {youMayAlsoLike.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={() => handleAddToCart(product)} 
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;