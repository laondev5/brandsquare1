"use client";

import { motion } from "framer-motion";
import { Rocket, RotateCcw, ShieldCheck, HeadphonesIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: <Rocket className="w-8 h-8 text-yellow-400" />,
    title: "Free Delivery",
    description: "For all orders over $99",
  },
  {
    icon: <RotateCcw className="w-8 h-8 text-yellow-400" />,
    title: "90 Days Return",
    description: "If goods have problems",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-yellow-400" />,
    title: "Secure Payment",
    description: "100% secure payment",
  },
  {
    icon: <HeadphonesIcon className="w-8 h-8 text-yellow-400" />,
    title: "24/7 Support",
    description: "Dedicated support",
  },
];

export default function ServiceOfferings() {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
