"use client";

import   React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
 import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
// import useAuthStore from "@/store/authStore";
import logo from "../../../public/images/logo.png";
import Image from "next/image";

export default function ForgotPassword() {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const router = useRouter();
    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;
        if (!/^\d*$/.test(value)) return; // Only allow digits
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    
         if (value && index < otp.length - 1) {
          document.getElementById(`otp-input-${index + 1}`)?.focus();
        }
      };
    
       const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && otp[index] === "") {
          if (index > 0) {
            document.getElementById(`otp-input-${index - 1}`)?.focus();
          }
        }
      };
    
      // Submit OTP
      const handleOtpSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const enteredOtp = otp.join("");
        console.log("Submitted OTP:", enteredOtp);
        // Add your OTP verification logic here
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
    <h1 className="text-2xl font-bold text-center">Verify OTP</h1>
  </CardHeader>
  <CardContent>
    <form onSubmit={handleOtpSubmit}>
      <div className="space-y-4">
        <div className="flex justify-center space-x-2">
          {otp.map((digit, index) => (
            <Input
            id={`otp-input-${index}`}
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-lg font-bold border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          ))}
        </div>
      </div>
      <Button type="submit" className="w-full mt-4">
        Verify OTP
      </Button>
    </form>
  </CardContent>
  <CardFooter>
    <Button
      variant="link"
      onClick={() => router.push("/auth/request-otp")}
      className="w-full"
    >
      Resend OTP
    </Button>
  </CardFooter>
</Card>

      
    </div>
    </div>
    </div>
   );
}
