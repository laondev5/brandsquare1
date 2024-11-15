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
import { CheckCircle, ChevronRight } from "lucide-react";
import Link from "next/link";
import { CartItem } from "@/app/utility/products";
import MainNav from "./MainNav";
import { useSession } from "next-auth/react";
import Footer from "./Footer";
import { GrTransaction } from "react-icons/gr";
import { FaMoneyBillWave, FaShippingFast, FaStoreAlt } from "react-icons/fa";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
            Welcome to the Brandsquare Vendor Hub
          </motion.h1>
          <motion.p
            className="text-md mb-8 max-w-[900px] mx-auto bg-white/30 backdrop-blur-lg rounded-lg p-8 shadow-xl"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            The Vendor Hub is an innovative platform designed to empower small business owners and startups to grow their e-commerce businesses with ease. We provide solutions for seamless payments in Naira, trusted partnerships with verified vendors, and flexible capital options to help you start selling with as little as 50% upfront. From shipping and warehousing to hassle-free payments and reliable vendor connections, the Vendor Hub is your one-stop solution for building a successful business without the stress. 

          </motion.p>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {session?.user?.role === "VENDOR" ? (
              <Link href="/vendor">
                <Button className="bg-yellow-400 text-black hover:bg-yellow-500 text-lg px-8 py-6">
                  Continue to dashboard
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link href="/auth/vendor-signup">
                <Button className="bg-yellow-400 text-black hover:bg-yellow-500 text-lg px-8 py-6">
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
          <span className="text-3xl    font-bold text-center">About Vendor Hub  </span>
        </motion.h1>
        <motion.div
          className="grid gap-4  md:grid-cols-2  xl:grid-cols-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {[
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
          ].map((feature, index) => (
            <motion.div  
              key={index}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.2 }}
            >
              <Card className=" md:max-h-[250px]  md:min-h-[250px]  xl:max-h-[330px]  xl:min-h-[330px]  transition-transform transform   md:hover:scale-105 hover:scale-[1.03]  hover:shadow-lg  text-center  md:text-left">
                <CardHeader>
                  <CardTitle className="flex  items-center  justify-center custom-md:justify-normal gap-2 text-[20px]">{feature.title} {feature.icon}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[15px] text-gray-700  leading-7 md:leading-8">{feature.content}</p>
            
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div></div>
<div className=" bg-slate-100  my-9 mb-32 pb-7 px-7">
<motion.div
          className="  my-20 mt-32"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <h2 className="text-3xl font-semibold pt-9 mb-6 text-center">
            Why Choose Brandsquare?
          </h2>
          <div className="grid max-w-[900px] mx-auto gap-4 md:grid-cols-2     place-content-center">
            {[
              "Simplified international transactions",
              "Warehousing and shipping support",
              "Instant web store setup",
              "Access to a large customer base",
              "Ongoing vendor education and support",
              "Flexible growth options for your business",
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6 + index * 0.1 }}
              >
                <CheckCircle className="text-green-500" />
                <span>{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          <h2 className="text-3xl font-semibold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-6">
            Join Brandsquare today and take your e-commerce business to the next
            level.
          </p>
          {session?.user?.role === "VENDOR" ? (
            <Link href="/vendor">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-500 text-lg px-8 py-6">
                Continue to dashboard
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Link href="/auth/vendor-signup">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-500 text-lg px-8 py-6">
                Become a vendor now
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          )}
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
                question: "What is the Brandsquare Vendor Hub?",
                answer:
                  "The Brandsquare Vendor Hub is a platform designed to help small business owners and startups sell their products through trusted partnerships with Chinese vendors. We provide solutions for seamless payments, capital assistance, shipping, and warehousing, making it easier for you to grow your business with less hassle.",
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
              },
              {
                question: "What if I don’t have enough capital to start my business?",
                answer:
                  "We understand that raising capital can be a challenge, so with Brandsquare, you can start with as low as 50% of the total cost of your goods. You can either complete the payment when the goods arrive at our warehouse or sell directly from our warehouse until you have the remaining balance to pick up your goods.",
              },
              {
                question: " Can I sell directly from the Brandsquare warehouse?",
                answer:
                  "Yes! If you don’t have the full capital to pick up your goods, you can sell them directly from our warehouse. Once you’ve generated enough sales, you can complete the payment and retrieve your goods.",
              },
              {
                question: "How do I know which Chinese vendors I can trust?",
                answer:
                  "We have a verified list of trusted Chinese vendors that we partner with. These vendors are carefully selected to ensure quality and reliability, giving you peace of mind when sourcing products for your business.",
              },
              {
                question: "What shipping options are available?",
                answer:
                  "Brandsquare offers flexible shipping options based on your needs. We handle the entire shipping process from China to Nigeria, ensuring your goods are safely transported. You can choose to store your goods in our warehouse until you’re ready to collect them or sell them directly from our warehouse.",
              },
              {
                question: "Do I need to pay for warehousing?",
                answer:
                  "Brandsquare provides affordable warehousing solutions for all vendors. If you choose to store your goods in our warehouse, we offer flexible terms that allow you to keep your products with us until you have the capital to pick them up or until you’re ready to sell them.",
              },
              {
                question: "How do I register as a vendor?",
                answer:
                  "Registering as a vendor is simple. Just visit our Vendor Hub page, click on 'Register Now,' and fill in the necessary details. Once you’re registered, you can start sourcing products, setting up your online store, and taking advantage of Brandsquare’s unique solutions for vendors.",
              },
              {
                question: " Can I attend the Brandsquare Vendor Seminar?",
                answer:
                  "Yes! We host regular seminars to help businesses and vendors understand how to grow their e-commerce business with Brandsquare. These seminars cover topics like payment solutions, sourcing reliable products, and using our platform to its fullest potential. Keep an eye on our website and social media for announcements.",
              },
              {
                question: "How does Brandsquare ensure product quality?",
                answer:
                  "We partner with trusted and verified Chinese vendors who are committed to delivering quality products. In addition, you have the option to inspect your goods when they arrive at our warehouse before completing the rest of your payment.",
              },
              {
                question: "Can I sell products from other countries besides China?",
                answer:
                  "Currently, Brandsquare focuses on partnerships with Chinese vendors to provide the best products at competitive prices. However, we are always looking to expand and will inform our vendors if other countries become available.",
              },
              {
                question: "How do I handle returns or faulty goods?",
                answer:
                  "If you receive faulty goods, Brandsquare will work with the vendor to resolve the issue. We have a streamlined returns process to ensure that any defective products are handled efficiently. Just contact our support team for assistance.",
              },
              {
                question: "What are the benefits of becoming a Brandsquare vendor?",
                answer:
                  `<div><h3 class=' font-semibold'>As a Brandsquare vendor, you benefit from:</h3>
                   <ul class='list-disc pl-5'>
                   <li class=' py-1'>Payment in Naira for Chinese products.</li>
                   <li class=' py-1'>Trusted and verified Chinese vendors.</li>
                   <li class=' py-1'>50% capital start-up option.</li>
                   <li class=' py-1'>Warehousing and shipping support.</li>
                   <li class=' py-1'>Access to a large customer base through our e-commerce platform</li>
                   <li class=' py-1'>Ongoing support and vendor education through our seminars and resources.</li>
                   </ul>
                  
                  </div>`,
              },
              {
                question: "Can I upgrade my vendor plan as my business grows?",
                answer:
                  "Absolutely! As your business grows, you can take advantage of more advanced vendor options and services from Brandsquare. Whether you need more storage, faster shipping, or enhanced product sourcing, we’re here to support your business at every stage.",
              },
               
            ].map((item, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer.includes('<') ? (<div dangerouslySetInnerHTML={{ __html: item.answer }} />) :  <span className=" text-[14px] text-gray-700">{item.answer}</span>}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div></div>

 
      <Footer />
    </div>
  );
}
