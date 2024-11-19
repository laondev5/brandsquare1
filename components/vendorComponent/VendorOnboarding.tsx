"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
//import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Toaster, toast } from "sonner";
import { UploadToCloudinary } from "@/app/action/UploadImage";
import { useSession } from "next-auth/react";
import { Icons } from "../icons";
import { updateUserProfile } from "@/app/action/updateUserProfile";
import { useRouter } from "next/navigation";

interface VendorData {
  brandName: string;
  brandDescription: string;
  logo?: FileList;
  banner?: FileList;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  email: string;
  instagram: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  website: string;
  operatingHours: string;
  businessCategory: string;
  taxId: string;
}

export default function VendorOnboarding() {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VendorData>({
    defaultValues: {
      brandName: "",
      brandDescription: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      phone: "",
      email: "",
      instagram: "",
      facebook: "",
      twitter: "",
      linkedin: "",
      website: "",
      operatingHours: "",
      businessCategory: "",
      taxId: "",
    },
  });

  const { data: session } = useSession();
  const router = useRouter();

  const onSubmit = async (data: VendorData) => {
    setLoading(true);
    try {
      if (!session?.user?.id) {
        throw new Error("User not authenticated");
      }
      const logoUrl =
        data.logo && data.logo[0]
          ? await UploadToCloudinary(data.logo[0])
          : undefined;

      const bannerUrl =
        data.banner && data.banner[0]
          ? await UploadToCloudinary(data.banner[0])
          : undefined;

      const onboardingData = {
        ...data,
        logo: logoUrl?.secure_url, // Extract just the URL
        banner: bannerUrl?.secure_url, // Extract just the URL
        userId: session?.user?.id ?? "", // Provide a default empty string if undefined
        // Spread the rest of the data
      };
      //console.log(onboardingData);

      const res = await updateUserProfile(onboardingData);
      console.log(res);
      if (!res.success) {
        setLoading(false);
        toast.error(
          "There was a problem submitting your information. Please try again."
        );
      }
      setLoading(false);
      toast.success(
        "Welcome to Brandsquare! Your vendor profile has been created successfully."
      );
      router.push("/vendor");
    } catch (error) {
      setLoading(false);
      console.error("Submission error:", error);
      toast.error(
        "There was a problem submitting your information. Please try again."
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster position="bottom-right" expand={false} richColors />
      <h1 className="text-3xl font-bold text-center mb-8">Vendor Onboarding</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Basic Business Information</h2>
          <div>
            <Label htmlFor="brandName">Business Name</Label>
            <Input
              id="brandName"
              {...register("brandName", { required: "Business name is required" })}
            />
            {errors.brandName && (
              <p className="text-red-500">{errors.brandName.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="brandDescription">Business Description</Label>
            <Textarea
              id="brandDescription"
              {...register("brandDescription", {
                required: "Business description is required",
              })}
            />
            {errors.brandDescription && (
              <p className="text-red-500">{errors.brandDescription.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="logo">Business Logo</Label>
            <Input
              id="logo"
              type="file"
              accept="image/*"
              {...register("logo")}
            />
          </div>
          <div>
            <Label htmlFor="banner">Business Banner</Label>
            <Input
              id="banner"
              type="file"
              accept="image/*"
              {...register("banner")}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Contact Information</h2>
          <div>
            <Label htmlFor="address">Business Address</Label>
            <Input
              id="address"
              {...register("address", { required: "Address is required" })}
            />
            {errors.address && (
              <p className="text-red-500">{errors.address.message}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                {...register("city", { required: "City is required" })}
              />
              {errors.city && (
                <p className="text-red-500">{errors.city.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                {...register("state", { required: "State is required" })}
              />
              {errors.state && (
                <p className="text-red-500">{errors.state.message}</p>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="postalCode">Postal Code</Label>
            <Input
              id="postalCode"
              {...register("postalCode", {
                required: "Postal code is required",
              })}
            />
            {errors.postalCode && (
              <p className="text-red-500">{errors.postalCode.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              {...register("phone", { required: "Phone number is required" })}
            />
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Social Media Links</h2>
          <div>
            <Label htmlFor="instagram">Instagram</Label>
            <Input id="instagram" {...register("instagram")} />
          </div>
          <div>
            <Label htmlFor="facebook">Facebook</Label>
            <Input id="facebook" {...register("facebook")} />
          </div>
          <div>
            <Label htmlFor="twitter">Twitter</Label>
            <Input id="twitter" {...register("twitter")} />
          </div>
          <div>
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input id="linkedin" {...register("linkedin")} />
          </div>
          <div>
            <Label htmlFor="website">Website</Label>
            <Input id="website" {...register("website")} />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Additional Details</h2>
          <div>
            <Label htmlFor="operatingHours">Operating Hours</Label>
            <Input
              id="operatingHours"
              {...register("operatingHours", {
                required: "Operating hours are required",
              })}
            />
            {errors.operatingHours && (
              <p className="text-red-500">{errors.operatingHours.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="businessCategory">Business Category</Label>
            <Select
              onValueChange={(value) => setValue("businessCategory", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="food">Food & Beverage</SelectItem>
                <SelectItem value="services">Services</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.businessCategory && (
              <p className="text-red-500">{errors.businessCategory.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="taxId">Tax ID (Optional)</Label>
            <Input id="taxId" {...register("taxId")} />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </form>
    </div>
  );
}
