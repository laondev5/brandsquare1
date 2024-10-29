"use client";
import { useState } from "react";
import { Inter } from "next/font/google";
import TopBar from "@/components/vendorComponent/Topbar";
import { AdminSidebar } from "@/components/AdminComponent/AdminSidebar";
import { AdminMobileSidebar } from "@/components/AdminComponent/MobileSidebar";
import Providers from "../providers";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const handleMenuToggle = () => {
    // Your logic for toggling the menu
    setMenuOpen(!menuOpen);
  };
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 text-gray-900`}>
        <Providers>
          <div className="flex h-screen overflow-hidden">
            <AdminSidebar />
            <AdminMobileSidebar
              menuOpen={menuOpen}
              onMenuToggle={handleMenuToggle}
            />
            <div className="flex flex-col flex-1 overflow-hidden">
              <TopBar onMenuToggle={handleMenuToggle} />
              <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
