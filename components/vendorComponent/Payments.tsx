"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  ChevronDown,
  DollarSign,
  CreditCard,
  Wallet,
} from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for payments
const initialPayments = [
  {
    id: 1,
    date: "2023-05-01",
    amount: 1299.99,
    status: "Completed",
    method: "Credit Card",
  },
  {
    id: 2,
    date: "2023-05-02",
    amount: 799.5,
    status: "Pending",
    method: "PayPal",
  },
  {
    id: 3,
    date: "2023-05-03",
    amount: 2499.99,
    status: "Completed",
    method: "Bank Transfer",
  },
  {
    id: 4,
    date: "2023-05-04",
    amount: 599.99,
    status: "Failed",
    method: "Credit Card",
  },
  {
    id: 5,
    date: "2023-05-05",
    amount: 1799.99,
    status: "Completed",
    method: "PayPal",
  },
];

export default function Payments() {
  const [payments] = useState(initialPayments);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredPayments = payments
    .filter(
      (payment) =>
        payment.id.toString().includes(searchTerm) ||
        payment.amount.toString().includes(searchTerm) ||
        payment.method.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (payment) => statusFilter === "All" || payment.status === statusFilter
    );

  const totalRevenue = payments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );
  const pendingAmount = payments
    .filter((payment) => payment.status === "Pending")
    .reduce((sum, payment) => sum + payment.amount, 0);
  const completedPayments = payments.filter(
    (payment) => payment.status === "Completed"
  ).length;

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-semibold">Payment Management</h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Amount
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${pendingAmount.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Payments
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedPayments}</div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Tabs defaultValue="all-payments">
          <TabsList>
            <TabsTrigger value="all-payments">All Payments</TabsTrigger>
            <TabsTrigger value="payout-settings">Payout Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="all-payments">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center space-x-4 mb-4">
                  <div className="flex-1 flex items-center space-x-2">
                    <Input
                      placeholder="Search payments..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="max-w-sm"
                      startIcon={<Search className="w-4 h-4 text-gray-400" />}
                    />
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Statuses</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button>
                    <Filter className="w-4 h-4 mr-2" />
                    Advanced Filters
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.id}</TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>${payment.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              payment.status === "Completed"
                                ? "bg-green-200 text-green-800"
                                : payment.status === "Pending"
                                ? "bg-yellow-200 text-yellow-800"
                                : "bg-red-200 text-red-800"
                            }`}
                          >
                            {payment.status}
                          </span>
                        </TableCell>
                        <TableCell>{payment.method}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                Actions <ChevronDown className="ml-2 h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>
                                Download Receipt
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                Contact Support
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="payout-settings">
            <Card>
              <CardHeader>
                <CardTitle>Payout Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="payoutMethod"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Payout Method
                    </label>
                    <Select>
                      <SelectTrigger id="payoutMethod">
                        <SelectValue placeholder="Select payout method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bankTransfer">
                          Bank Transfer
                        </SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="check">Check</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label
                      htmlFor="payoutFrequency"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Payout Frequency
                    </label>
                    <Select>
                      <SelectTrigger id="payoutFrequency">
                        <SelectValue placeholder="Select payout frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="biweekly">Bi-weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label
                      htmlFor="minimumPayout"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Minimum Payout Amount
                    </label>
                    <Input
                      id="minimumPayout"
                      type="number"
                      placeholder="Enter minimum payout amount"
                    />
                  </div>
                  <Button type="submit">Save Payout Settings</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
