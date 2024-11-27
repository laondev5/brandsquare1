"use client";

import React, { useState } from 'react';
 import { ArrowRight } from 'lucide-react';
    import {Product} from '@/types/cart';
    import ProductCard from './productCard';

    

// Sample product data (replace with your actual data)
const topSellingItems: Product[] = [
  {
    id: 'ts1',
    name: 'Classic Leather Jacket',
    price: 129.99,
    image: '/images/happyman.png',
    rating: 4.5,
    discount: 20
  },
  {
    id: 'ts2',
    name: 'Vintage Sneakers',
    price: 89.99,
    image: '/images/sneakers.jpg',
    rating: 4.7
  },
  {
    id: 'ts3',
    name: 'Minimalist Watch',
    price: 199.99,
    image: '/images/watch.jpg',
    rating: 4.8,
    discount: 15
  },
  {
    id: 'ts4',
    name: 'Wool Blend Coat',
    price: 249.99,
    image: '/images/coat.jpg',
    rating: 4.6
  }
];

const youMayAlsoLike: Product[] = [
  {
    id: 'ym1',
    name: 'Casual Denim Shirt',
    price: 59.99,
    image: '/images/denim-shirt.jpg',
    rating: 4.3
  },
  {
    id: 'ym2',
    name: 'Leather Messenger Bag',
    price: 149.99,
    image: '/images/messenger-bag.jpg',
    rating: 4.5,
    discount: 10
  },
  {
    id: 'ym3',
    name: 'Classic Sunglasses',
    price: 79.99,
    image: '/images/sunglasses.jpg',
    rating: 4.4
  },
  {
    id: 'ym4',
    name: 'Comfort Fit Chinos',
    price: 69.99,
    image: '/images/chinos.jpg',
    rating: 4.6
  }
];

 

const RecommendationSection: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);

  const handleAddToCart = (product: Product) => {
    // Basic add to cart logic - replace with your actual cart management
    setCart(prevCart => [...prevCart, product]);
  };



  
  return (
    // <div className="bg-gray-50 py-12">
    //   <div className="container mx-auto px-4">
    //     {/* Top Selling Items */}
    //     <section className="mb-12">
    //       <div className="flex justify-between items-center mb-6">
    //         <h2 className="text-2xl md:text-3xl font-bold text-[#000035]">
    //           Top Selling Items
    //         </h2>
    //         <button className="flex items-center text-[#000035] hover:text-yellow-600 transition">
    //           View All <ArrowRight size={20} className="ml-2" />
    //         </button>
    //       </div>

    //       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    //         {topSellingItems.map(product => (
    //           <ProductCard 
    //             key={product.id} 
    //             product={product} 
    //             onAddToCart={handleAddToCart} 
    //           />
    //         ))}
    //       </div>
    //     </section>

    //     {/* You May Also Like */}
    //     <section>
    //       <div className="flex justify-between items-center mb-6">
    //         <h2 className="text-2xl md:text-3xl font-bold text-[#000035]">
    //           You May Also Like
    //         </h2>
    //         <button className="flex items-center text-[#000035] hover:text-yellow-600 transition">
    //           View More <ArrowRight size={20} className="ml-2" />
    //         </button>
    //       </div>

    //       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    //         {youMayAlsoLike.map(product => (
    //           <ProductCard 
    //             key={product.id} 
    //             product={product} 
    //             onAddToCart={handleAddToCart} 
    //           />
    //         ))}
    //       </div>
    //     </section>
    //   </div>
    // </div>
  );
};

export default RecommendationSection;