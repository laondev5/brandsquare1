
import Image from 'next/image';
import {     ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import  { Product
} from "@/app/utility/products";import { useState } from 'react';
import  shirtImage from  '../public/images/coke4.jpg'
import { FaEye } from "react-icons/fa";
import Link from 'next/link';
const ProductCard: React.FC<{ 
    product: Product, 
    onAddToCart: (product: Product) => void 
  }> = ({ product, onAddToCart }) => {
    const [isHovered, setIsHovered] = useState(false);
     return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white  p-3 hover:shadow-lg  overflow-hidden   relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Discount Badge */}
        {product.rating && (
          <div className="absolute top-4 left-4 bg-opacity-[0.6] bg-yellow-100 text-yellow-400 px-2 py-1 rounded-full text-xs font-bold z-10">
            0{product.discount}% OFF
          </div>
        )}
  {/* absolute top-4 right-4 bg-white/80 rounded-full p-2 z-10 hover:bg-white hover:text-red-500 transition */}
        {/* Wishlist Icon */} 
          <motion.button  whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}  className={`absolute top-4 right-4 bg-white/80   p-1 px-2 z-10 hover:bg-white hover:shadow-sm 
                bg-[#000035] text-gray-800  rounded-full transition
                ${isHovered ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
              `}>
                                    <Link href={`/product/${product._id}`}>

          <span className=' flex items-center gap-1 font-extrabold text-[11px]'><FaEye /> View item</span></Link>
          {/* <Heart size={20} className="text-gray-600" /> */}
        </motion.button> 

        {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onAddToCart(product)}
              className={`
                bg-[#000035] text-white p-2 rounded-full transition
                ${isHovered ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
              `}
            >
              <ShoppingCart size={20} />
            </motion.button> */}
  
        {/* Product Image */}
        <div className="relative w-full h-52 overflow-hidden">
          <Image 
            // src={Array.isArray(product.images) ? product.images[0] : product.images} 
            // src={product.displayImage} 
            src={product.displayImage?.includes("cloudinary") ? product.displayImage :  shirtImage}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="group-hover:scale-110   transition-transform duration-300"
          />
        </div>
  
        {/* Product Details */}
        <div className="py-4">
          <span className=' text-gray-700 font-thin text-[14px]'>{product.description.slice(0, 34)}</span>
          <div className="flex justify-between items-center mb-2">
          <div>
              {product.discount ? (
                <>
                   <span className="text-[25px] font-bold text-gray-800"><span className=' text-[12px]'>₦</span>{product.price}.00{( Number(product.price) * (1 - product.discount / 100)).toFixed(2)}
                  </span>
                  <span className="ml-2 text-sm text-gray-400 line-through">
                    ₦{Number(product.price).toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-xl font-bold text-gray-800">
                  <span className=' text-[12px]'>₦</span>{Number(product.price).toFixed(2)}
                </span>
              )}
            </div>
             <motion.button       whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}        onClick={() => onAddToCart(product)}
 className='className={`
                bg-[#000035] text-white p-2 rounded-full transition'>              <ShoppingCart size={20} />
             </motion.button>
             
             
          </div>
  
           
        </div>
      </motion.div>
    );
  };

  export default ProductCard;