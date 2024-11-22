'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, {  useEffect } from 'react'
// import jwt from "jsonwebtoken";
// import { usePathname } from "next/navigation";

interface props{
    children: React.ReactNode   
}
 
const AuthProvider:React.FC<props> = ({children}) => {

     const  session  = useSession();
    //  const decodedUser = session.data?.accessToken ? jwt.decode(session.data.accessToken) : null;
  //  console.log(decodedUser, 'decoded user');
  //  const pathname = usePathname();

    console.log(session); 
        

    useEffect(() => {
        if (session.status === "unauthenticated") {
          redirect("/auth/signin");
        }
       }, []);

  return (
    <div>{children}</div>
  )
}

export default AuthProvider