import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Adjusted import path
import { z } from 'zod'; // Optional: for input validation
import {hash} from 'bcryptjs'; // Import bcrypt for password hashing

// Define a schema for validation using Zod
const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["VENDOR", "CUSTOMER"]), // Updated to match the enum values
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const parsedData = registerSchema.parse(body); // Validate input data

        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: parsedData.email },
        });

        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        // Hash the password before saving
        const hashedPassword = await hash(parsedData.password, 10);

        // Create a new user
        const newUser = await prisma.user.create({
            data: {
                name: parsedData.name,
                email: parsedData.email,
                password: hashedPassword, // Save the hashed password
                role: parsedData.role, // This should now match the enum
            },
        });

        return NextResponse.json({ message: "User registered successfully", user: newUser }, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: error.errors[0].message }, { status: 400 });
        }
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
