"use client";

import { useState } from "react";
import { motion } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";
// import Header from "../components/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
import {
  ChevronRight,
  ShoppingBag,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { CartItem } from "@/app/utility/products";
import MainNav from "./MainNav";
import Link from "next/link";

type Benefit = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

type Feature = {
  title: string;
  description: string;
};

const benefits: Benefit[] = [
  {
    icon: <ShoppingBag className="w-12 h-12 text-yellow-400" />,
    title: "Expand Your Reach",
    description: "Access millions of potential customers on our platform.",
  },
  {
    icon: <TrendingUp className="w-12 h-12 text-yellow-400" />,
    title: "Boost Your Sales",
    description: "Leverage our marketing tools to increase your revenue.",
  },
  {
    icon: <Users className="w-12 h-12 text-yellow-400" />,
    title: "Join a Community",
    description: "Connect with other vendors and share best practices.",
  },
  {
    icon: <Zap className="w-12 h-12 text-yellow-400" />,
    title: "Streamlined Operations",
    description: "Use our efficient tools for inventory and order management.",
  },
];

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

export default function VendorsHub() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* <Header
        cart={cart}
        setCart={setCart}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      /> */}

      <MainNav
        cart={cart}
        setCart={setCart}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <main className="container mx-auto p-4">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 h-[60vh] flex flex-col justify-center items-center"
        >
          <h1 className="text-4xl font-bold mb-4">
            Become a Brandsquare Vendor
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Join our thriving marketplace and grow your business
          </p>
          <Link href="/auth/vendor-signup">
            <Button className="bg-yellow-400 text-black hover:bg-yellow-500 text-lg px-8 py-6">
              Become a vendor now
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">
            Why Sell on Brandsquare?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card>
                  <CardHeader>
                    <div className="mb-4">{benefit.icon}</div>
                    <CardTitle>{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{benefit.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
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

        {/* <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-12"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Get Started?</CardTitle>
              <CardDescription>
                Fill out this form and we'll get back to you shortly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your Name" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="business-name">Business Name</Label>
                  <Input id="business-name" placeholder="Your Business Name" />
                </div>
                <div>
                  <Label htmlFor="message">Tell us about your products</Label>
                  <Textarea
                    id="message"
                    placeholder="Briefly describe the products you want to sell"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-yellow-400 text-black hover:bg-yellow-500"
                >
                  Submit Application
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.section> */}

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-4">
            Join Thousands of Successful Vendors
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Don't miss out on the opportunity to grow your business with
            Brandsquare
          </p>
          <Button className="bg-black text-white hover:bg-gray-800 text-lg px-8 py-6">
            Learn More About Selling on Brandsquare
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.section>
      </main>

      <footer className="bg-gray-800 text-white p-8 mt-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <ul className="space-y-2">
              <li>Our Story</li>
              <li>Careers</li>
              <li>Press</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Vendor Resources</h3>
            <ul className="space-y-2">
              <li>Seller Handbook</li>
              <li>Vendor FAQ</li>
              <li>Success Stories</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>Vendor Agreement</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <ul className="space-y-2">
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; 2023 Zeomart. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
