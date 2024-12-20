'use client';
import MainNav from "./MainNav";
import Footer from "./Footer";
import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import { CartItem } from "@/app/utility/products";
import Help from '../public/images/help.png'
import { Button } from "./ui/button";
import { VscRobot } from "react-icons/vsc";
import EmailModal from './emailModal'  ;
import ChatModal from './chatModal'  ;

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
import Image from "next/image";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { MdMailOutline, MdOutlineAddIcCall } from "react-icons/md";

 const help = () => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
   const [emailModal, setEmailModal] = useState(false);
   const [chatModal, setChatModal] = useState(false);
    useEffect(() => {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    }, []);
  
   return (
    <div className="min-h-screen flex flex-col"> 
    <MainNav
        cart={cart}
        setCart={setCart}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
{ emailModal && <EmailModal setEmailModal={setEmailModal}  />}
{ chatModal && <ChatModal setChatModal={setChatModal}  />}
 
      <div className="container mx-auto px-5">
        <motion.div className="header my-4   mt-16 lg:mt-10 " initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
             <h1 className=" font-bold">Help Center</h1>
             <div className="flex items-center gap-1">
             <p className=" text-2xl font-extrabold">Hi, how can we help you</p> <Image width={30} height={30} className="max-w-[100px]" src={Help} alt="help" />
             </div>
        </motion.div>

<div className="flex lg:flex-row flex-col-reverse gap-7  mt-14 lg:mt-20 mb-32 lg:items-start items-center justify-center">
    <motion.div  initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }} className="bg-white border shadow-md  w-full  lg:mt-0 mt-16 lg:max-w-[400px] flex-grow rounded-md ">
    <h3 className=" font-semibold text-xl py-4 text-center">Talk to agents</h3>
    <div className="bg-slate-50 mx-3 my-3 p-5">
    <IoChatboxEllipsesOutline className=" text-2xl" />
        <span className=" text-[15px] font-extralight ">Chat with Our Customer Care Personnel to Get your Issues Rectified</span>
        <Button onClick={() => setChatModal(true)} className="w-full font-semibold bg-yellow-400 text-black hover:bg-yellow-500">
                       Live Chat
                      </Button>
    </div>
    <div className="bg-slate-50 mx-3 my-3 p-5">
    <MdOutlineAddIcCall className=" text-2xl" />
        <span className=" text-[15px] font-extralight ">  Reach out to us directly for immediate assistance. Our team is available to help with your queries and concerns.</span>
        <Button className="w-full font-semibold bg-[#000035] hover:bg-[#000035cc] text-white">
        <a href="tel:+1234567890">

                       Give Us a Call
                       </a>
                      </Button>
    </div>
    <div className="bg-slate-50 mx-3 my-3 p-5">
    <MdMailOutline className=" text-2xl" />
        <span className=" text-[15px] font-extralight ">Have detailed inquiries? Send us an email, and we’ll get back to you as soon as possible.</span>
        <Button onClick={() => setEmailModal(true)} className="w-full font-semibold bg-yellow-400   hover:bg-yellow-500 text-black">
                       Send A Mail
                      </Button>
    </div>
    <div className="bg-slate-50 mx-3 my-3 p-5">
    <VscRobot className=" text-2xl" />
        <span className=" text-[15px] font-extralight ">Get quick, automated responses to your questions through our AI assistant, available 24/7 for your convenience.</span>
        <Button className="w-full font-semibold text-white bg-[#000035] hover:bg-[#000035cc]">
        Chat with AI
                      </Button>
    </div>
    </motion.div>
 

        <motion.div
          className=" border  w-full lg:max-w-[900px]  shadow-md  flex-grow rounded-md p-6"
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
                question: "How do I know the best supplier I can trust?",
                answer:
                  "We have a verified list of trusted suppliers we partner with. These suppliers are carefully selected to ensure quality and reliability, giving you peace of mind when sourcing products for your business.",
              },
              {
                question: "What shipping options are available?",
                answer:
                  "We offers flexible shipping options based on your needs. We handle the entire shipping process from other countries to Nigeria, ensuring your goods are safely transported. We also offer local shipping to your customers. You can choose to store your goods in our warehouse until you’re ready to collect them or sell them directly from our warehouse.",
              },
              {
                question: "Do I need to pay for warehousing?",
                answer:
                  "No, we are not charging you for wearhousing for the first month of your goods arrival, after one month, you will be required to pay minimum of one thousand naira weekly depending on the quantity of your goods.",
              },
              {
                question: "How do I register as a vendor?",
                answer:
                  "To register as a vendor is simple. Just click on the Vendors Hub button on the menu bar and follow the simple steps. Once you’re registered, you can start sourcing products, setting up your online store, and explore the Brandsquare’s unique solutions for vendors.",
              },
              {
                question: " Can I attend the Brandsquare Vendors Seminar?",
                answer:
                  "Yes! We host regular seminars to help businesses and vendors understand how to grow their e-commerce business with Brandsquare. These seminars cover topics like payment solutions, sourcing reliable products, and using our platform to its fullest potential. Keep an eye on our website and social media for announcements.",
              },
              {
                question: "How does Brandsquare ensure product quality?",
                answer:
                  "We partner with trusted and verified suppliers who are committed to delivering quality products. In addition, you have the option to inspect your goods when they arrive at our warehouse before completing your payment.",
              },
              {
                question: "Can I sell products from other countries besides China?",
                answer:
                  "Yes, Brandsquare focuses on partnerships with suppliers from different countries to provide the best products at competitive prices.",
              },
              {
                question: "How do I handle returns or faulty goods?",
                answer:
                  "For damaged or faulty goods, We have a streamlined returns policy to ensure that any defective products are handled efficiently. Just contact our support team for assistance.",
              },
              {
                question: "What are the benefits of becoming a Brandsquare vendor?",
                answer:
                  `<div><h3 class=' font-semibold'>As a vendor, you benefit from:</h3>
                   <ul class='list-disc pl-5'>
                   <li class=' py-1'>Seamless product advertising
</li>
                   <li class=' py-1'>Your own customised online store
</li>
                   <li class=' py-1'>You only get to pay 50% capital to start your business
</li>
                   <li class=' py-1'>Warehousing and shipping support.</li>
                   <li class=' py-1'>Access to a large customer base through our e-commerce platform
</li>
                   <li class=' py-1'>24/7 support
</li>
                   <li class=' py-1'>Free access to all brandsquare events
</li>
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
        </div>
        </div>

        <Footer />
    </div>
  )
}

export default help