
import Image from 'next/image';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import  { Product
} from "@/app/utility/products";import { useState } from 'react';


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
        className="bg-white rounded-xl overflow-hidden shadow-md relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-4 left-4 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold z-10">
            {product.discount}% OFF
          </div>
        )}
  
        {/* Wishlist Icon */}
        <button className="absolute top-4 right-4 bg-white/80 rounded-full p-2 z-10 hover:bg-white hover:text-red-500 transition">
          <Heart size={20} className="text-gray-600" />
        </button>
  
        {/* Product Image */}
        <div className="relative w-full h-48 overflow-hidden">
          <Image 
            src={Array.isArray(product.images) ? product.images[0] : product.images} 
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="group-hover:scale-110 transition-transform duration-300"
          />
        </div>
  
        {/* Product Details */}
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold text-[#000035]">{product.name}</h3>
            <div className="flex items-center text-yellow-500">
              <Star size={16} fill="currentColor" />
              <span className="ml-1 text-sm">{product.rating}</span>
            </div>
          </div>
  
          <div className="flex justify-between items-center">
            <div>
              {product.discount ? (
                <>
                  <span className="text-lg font-bold text-[#000035]">
                    ₦{(product.price * (1 - product.discount / 100)).toFixed(2)}
                  </span>
                  <span className="ml-2 text-sm text-gray-400 line-through">
                    ₦{product.price.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold text-[#000035]">
                  ₦{product.price.toFixed(2)}
                </span>
              )}
            </div>
  
            {/* Add to Cart Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onAddToCart(product)}
              className={`
                bg-[#000035] text-white p-2 rounded-full transition
                ${isHovered ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
              `}
            >
              <ShoppingCart size={20} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  };

  export default ProductCard;