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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
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
      </Card>
    </div>
  );
}
