// import { NextResponse } from "next/server";
// //import { PrismaClient } from "@prisma/client";
// import { prisma } from '@/lib/prisma'
// //const prisma = new PrismaClient();

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const token = searchParams.get("token");

//   if (!token) {
//     return NextResponse.json({ error: "Missing token" }, { status: 400 });
//   }

//   try {
//     const verificationToken = await prisma.verificationToken.findUnique({
//       where: { token },
//     });

//     if (!verificationToken) {
//       return NextResponse.json({ error: "Invalid token" }, { status: 400 });
//     }

//     if (verificationToken.expires < new Date()) {
//       return NextResponse.json({ error: "Token expired" }, { status: 400 });
//     }

//     await prisma.user.update({
//       where: { email: verificationToken.identifier },
//       data: { emailVerified: new Date() },
//     });

//     await prisma.verificationToken.delete({
//       where: { id: verificationToken.id },
//     });

//     return NextResponse.json({ message: "Email verified successfully" });
//   } catch (error) {
//     console.error("Error verifying email:", error);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }
