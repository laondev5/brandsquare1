"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
//import { toast } from "@/components/ui/use-toast";
import { toast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
//import { Checkbox } from "@/components/ui/checkbox";
type InventoryStatus =
  | "In Stock"
  | "Out of Stock"
  | "Pre-Order"
  | "Low Stock"
  | "Discontinued";
interface InventoryItem {
  id: number;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  category: string;
  vendor: string;
  addedBy: "Admin" | "Vendor";
  status: InventoryStatus;
  preOrderQuantity?: number;
  preOrderArrivalDate?: string;
  returnPolicy: string;
  createdAt: string;
}

const initialInventory: InventoryItem[] = [
  {
    id: 1,
    name: "Smartphone X",
    sku: "SMX001",
    quantity: 100,
    price: 999.99,
    category: "Electronics",
    vendor: "TechCorp",
    addedBy: "Admin",
    status: "In Stock",
    returnPolicy: "30 days return, 15% restocking fee",
    createdAt: "2023-07-01",
  },
  {
    id: 2,
    name: "Organic Coffee Beans",
    sku: "OCB002",
    quantity: 500,
    price: 14.99,
    category: "Food & Beverage",
    vendor: "Green Farms",
    addedBy: "Vendor",
    status: "In Stock",
    returnPolicy: "No returns on food items",
    createdAt: "2023-07-02",
  },
  {
    id: 3,
    name: "Yoga Mat",
    sku: "YM003",
    quantity: 0,
    price: 29.99,
    category: "Sports & Fitness",
    vendor: "Zen Gear",
    addedBy: "Vendor",
    status: "Pre-Order",
    preOrderQuantity: 200,
    preOrderArrivalDate: "2023-08-15",
    returnPolicy: "14 days return, free shipping",
    createdAt: "2023-07-03",
  },
];

export default function AdminInventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [newItem, setNewItem] = useState<
    Omit<InventoryItem, "id" | "createdAt">
  >({
    name: "",
    sku: "",
    quantity: 0,
    price: 0,
    category: "",
    vendor: "",
    addedBy: "Admin",
    status: "In Stock",
    returnPolicy: "",
  });

  const handleAddItem = () => {
    const item: InventoryItem = {
      ...newItem,
      id: inventory.length + 1,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setInventory([...inventory, item]);
    setIsDialogOpen(false);
    setNewItem({
      name: "",
      sku: "",
      quantity: 0,
      price: 0,
      category: "",
      vendor: "",
      addedBy: "Admin",
      status: "In Stock",
      returnPolicy: "",
    });
    toast({
      title: "Inventory Item Added",
      description: `${item.name} has been successfully added to inventory.`,
    });
  };

  const handleEditItem = (item: InventoryItem) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleUpdateItem = () => {
    if (editingItem) {
      setInventory(
        inventory.map((item) =>
          item.id === editingItem.id ? editingItem : item
        )
      );
      setIsDialogOpen(false);
      setEditingItem(null);
      toast({
        title: "Inventory Item Updated",
        description: `${editingItem.name} has been successfully updated.`,
      });
    }
  };

  const handleDeleteItem = (id: number) => {
    setInventory(inventory.filter((item) => item.id !== id));
    toast({
      title: "Inventory Item Deleted",
      description: "The item has been successfully removed from inventory.",
      variant: "destructive",
    });
  };

  //   const handleTogglePreOrder = (id: number) => {
  //     setInventory(
  //       inventory.map((item) => {
  //         if (item.id === id) {
  //           const newStatus =
  //             item.status === "Pre-Order" ? "Out of Stock" : "Pre-Order";
  //           const updatedItem = {
  //             ...item,
  //             status: newStatus,
  //             preOrderQuantity: newStatus === "Pre-Order" ? 0 : undefined,
  //             preOrderArrivalDate: newStatus === "Pre-Order" ? "" : undefined,
  //           };
  //           toast({
  //             title: "Pre-Order Status Updated",
  //             description: `${item.name} is now ${
  //               newStatus === "Pre-Order"
  //                 ? "available for pre-order"
  //                 : "out of stock"
  //             }.`,
  //           });
  //           return updatedItem;
  //         }
  //         return item;
  //       })
  //     );
  //   };

  const handleTogglePreOrder = (id: number) => {
    setInventory(
      inventory.map((item) => {
        if (item.id === id) {
          const newStatus =
            item.status === "Pre-Order" ? "Out of Stock" : "Pre-Order";

          // Create an updated item that matches the InventoryItem type
          const updatedItem: InventoryItem = {
            ...item,
            status: newStatus,
          };

          if (newStatus === "Pre-Order") {
            updatedItem.preOrderQuantity = 0;
            updatedItem.preOrderArrivalDate = "";
          } else {
            delete updatedItem.preOrderQuantity;
            delete updatedItem.preOrderArrivalDate;
          }

          // Show a toast notification
          toast({
            title: "Pre-Order Status Updated",
            description: `${item.name} is now ${
              newStatus === "Pre-Order"
                ? "available for pre-order"
                : "out of stock"
            }.`,
          });

          return updatedItem; // Return the updated item
        }
        return item; // Return the original item if no update is needed
      })
    );
  };

  const getStatusColor = (status: InventoryItem["status"]) => {
    switch (status) {
      case "In Stock":
        return "bg-green-500";
      case "Low Stock":
        return "bg-yellow-500";
      case "Out of Stock":
        return "bg-red-500";
      case "Pre-Order":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingItem(null)}>Add New Item</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Edit Inventory Item" : "Add New Inventory Item"}
              </DialogTitle>
              <DialogDescription>
                {editingItem
                  ? "Update the inventory item details below."
                  : "Enter the details of the new inventory item below."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={editingItem ? editingItem.name : newItem.name}
                    onChange={(e) =>
                      editingItem
                        ? setEditingItem({
                            ...editingItem,
                            name: e.target.value,
                          })
                        : setNewItem({ ...newItem, name: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    value={editingItem ? editingItem.sku : newItem.sku}
                    onChange={(e) =>
                      editingItem
                        ? setEditingItem({
                            ...editingItem,
                            sku: e.target.value,
                          })
                        : setNewItem({ ...newItem, sku: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={
                      editingItem ? editingItem.quantity : newItem.quantity
                    }
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10);
                      if (!isNaN(value)) {
                        if (editingItem) {
                          setEditingItem({ ...editingItem, quantity: value });
                        } else {
                          setNewItem({ ...newItem, quantity: value });
                        }
                      }
                    }}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    value={editingItem ? editingItem.price : newItem.price}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      if (!isNaN(value)) {
                        if (editingItem) {
                          setEditingItem({ ...editingItem, price: value });
                        } else {
                          setNewItem({ ...newItem, price: value });
                        }
                      }
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={
                      editingItem ? editingItem.category : newItem.category
                    }
                    onChange={(e) =>
                      editingItem
                        ? setEditingItem({
                            ...editingItem,
                            category: e.target.value,
                          })
                        : setNewItem({ ...newItem, category: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="vendor">Vendor</Label>
                  <Input
                    id="vendor"
                    value={editingItem ? editingItem.vendor : newItem.vendor}
                    onChange={(e) =>
                      editingItem
                        ? setEditingItem({
                            ...editingItem,
                            vendor: e.target.value,
                          })
                        : setNewItem({ ...newItem, vendor: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="addedBy">Added By</Label>
                  <Select
                    value={editingItem ? editingItem.addedBy : newItem.addedBy}
                    onValueChange={(value: "Admin" | "Vendor") =>
                      editingItem
                        ? setEditingItem({ ...editingItem, addedBy: value })
                        : setNewItem({ ...newItem, addedBy: value })
                    }
                  >
                    <SelectTrigger id="addedBy">
                      <SelectValue placeholder="Select who added the item" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Vendor">Vendor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={editingItem ? editingItem.status : newItem.status}
                    onValueChange={(value: InventoryItem["status"]) =>
                      editingItem
                        ? setEditingItem({ ...editingItem, status: value })
                        : setNewItem({ ...newItem, status: value })
                    }
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="In Stock">In Stock</SelectItem>
                      <SelectItem value="Low Stock">Low Stock</SelectItem>
                      <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                      <SelectItem value="Pre-Order">Pre-Order</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {(editingItem?.status === "Pre-Order" ||
                newItem.status === "Pre-Order") && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="preOrderQuantity">Pre-Order Quantity</Label>
                    <Input
                      id="preOrderQuantity"
                      type="number"
                      value={
                        editingItem
                          ? editingItem.preOrderQuantity
                          : newItem.preOrderQuantity
                      }
                      onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        if (!isNaN(value)) {
                          if (editingItem) {
                            setEditingItem({
                              ...editingItem,
                              preOrderQuantity: value,
                            });
                          } else {
                            setNewItem({
                              ...newItem,
                              preOrderQuantity: value,
                            });
                          }
                        }
                      }}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="preOrderArrivalDate">
                      Pre-Order Arrival Date
                    </Label>
                    <Input
                      id="preOrderArrivalDate"
                      type="date"
                      value={
                        editingItem
                          ? editingItem.preOrderArrivalDate
                          : newItem.preOrderArrivalDate
                      }
                      onChange={(e) =>
                        editingItem
                          ? setEditingItem({
                              ...editingItem,
                              preOrderArrivalDate: e.target.value,
                            })
                          : setNewItem({
                              ...newItem,
                              preOrderArrivalDate: e.target.value,
                            })
                      }
                    />
                  </div>
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="returnPolicy">Return Policy</Label>
                <Textarea
                  id="returnPolicy"
                  value={
                    editingItem
                      ? editingItem.returnPolicy
                      : newItem.returnPolicy
                  }
                  onChange={(e) =>
                    editingItem
                      ? setEditingItem({
                          ...editingItem,
                          returnPolicy: e.target.value,
                        })
                      : setNewItem({ ...newItem, returnPolicy: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={editingItem ? handleUpdateItem : handleAddItem}
              >
                {editingItem ? "Update Item" : "Add Item"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Added By</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.sku}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.vendor}</TableCell>
                    <TableCell>{item.addedBy}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditItem(item)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          Delete
                        </Button>
                        <Switch
                          checked={item.status === "Pre-Order"}
                          onCheckedChange={() => handleTogglePreOrder(item.id)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </motion.div>
        </TabsContent>
        <TabsContent value="grid">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {inventory.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>SKU: {item.sku}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Quantity</p>
                      <p>{item.quantity}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Price</p>
                      <p>₦{item.price.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Category</p>
                      <p>{item.category}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Vendor</p>
                      <p>{item.vendor}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Added By</p>
                      <p>{item.addedBy}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Status</p>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                  {item.status === "Pre-Order" && (
                    <div className="mt-4">
                      <p className="text-sm font-medium">Pre-Order Details</p>
                      <p>Quantity: {item.preOrderQuantity}</p>
                      <p>Arrival Date: {item.preOrderArrivalDate}</p>
                    </div>
                  )}
                  <div className="mt-4">
                    <p className="text-sm font-medium">Return Policy</p>
                    <p className="text-sm">{item.returnPolicy}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditItem(item)}
                  >
                    Edit
                  </Button>
                  <div className="flex space-x-2">
                    <Switch
                      checked={item.status === "Pre-Order"}
                      onCheckedChange={() => handleTogglePreOrder(item.id)}
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
