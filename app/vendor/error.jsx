"use client"; // Error components must be Client Components

import { useEffect } from "react";
import ErrorComponent from "@/components/Error";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <ErrorComponent reset={reset} />
    </div>
  );
}
