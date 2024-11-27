import { NextResponse } from 'next/server';
//import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import { getServerSession } from 'next-auth/next';
// import { authOptions } from "@/config/authOptions";
import { prisma } from '@/lib/prisma'
//const prisma = new PrismaClient();

export async function POST(req: Request) {
  const session = await getServerSession();

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const hashedPassword = await hash(password, 12);
    const newAdmin = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'admin',
      },
    });

    return NextResponse.json({ message: 'Admin created successfully', admin: newAdmin }, { status: 201 });
  } catch (error) {
    console.error('Error creating admin:', error);
    return NextResponse.json({ error: 'Failed to create admin' }, { status: 500 });
  }
}
