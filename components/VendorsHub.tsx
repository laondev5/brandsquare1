"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ChatButton from "./chatButton";

import { CheckCircle, ChevronRight } from "lucide-react";
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
 
  const { data: session } = useSession();
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
            The Vendors Hub is an innovative platform designed to empower small business owners and startups to grow their e-commerce businesses with ease. We provide solutions for seamless payments in Naira, trusted partnerships with verified vendors, and flexible capital options to help you start selling with as little as 50% upfront. From shipping and warehousing to hassle-free payments and reliable vendor connections, the Vendors Hub is your one-stop solution for building a successful business without the stress. 

          </motion.p>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {session?.user?.role === "VENDOR" ? (
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
          className="  flex flex-col gap-4 md:gap-7 md:flex-row justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {/* {[
            {
              title: "Seamless Payments",
              content:
                "The Vendor Hub connects Nigerian businesses with trusted Chinese suppliers, enabling secure Naira payments, eliminating currency conversion and gateway issues for a smooth, efficient sourcing process.",
                 icon: <GrTransaction className="   text-yellow-400" />,
            },
            {
              title: "Flexible Financing",
content:
  "We offer flexible financing options, requiring only 50% down to secure your goods. You can either complete payment upon arrival at our warehouse or start selling directly while gathering the remaining funds.",
  icon: <FaMoneyBillWave  className="   text-yellow-400" />,
            },
            {
              title: "Effortless Shipping",
content:
  " The Vendor Hub manages shipping from China to Nigeria, ensuring professional handling. Collect your products upon arrival or sell directly from our warehouse, focusing on growing your business.",
  icon: <FaShippingFast className="   text-yellow-400" />,
            },
            {
              title: "Instant Storefront",
              content: "Our platform offers an instant web store, providing a professional online presence with no setup costs. Benefit from our network, tools, and streamlined e-commerce success path.",
              icon: <FaStoreAlt className="   text-yellow-400" />,
            },
          ]  */}
           <motion.div  
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 + 0 * 0.2 }}
            >
              <div className="  border-t-4  min-h-[190px] md:min-h-[180px]  border-blue-200 rounded-lg shadow-lg  transition-transform transform   md:hover:scale-105 hover:scale-[1.03]  hover:shadow-lg  text-center  p-4 md:text-left">
                
                  <div className=" text-[20px] font-thin "><span>Seamless Payments</span></div>
                
                <div>
                  <p className="text-[15px]  py-3 text-gray-700  leading-7 md:leading-8">The Vendors Hub connects Nigerian businesses with trusted Chinese suppliers</p>   
                </div>
                <div className=" text-[29px] float-right">
                <FcViewDetails /> 
                </div>
              </div>
            </motion.div>

            <div className=" flex  flex-col-reverse md:flex-col gap-4">
            <motion.div  
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 + 0 * 0.2 }}
            >
              <div className="  min-h-[190px] md:min-h-[180px]  border-t-4  border-gray-300  rounded-lg shadow-lg   transition-transform transform   md:hover:scale-105 hover:scale-[1.03]  hover:shadow-lg  text-center  p-4 md:text-left">
                
                  <div className=" text-[20px] font-thin "><span>Flexible Financing</span></div>
                
                <div>
                  <p className="text-[15px]  py-3 text-gray-700  leading-7 md:leading-8">The Vendors Hub connects We offer flexible financing options, requiring only 50% down to secure your goods.</p>   
                </div>
                <div className=" text-[29px] float-right">
                <FcMoneyTransfer /> 
                </div>
              </div>
            </motion.div>

            <motion.div  
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 + 0 * 0.2 }}
            >
              <div className="  border-t-4  min-h-[190px] md:min-h-[180px] border-purple-200  rounded-lg shadow-lg  transition-transform transform   md:hover:scale-105 hover:scale-[1.03]  hover:shadow-lg  text-center  p-4 md:text-left">
                
                  <div className=" text-[20px] font-thin "><span>Effortless Shipping</span></div>
                
                <div>
                  <p className="text-[15px]  py-3 text-gray-700  leading-7 md:leading-8">The Vendors Hub manages shipping from China to Nigeria, ensuring professional handling.</p>   
                </div>
                <div className=" text-[29px] float-right">
                <FcInTransit /> 
                </div>
              </div>
            </motion.div>
            </div>
            <motion.div  
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 + 0 * 0.2 }}
            >
              <div className="  border-t-4  min-h-[190px] md:min-h-[180px]  border-yellow-400 rounded-lg shadow-lg  transition-transform transform  font-semibold  md:hover:scale-105 hover:scale-[1.03]  hover:shadow-lg  text-center  p-4 md:text-left">
                
                  <div className=" text-[20px] font-thin "><span>Instant Storefront</span></div>
                
                <div>
                  <p className="text-[15px]  py-3 text-gray-700  leading-7 md:leading-8">We offer an instant web store, providing a professional online presence with no setup costs.</p>   
                </div>
                <div className=" text-[29px] float-right">
                <FcShop /> 
                </div>
              </div>
            </motion.div>
            
            
  
        </motion.div></div>
        <div className="bg-slate-100 my-9 mb-32 pb-7 px-7">
  <motion.div
    className="container mx-auto my-20 mt-32"
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 1.4 }}
  >
    <h2 className="text-3xl font-semibold pt-9 mb-6 text-center">
      Why Choose Brandsquare?
    </h2>
    <div>
      {/* First Section */}
      <div className="grid lg:grid-cols-2 grid-cols-1 items-center my-7 gap-6">
        {/* Image with Text */}
        <div className="relative w-full md:max-w-[700px] h-[300px] mx-auto">
          <Image
            className="rounded-3xl object-cover"
            src="/images/happy-young-african.jpg"
            layout="fill"
            alt=""
          />
          {[
            "Simplified international transactions",
            "Warehousing and shipping support",
            "Instant web store setup",
          ].map((feature, index) => {
            const positions = [
              "top-[45%] right-5",
              "top-[65%] right-5 -translate-y-1/2",
              "top-[85%] right-5",
            ];
            return (
              <motion.div
                key={index}
                className={`absolute ${positions[index]} flex items-center space-x-2 bg-white shadow-lg rounded-full px-4 py-2`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6 + index * 0.1 }}
              >
                <CheckCircle className="text-green-500" />
                <span className="text-sm">{feature}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Text Section */}
        <div className="text-center md:my-0 lg:max-w-[500px] mx-auto">
          <h2 className="font-bold text-xl">Empowering Vendors, Simplifying Growth</h2>
          <p>
            Your gateway to seamless collaboration and success. Manage your
            products, track sales, and connect with customers effortlessly on one
            unified platform.
          </p>
        </div>
      </div>

      {/* Second Section */}
      <div className="grid lg:grid-cols-2 grid-cols-1 lg:flex-row-reverse items-center my-16 mt-20 gap-6">
        {/* Image with Text */}
        <div className="relative w-full md:max-w-[700px] h-[300px] mx-auto">
          <Image
            className="rounded-3xl object-cover"
            src="/images/beautiful-african-american-woman.jpg"
            layout="fill"
            alt=""
          />
          {[
            "Access to a large customer base",
            "Ongoing vendor education",
            "Flexible growth options",
          ].map((feature, index) => {
            const positions = [
             "top-[45%] right-5",
              "top-[65%] right-5 -translate-y-1/2",
              "top-[85%] right-5",
            ];
            return (
              <motion.div
                key={index}
                className={`absolute ${positions[index]} flex items-center space-x-2 bg-white shadow-lg rounded-full px-4 py-2`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6 + index * 0.1 }}
              >
                <CheckCircle className="text-green-500" />
                <span className="text-sm">{feature}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Text Section */}
        <div className="text-center md:my-0 lg:max-w-[500px] mx-auto">
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
      {session?.user?.role === "VENDOR" ? (
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
                  "The Brandsquare Vendors Hub is a platform designed to help small business owners and startups sell their products through trusted partnerships with Chinese vendors. We provide solutions for seamless payments, capital assistance, shipping, and warehousing, making it easier for you to grow your business with less hassle.",
              },
              {
                question: "How do I start selling on Brandsquare?",
                answer:
                  "To start selling on Brandsquare, you'll need to sign up as a vendor on our platform. Once registered, we'll guide you through the process of setting up your online store, choosing products from trusted Chinese vendors, and getting access to our flexible payment and warehousing options.",
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
View more faqs            <ChevronRight className="ml-2 h-5 w-5" />
          </Button> </Link>
          </motion.div>
      </div>
      </div>

 
      <Footer />
    </div>
  );
}
