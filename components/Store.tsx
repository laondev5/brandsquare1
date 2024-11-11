"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Globe,
  AlertCircle,
} from "lucide-react";

interface Vendor {
  id: string;
  brandName: string;
  brandDescription: string;
  logo: string;
  bannerImage: string;
  businessCategory: string;
  city: string;
  state: string;
  socialMedia: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

const vendors: Vendor[] = [
  {
    id: "1",
    brandName: "Tech Innovators",
    brandDescription:
      "Cutting-edge technology solutions for modern businesses.",
    logo: "/placeholder.svg?height=100&width=100",
    bannerImage: "/placeholder.svg?height=200&width=400",
    businessCategory: "Technology",
    city: "San Francisco",
    state: "CA",
    socialMedia: {
      website: "https://techinnovators.com",
      linkedin: "https://linkedin.com/company/techinnovators",
    },
  },
  {
    id: "2",
    brandName: "Green Earth Organics",
    brandDescription:
      "Sustainable and organic products for eco-conscious consumers.",
    logo: "/placeholder.svg?height=100&width=100",
    bannerImage: "/placeholder.svg?height=200&width=400",
    businessCategory: "Food & Beverage",
    city: "Portland",
    state: "OR",
    socialMedia: {
      instagram: "https://instagram.com/greenearthorganics",
      facebook: "https://facebook.com/greenearthorganics",
    },
  },
  {
    id: "3",
    brandName: "Urban Threads",
    brandDescription: "Trendy and sustainable fashion for the modern urbanite.",
    logo: "/placeholder.svg?height=100&width=100",
    bannerImage: "/placeholder.svg?height=200&width=400",
    businessCategory: "Retail",
    city: "New York",
    state: "NY",
    socialMedia: {
      instagram: "https://instagram.com/urbanthreads",
      twitter: "https://twitter.com/urbanthreads",
    },
  },
  {
    id: "4",
    brandName: "Fitness First",
    brandDescription: "Premium fitness equipment and wellness products.",
    logo: "/placeholder.svg?height=100&width=100",
    bannerImage: "/placeholder.svg?height=200&width=400",
    businessCategory: "Health & Fitness",
    city: "Los Angeles",
    state: "CA",
    socialMedia: {
      instagram: "https://instagram.com/fitnessfirst",
      facebook: "https://facebook.com/fitnessfirst",
    },
  },
  {
    id: "5",
    brandName: "Gourmet Delights",
    brandDescription: "Exquisite artisanal foods and gourmet ingredients.",
    logo: "/placeholder.svg?height=100&width=100",
    bannerImage: "/placeholder.svg?height=200&width=400",
    businessCategory: "Food & Beverage",
    city: "Chicago",
    state: "IL",
    socialMedia: {
      website: "https://gourmetdelights.com",
      instagram: "https://instagram.com/gourmetdelights",
    },
  },
  {
    id: "6",
    brandName: "EcoHome Solutions",
    brandDescription: "Sustainable and eco-friendly home improvement products.",
    logo: "/placeholder.svg?height=100&width=100",
    bannerImage: "/placeholder.svg?height=200&width=400",
    businessCategory: "Home & Garden",
    city: "Seattle",
    state: "WA",
    socialMedia: {
      website: "https://ecohomesolutions.com",
      facebook: "https://facebook.com/ecohomesolutions",
    },
  },
  {
    id: "7",
    brandName: "Pet Paradise",
    brandDescription:
      "Premium pet supplies and accessories for your furry friends.",
    logo: "/placeholder.svg?height=100&width=100",
    bannerImage: "/placeholder.svg?height=200&width=400",
    businessCategory: "Pets",
    city: "Austin",
    state: "TX",
    socialMedia: {
      instagram: "https://instagram.com/petparadise",
      twitter: "https://twitter.com/petparadise",
    },
  },
];

const categories = [
  "All",
  "Technology",
  "Food & Beverage",
  "Retail",
  "Health & Fitness",
  "Home & Garden",
  "Pets",
];

export default function StorePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>(vendors);
  const vendorsPerPage = 6;

  useEffect(() => {
    const filtered = vendors.filter(
      (vendor) =>
        (vendor.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vendor.businessCategory
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          `${vendor.city}, ${vendor.state}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) &&
        (selectedCategory === "All" ||
          vendor.businessCategory === selectedCategory)
    );
    setFilteredVendors(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const indexOfLastVendor = currentPage * vendorsPerPage;
  const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage;
  const currentVendors = filteredVendors.slice(
    indexOfFirstVendor,
    indexOfLastVendor
  );

  const pageCount = Math.ceil(filteredVendors.length / vendorsPerPage);

  return (
    <div className="container mx-auto px-4 py-8">
      <div
        className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-8"
        role="alert"
      >
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-blue-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm">
              Welcome to our vendor showcase! Discover unique products and
              services from our curated selection of brands.
            </p>
          </div>
        </div>
      </div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Brandsquare Vendors</h1>
        <p className="text-gray-600 mt-2">
          Explore our diverse community of innovative brands
        </p>
      </div>
      <div className="mb-6 flex flex-col sm:flex-row justify-center items-center gap-4">
        <Input
          type="text"
          placeholder="Search vendors"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentVendors.map((vendor) => (
          <Card key={vendor.id} className="flex flex-col">
            <div className="relative h-48 w-full">
              <img
                src={vendor.bannerImage}
                alt={`${vendor.brandName} banner`}
                className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
              />
            </div>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={vendor.logo} alt={vendor.brandName} />
                  <AvatarFallback>
                    {vendor.brandName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl">{vendor.brandName}</CardTitle>
                  <p className="text-sm text-gray-500">
                    {vendor.businessCategory}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-gray-700">{vendor.brandDescription}</p>
              <p className="text-sm text-gray-500 mt-2">{`${vendor.city}, ${vendor.state}`}</p>
            </CardContent>
            <CardFooter className="flex justify-start space-x-2">
              {vendor.socialMedia.instagram && (
                <a
                  href={vendor.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                </a>
              )}
              {vendor.socialMedia.facebook && (
                <a
                  href={vendor.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                </a>
              )}
              {vendor.socialMedia.twitter && (
                <a
                  href={vendor.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                </a>
              )}
              {vendor.socialMedia.linkedin && (
                <a
                  href={vendor.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                </a>
              )}
              {vendor.socialMedia.website && (
                <a
                  href={vendor.socialMedia.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                </a>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
      {pageCount > 1 && (
        <div className="mt-8 flex justify-center items-center space-x-2">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {pageCount}
          </span>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, pageCount))
            }
            disabled={currentPage === pageCount}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
