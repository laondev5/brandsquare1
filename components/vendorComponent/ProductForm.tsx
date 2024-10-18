"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  X,
  //Upload,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";

interface ProductFormProps {
  onSubmit: (formData: any) => void;
  initialData?: Partial<ProductFormData>;
}

interface ProductFormData {
  name: string;
  price: string;
  isFree: boolean;
  shortDescription: string;
  fullDescription: string;
  category: string;
  sizes: string[];
  colors: string[];
  inventory: { [key: string]: number };
  displayImage: File | null;
  galleryImages: File[];
  coupons: { code: string; discount: number }[];
}

export function ProductForm({ onSubmit, initialData = {} }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: "",
    isFree: false,
    shortDescription: "",
    fullDescription: "",
    category: "",
    sizes: [],
    colors: [],
    inventory: {},
    displayImage: null,
    galleryImages: [],
    coupons: [],
    ...initialData,
  });

  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = formData.fullDescription;
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSizeChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newSize = e.currentTarget.value.trim();
      if (newSize && !formData.sizes.includes(newSize)) {
        setFormData((prev) => ({
          ...prev,
          sizes: [...prev.sizes, newSize],
          inventory: { ...prev.inventory, [newSize]: 0 },
        }));
        e.currentTarget.value = "";
      }
    }
  };

  const handleColorChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newColor = e.currentTarget.value.trim();
      if (newColor && !formData.colors.includes(newColor)) {
        setFormData((prev) => ({
          ...prev,
          colors: [...prev.colors, newColor],
        }));
        e.currentTarget.value = "";
      }
    }
  };

  const handleInventoryChange = (size: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      inventory: { ...prev.inventory, [size]: parseInt(value) || 0 },
    }));
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "display" | "gallery"
  ) => {
    const files = e.target.files;
    if (files) {
      if (type === "display") {
        setFormData((prev) => ({ ...prev, displayImage: files[0] }));
      } else {
        setFormData((prev) => ({
          ...prev,
          galleryImages: [...prev.galleryImages, ...Array.from(files)],
        }));
      }
    }
  };

  const handleCouponAdd = () => {
    setFormData((prev) => ({
      ...prev,
      coupons: [...prev.coupons, { code: "", discount: 0 }],
    }));
  };

  const handleCouponChange = (
    index: number,
    field: "code" | "discount",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      coupons: prev.coupons.map((coupon, i) =>
        i === index
          ? {
              ...coupon,
              [field]: field === "discount" ? parseFloat(value) : value,
            }
          : coupon
      ),
    }));
  };

  const execCommand = (
    command: string,
    value: string | undefined = undefined
  ) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setFormData((prev) => ({
        ...prev,
        fullDescription: editorRef.current?.innerHTML || "",
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Product Data:", formData);
    onSubmit(formData);
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  disabled={formData.isFree}
                  required={!formData.isFree}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isFree"
                  checked={formData.isFree}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      isFree: checked,
                      price: checked ? "0" : prev.price,
                    }))
                  }
                />
                <Label htmlFor="isFree">Free Product</Label>
              </div>
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Clothing">Clothing</SelectItem>
                  <SelectItem value="Home & Garden">Home & Garden</SelectItem>
                  <SelectItem value="Sports & Outdoors">
                    Sports & Outdoors
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="shortDescription">Short Description</Label>
              <Textarea
                id="shortDescription"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="fullDescription">Full Description</Label>
              <div className="border rounded-md">
                <div className="flex items-center space-x-2 p-2 border-b">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => execCommand("bold")}
                  >
                    <Bold size={18} />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => execCommand("italic")}
                  >
                    <Italic size={18} />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => execCommand("underline")}
                  >
                    <Underline size={18} />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => execCommand("insertUnorderedList")}
                  >
                    <List size={18} />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => execCommand("insertOrderedList")}
                  >
                    <ListOrdered size={18} />
                  </Button>
                </div>
                <div
                  ref={editorRef}
                  contentEditable
                  className="p-4 min-h-[200px] focus:outline-none"
                  onInput={() =>
                    setFormData((prev) => ({
                      ...prev,
                      fullDescription: editorRef.current?.innerHTML || "",
                    }))
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Product Variants</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="sizes">Sizes (Press Enter to add)</Label>
              <Input
                id="sizes"
                placeholder="Enter size"
                onKeyDown={handleSizeChange}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.sizes.map((size) => (
                  <span
                    key={size}
                    className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm"
                  >
                    {size}
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          sizes: prev.sizes.filter((s) => s !== size),
                          inventory: Object.fromEntries(
                            Object.entries(prev.inventory).filter(
                              ([k]) => k !== size
                            )
                          ),
                        }))
                      }
                      className="ml-2 text-primary-foreground hover:text-red-500"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="colors">Colors (Press Enter to add)</Label>
              <Input
                id="colors"
                placeholder="Enter color"
                onKeyDown={handleColorChange}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.colors.map((color) => (
                  <span
                    key={color}
                    className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm"
                  >
                    {color}
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          colors: prev.colors.filter((c) => c !== color),
                        }))
                      }
                      className="ml-2 text-primary-foreground hover:text-red-500"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <div>
              <Label>Inventory</Label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {formData.sizes.map((size) => (
                  <div key={size} className="flex items-center space-x-2">
                    <Label htmlFor={`inventory-${size}`}>{size}</Label>
                    <Input
                      id={`inventory-${size}`}
                      type="number"
                      value={formData.inventory[size] || 0}
                      onChange={(e) =>
                        handleInventoryChange(size, e.target.value)
                      }
                      min="0"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Product Images</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="displayImage">Display Image</Label>
              <Input
                id="displayImage"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "display")}
              />
              {formData.displayImage && (
                <div className="mt-2">
                  <img
                    src={URL.createObjectURL(formData.displayImage)}
                    alt="Display"
                    className="w-32 h-32 object-cover rounded"
                  />
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="galleryImages">Gallery Images</Label>
              <Input
                id="galleryImages"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleImageUpload(e, "gallery")}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.galleryImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Gallery ${index + 1}`}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          galleryImages: prev.galleryImages.filter(
                            (_, i) => i !== index
                          ),
                        }))
                      }
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Coupons</h3>
          <div className="space-y-4">
            {formData.coupons.map((coupon, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  placeholder="Coupon Code"
                  value={coupon.code}
                  onChange={(e) =>
                    handleCouponChange(index, "code", e.target.value)
                  }
                />
                <Input
                  type="number"
                  placeholder="Discount"
                  value={coupon.discount}
                  onChange={(e) =>
                    handleCouponChange(index, "discount", e.target.value)
                  }
                  min="0"
                  max="100"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      coupons: prev.coupons.filter((_, i) => i !== index),
                    }))
                  }
                >
                  <X size={14} />
                </Button>
              </div>
            ))}
            <Button type="button" onClick={handleCouponAdd}>
              <Plus size={14} className="mr-2" /> Add Coupon
            </Button>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full">
        Create Product
      </Button>
    </motion.form>
  );
}
