"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Slide {
  url: string;
  title: string;
  subtitle: string;
}

const slides: Slide[] = [
  {
    url: "/images/BQheader1.gif",
    title: "One Stop Shop for Everyone",
    subtitle: "From businesses to consumers, Brandsquare is your one-stop shop for all your needs",
  },
  {
    url: "/images/BQheader2.gif",
    title: "Shop with Ease",
    subtitle: "Experience seamless shopping at your fingertips with Brandsquare.",
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

  return (
    <div className="relative h-[30vh]  sm:h-[60vh] w-full overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0   w-full h-64 sm:h-96 md:h-full"
        >
          <Image className="  object-cover "
            src={slides[currentIndex].url}
            alt={slides[currentIndex].title}
            layout="fill"
             priority
          />
          <div className={`absolute     ${currentIndex === 0 ? 'md:text-right md:pr-5 ml-auto text-gray-800 md:w-[850px]': 'md:text-left md:pl-5 md:w-[700px] mr-auto text-white'}  inset-0 flex flex-col   justify-center    text-center `}>
           
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-6xl font-bold mb-4"
            >
              {slides[currentIndex].title}
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-md     text-center  md:text-2xl mb-8"
            >
              {slides[currentIndex].subtitle}
            </motion.p>
            {/* <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button className="bg-yellow-400" size="lg">
                Learn More
              </Button>
            </motion.div> */}
            
          </div>
        </motion.div>
      </AnimatePresence>
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
