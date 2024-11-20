"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion,  } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BsCart4 } from "react-icons/bs";
import { IoStorefrontOutline } from "react-icons/io5";
import Link from "next/link";
interface Slide {
  url: string;
  title: string;
  subtitle: string;
}

const slides: Slide[] = [
  {
    url: "/images/BQheader2.gif",
    title: "One Stop Shop for All",
    subtitle: "Your one-stop shop for all your needs",
  },
  {
    url: "/images/BQheader1.gif",
    title: "Shop with Ease",
    subtitle: "Experience seamless shopping at your fingertips.",
  },
  {
    url: "/images/BQheader3.gif",
    title: "Begin Your Journey",
    subtitle: "Start and grow your Business with marketing tools and resources",
  },
  {
    url: "/images/BQheader4.gif",
    title: "Ready to start a business?",
    subtitle: "We help source, ship, and sell the best products",
  },
   
  // {
  //   url: "/images/bg1.png",
  //   title: "Sustainability",
  //   subtitle: "Creating a lasting impact on our planet",
  // },
];

export default function BackgroundSlider(): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const prevSlide = (): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = (): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  // absolute   bg-[url('/images/header1BG.png')] inset-0  flex items-center justify-center  w-full h-64 sm:h-96 md:h-full

  return (
 
    <div className="relative h-full  sm:h-full max-w-[900px] mx-auto mt-9 w-full overflow-hidden">
         <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className=" flex items-center justify-center "
        >
          <Image className=" h-[200px] object-cover  md:h-full md:object-contain  rounded-lg"
            src={slides[currentIndex].url}
            alt={slides[currentIndex].title}
          width={1000}

          height={700}
          //  layout="fill"
             priority 
          />
          <div className={`absolute       ${currentIndex === 1 || currentIndex === 3  ? 'text-right md:pr-5 ml-auto text-gray-800 md:w-[450px] w-[300px] mr-16 md:mr-24': 'text-left md:pl-5 w-[300px] md:w-[400px] mr-auto ml-16 md:ml-24 text-black'}      inset-0 flex flex-col   justify-center  mb-10 my-5 ${ currentIndex === 2 && '    left-[20%]  my-2 mb-4 text-left '}       `}>
           
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`text-xl md:text-[32px] font-bold mb-2 ${currentIndex === 2 && ' text-[15px] ' }`}
            >
              {slides[currentIndex].title}
            </motion.h1>
            {/* <motion.div initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}>
            <BsCart4 className=" text-[33px] mb-3" />
            </motion.div> */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className={`text-md font-semibold md:text-[17px] my-2 `}
            >
              {slides[currentIndex].subtitle}
            </motion.p>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Link href={currentIndex === 2 || currentIndex === 3 ? '/vendor-signup': '/'}> 
              <Button className="bg-[#000035]" size="lg">
                 { currentIndex === 2 || currentIndex === 3  ? <>Vendors Hub  <IoStorefrontOutline className="" /></> :<>shop now <BsCart4 className="" /></>}
              </Button></Link>
            </motion.div>
            
          </div>
        </motion.div>
       <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 -translate-y-1/2 left-5 bg-black/20 text-white hover:bg-black/40"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 -translate-y-1/2 right-5 bg-black/20 text-white hover:bg-black/40"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
     
  );
}
