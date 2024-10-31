"use client";
import React from "react";
import { navLinks } from "@/app/utility/navLink";
import Link from "next/link";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  //SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
const NavItem = () => {
  return (
    <nav className="mt-4 flex justify-between items-center relative">
      <div className="block lg:hidden">
        <Sheet>
          <SheetTrigger>
            <Menu />
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

      <Link href="/vendor-hub">
        <Button className="bg-yellow-400 text-black">Vendors Hub</Button>
      </Link>
    </nav>
  );
};
export default NavItem;
