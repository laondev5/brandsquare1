"use client";
import React from "react";
import { navLinks } from "@/app/utility/navLink";
import Link from "next/link";
import { Button } from "./ui/button";
import { ChevronRight, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  //SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSession } from "next-auth/react";
const NavItem = () => {
  const { data: session } = useSession();
  return (
    <nav className="mt-4 flex  sm:flex-row flex-row-reverse justify-between items-center relative">
      <div className="block lg:hidden">
        <Sheet>
          <SheetTrigger>
            <Menu className="text-white" />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetDescription>
                <div className="flex flex-col  justify-center space-y-4 ">
                  {navLinks.map((item, index) => (
                    <Link href={item.path} key={index}>
                      <Button
                        variant="ghost"
                        size="lg"
                        className="text-gray-900"
                      >
                        {" "}
                        {item.title}
                      </Button>
                    </Link>
                  ))}
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden lg:flex flex-wrap  justify-center space-x-6">
        {navLinks.map((item, index) => (
          <Link href={item.path} key={index}>
            <Button variant="ghost" className="text-white">
              {" "}
              {item.title}
            </Button>
          </Link>
        ))}
      </div>
      {session?.user?.role === "VENDOR" ? (
        <Link href="/vendor">
          <Button className="bg-yellow-400 text-black hover:bg-yellow-500 text-lg px-8 py-6 sm:mr-0 mr-3 text-[12px] p-1 sm:text-[14px] sm:p-2">
         dashboard
            <ChevronRight className="ml-1 h-5 w-5" />
          </Button>
        </Link>
      ) : (
        <Link href="/vendor-hub">
          <Button className="bg-yellow-400  sm:mr-0 mr-3 text-[12px] p-1 sm:text-[14px] sm:p-2 text-black">Vendors Hub</Button>
        </Link>
      )}
    </nav>
  );
};
export default NavItem;
