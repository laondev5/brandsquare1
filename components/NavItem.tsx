import React from "react";
import { navLinks } from "@/app/utility/navLink";
import Link from "next/link";
import { Button } from "./ui/button";
const NavItem = () => (
  <nav className="mt-4">
    <div className="flex flex-wrap  justify-center space-x-6">
      {navLinks.map((item, index) => (
        <Link href={item.path} key={index}>
          <Button variant="ghost"> {item.title}</Button>
        </Link>
      ))}
    </div>
  </nav>
);
export default NavItem;
