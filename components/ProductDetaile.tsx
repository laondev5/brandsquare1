// "use client";

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import { Star, Plus, Minus } from "lucide-react";
// import { products, Product, CartItem } from "@/app/utility/products";
// import Footer from "./Footer";
// import MainNav from "./MainNav";
// import ChatButton from "./chatButton";

// interface ProductDetailProps {
//   id: string | number;
// }

// const ProductDetail: React.FC<ProductDetailProps> = ({ id }) => {
//   const [product, setProduct] = useState<Product | null>(null);
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [selectedColor, setSelectedColor] = useState("");
//   const [quantity, setQuantity] = useState(1);
//   const [isInCart, setIsInCart] = useState(false);

//   useEffect(() => {
//     if (id) {
//       const foundProduct = products.find((p) => p.id === Number(id));
//       if (foundProduct) {
//         setProduct(foundProduct);
//         setSelectedColor(foundProduct.colors[0]);
//       }
//     }
//   }, [id]);

//   useEffect(() => {
//     const storedCart = localStorage.getItem("cart");
//     if (storedCart) {
//       const parsedCart = JSON.parse(storedCart);
//       setCart(parsedCart);
//       setIsInCart(parsedCart.some((item: CartItem) => item.id === Number(id)));
//     }
//   }, [id]);

//   const addToCart = () => {
//     if (product) {
//       const newItem: CartItem = {
//         ...product,
//         quantity: quantity,
//         image: product.images[0],
//       };
//       setCart((prevCart) => {
//         const updatedCart = [...prevCart, newItem];
//         localStorage.setItem("cart", JSON.stringify(updatedCart));
//         return updatedCart;
//       });
//       setIsInCart(true);
//     }
//   };

//   const updateCartQuantity = (newQuantity: number) => {
//     setCart((prevCart) => {
//       const updatedCart = prevCart.map((item) =>
//         item.id === Number(id) ? { ...item, quantity: newQuantity } : item
//       );
//       localStorage.setItem("cart", JSON.stringify(updatedCart));
//       return updatedCart;
//     });
//     setQuantity(newQuantity);
//   };

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   const relatedProducts = products
//     .filter((p) => p.category === product.category && p.id !== product.id)
//     .slice(0, 3);

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-100">
//       <ChatButton />
//       <MainNav
//         cart={cart}
//         setCart={setCart}
//         searchTerm={searchTerm}
//         setSearchTerm={setSearchTerm}
//       />

//       <main className="container mx-auto p-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <Image
//               src={product.images[selectedImage]}
//               alt={product.name}
//               width={400}
//               height={400}
//               className="w-full rounded-lg shadow-lg"
//             />
//             <div className="flex mt-4 space-x-2">
//               {Array.isArray(product.images) && product.images.map((image, index) => (
//                 <Image
//                   key={index}
//                   src={image}
//                   alt={`${product.name} ${index + 1}`}
//                   width={80}
//                   height={80}
//                   className={`rounded cursor-pointer ${
//                     selectedImage === index ? "border-2 border-yellow-400" : ""
//                   }`}
//                   onClick={() => setSelectedImage(index)}
//                 />
//               ))}
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
//             <p className="text-2xl font-semibold mb-4">₦{product.price}</p>
//             <div className="flex items-center mb-4">
//               {[...Array(5)].map((_, i) => (
//                 <Star
//                   key={i}
//                   className={`w-5 h-5 ${
//                     i < Math.floor(product.rating)
//                       ? "text-yellow-400 fill-current"
//                       : "text-gray-300"
//                   }`}
//                 />
//               ))}
//               <span className="ml-2 text-gray-600">({product.rating})</span>
//             </div>
//             <p className="text-gray-700 mb-6">{product.description}</p>

//             <div className="mb-6">
//               <h3 className="font-semibold mb-2">Color</h3>
//               <RadioGroup
//                 value={selectedColor}
//                 onValueChange={setSelectedColor}
//               >
//                 <div className="flex space-x-2">
//                   {product.colors.map((color) => (
//                     <div key={color}>
//                       <RadioGroupItem
//                         value={color}
//                         id={color}
//                         className="sr-only"
//                       />
//                       <Label
//                         htmlFor={color}
//                         className={`w-8 h-8 rounded-full cursor-pointer ${
//                           color.toLowerCase() === "white"
//                             ? "bg-white border border-gray-300"
//                             : color.toLowerCase() === "black"
//                             ? "bg-black"
//                             : `bg-${color.toLowerCase()}-500`
//                         } ${
//                           selectedColor === color
//                             ? "ring-2 ring-yellow-400"
//                             : ""
//                         }`}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </RadioGroup>
//             </div>

//             <div className="flex items-center mb-6">
//               <Button
//                 variant="outline"
//                 size="icon"
//                 onClick={() =>
//                   isInCart
//                     ? updateCartQuantity(Math.max(1, quantity - 1))
//                     : setQuantity(Math.max(1, quantity - 1))
//                 }
//               >
//                 <Minus className="h-4 w-4" />
//               </Button>
//               <span className="mx-4 font-semibold">{quantity}</span>
//               <Button
//                 variant="outline"
//                 size="icon"
//                 onClick={() =>
//                   isInCart
//                     ? updateCartQuantity(quantity + 1)
//                     : setQuantity(quantity + 1)
//                 }
//               >
//                 <Plus className="h-4 w-4" />
//               </Button>
//             </div>

//             <Button
//               className="w-full bg-yellow-400 text-black hover:bg-yellow-500"
//               onClick={addToCart}
//               disabled={isInCart}
//             >
//               {isInCart ? "Added to Cart" : "Add to Cart"}
//             </Button>
//             <Button className="w-full bg-blue-950 text-white  hover:bg-[#000035cc] mt-2">
//               Checkout
//             </Button>
//           </motion.div>
//         </div>

//         <motion.section
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="mt-12"
//         >
//           <h2 className="text-2xl font-bold mb-4">Related Products</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {relatedProducts.map((product) => (
//               <Card key={product.id} className="bg-white">
//                 <CardContent className="p-4">
//                   <Image
//                     src={product.images[0]}
//                     alt={product.name}
//                     width={200}
//                     height={200}
//                     className="w-full h-48 object-cover mb-4 rounded"
//                   />
//                   <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
//                   <p className="text-gray-600 mb-4">₦{product.price}</p>
//                   <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500">
//                     View Product
//                   </Button>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </motion.section>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default ProductDetail;


"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
 import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Star, Plus, Minus, Heart, Share2, ShoppingCart } from "lucide-react";
import {   Product, CartItem } from "@/app/utility/products";
import Footer from "./Footer";
import MainNav from "./MainNav";
import ChatButton from "./chatButton";
import ProductCard from "./productCard";
import { addProductToCart } from "@/app/utility/productfn";
import { useProductStore } from "@/store/productStore";


interface ProductDetailProps {
  id: string ;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ id }) => {
  // ... [keep existing state and useEffect hooks]
  const [product, setProduct] = useState<Product | null>(null);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [isInCart, setIsInCart] = useState(false);
    // const imagesArr =  ['/images/coke4.jpg' ,'/images/coke1.jpeg', '/images/coke2.jpeg'];
    const handleAddToCart = (product: Product) => {
      const updatedCart = addProductToCart(product, 1, setCart);
      console.log(updatedCart);
    };
    const { fetchProducts,   allProducts  } = useProductStore();
    useEffect(() => {
      fetchProducts();

    }, [fetchProducts]);

    useEffect(() => {
      if (id && allProducts.length > 0) {
      
        const foundProduct = allProducts.find((p) => p._id === id);
        if (foundProduct) {
          setProduct(foundProduct);
           console.log(foundProduct, 'foundProducts')
          setSelectedColor(foundProduct.colors[0]);
        }
      }
    }, [id, allProducts]);


  
    useEffect(() => {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        setCart(parsedCart);
        setIsInCart(parsedCart.some((item: CartItem) => item._id ===  id));
      }
    }, [id]);
  
    const addToCart = () => {
      if (product) {
        const newItem: CartItem = {
          ...product,
          quantity: quantity,
          image: product.displayImage,
        };
        setCart((prevCart) => {
          const updatedCart = [...prevCart, newItem];
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          return updatedCart;
        });
        setIsInCart(true);
      }
    };
  
    const updateCartQuantity = (newQuantity: number) => {
      setCart((prevCart) => {
        const updatedCart = prevCart.map((item) =>
          item._id ===  id ? { ...item, quantity: newQuantity } : item
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      });
      setQuantity(newQuantity);
    };
  
    if (!product) {
      return <div>Loading...</div>;
     }
  
    const relatedProducts = allProducts
      .filter((p) => p.category === product.category && p._id !== product._id)
      .slice(0, 6);

      const handleShare = async () => {
        if (navigator.share) {
          try {
            await navigator.share({
              title: document.title,
              text: `Check out this product: ${document.title}`,
              url: window.location.href
            });
          } catch (error) {
            console.error('Share failed:', error);
          }
        } else {
          // Fallback for browsers not supporting Web Share API
          try {
            await navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard');
          } catch (error) {
            console.error('Clipboard copy failed:', error);
          }
        }
       };
  return (
    <div className="bg-gray-50">
      <MainNav
        cart={cart}
        setCart={setCart}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Product Gallery Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl shadow-lg p-6">
          <div>
            <div className="relative">
              <Image
                // src={imagesArr[selectedImage]}
                src={product.galleryImages[selectedImage]}
                alt={product.name}
                width={500}
                height={500}
                className="w-full rounded-xl object-cover"
              />
              <div className="absolute top-4 right-4 flex space-x-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="bg-white/80 hover:bg-white"
                >
                  <Heart className="w-5 h-5 text-gray-600" />
                </Button>
                <Button  onClick={handleShare}
                  variant="outline" 
                  size="icon" 
                  className="bg-white/80 hover:bg-white"
                >
                  <Share2   className="w-5 h-5 text-gray-600" />
                </Button>
              </div>
            </div>

            <div className="flex mt-4 space-x-2 overflow-x-auto">
              {/* {imagesArr.map((image, index) => ( */}
              {product.galleryImages.map((image, index) => ( 
                <Image
                  key={index}
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  width={80}
                  height={80}
                  className={`rounded-lg cursor-pointer w-20 h-20 object-cover ${
                    selectedImage === index ? "  border-yellow-400 border" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>

          {/* Product Details Section */}
          <div>
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(Number(product.rating))
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  ({product.rating})
                </span>
              </div>
              <span className="text-sm text-blue-600">
                {Math.floor(Math.random() * 100)} sold
              </span>
            </div>

            <div className="bg-slate-100 p-4 rounded-lg mb-4">
              <div className="flex items-center mb-2">
                <span className="text-3xl font-bold text-gray-800 mr-4">
                  ₦{product.price}
                </span>
                <span className="line-through text-gray-500">
                  ₦{(Number(product.price) * 1.3).toFixed(2)}
                </span>
              </div>
              <div className="text-green-600 font-semibold">
                Save 30% today
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Color</h3>
              <RadioGroup
                value={selectedColor}
                onValueChange={setSelectedColor}
                className="flex space-x-2"
              >
                {product.colors.map((color) => (
                  <div key={color} className="flex  items-center">
                    <RadioGroupItem
                      value={color}
                      id={color}
                      className="sr-only"
                    />
                    <Label
                      htmlFor={color}
                      className={`w-8 h-8 rounded-full cursor-pointer ${
                        color.toLowerCase() === "white"
                          ? "bg-white border border-gray-300"
                          : color.toLowerCase() === "black"
                          ? "bg-black"
                          : `bg-${color.toLowerCase()}-500`
                      } ${
                        selectedColor === color
                          ? "ring-2 ring-blue-500"
                          : ""
                      }`}
                    />
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex items-center mb-6 space-x-4">
              <div className="flex items-center border rounded-full">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    isInCart
                      ? updateCartQuantity(Math.max(1, quantity - 1))
                      : setQuantity(Math.max(1, quantity - 1))
                  }
                  className="rounded-full"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 font-semibold">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    isInCart
                      ? updateCartQuantity(quantity + 1)
                      : setQuantity(quantity + 1)
                  }
                  className="rounded-full"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
               <div className=" flex gap-1"> 
              {product.colors.map((colors, index) => (
                 <span key={index}>{colors}, </span>
              ))}  <span>In stock</span></div>
            </div>

            <div className="space-y-4">
              <Button
                 className="w-full bg-yellow-400 text-black hover:bg-yellow-500"
                   onClick={addToCart}
                disabled={isInCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {isInCart ? "Added to Cart" : "Add to Cart"}
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-[#000035] text-[#000035] hover:bg-blue-50"
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <motion.section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((product) => (
                <ProductCard 
               key={product._id} 
               product={product} 
               onAddToCart={() => handleAddToCart(product)} 
               />
             ))}
          </div>
        </motion.section>
      </main>
      <Footer />
      <ChatButton />
    </div>
  );
};

export default ProductDetail;
