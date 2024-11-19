"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ChevronDown, ChevronUp } from "lucide-react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for orders
const initialOrders = [
  {
    id: 1,
    customer: "John Doe",
    date: "2023-05-01",
    total: 99.99,
    status: "Pending",
  },
  {
    id: 2,
    customer: "Jane Smith",
    date: "2023-05-02",
    total: 149.99,
    status: "Shipped",
  },
  {
    id: 3,
    customer: "Bob Johnson",
    date: "2023-05-03",
    total: 79.99,
    status: "Delivered",
  },
  {
    id: 4,
    customer: "Alice Brown",
    date: "2023-05-04",
    total: 199.99,
    status: "Pending",
  },
  {
    id: 5,
    customer: "Charlie Davis",
    date: "2023-05-05",
    total: 129.99,
    status: "Shipped",
  },
];

export default function Orders() {
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const filteredOrders = orders
    .filter(
      (order) =>
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toString().includes(searchTerm)
    )
    .filter((order) => statusFilter === "All" || order.status === statusFilter);

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortConfig.key === null) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
    return 0;
  });

  //   const requestSort = (keykey: string) => {
  //     let direction = "ascending";
  //     if (sortConfig.key === key && sortConfig.direction === "ascending") {
  //       direction = "descending";
  //     }
  //     setSortConfig({ key, direction });
  //   };

  const requestSort = (key: string | any) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  //   const updateOrderStatus = (orderId, newStatus) => {
  //     setOrders(
  //       orders.map((order) =>
  //         order.id === orderId ? { ...order, status: newStatus } : order
  //       )
  //     );
  //   };

  const updateOrderStatus = (orderId: number, newStatus: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-semibold">Order Management</h1>
        <p>
          Stay on top of all your customer orders. From new orders to fulfilled
          ones, this is where you track it all.
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
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
            startIcon={<Search className="w-4 h-4 text-gray-400" />}
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Shipped">Shipped</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
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
              <TableHead className="w-[100px]">
                <Button variant="ghost" onClick={() => requestSort("id")}>
                  Order ID
                  {sortConfig.key === "id" &&
                    (sortConfig.direction === "ascending" ? (
                      <ChevronUp className="ml-2 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-2 h-4 w-4" />
                    ))}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => requestSort("customer")}>
                  Customer
                  {sortConfig.key === "customer" &&
                    (sortConfig.direction === "ascending" ? (
                      <ChevronUp className="ml-2 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-2 h-4 w-4" />
                    ))}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => requestSort("date")}>
                  Date
                  {sortConfig.key === "date" &&
                    (sortConfig.direction === "ascending" ? (
                      <ChevronUp className="ml-2 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-2 h-4 w-4" />
                    ))}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => requestSort("total")}>
                  Total
                  {sortConfig.key === "total" &&
                    (sortConfig.direction === "ascending" ? (
                      <ChevronUp className="ml-2 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-2 h-4 w-4" />
                    ))}
                </Button>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>₦{order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      order.status === "Pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : order.status === "Shipped"
                        ? "bg-blue-200 text-blue-800"
                        : "bg-green-200 text-green-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        Actions <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => updateOrderStatus(order.id, "Pending")}
                      >
                        Mark as Pending
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => updateOrderStatus(order.id, "Shipped")}
                      >
                        Mark as Shipped
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => updateOrderStatus(order.id, "Delivered")}
                      >
                        Mark as Delivered
                      </DropdownMenuItem>
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
