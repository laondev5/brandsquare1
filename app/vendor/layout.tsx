"use client";
import {  useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { Sidebar } from "@/components/vendorComponent/Sidebar";
import TopBar from "@/components/vendorComponent/Topbar";
import { MobileSidebar } from "@/components/vendorComponent/MobileSidebar";
// import Providers from "../providers";
import { useSession } from "next-auth/react";
// import { getUserData } from "../action/getUserData";
// import { User } from "@prisma/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AuthProvider from "@/providers/AuthProvider";
// import useAuthStore from "@/store/authStore";


const inter = Inter({ subsets: ["latin"] });

// interface GetUserDataResponse {
//   user: User | null;
//   error?: string;
// }

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  // const [userData, setUserData] = useState<GetUserDataResponse | null>(null);
  // const [isLoading, setIsLoading] = useState(true);
  const [hideAlert, setHideAlert] = useState(false);

  const handleClose = () => {
    setHideAlert(true);
  };
  useEffect(() => {
     const businessName = localStorage.getItem("businessName");
    if (businessName) {
      setHideAlert(true);}
      console.log(businessName, 'businessName')
  }, []);

  const  session = useSession();
 console.log(session)
  const userData = session.data?.user;

  // Show loading state
  if ( session.status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }



  // Handle case where user data is not available
  if (!session.data?.user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error Loading User Data</h1>
          <p>Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };
   

  return (
    <AuthProvider>
       <div className={`${inter.className} bg-gray-100 text-gray-900`}>
        {/* <Providers> */}
          <div className="flex h-screen   sticky overflow-hidden">
            <Sidebar />
            <MobileSidebar
              menuOpen={menuOpen}
              onMenuToggle={handleMenuToggle}
            />
            <div className="flex flex-col flex-1 overflow-hidden">
              <TopBar   onMenuToggle={handleMenuToggle} />
              <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                {/* {userData?.onboarding ? (
                  <div className="hidden"></div>
                ) : ( */}  {!hideAlert && (
                  <Alert className="bg-red-100 m-3 p-4">
                    <X  onClick={handleClose} className="h-4 w-4" />
                    <AlertTitle>Complete Your Sign up</AlertTitle>
                    <AlertDescription>
                      <div className="flex items-center justify-between">
                        <p>
                          Please click on the button to Complete your sign up
                          process thank you
                        </p>
                        <Link href="/vendor/onboarding">
                          <Button className="bg-blue-900">
                            Complete Sign up
                            <span className="ml-2 text-white">
                              {userData?.name}
                            </span>
                          </Button>
                        </Link>
                      </div>
                    </AlertDescription>
                  </Alert>)}
                {/* )} */}
                {children}
              </main>
            </div>
          </div>
        {/* </Providers> */}
      </div></AuthProvider>
   );
}
