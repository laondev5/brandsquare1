"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import MainNav from "./MainNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  //PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Footer from "./Footer";
import { CartItem } from "@/app/utility/products";

const blogPosts = [
  {
    id: 1,
    title: "The Future of E-commerce",
    excerpt:
      "Explore the latest trends and technologies shaping the future of online shopping.",
    image: "/placeholder.svg?height=200&width=400&text=E-commerce+Future",
    date: "2023-05-15",
  },
  {
    id: 2,
    title: "Sustainable Shopping: A Guide",
    excerpt:
      "Learn how to make environmentally conscious choices while shopping online.",
    image: "/placeholder.svg?height=200&width=400&text=Sustainable+Shopping",
    date: "2023-05-10",
  },
  {
    id: 3,
    title: "Maximizing Your Online Shopping Experience",
    excerpt:
      "Tips and tricks to get the most out of your online shopping adventures.",
    image: "/placeholder.svg?height=200&width=400&text=Online+Shopping+Tips",
    date: "2023-05-05",
  },
  {
    id: 4,
    title: "The Rise of Mobile Commerce",
    excerpt:
      "How smartphones are changing the way we shop and what it means for businesses.",
    image: "/placeholder.svg?height=200&width=400&text=Mobile+Commerce",
    date: "2023-04-30",
  },
  {
    id: 5,
    title: "Cybersecurity in E-commerce",
    excerpt:
      "Protecting your personal information while shopping online: Best practices and tips.",
    image: "/placeholder.svg?height=200&width=400&text=E-commerce+Security",
    date: "2023-04-25",
  },
  {
    id: 6,
    title: "The Psychology of Online Shopping",
    excerpt:
      "Understanding consumer behavior and decision-making in the digital marketplace.",
    image:
      "/placeholder.svg?height=200&width=400&text=Online+Shopping+Psychology",
    date: "2023-04-20",
  },
  {
    id: 7,
    title: "Navigating Customer Service in E-commerce",
    excerpt:
      "Best practices for providing excellent customer support in online retail.",
    image:
      "/placeholder.svg?height=200&width=400&text=E-commerce+Customer+Service",
    date: "2023-04-15",
  },
  {
    id: 8,
    title: "The Impact of AI on Online Shopping",
    excerpt:
      "How artificial intelligence is revolutionizing the e-commerce industry.",
    image: "/placeholder.svg?height=200&width=400&text=AI+in+E-commerce",
    date: "2023-04-10",
  },
  {
    id: 9,
    title: "Building Brand Loyalty in E-commerce",
    excerpt:
      "Strategies for creating lasting relationships with online customers.",
    image:
      "/placeholder.svg?height=200&width=400&text=E-commerce+Brand+Loyalty",
    date: "2023-04-05",
  },
  {
    id: 10,
    title: "The Future of Payment Technologies",
    excerpt:
      "Exploring emerging payment methods and their impact on online shopping.",
    image: "/placeholder.svg?height=200&width=400&text=Future+Payment+Tech",
    date: "2023-03-31",
  },
];

export default function Blog() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    const filtered = blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
    setCurrentPage(1);
  }, [searchTerm]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div className="min-h-screen bg-gray-100">
      <MainNav
        cart={cart}
        setCart={setCart}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <main className="container mx-auto p-4">
        {/* <motion.h1
          className="text-3xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Zeomart Blog
        </motion.h1> */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Input
            type="text"
            placeholder="Search blog posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-96"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <Card className="h-full flex flex-col">
                <CardContent className="p-4 flex-grow">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover mb-4 rounded"
                  />
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-600 mb-2 text-sm">
                    {new Date(post.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 mb-4">{post.excerpt}</p>
                  <Link href={`/blog/${post.id}`} passHref>
                    <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500">
                      Read More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredPosts.length > postsPerPage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </motion.div>
        )}
      </main>
      <Footer />
    </div>
  );
}
