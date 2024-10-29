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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToastProvider, Toast } from "@/components/ui/toast"; // Import ToastProvider
import { toast } from "@/hooks/use-toast";
import { Icons } from "@/components/icons";

const roles = [
  { value: "VENDOR", label: "Vendor" }, // Updated to match the enum values
  { value: "CUSTOMER", label: "Customer" },
];

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("vendor");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log(name, email, password, role); // Log the data being sent

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });

    if (response.ok) {
      router.push("/auth/signin");
    } else {
      const errorText = await response.text(); // Get the raw response text
      console.error("Registration failed:", errorText); // Log the raw error text
      try {
        const errorData = JSON.parse(errorText); // Attempt to parse as JSON
        toast({
          title: "Error",
          description: errorData.message || "Registration failed",
          variant: "destructive",
        }); // Show error toast
      } catch {
        // If parsing fails, show a generic error message
        toast({
          title: "Error",
          description: "Registration failed. Please try again.",
          variant: "destructive",
        });
      }
    }
    setLoading(false);
  };

  return (
    <ToastProvider>
      {" "}
      {/* Wrap with ToastProvider */}
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Toast />
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
                  <Select value={role} onValueChange={setRole}>
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
              <Button type="submit" className="w-full" disabled={loading}>
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
    </ToastProvider>
  );
}
