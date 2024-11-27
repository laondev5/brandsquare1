"use client";

import { useState } from "react";
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
import useAuthStore from "@/store/authStore";
import Image from "next/image";
import logo from "../../../public/images/logo.png";


export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { forgotPassword } = useAuthStore();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // const response = await fetch("/api/auth/forgot-password", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email }),
    // });

    try {
     const response = await forgotPassword(email);
      // Show success message
      console.log(response);
      if (response.ok) {
        alert("Password reset email sent. Please check your inbox.");
        // router.push("/auth/signin");
      } else {
        console.error("Failed to send password reset email");
      }
    } catch (err) {
      // Error is handled by the store
      console.error(err);
    }
     
  };

  return (
    <div className="min-h-screen flex flex-col">

    <div className="relative flex  items-center justify-center w-full min-h-screen overflow-hidden">
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

          <div className="relative w-full max-w-md px-4">
            <div className=" flex justify-center items-center mb-5">
              <Image src={logo} width={100} height={100} alt="" />
            </div>
          <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">Forgot Password</h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
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
            </div>
            <Button type="submit" className="w-full mt-4">
              Reset Password
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            variant="link"
            onClick={() => router.push("/auth/signin")}
            className="w-full"
          >
            Back to Sign In
          </Button>
        </CardFooter>
      </Card></div>
      
    </div>
    </div>
   );
}
