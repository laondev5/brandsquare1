"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster, toast } from "sonner";
import { Icons } from "@/components/icons";
import { CartItem } from "@/app/utility/products";
import MainNav from "@/components/MainNav";
import Footer from "@/components/Footer";
import { UserRole } from "@/types/next-auth"; // Adjust the import path as necessary

// import { axiosInstance } from "@/config/axios";
import useAuthStore from "@/store/authStore";
import { useSession } from "next-auth/react";

const roles = [
  { value: "vendor", label: "Vendor" }, // Updated to match the enum values
  { value: "customer", label: "Customer" },
];

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
   
  const [role, setRole] = useState<UserRole>('vendor');
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { register} = useAuthStore();
  const  session  = useSession();
  console.log(session);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
    const response =  await register({
        email,
        password,
        name,
        phoneNumber,
        role,
      });
   console.log(response,'response');
 
   
     toast.success("Registration successful! Please login."); 
     router.push("/auth/signin");

   
 }  catch (error: any) {
  console.log(error );
  if(error.response.data.message.includes('duplicate key error')){
 toast.error("Email aldready exists. Please another email.");}
 else{
  toast.error("Registration failed. Please try again.");
 }

   setLoading(false);
 } finally {
   setLoading(false);
 }

    // const response = await fetch("/api/auth/register", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ name, email, password, role }),
    // });
 
    // if (response.ok) {
    //   toast.success("Registration successful! Please login."); // Show success toast
    //   router.push("/auth/signin");
    // } else {
    //   const errorText = await response.text(); // Get the raw response text
    //   console.error("Registration failed:", errorText); // Log the raw error text
    //   try {
    //     const errorData = JSON.parse(errorText); // Attempt to parse as JSON
    //     toast.error(errorData.message || "Registration failed"); // Show error toast
    //   } catch {
    //     // If parsing fails, show a generic error message
    //     toast.error("Registration failed. Please try again.");
    //   }
    // }
     
  };

  return (
    <>
      <MainNav
        cart={cart}
        setCart={setCart}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      {/* Wrap with ToastProvider */}
      <div className="relative flex items-center justify-center w-full min-h-screen overflow-hidden">
        <Toaster position="bottom-right" expand={false} richColors />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-purple-400 to-pink-300">
          <div className="absolute inset-0">
            <svg
              className="absolute w-full h-full"
              viewBox="0 0 1000 1000"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0,1000 C300,800 400,600 1000,800 L1000,0 L0,0 Z"
                fill="rgba(255,255,255,0.1)"
              />
              <path
                d="M0,1000 C300,900 500,600 1000,900 L1000,0 L0,0 Z"
                fill="rgba(255,255,255,0.05)"
              />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="relative w-full max-w-md px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Welcome!</h1>
            <p className="text-white/80">Create your account to get started</p>
          </div>
          <Card className="w-full max-w-md">
            <CardHeader>
              <h1 className="text-2xl font-bold text-center">Register</h1>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phoneNumber">Phone number</Label>
                    <Input
                      id="phoneNumber"
                      type="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="role">Role</Label>
                    <Select required value={role} onValueChange={(value) => setRole(value as UserRole)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.value} value={role.value}>
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button type="submit" className="w-full mt-8" disabled={loading}>
                  {loading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Sign up
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              <Button
                variant="link"
                onClick={() => router.push("/auth/signin")}
                className="w-full"
              >
                Already have an account? Sign In
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}
