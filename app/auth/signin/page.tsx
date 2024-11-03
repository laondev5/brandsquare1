"use client";

import { useState, FormEvent, useEffect } from "react";
import { signIn, SignInResponse } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { Suspense } from "react";
import { useSession } from "next-auth/react";
interface FormState {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

type SignInFormProps = {
  className?: string;
};

function SignInForm({ className = "" }: SignInFormProps): JSX.Element {
  const router = useRouter();
  const { data: session } = useSession();
  //const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [formState, setFormState] = useState<FormState>({
    email: "",
    password: "",
  });

  //const callbackUrl: string = searchParams?.get("callbackUrl") ?? "/";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formState.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formState.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formState.password) {
      errors.password = "Password is required";
    } else if (formState.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  };

  useEffect(() => {
    if (session?.user?.role === "VENDOR") {
      router.push("/vendor");
    } else if (session?.user?.role === "ADMIN") {
      router.push("/admin");
    } else if (session?.user?.role === "CUSTOMER") {
      router.push("/");
    }
  }, [session?.user?.role]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setError(Object.values(errors)[0] ?? "Validation failed");
      setLoading(false);
      return;
    }

    try {
      const result: SignInResponse | undefined = await signIn("credentials", {
        redirect: false,
        email: formState.email.toLowerCase().trim(),
        password: formState.password,
        // callbackUrl: decodeURIComponent(callbackUrl),
      });

      if (!result) {
        throw new Error("Authentication failed");
      }

      if (result.error) {
        setError(result.error);
        return;
      }
    } catch (err) {
      console.error("Sign in error:", err);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            value={formState.email}
            onChange={handleInputChange}
            required
            disabled={loading}
            aria-describedby={error ? "email-error" : undefined}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleInputChange}
            required
            disabled={loading}
            aria-describedby={error ? "password-error" : undefined}
            minLength={6}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          className="w-full"
          disabled={loading}
          aria-busy={loading}
        >
          {loading && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Sign in
        </Button>
      </CardFooter>
      <div className="my-3 flex justify-between items-center px-4">
        <Link href="/auth/register" className="hover:underline">
          <p>
            Don&apos;t have an account?{" "}
            <span className="text-blue-600 font-semibold">Sign up</span>
          </p>
        </Link>
        <Link href="/auth/forgot-password" className="hover:underline">
          Forgot Password
        </Link>
      </div>
    </form>
  );
}

export default function SignIn(): JSX.Element {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
          <CardDescription>
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <Suspense fallback={<div>Loading...</div>}>
          <SignInForm />
        </Suspense>
      </Card>
    </div>
  );
}
