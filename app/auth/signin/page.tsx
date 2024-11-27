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
import { useSession, getSession } from "next-auth/react";
import MainNav from "@/components/MainNav";
import { CartItem } from "@/app/utility/products";
import Footer from "@/components/Footer";
import { Toaster, toast } from "sonner";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
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
  const  session  = useSession();
 
  //const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [formState, setFormState] = useState<FormState>({
    email: "",
    password: "",
  });
  const user = session?.data?.user;
  const [showPassword, setShowPassword] = useState(false);
  // console.log(session, 'session');
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
    if (session.status === 'authenticated'){
    if (user?.role === "vendor") {
      router.push("/vendor");
    } else if (user?.role === "admin") {
      router.push("/admin");
    } else if (user?.role === "customer") {
      router.push("/");
    }}
  }, [session.status]);

 
  

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
 
      
      if (result?.ok) {
        toast.success("Logged in successfully!");
  
        const updatedSession = await getSession();
    if (updatedSession?.accessToken) {
      console.log(updatedSession.accessToken, "Updated session token");
      localStorage.setItem("token", updatedSession.accessToken);
    }

      }

      console.log(result, 'result');
      if (result?.error) {
        toast.error("Authentication failed. Please try again.");
        setError(result.error);
        return;
      }
        

      // You can add router.push('/dashboard') or any redirect logic here
      
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Login error:", err);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    }
      

    //   if (!result) {
    //     toast.error("Authentication failed. Please try again.");
    //     throw new Error("Authentication failed");
    //   }

    //   if (result.error) {
    //     toast.error("Authentication failed. Please try again.");
    //     setError(result.error);
    //     return;
    //   }
    //   toast.success("Logged in successfully!");
    // } catch (err) {
    //   toast.error("An unexpected error occurred. Please try again.");
    //   console.error("Sign in error:", err);
    //   setError(
    //     err instanceof Error ? err.message : "An unexpected error occurred"
    //   );
    //} 
    finally {
      setLoading(false);
    }
  };

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setLoading(true);
  //     setError(null);
  
  //     const errors = validateForm();
  //     if (Object.keys(errors).length > 0) {
  //       setError(Object.values(errors)[0] ?? "Validation failed");
  //       setLoading(false);
  //       return;
  //     }
  
  //    try{
  //     const res = await signIn("credentials", {
  //       email:formState.email.toLowerCase().trim(),
  //       password:formState.password,
  //       redirect: false,
  //     });

  //     console.log(res)
  //    }catch(error){
  //      console.log(error);
  // }
  // };
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
        <div className="space-y-2 relative">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type= {showPassword ? "text" : "password"}
            value={formState.password}
            onChange={handleInputChange}
            required
            disabled={loading}
            aria-describedby={error ? "password-error" : undefined}
            minLength={6}
          />
          <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3   top-5 flex items-center text-gray-500"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}  
              </button>
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
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="bottom-right" expand={false} richColors />
      <MainNav
        cart={cart}
        setCart={setCart}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <div className="relative flex items-center justify-center w-full min-h-screen overflow-hidden">
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
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome Back!
            </h1>
            <p className="text-white/80">Sign in and get started</p>
          </div>
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
      </div>
      <Footer />
    </div>
  );
}
