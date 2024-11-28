"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ChatButton from "./chatButton";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  products,
  categories,
  popularBrands,
  Product,
  CartItem,
} from "@/app/utility/products";
import MainNav from "./MainNav";
import Footer from "./Footer";
import BackgroundSlider from "./BackgroundSlider";
import ServiceOfferings from "./ServiceOfferings";
import ProductCard from "./productCard";
import { addProductToCart } from '@/app/utility/productfn';
 

//type CartItem = Product & { quantity: number };

export default function Zeomart() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showCategories, setShowCategories] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);


  const handleAddToCart = (product: Product) => {
    const updatedCart = addProductToCart(product, 1, setCart);
    console.log(updatedCart);
  };

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  fetch('/api/v1/products')
  .then((response) => response.json())
  .then((data) => {
    console.log(data); // List of all products
   })
  .catch((error) => console.error('Error:', error));

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm]);

  // const addToCart = (product: Product) => {
  //   setCart((prevCart) => {
  //     const existingItem = prevCart.find((item) => item.id === product.id);

  //     if (existingItem) {
  //       // If the product already exists in the cart, update its quantity
  //       return prevCart.map((item) =>
  //         item.id === product.id
  //           ? { ...item, quantity: item.quantity + 1 } // Keep the existing image property
  //           : item
  //       );
  //     } else {
  //       // Create a new CartItem, ensuring to include the image property
  //       const newCartItem: CartItem = {
  //         ...product,
  //         quantity: 1,
  //         image: product.images[0], // Assuming product.images is an array and you want to take the first image
  //       };

  //       return [...prevCart, newCartItem]; // Return a new array including the new item
  //     }
  //   });
  // };

  return (
    <div className="min-h-screen flex flex-col  ">
      <MainNav
        cart={cart}
        setCart={setCart}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <BackgroundSlider />
      <main className="container mx-auto p-4  ">
        {/* <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="bg-white">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-4">MacBook Pro</h2>
              <p className="text-xl mb-4">Supercharged for pros</p>
              <Button className="bg-yellow-400 text-black hover:bg-yellow-500">
                Shop Now
              </Button>
            </CardContent>
          </Card>
        </motion.section> */}
        <ServiceOfferings />
        <ChatButton />
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold mb-4">Popular Brands</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {popularBrands.map((brand) => (
              <Card className="bg-white" key={brand.name}>
                <CardContent className="p-4 text-center">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    width={50}
                    height={50}
                    className="mx-auto mb-2"
                  />
                  <p className="text-sm">{brand.name}</p>
                </CardContent>
              </Card>

               
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
            <Button
              variant="outline"
              onClick={() => setShowCategories(!showCategories)}
              className="text-black border-black hover:bg-yellow-100"
            >
              {showCategories ? "Hide" : "Show"} Categories
              {showCategories ? (
                <ChevronUp className="ml-2 h-4  w-4" />
              ) : (
                <ChevronDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          </div>
          {showCategories && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {categories.map((category) => (
                <Button key={category} variant="secondary">
                  {category}
                </Button>
              ))}
            </div>
          )}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {filteredProducts.slice(0, 5).map((product) => (
              // <Card className="bg-white" key={product.id}>
              //   <CardContent className="p-4">
              //     <Link href={`/product/${product.id}`}>
              //       <Image
              //         src={product.images[0]}
              //         alt={product.name}
              //         width={300}
              //         height={300}
              //         className="w-full h-64 object-cover mb-4 rounded-lg"
              //       />
              //     </Link>
              //     <h3 className="font-semibold text-sm">{product.name}</h3>
              //     <p className="text-muted-foreground text-sm">₦
              //       {product.price}
              //     </p>
              //     <Link href={`/product/${product.id}`} passHref>
              //       <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500">
              //         View Product
              //       </Button>
              //     </Link>
              //   </CardContent>
              // </Card>
              <Link href={`/product/${product.id}`}>

<ProductCard 
key={product.id} 
product={product} 
onAddToCart={() => handleAddToCart(product)} 
/> </Link>
            ))}
          </div>
        </motion.section>

        {categories
          .filter((category) => category !== "All")
          .map((category) => (
            <motion.section
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold mb-4">{category}</h2>

                <Link href={`/category/${category}`} passHref>
                  <Button className="w-full bg-[#000035] hover:bg-[#000035cc] text-white  ">
                    View All
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {filteredProducts
                  .filter((product) => product.category === category)
                  .slice(0, 5)
                  .map((product) => (
                    // <Card className="bg-white" key={product.id}>
                    //   <CardContent className="p-4">
                    //     <Link href={`/product/${product.id}`}>
                    //       <Image
                    //         src={product.images[0]}
                    //         alt={product.name}
                    //         width={200}
                    //         height={200}
                    //         className="w-full h-32 object-cover mb-2 rounded"
                    //       />
                    //     </Link>
                    //     <h3 className="font-semibold text-sm">
                    //       {product.name}
                    //     </h3>
                    //     <p className="text-muted-foreground text-sm">
                    //     ₦{product.price}
                    //     </p>
                    //     <Link href={`/product/${product.id}`} passHref>
                    //       <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500">
                    //         View Product
                    //       </Button>
                    //     </Link>
                    //   </CardContent>
                    // </Card>
                    <Link href={`/product/${product.id}`}>
                    <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={() => handleAddToCart(product)} 
                    />
                    </Link>
                  ))}
              </div>
            </motion.section>
          ))}
      </main>

      <Footer />
    </div>
  );
}
