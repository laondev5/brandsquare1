"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChatButton from "./chatButton";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { useSession } from "next-auth/react";
import MainNav from "./MainNav";
import Footer from "./Footer";
import { CartItem } from "@/app/utility/products";
import { ChevronRight } from "lucide-react";

export default function AboutUs() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

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
          className="absolute inset-0 bg-gradient-to-br from-yellow-200 via-pink-200 to-blue-200"
          animate={{
            background: [
              "linear-gradient(to bottom right, #fef08a, #fecaca, #bfdbfe)",
              "linear-gradient(to bottom right, #bfdbfe, #fef08a, #fecaca)",
              "linear-gradient(to bottom right, #fecaca, #bfdbfe, #fef08a)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />
        <div className="relative z-10 container mx-auto px-4 py-24 text-center">
          <motion.h1
            className="text-5xl font-bold mb-6"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            About Brandsquare Vendor Hub
          </motion.h1>
          <motion.p
            className="text-xl mb-8"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Empowering small businesses and startups to thrive in e-commerce
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
                <Button
                  size="lg"
                  className="bg-yellow-400 text-black hover:bg-yellow-500"
                >
                  Join Brandsquare Today
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-16">
        <motion.div
          className="grid gap-8 md:grid-cols-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                The Vendor Hub is an innovative platform designed to empower
                small business owners and startups to grow their e-commerce
                businesses with ease. We provide solutions for seamless payments
                in Naira, trusted partnerships with verified vendors, and
                flexible capital options to help you start selling with as
                little as 50% upfront.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>What We Offer</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Seamless payments in Naira</li>
                <li>Trusted partnerships with verified Chinese vendors</li>
                <li>Flexible capital options (start with 50% upfront)</li>
                <li>Shipping and warehousing solutions</li>
                <li>Instant web store setup</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="mt-16"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <h2 className="text-3xl font-semibold mb-6">
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
                question: "How does the 50% capital option work?",
                answer:
                  "When you choose the 50% capital option, you make a partial payment for your goods. Brandsquare handles the shipping and warehousing. Once your goods arrive, you can either pay the remaining amount to collect them or start selling directly from our warehouse, allowing you to generate revenue before completing the full payment.",
              },
            ].map((item, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
