"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Lottie from "react-lottie-player";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import congratulationsAnimation from "@/animations/congratulations.json";

// Define the schema for each step
const basicInfoSchema = z.object({
  brandName: z.string().min(2, "Brand name must be at least 2 characters"),
  brandDescription: z
    .string()
    .min(10, "Please provide a more detailed description"),
  logo: z.any().optional(), // Changed from z.instanceof(File)
  banner: z.any().optional(), // Changed from z.instanceof(File)
});

const contactInfoSchema = z.object({
  address: z.string().min(5, "Please enter a valid address"),
  city: z.string().min(2, "City name is required"),
  state: z.string().min(2, "State name is required"),
  postalCode: z.string().min(5, "Please enter a valid postal code"),
  phone: z.string().min(5, "Please enter a valid phone number"), // Simplified phone validation
  email: z.string().email("Please enter a valid email address"),
});

const socialMediaSchema = z.object({
  instagram: z.string().url().optional().or(z.literal("")),
  facebook: z.string().url().optional().or(z.literal("")),
  twitter: z.string().url().optional().or(z.literal("")),
  linkedin: z.string().url().optional().or(z.literal("")),
  website: z.string().url().optional().or(z.literal("")),
});

const additionalDetailsSchema = z.object({
  operatingHours: z.string().min(1, "Operating hours are required"),
  businessCategory: z.string().min(1, "Business category is required"),
  taxId: z.string().optional(),
});

const termsSchema = z.object({
  agreedToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

// Combine all schemas
const vendorSchema = z.object({
  basicInfo: basicInfoSchema,
  contactInfo: contactInfoSchema,
  socialMedia: socialMediaSchema,
  additionalDetails: additionalDetailsSchema,
  terms: termsSchema,
});

type VendorData = z.infer<typeof vendorSchema>;

const steps = [
  { id: "basicInfo", title: "Basic Information" },
  { id: "contactInfo", title: "Contact Information" },
  { id: "socialMedia", title: "Social Media" },
  { id: "additionalDetails", title: "Additional Details" },
  { id: "review", title: "Review" },
];

interface CongratulationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CongratulationsModal: React.FC<CongratulationsModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full"
          >
            <h2 className="text-2xl font-bold mb-4 text-center">
              Congratulations!
            </h2>
            <Lottie
              loop
              animationData={congratulationsAnimation}
              play
              style={{ width: 200, height: 200, margin: "0 auto" }}
            />
            <p className="text-center mb-6">
              Your vendor account has been successfully created!
            </p>
            <Button onClick={onClose} className="w-full">
              Close
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function VendorOnboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm<VendorData>({
    resolver: zodResolver(vendorSchema),
    defaultValues: {
      basicInfo: { brandName: "", brandDescription: "" },
      contactInfo: {
        address: "",
        city: "",
        state: "",
        postalCode: "",
        phone: "",
        email: "",
      },
      socialMedia: {
        instagram: "",
        facebook: "",
        twitter: "",
        linkedin: "",
        website: "",
      },
      additionalDetails: {
        operatingHours: "",
        businessCategory: "",
        taxId: "",
      },
      terms: { agreedToTerms: false },
    },
  });

  const onSubmit = async (data: VendorData) => {
    try {
      // Log all the submitted data
      console.log("Submitted vendor data:", JSON.stringify(data, null, 2));

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsModalOpen(true);
      toast({
        title: "Onboarding Complete",
        description:
          "Welcome to Brandsquare! Your vendor account has been created successfully.",
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Error",
        description:
          "There was a problem submitting your information. Please try again.",
        variant: "destructive",
      });
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (steps[currentStep].id) {
      case "basicInfo":
        return <BasicInfoStep form={form} />;
      case "contactInfo":
        return <ContactInfoStep form={form} />;
      case "socialMedia":
        return <SocialMediaStep form={form} />;
      case "additionalDetails":
        return <AdditionalDetailsStep form={form} />;
      case "review":
        return <ReviewStep data={form.getValues()} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Vendor Onboarding</h1>
      <ProgressIndicator currentStep={currentStep} steps={steps} />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
        <div className="mt-8 flex justify-between">
          {currentStep > 0 && (
            <Button type="button" onClick={prevStep} variant="outline">
              Previous
            </Button>
          )}
          {currentStep < steps.length - 1 ? (
            <Button type="button" onClick={nextStep}>
              Next
            </Button>
          ) : (
            <Button type="submit">Submit</Button>
          )}
        </div>
      </form>
      <CongratulationsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

function ProgressIndicator({
  currentStep,
  steps,
}: {
  currentStep: number;
  steps: { id: string; title: string }[];
}) {
  return (
    <div className="mb-8">
      <ol className="flex items-center w-full">
        {steps.map((step, index) => (
          <li
            key={step.id}
            className={`flex items-center ${
              index < steps.length - 1 ? "w-full" : ""
            } ${index <= currentStep ? "text-blue-600" : "text-gray-500"}`}
          >
            <span className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 shrink-0">
              {index < currentStep ? (
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <span className="text-blue-600">{index + 1}</span>
              )}
            </span>
            <span
              className={`hidden sm:inline-flex sm:ml-2 ${
                index <= currentStep ? "text-blue-600" : "text-gray-500"
              }`}
            >
              {step.title}
            </span>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 ml-2 w-full h-0.5 ${
                  index < currentStep ? "bg-blue-600" : "bg-gray-200"
                }`}
              ></div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

function BasicInfoStep({
  form,
}: {
  form: ReturnType<typeof useForm<VendorData>>;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Basic Brand Information</h2>
      <div>
        <Label htmlFor="brandName">Brand Name</Label>
        <Input id="brandName" {...form.register("basicInfo.brandName")} />
        {form.formState.errors.basicInfo?.brandName && (
          <p className="text-red-500">
            {form.formState.errors.basicInfo.brandName.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="brandDescription">Brand Description</Label>
        <Textarea
          id="brandDescription"
          {...form.register("basicInfo.brandDescription")}
        />
        {form.formState.errors.basicInfo?.brandDescription && (
          <p className="text-red-500">
            {form.formState.errors.basicInfo.brandDescription.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="logo">Brand Logo</Label>
        <Input
          id="logo"
          type="file"
          accept="image/*"
          {...form.register("basicInfo.logo")}
        />
      </div>
      <div>
        <Label htmlFor="banner">Brand Banner</Label>
        <Input
          id="banner"
          type="file"
          accept="image/*"
          {...form.register("basicInfo.banner")}
        />
      </div>
    </div>
  );
}

function ContactInfoStep({
  form,
}: {
  form: ReturnType<typeof useForm<VendorData>>;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
      <div>
        <Label htmlFor="address">Business Address</Label>
        <Input id="address" {...form.register("contactInfo.address")} />
        {form.formState.errors.contactInfo?.address && (
          <p className="text-red-500">
            {form.formState.errors.contactInfo.address.message}
          </p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city">City</Label>
          <Input id="city" {...form.register("contactInfo.city")} />
          {form.formState.errors.contactInfo?.city && (
            <p className="text-red-500">
              {form.formState.errors.contactInfo.city.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Input id="state" {...form.register("contactInfo.state")} />
          {form.formState.errors.contactInfo?.state && (
            <p className="text-red-500">
              {form.formState.errors.contactInfo.state.message}
            </p>
          )}
        </div>
      </div>
      <div>
        <Label htmlFor="postalCode">Postal Code</Label>
        <Input id="postalCode" {...form.register("contactInfo.postalCode")} />
        {form.formState.errors.contactInfo?.postalCode && (
          <p className="text-red-500">
            {form.formState.errors.contactInfo.postalCode.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" {...form.register("contactInfo.phone")} />
        {form.formState.errors.contactInfo?.phone && (
          <p className="text-red-500">
            {form.formState.errors.contactInfo.phone.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          {...form.register("contactInfo.email")}
        />
        {form.formState.errors.contactInfo?.email && (
          <p className="text-red-500">
            {form.formState.errors.contactInfo.email.message}
          </p>
        )}
      </div>
    </div>
  );
}

function SocialMediaStep({
  form,
}: {
  form: ReturnType<typeof useForm<VendorData>>;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Social Media Links</h2>
      <div>
        <Label htmlFor="instagram">Instagram</Label>
        <Input id="instagram" {...form.register("socialMedia.instagram")} />
      </div>
      <div>
        <Label htmlFor="facebook">Facebook</Label>
        <Input id="facebook" {...form.register("socialMedia.facebook")} />
      </div>
      <div>
        <Label htmlFor="twitter">Twitter</Label>
        <Input id="twitter" {...form.register("socialMedia.twitter")} />
      </div>
      <div>
        <Label htmlFor="linkedin">LinkedIn</Label>
        <Input id="linkedin" {...form.register("socialMedia.linkedin")} />
      </div>
      <div>
        <Label htmlFor="website">Website</Label>
        <Input id="website" {...form.register("socialMedia.website")} />
      </div>
    </div>
  );
}

function AdditionalDetailsStep({
  form,
}: {
  form: ReturnType<typeof useForm<VendorData>>;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Additional Details</h2>
      <div>
        <Label htmlFor="operatingHours">Operating Hours</Label>
        <Input
          id="operatingHours"
          {...form.register("additionalDetails.operatingHours")}
        />
      </div>
      <div>
        <Label htmlFor="businessCategory">Business Category</Label>
        <Select
          onValueChange={(value) =>
            form.setValue("additionalDetails.businessCategory", value)
          }
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
      </div>
      <div>
        <Label htmlFor="taxId">Tax ID (Optional)</Label>
        <Input id="taxId" {...form.register("additionalDetails.taxId")} />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" {...form.register("terms.agreedToTerms")} />
        <Label htmlFor="terms">I agree to the terms and conditions</Label>
      </div>
      {form.formState.errors.terms?.agreedToTerms && (
        <p className="text-red-500">
          {form.formState.errors.terms.agreedToTerms.message}
        </p>
      )}
    </div>
  );
}

function ReviewStep({ data }: { data: VendorData }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Review Your Information</h2>
      <div>
        <h3 className="text-lg font-semibold">Basic Information</h3>
        <p>Brand Name: {data.basicInfo.brandName}</p>
        <p>Brand Description: {data.basicInfo.brandDescription}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Contact Information</h3>
        <p>Address: {data.contactInfo.address}</p>
        <p>City: {data.contactInfo.city}</p>
        <p>State: {data.contactInfo.state}</p>
        <p>Postal Code: {data.contactInfo.postalCode}</p>
        <p>Phone: {data.contactInfo.phone}</p>
        <p>Email: {data.contactInfo.email}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Social Media</h3>
        <p>Instagram: {data.socialMedia.instagram}</p>
        <p>Facebook: {data.socialMedia.facebook}</p>
        <p>Twitter: {data.socialMedia.twitter}</p>
        <p>LinkedIn: {data.socialMedia.linkedin}</p>
        <p>Website: {data.socialMedia.website}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Additional Details</h3>
        <p>Operating Hours: {data.additionalDetails.operatingHours}</p>
        <p>Business Category: {data.additionalDetails.businessCategory}</p>
        <p>Tax ID: {data.additionalDetails.taxId}</p>
      </div>
    </div>
  );
}
