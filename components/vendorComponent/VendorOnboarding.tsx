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
// import { useSession } from "next-auth/react";
import { Icons } from "../icons";
// import { updateUserProfile } from "@/app/action/updateUserProfile";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";

interface VendorData {
  businessName: string;
  businessDescription: string;
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
      businessName: "",
      businessDescription: "",
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

  // const  session  = useSession();
  const router = useRouter();


  const { updateUserDetails } = useAuthStore();

 

  const onSubmit = async (data: VendorData) => {
    setLoading(true);
    console.log('data', data);
    try {
      // if (!session.data?.user.id) {
      //   throw new Error("User not authenticated");
      // }
      const logoUrl =
        data.logo && data.logo[0]
          ? await UploadToCloudinary(data.logo[0])
          : undefined;
          console.log('logoUrl', logoUrl);

      const bannerUrl =
        data.banner && data.banner[0]
          ? await UploadToCloudinary(data.banner[0])
          : undefined;
  console.log('bannerUrl', bannerUrl);
      const onboardingData =   {
        ...data,
        logo: logoUrl?.secure_url, // Extract just the URL
        banner: bannerUrl?.secure_url, // Extract just the URL
         // Spread the rest of the data
      };

      console.log('onboardingData', onboardingData);  
   
      const resa =  await updateUserDetails(onboardingData);
      toast.success('Welcome to Brandsquare! Your vendor profile has been created successfully.');
      localStorage.setItem('businessName', data.businessName);
      setTimeout(() => {
        router.push("/vendor");

      }, 1000);
    console.log(resa, 'res');
    } catch (error: any) {
      console.error("Submission error:", error.message, error);
      if (error.message.includes("400")) {
        toast.error(error.response.data.message);
      }    }finally{
      setLoading(false);
    }

    
  };

  return (
    <div className="container mx-auto  px-4 py-8">
      <Toaster position="bottom-right" expand={false} richColors />
      <h1 className="text-3xl font-bold text-center mb-8">Vendor Onboarding</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <h2  className="text-2xl font-semibold">Basic Business Information</h2>
          <div>
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              {...register("businessName", { required: "Business name is required" })}
            />
            {errors.businessName && (
              <p className="text-red-500">{errors.businessName.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="businessDescription">Business Description</Label>
            <Textarea
              id="businessDescription"
              {...register("businessDescription", {
                required: "Business description is required",
              })}
            />
            {errors.businessDescription && (
              <p className="text-red-500">{errors.businessDescription.message}</p>
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
          <h2  className="text-2xl font-semibold">Contact Information</h2>
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
