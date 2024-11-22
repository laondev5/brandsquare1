"use client";
import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
//import { Sidebar } from "@/components/vendorComponent/Sidebar";
import TopBar from "@/components/vendorComponent/Topbar";
//import { MobileSidebar } from "@/components/vendorComponent/MobileSidebar";
// import Providers from "../providers";
import { useSession } from "next-auth/react";
// import { getUserData } from "../action/getUserData";
// import { User } from "@prisma/client";

import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/AdminComponent/AdminSidebar";
import { AdminMobileSidebar } from "@/components/AdminComponent/MobileSidebar";
import AuthProvider from "@/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

// interface GetUserDataResponse {
//   user: User | null;
//   error?: string;
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  // const [userData, setUserData] = useState<GetUserDataResponse | null>(null);
  // const [isLoading, setIsLoading] = useState(true);
  const  session  = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/login");
      return;
    }

  //   const fetchUserData = async () => {
  //     if (session?.user?.id) {
  //       try {
  //         setIsLoading(true);
  //         const response = await getUserData(session.user.id);
  //         if (response) {
  //           setUserData(response);
  //         } else {
  //           console.log("Error fetching user data", response);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching user data:", error);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     }
  //   };

  //   if (session?.user?.id) {
  //     fetchUserData();
  //   }
  }, [session]);

  // Show loading state
  if (session.status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Handle unauthenticated state
  // if (status === "unauthenticated") {
  //   return null; // Router will handle redirect
  // }

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
           <div className="flex h-screen overflow-hidden">
            <AdminSidebar />
            <AdminMobileSidebar
              menuOpen={menuOpen}
              onMenuToggle={handleMenuToggle}
            />
            <div className="flex flex-col flex-1 overflow-hidden">
              <TopBar   onMenuToggle={handleMenuToggle} />
              <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                {/* {!userData.user.onboarding && (
                  <Alert className="bg-white m-3 p-4">
                    <X className="h-4 w-4" />
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
                              {userData.user.name}
                            </span>
                          </Button>
                        </Link>
                      </div>
                    </AlertDescription>
                  </Alert>
                )} */}
                {children}
              </main>
            </div>
          </div>
       </div>
       </AuthProvider>
  )
}
