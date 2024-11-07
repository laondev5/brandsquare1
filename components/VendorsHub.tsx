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
            className="text-5xl font-bold mb-6"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Welcome to the Brandsquare Vendor Hub
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
                <Button className="bg-yellow-400 text-black hover:bg-yellow-500 text-lg px-8 py-6">
                  Become a vendor now
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-16">
        <motion.div
          className="grid gap-8 md:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {[
            {
              title: "Seamless Payments",
              content:
                "Pay for Chinese products in Naira, eliminating currency conversion hassles.",
            },
            {
              title: "Trusted Partnerships",
              content:
                "Access a network of verified Chinese vendors for quality products.",
            },
            {
              title: "Flexible Capital",
              content: "Start selling with as little as 50% upfront payment.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{feature.content}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <h2 className="text-3xl font-semibold mb-6 text-center">
            Why Choose Brandsquare?
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
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
      </div>

      <Footer />
    </div>
  );
}
