"use client";
import React, { useState } from "react";
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
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
const NavItem = () => {
  const  session  = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);


  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  return (
    <nav className=" flex  sm:flex-row flex-row-reverse justify-between items-center relative">
      <div className="block md:hidden">
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
     <div className=" hidden md:block relative ml-1 mr-3">
      {/* Trigger Text that Opens the Modal */}
      <p onClick={toggleModal} className=" text-white  font-semibold flex items-center gap-1  cursor-pointer">
        Pages {isModalOpen ? <FaAngleUp /> : <FaAngleDown />}
      </p>

      {isModalOpen && (
      <div className="absolute top-full left-0 mt-4 w-[200px]  bg-white shadow-lg rounded-lg z-50">

           {/* Modal Content */}
          <div className="   ">
            {navLinks.map((item, index) => (
              <Link href={item.path} key={index} className=" text-left">
                <Button variant="ghost"   className={` text-gray-900 text-[14px]    block w-full py-3 text-left   hover:bg-black hover:bg-opacity-25 font-thin  hover:font-semibold  rounded-none transition duration-300 ${index === navLinks.length - 1 ? 'last:rounded-b-lg' : ''}`}
                >
                  {item.title}
                </Button>
              </Link>
            ))}
 
          
        </div>
      </div>)}
    </div>

      {/* <div className="hidden lg:flex flex-wrap  justify-center space-x-6">
        {navLinks.map((item, index) => (
          <Link href={item.path} key={index}>
            <Button variant="ghost" className="text-white">
              {" "}
              {item.title}
            </Button>
          </Link>
        ))}
      </div> */}
      {session?.data?.user.role === "vendor" ? (
        <Link href="/vendor">
          <Button className="bg-yellow-400 text-black hover:bg-yellow-500 text-lg px-8 py-6 sm:mr-0 mr-3 text-[12px] p-1 sm:text-[14px] font-semibold sm:p-2">
         dashboard
            <ChevronRight className="ml-1 h-5 w-5" />
          </Button>
        </Link>
      ) : (
        <Link href="/vendor-hub">
          <Button className="bg-yellow-400  sm:mr-0 mr-3 text-[12px] p-1 sm:text-[14px] font-semibold sm:p-2 text-black">Vendors Hub</Button>
        </Link>
      )}
    </nav>
  );
};
export default NavItem;
