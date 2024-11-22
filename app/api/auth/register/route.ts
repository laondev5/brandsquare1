import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { hash } from 'bcryptjs';

const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["vendor", "customer"]),
});

export async function POST(request: Request) {
    try {
        // Log the incoming request body for debugging
        const body = await request.json();
        console.log('Received registration request:', body);

        // Validate input data
        const parsedData = registerSchema.parse(body);

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email: parsedData.email },
        });

        if (existingUser) {
            console.log('User already exists:', parsedData.email);
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await hash(parsedData.password, 10);

        // Create new user
        const newUser = await prisma.user.create({
            data: {
                name: parsedData.name,
                email: parsedData.email,
                password: hashedPassword,
                role: parsedData.role,
            },
        });

        // Remove password from response
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...userWithoutPassword } = newUser;

        console.log('User created successfully:', userWithoutPassword);
        
        return NextResponse.json(
            { 
                message: "User created successfully", 
                user: userWithoutPassword 
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Registration error:', error);

        // Handle Zod validation errors
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.errors },
                { status: 400 }
            );
        }

        // Handle Prisma errors
        if (error instanceof Error) {
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            );
        }

        // Handle unknown errors
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}