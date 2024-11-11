"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for customers
const initialCustomers = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    orders: 5,
    totalSpent: 499.95,
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    orders: 3,
    totalSpent: 299.97,
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    orders: 7,
    totalSpent: 749.93,
  },
  {
    id: 4,
    name: "Diana Ross",
    email: "diana@example.com",
    orders: 2,
    totalSpent: 199.98,
  },
  {
    id: 5,
    name: "Edward Norton",
    email: "edward@example.com",
    orders: 4,
    totalSpent: 399.96,
  },
];

export default function Customers() {
  const [customers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-semibold">Customer Management</h1>
        <p>
          Here’s where you can see who your customers are. Get to know them
          better and build stronger relationships.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex justify-between items-center space-x-4"
      >
        <div className="flex-1 flex items-center space-x-2">
          <Input
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
            startIcon={<Search className="w-4 h-4 text-gray-400" />}
          />
        </div>
        <Button>
          <Filter className="w-4 h-4 mr-2" />
          Advanced Filters
        </Button>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.orders}</TableCell>
                <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        Actions <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                      <DropdownMenuItem>Send Email</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
}
