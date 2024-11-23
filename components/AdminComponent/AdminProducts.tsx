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
//import { Input } from "@/components/ui/input";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
//import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
//import { Textarea } from "@/components/ui/textarea";
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
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  vendor: string;
  status: "Active" | "Inactive" | "Pending Review";
  stock: number;
  createdAt: string;
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Smartphone X",
    description: "Latest model with advanced features",
    price: 999.99,
    category: "Electronics",
    vendor: "TechCorp",
    status: "Active",
    stock: 100,
    createdAt: "2023-07-01",
  },
  {
    id: 2,
    name: "Organic Coffee Beans",
    description: "Fair trade, medium roast",
    price: 14.99,
    category: "Food & Beverage",
    vendor: "Green Farms",
    status: "Active",
    stock: 500,
    createdAt: "2023-07-02",
  },
  {
    id: 3,
    name: "Yoga Mat",
    description: "Non-slip, eco-friendly material",
    price: 29.99,
    category: "Sports & Fitness",
    vendor: "Zen Gear",
    status: "Pending Review",
    stock: 200,
    createdAt: "2023-07-03",
  },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  //   const [isDialogOpen, setIsDialogOpen] = useState(false);
  //   const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  //   const [newProduct, setNewProduct] = useState<
  //     Omit<Product, "id" | "createdAt">
  //   >({
  //     name: "",
  //     description: "",
  //     price: 0,
  //     category: "",
  //     vendor: "",
  //     status: "Pending Review",
  //     stock: 0,
  //   });

  //   const handleAddProduct = () => {
  //     const product: Product = {
  //       ...newProduct,
  //       id: products.length + 1,
  //       createdAt: new Date().toISOString().split("T")[0],
  //     };
  //     setProducts([...products, product]);
  //     setIsDialogOpen(false);
  //     setNewProduct({
  //       name: "",
  //       description: "",
  //       price: 0,
  //       category: "",
  //       vendor: "",
  //       status: "Pending Review",
  //       stock: 0,
  //     });
  //     toast({
  //       title: "Product Added",
  //       description: `${product.name} has been successfully added.`,
  //     });
  //   };

  //   const handleEditProduct = (product: Product) => {
  //     setEditingProduct(product);
  //     setIsDialogOpen(true);
  //   };

  //   const handleUpdateProduct = () => {
  //     if (editingProduct) {
  //       setProducts(
  //         products.map((p) => (p.id === editingProduct.id ? editingProduct : p))
  //       );
  //       setIsDialogOpen(false);
  //       setEditingProduct(null);
  //       toast({
  //         title: "Product Updated",
  //         description: `${editingProduct.name} has been successfully updated.`,
  //       });
  //     }
  //   };

  //   const handleDeleteProduct = (id: number) => {
  //     setProducts(products.filter((p) => p.id !== id));
  //     toast({
  //       title: "Product Deleted",
  //       description: "The product has been successfully deleted.",
  //       variant: "destructive",
  //     });
  //   };

  const handleToggleProductStatus = (id: number) => {
    setProducts(
      products.map((p) => {
        if (p.id === id) {
          const newStatus = p.status === "Active" ? "Inactive" : "Active";
          toast({
            title: "Product Status Updated",
            description: `${p.name} is now ${newStatus}.`,
          });
          return { ...p, status: newStatus };
        }
        return p;
      })
    );
  };

  const handleReviewProduct = (id: number) => {
    setProducts(
      products.map((p) => {
        if (p.id === id && p.status === "Pending Review") {
          toast({
            title: "Product Approved",
            description: `${p.name} has been approved and is now active.`,
          });
          return { ...p, status: "Active" };
        }
        return p;
      })
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Product Management</h1>
        {/* <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingProduct(null)}>
              Add New Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Edit Product" : "Add New Product"}
              </DialogTitle>
              <DialogDescription>
                {editingProduct
                  ? "Update the product details below."
                  : "Enter the details of the new product below."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={
                      editingProduct ? editingProduct.name : newProduct.name
                    }
                    onChange={(e) =>
                      editingProduct
                        ? setEditingProduct({
                            ...editingProduct,
                            name: e.target.value,
                          })
                        : setNewProduct({ ...newProduct, name: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    value={
                      editingProduct ? editingProduct.price : newProduct.price
                    }
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      if (!isNaN(value)) {
                        editingProduct
                          ? setEditingProduct({
                              ...editingProduct,
                              price: value,
                            })
                          : setNewProduct({ ...newProduct, price: value });
                      }
                    }}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={
                    editingProduct
                      ? editingProduct.description
                      : newProduct.description
                  }
                  onChange={(e) =>
                    editingProduct
                      ? setEditingProduct({
                          ...editingProduct,
                          description: e.target.value,
                        })
                      : setNewProduct({
                          ...newProduct,
                          description: e.target.value,
                        })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={
                      editingProduct
                        ? editingProduct.category
                        : newProduct.category
                    }
                    onChange={(e) =>
                      editingProduct
                        ? setEditingProduct({
                            ...editingProduct,
                            category: e.target.value,
                          })
                        : setNewProduct({
                            ...newProduct,
                            category: e.target.value,
                          })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="vendor">Vendor</Label>
                  <Input
                    id="vendor"
                    value={
                      editingProduct ? editingProduct.vendor : newProduct.vendor
                    }
                    onChange={(e) =>
                      editingProduct
                        ? setEditingProduct({
                            ...editingProduct,
                            vendor: e.target.value,
                          })
                        : setNewProduct({
                            ...newProduct,
                            vendor: e.target.value,
                          })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={
                      editingProduct ? editingProduct.stock : newProduct.stock
                    }
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10);
                      if (!isNaN(value)) {
                        editingProduct
                          ? setEditingProduct({
                              ...editingProduct,
                              stock: value,
                            })
                          : setNewProduct({ ...newProduct, stock: value });
                      }
                    }}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={
                      editingProduct ? editingProduct.status : newProduct.status
                    }
                    onValueChange={(value: string) => {
                      const newStatus = value as
                        | "Active"
                        | "Inactive"
                        | "Pending Review";
                      editingProduct
                        ? setEditingProduct({
                            ...editingProduct,
                            status: newStatus,
                          })
                        : setNewProduct({ ...newProduct, status: newStatus });
                    }}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Pending Review">
                        Pending Review
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={
                  editingProduct ? handleUpdateProduct : handleAddProduct
                }
              >
                {editingProduct ? "Update Product" : "Add Product"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog> */}
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
                  <TableHead>Price</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.vendor}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          product.status === "Active"
                            ? "default"
                            : product.status === "Inactive"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Switch
                          checked={product.status === "Active"}
                          onCheckedChange={() =>
                            handleToggleProductStatus(product.id)
                          }
                          disabled={product.status === "Pending Review"}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          //onClick={() => handleEditProduct(product)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          //onClick={() => handleDeleteProduct(product.id)}
                        >
                          Delete
                        </Button>
                        {product.status === "Pending Review" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReviewProduct(product.id)}
                          >
                            Approve
                          </Button>
                        )}
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
            {products.map((product) => (
              <Card key={product.id}>
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription>{product.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Price</p>
                      <p>₦{product.price.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Vendor</p>
                      <p>{product.vendor}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Status</p>
                      <Badge
                        variant={
                          product.status === "Active"
                            ? "default"
                            : product.status === "Inactive"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {product.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Stock</p>
                      <p>{product.stock}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    //onClick={() => handleEditProduct(product)}
                  >
                    Edit
                  </Button>
                  <div className="flex space-x-2">
                    <Switch
                      checked={product.status === "Active"}
                      onCheckedChange={() =>
                        handleToggleProductStatus(product.id)
                      }
                      disabled={product.status === "Pending Review"}
                    />
                    {product.status === "Pending Review" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReviewProduct(product.id)}
                      >
                        Approve
                      </Button>
                    )}
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
