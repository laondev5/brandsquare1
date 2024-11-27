"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../../../public/images/logo.png";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

import {
    Card,
    CardHeader,
    CardContent,
   
  } from "@/components/ui/card";


const PasswordResetForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Simulate password reset success
    setSuccess("Your password has been successfully reset!");
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
    <h1 className="text-2xl font-bold text-center">Set New Password</h1>
  </CardHeader>
         {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
        <CardContent>

        <form onSubmit={handlePasswordSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                New Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-14 mt-2 flex items-center text-gray-500"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />} {/* Replace with icons */}
              </button>
            </div>
            <div className="relative">
              <label htmlFor="confirmPassword" className="block text-sm font-medium">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}              
                  value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md"
              />
               <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 mt-5    flex items-center text-gray-500"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-md mt-4 hover:bg-gray-950"
          >
            Reset Password
          </button>
        </form>
        </CardContent>
</Card>
      </div>
    </div>
    </div>
  );
};

export default PasswordResetForm;
