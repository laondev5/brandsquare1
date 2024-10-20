"use client";

//import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function ErrorComponent({ reset }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <div className="container flex flex-col items-center justify-center gap-6 px-4 py-16 ">
        <AlertCircle
          className="h-24 w-24 text-destructive"
          aria-hidden="true"
        />
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Something went wrong!
        </h1>
        <p className="text-xl text-muted-foreground">
          We apologize for the inconvenience. Our team has been notified of the
          issue.
        </p>
        <Button onClick={() => reset()} size="lg" className="mt-4">
          Try again
        </Button>
      </div>
    </main>
  );
}
