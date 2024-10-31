import Dashboard from "@/components/vendorComponent/Dashboard";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import { getUserData } from "../action/getUserData";
import { redirect } from "next/navigation";
const page = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    redirect("/auth/signin");
  }
  const userData = await getUserData(session.user.id);
  if (!userData.user) {
    redirect("/auth/signin");
  }
  //console.log(userData.user);
  return (
    <div>
      <Dashboard userData={userData.user} />
    </div>
  );
};

export default page;
