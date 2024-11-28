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
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { ProductForm } from "./ProductForm";
import { Plus } from "lucide-react";
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
interface ProductAdd {
  id: number;
  name: string;
  price: number;
  category: string;
  inventory: number;
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

const initialProductsAdd: ProductAdd[] = [
  {
    id: 1,
    name: "Wireless Earbuds",
    price: 99.99,
    category: "Electronics",
    inventory: 50,
  },
  {
    id: 2,
    name: "Leather Jacket",
    price: 199.99,
    category: "Clothing",
    inventory: 30,
  }]

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [productAdd, setProductAdd] = useState<ProductAdd[]>(initialProductsAdd);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

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


  const handleAddProduct = async (formData: any) => {
    const newProduct = {
      id: products.length + 1,
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      inventory: Object.values(
        formData.inventory as Record<string, number>
      ).reduce((a, b) => a + b, 0),
    };
    setProductAdd([...productAdd, newProduct]);
    console.log("new product", newProduct);
   
    //  setIsAddProductOpen(false);

  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Product Management</h1>

<Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
<DialogTrigger asChild>
  <Button>
    <Plus className="w-4 h-4 mr-2" />
    Add Product
  </Button>
</DialogTrigger>
<DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
  <ProductForm onSubmit={handleAddProduct} />
</DialogContent>
</Dialog>       </div>
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
