'use client';
import Dashboard from "@/components/vendorComponent/Dashboard";
import React from "react";
// import { getServerSession } from "next-auth";
//  import { getUserData } from "../action/getUserData";
// import { redirect } from "next/navigation";
// import { authOptions } from "@/config/authOptions";
const page =  () => {
  // const user = session.data?.user;

  // useEffect(() => {
  //   if (session.status === "unauthenticated") {
  //     redirect("/auth/signin");
  //   }
  // }, []);
   
  // const userData =  getUserData(session.data?.user.id);
  // if (!userData.user) {
  //   redirect("/auth/signin");
  // }
  //console.log(userData.user);
  return (
    <div>
      <Dashboard  />
    </div>
  );
};

export default page;

  
 
 