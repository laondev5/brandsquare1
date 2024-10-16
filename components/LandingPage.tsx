"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import MainNav from "./MainNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "./Footer";

// Dummy data (unchanged)
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

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export default function Zeomart() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showCategories, setShowCategories] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm]);

  const addToCart = (product: (typeof products)[0]) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      let newCart;
      if (existingItem) {
        newCart = prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [...prevCart, { ...product, quantity: 1 }];
      }
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <MainNav
        cart={cart}
        setCart={setCart}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <main className="container mx-auto p-4">
        <motion.section
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
        </motion.section>

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
              <Card className="bg-white" key={product.id}>
                <CardContent className="p-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="w-full h-40 object-cover mb-2 rounded"
                  />
                  <h3 className="font-semibold text-sm">{product.name}</h3>
                  <p className="text-muted-foreground text-sm">
                    ${product.price}
                  </p>
                  <Button
                    onClick={() => addToCart(product)}
                    className="mt-2 w-full bg-yellow-400 text-black hover:bg-yellow-500"
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
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
                  <Card className="bg-white" key={product.id}>
                    <CardContent className="p-4">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="w-full h-32 object-cover mb-2 rounded"
                      />
                      <h3 className="font-semibold text-sm">{product.name}</h3>
                      <p className="text-muted-foreground text-sm">
                        ${product.price}
                      </p>
                      <Button
                        onClick={() => addToCart(product)}
                        className="mt-2 w-full bg-yellow-400 text-black hover:bg-yellow-500"
                      >
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </motion.section>
        ))}
      </main>

      <Footer />
    </div>
  );
}
