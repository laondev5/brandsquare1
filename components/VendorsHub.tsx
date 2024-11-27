"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import CardPricing from "./cardPricing";
import Cards from "./cards";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ChatButton from "./chatButton";

import {  ChevronRight } from "lucide-react";
import Link from "next/link";
import { CartItem } from "@/app/utility/products";
import MainNav from "./MainNav";
import { useSession } from "next-auth/react";
import Footer from "./Footer";
import { FcInTransit, FcShop, FcViewDetails } from "react-icons/fc";
 import { FcMoneyTransfer } from "react-icons/fc";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

// type Benefit = {
//   icon: React.ReactNode;
//   title: string;
//   description: string;
// };

type Feature = {
  title: string;
  description: string;
 };

// const benefits: Benefit[] = [
//   {
//     icon: <ShoppingBag className="w-12 h-12 text-yellow-400" />,
//     title: "Expand Your Reach",
//     description: "Access millions of potential customers on our platform.",
//   },
//   {
//     icon: <TrendingUp className="w-12 h-12 text-yellow-400" />,
//     title: "Boost Your Sales",
//     description: "Leverage our marketing tools to increase your revenue.",
//   },
//   {
//     icon: <Users className="w-12 h-12 text-yellow-400" />,
//     title: "Join a Community",
//     description: "Connect with other vendors and share best practices.",
//   },
//   {
//     icon: <Zap className="w-12 h-12 text-yellow-400" />,
//     title: "Streamlined Operations",
//     description: "Use our efficient tools for inventory and order management.",
//   },
// ];

const features: Feature[] = [
  {
    title: "Easy Onboarding",
    description:
      "Get started quickly with our simple setup process and intuitive dashboard.",
       
  },
  {
    title: "Powerful Analytics",
    description:
      "Gain insights into your sales performance and customer behavior.",
  },
  {
    title: "Flexible Pricing",
    description:
      "Choose from various commission structures that suit your business model.",
  },
  {
    title: "24/7 Support",
    description:
      "Access our dedicated vendor support team anytime you need assistance.",
  },
];

export default function VendorHub() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
 
  const   session  = useSession();
  return (
    <div className="min-h-screen flex flex-col">
      <ChatButton />
      <MainNav
        cart={cart}
        setCart={setCart}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <motion.div
        className="relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200"
          animate={{
            background: [
              "linear-gradient(to bottom right, #bfdbfe, #e9d5ff, #fce7f3)",
              "linear-gradient(to bottom right, #fce7f3, #bfdbfe, #e9d5ff)",
              "linear-gradient(to bottom right, #e9d5ff, #fce7f3, #bfdbfe)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />
        <div className="relative z-10 container mx-auto px-4 py-24 text-center">
          <motion.h1
            className="  text-3xl md:text-5xl font-bold mb-6"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Welcome to the Brandsquare Vendors Hub
          </motion.h1>
          <motion.p
            className="text-md mb-8 max-w-[900px] mx-auto bg-white/30 backdrop-blur-lg rounded-lg p-8 shadow-xl"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            The Vendors Hub is an all-in-one platform specifically crafted to empower small business owners and aspiring entrepreneurs like you to effortlessly grow your business. We help you source the product, advertise, and handle local deliveries to your customers, with as little as 50% capital. The Vendors Hub is your go-to destination for building a thriving business without any stress.

          </motion.p>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {session?.data?.user?.role === "vendor" ? (
              <Link href="/vendor">
                <Button className="bg-yellow-400 font-semibold text-black hover:bg-yellow-500 text-lg px-8 py-6">
                  Continue to dashboard
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link href="/auth/vendor-signup">
                <Button className="bg-yellow-400 font-semibold text-black hover:bg-yellow-500 text-lg px-8 py-6">
                  Become a vendor now
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
      </motion.div>

      <div className="    md:mt-20   py-16">
        <div className="container mx-auto px-4 "> 
        <motion.h1 className="text-center  py-5  pb-8 md:pb-14">
          <span className="text-3xl    font-bold text-center">About Vendors Hub  </span>
        </motion.h1>
        <motion.div
          className="   gap-4 md:gap-7  justify-center items-center grid  lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          
           
<Cards style="border-blue-200" text='we help you source the product
                  Whether you’re looking for innovative products, competitive pricing, or reliable suppliers, we’ve got you covered.' title="Seamless Payments" icon={ <FcViewDetails />} />

            <div className=" flex  flex-col-reverse md:flex-col gap-4">
            <Cards style="border-gray-300" text=' You can kickstart your business with only 50% of the required capital. Imagine launching your dream business, tapping into your passion, and making a meaningful impact—all while managing your finances wisely.' title="Start With Just 50% Capital" icon={ <FcMoneyTransfer /> } />
                  <Cards style="border-purple-200" text='With our expertise in both local and international shipping, we ensure that your goods are handled with care and delivered to your customers.' title="Effortless Shipping" icon={ <FcInTransit /> } />
          

           
            </div>
            <Cards style="border-yellow-400" text="Our innovative platform empowers you to create a stunning online store that captures your brand's essence and attracts customers from all over the globe." title="Instant Storefront" icon={ <FcShop /> } />
            
            
  
        </motion.div></div>
        <div className="bg-slate-100 my-9 mb-32 pb-7 px-7">
  <motion.div
    className="container mx-auto  md:my-20 mt-32"
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 1.4 }}
  >
    <h2 className=" text-[23px] md:text-3xl font-semibold pt-9 mb-6 text-center">
    Why we are Different?
    </h2>
    <div>
      {/* First Section */}
      <div className="grid lg:grid-cols-2 grid-cols-1 items-center md:my-7  md:gap-6">
        {/* Image with Text */}
        <div className="relative w-full md:max-w-[700px]  h-[200px] md:h-[300px] mx-auto">
          <Image
            className=" object-contain"
            src="/images/happyman1.png"
            layout="fill"
            alt=""
          />
          
        </div>

        {/* Text Section */}
        <div className="text-center md:text-left my-4 md:my-0 lg:max-w-[500px] mx-auto leading-7">
          <h2 className="font-bold text-xl">Empowering entrepreneurs</h2>
          <p>
            Your gateway to seamless collaboration and success. Manage your
            products, track sales, and connect with customers effortlessly on one
            unified platform.
          </p>
        </div>
      </div>

      {/* Second Section */}
      <div className="  flex flex-col  lg:flex-row-reverse items-center  md:my-16  md:mt-20 gap-6">
        {/* Image with Text */}
        <div className="relative w-full md:max-w-[700px] h-[200px] md:h-[300px] mx-auto">
          <Image
            className=" object-contain"
            src="/images/woman_bg.png"
            layout="fill"
            alt=""
          />
        
        </div>
         {/* Text Section */}
        <div className=" text-center md:text-left my-2 md:my-0 lg:max-w-[500px] mx-auto leading-7">
          <h2 className="font-bold text-xl">Your Partner for Smarter Selling</h2>
          <p>
            From listing your products to tracking performance, we provide the
            tools you need to streamline operations and maximize your reach.
          </p>
        </div>
      </div>
    </div>

    {/* Call to Action */}
    <motion.div
      className="mt-16 text-center"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.2 }}
    >
      {/* <h2 className="  text-[21px] md:text-3xl font-semibold mb-4">Ready to Get Started?</h2>
      <p className=" text-[16#px] md:text-xl mb-6">
        Join Brandsquare today and take your e-commerce business to the next level.
      </p> */}
      {session?.data?.user?.role === "vendor" ? (
        <Link href="/vendor">
          <Button className="bg-yellow-400 font-semibold text-black hover:bg-yellow-500 text-lg px-8 py-6">
            Continue to dashboard
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      ) : (
        <Link href="/auth/vendor-signup">
          <Button className="bg-yellow-400 font-semibold text-black hover:bg-yellow-500 text-lg px-8 py-6">
            Become a vendor now
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      )}
    </motion.div>
  </motion.div>
</div>

       
<CardPricing />


<div className="container mx-auto px-4 "> 
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">
            Features That Empower Your Business
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.div
          className="mt-32"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <h2 className="text-3xl text-center font-semibold mb-6">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {[
              {
                question: "What is the Brandsquare Vendors Hub?",
                answer:
                  "The Vendors Hub is an all-in-one platform specifically crafted to empower small business owners and aspiring entrepreneurs like you to effortlessly grow your business. We help you source the product, advertise, and handle local deliveries to your customers, with as little as 50% capital. The Vendors Hub is your go-to destination for building a thriving business without any stress.",
              },
              {
                question: "How do I start selling on Brandsquare?",
                answer:
                  "To start selling on Brandsquare, you need to sign up as a vendor through the vendors hub. Once registered, we'll guide you through the process of setting up your online store, choosing products from trusted local or international suppliers, and getting access to our flexible payment and warehousing options.",
              },
              {
                question: "How do I pay for goods from Chinese vendors?",
                answer:
                  "With Brandsquare, you can pay for your goods in Naira. We handle the payment conversion, so you don’t need to worry about exchange rates or currency conversion. Simply pay in Naira, and we take care of the rest, including processing the payment to the Chinese vendor.",
              },
              {
                question: " How does the 50% capital option work?",
                answer:
                  "When you choose the 50% capital option, you make a partial payment for your goods. Brandsquare handles the shipping and warehousing. Once your goods arrive, you can either pay the remaining amount to collect them or start selling directly from our warehouse, allowing you to generate revenue before completing the full payment.",
              }
               
            ].map((item, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer.includes('<') ? (<div dangerouslySetInnerHTML={{ __html: item.answer }} />) :  <span className=" text-[14px] text-gray-700">{item.answer}</span>}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          className="mt-5"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}>
            <Link href='/help'><Button className="bg-yellow-400 text-black font-semibold text-sm hover:bg-yellow-500   px-4 py-3">
View more FAQS            <ChevronRight className="ml-2 h-5 w-5" />
          </Button> </Link>
          </motion.div>
      </div>
      </div>

      
      <Footer />
    </div>
  );
}
