"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  //Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
//import { Textarea } from "@/components/ui/textarea";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PreOrder {
  id: number;
  name: string;
  description: string;
  price: number;
  status: "Pending" | "Active" | "Completed" | "Cancelled";
  imageUrl: string;
  startDate: string;
  endDate: string;
  targetQuantity: number;
  currentQuantity: number;
}

const initialPreOrders: PreOrder[] = [
  {
    id: 1,
    name: "Limited Edition Smartwatch",
    description: "Next-gen smartwatch with advanced health tracking features.",
    price: 299.99,
    status: "Active",
    imageUrl: "/placeholder.svg?height=100&width=100",
    startDate: "2023-06-01",
    endDate: "2023-07-15",
    targetQuantity: 1000,
    currentQuantity: 750,
  },
  {
    id: 2,
    name: "Eco-Friendly Water Bottle",
    description: "Reusable water bottle made from recycled materials.",
    price: 24.99,
    status: "Pending",
    imageUrl: "/placeholder.svg?height=100&width=100",
    startDate: "2023-07-01",
    endDate: "2023-08-15",
    targetQuantity: 5000,
    currentQuantity: 0,
  },
  {
    id: 3,
    name: "Wireless Noise-Cancelling Headphones",
    description:
      "Premium headphones with advanced noise-cancelling technology.",
    price: 199.99,
    status: "Completed",
    imageUrl: "/placeholder.svg?height=100&width=100",
    startDate: "2023-05-01",
    endDate: "2023-06-15",
    targetQuantity: 2000,
    currentQuantity: 2000,
  },
];

export default function PreOrdersPage() {
  const [preOrders, setPreOrders] = useState<PreOrder[]>(initialPreOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddPreOrderOpen, setIsAddPreOrderOpen] = useState(false);
  const [newPreOrder, setNewPreOrder] = useState<Partial<PreOrder>>({
    name: "",
    description: "",
    price: 0,
    status: "Pending",
    imageUrl: "",
    startDate: "",
    endDate: "",
    targetQuantity: 0,
    currentQuantity: 0,
  });
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = newPreOrder.description || "";
    }
  }, [newPreOrder.description]);

  const filteredPreOrders = preOrders.filter(
    (preOrder) =>
      preOrder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      preOrder.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPreOrder = () => {
    const preOrderToAdd = {
      ...newPreOrder,
      id: preOrders.length + 1,
      description: editorRef.current?.innerHTML || "",
    } as PreOrder;
    setPreOrders([...preOrders, preOrderToAdd]);
    setIsAddPreOrderOpen(false);
    setNewPreOrder({
      name: "",
      description: "",
      price: 0,
      status: "Pending",
      imageUrl: "",
      startDate: "",
      endDate: "",
      targetQuantity: 0,
      currentQuantity: 0,
    });
  };

  const handleDeletePreOrder = (id: number) => {
    setPreOrders(preOrders.filter((preOrder) => preOrder.id !== id));
  };

  const execCommand = (
    command: string,
    value: string | undefined = undefined
  ) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setNewPreOrder((prev) => ({
        ...prev,
        description: editorRef.current?.innerHTML || "",
      }));
    }
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-semibold">Pre-Orders</h1>
        <p>
          Get ahead by managing upcoming orders before they even arrive. Prepare
          for what’s next.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex justify-between items-center"
      >
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search pre-orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
        <Dialog open={isAddPreOrderOpen} onOpenChange={setIsAddPreOrderOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Pre-Order
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Pre-Order</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new pre-order campaign.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddPreOrder();
              }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={newPreOrder.name}
                  onChange={(e) =>
                    setNewPreOrder({ ...newPreOrder, name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  value={newPreOrder.price}
                  onChange={(e) =>
                    setNewPreOrder({
                      ...newPreOrder,
                      price: parseFloat(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Card>
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => execCommand("bold")}
                      >
                        <Bold size={18} />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => execCommand("italic")}
                      >
                        <Italic size={18} />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => execCommand("underline")}
                      >
                        <Underline size={18} />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => execCommand("insertUnorderedList")}
                      >
                        <List size={18} />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => execCommand("insertOrderedList")}
                      >
                        <ListOrdered size={18} />
                      </Button>
                    </div>
                    <div
                      ref={editorRef}
                      contentEditable
                      className="min-h-[200px] border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onInput={() =>
                        setNewPreOrder((prev) => ({
                          ...prev,
                          description: editorRef.current?.innerHTML || "",
                        }))
                      }
                    />
                  </CardContent>
                </Card>
              </div>
              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  value={newPreOrder.imageUrl}
                  onChange={(e) =>
                    setNewPreOrder({ ...newPreOrder, imageUrl: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={newPreOrder.status}
                  onValueChange={(
                    value: "Pending" | "Active" | "Completed" | "Cancelled"
                  ) => setNewPreOrder({ ...newPreOrder, status: value })}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={newPreOrder.startDate}
                  onChange={(e) =>
                    setNewPreOrder({
                      ...newPreOrder,
                      startDate: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={newPreOrder.endDate}
                  onChange={(e) =>
                    setNewPreOrder({ ...newPreOrder, endDate: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="targetQuantity">Target Quantity</Label>
                <Input
                  id="targetQuantity"
                  type="number"
                  value={newPreOrder.targetQuantity}
                  onChange={(e) =>
                    setNewPreOrder({
                      ...newPreOrder,
                      targetQuantity: parseInt(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <Button type="submit">Create Pre-Order</Button>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPreOrders.map((preOrder) => (
              <TableRow key={preOrder.id}>
                <TableCell>
                  <img
                    src={preOrder.imageUrl}
                    alt={preOrder.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                </TableCell>
                <TableCell className="font-medium">{preOrder.name}</TableCell>
                <TableCell>₦{preOrder.price.toFixed(2)}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      preOrder.status === "Active"
                        ? "bg-green-200 text-green-800"
                        : preOrder.status === "Pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : preOrder.status === "Completed"
                        ? "bg-blue-200 text-blue-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {preOrder.status}
                  </span>
                </TableCell>
                <TableCell>{preOrder.startDate}</TableCell>
                <TableCell>{preOrder.endDate}</TableCell>
                <TableCell>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{
                        width: `${
                          (preOrder.currentQuantity / preOrder.targetQuantity) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">
                    {preOrder.currentQuantity} / {preOrder.targetQuantity}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeletePreOrder(preOrder.id)}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
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
