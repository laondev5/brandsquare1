//import { NextApiRequest, NextApiResponse } from 'next';
//import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { getServerSession } from "next-auth/next";
import { authOptions } from '../auth/[...nextauth]/auth';
import { prisma } from '@/lib/prisma'
//const prisma = new PrismaClient();

const ProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.number().min(0, "Price must be 0 or greater"),
  isFree: z.boolean(),
  shortDescription: z.string().min(1, "Short description is required"),
  fullDescription: z.string(),
  category: z.string().min(1, "Category is required"),
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
  inventory: z.record(z.string(), z.number().int().min(0)),
  displayImage: z.string().url("Display image must be a valid URL"),
  galleryImages: z.array(z.string().url("Gallery images must be valid URLs")),
  coupons: z.array(z.object({
    code: z.string().min(1, "Coupon code is required"),
    discount: z.number().min(0).max(100, "Discount must be between 0 and 100"),
  })),
});

type ProductData = z.infer<typeof ProductSchema>;

export async function POST(req: Request) {
  try {
    // Get the user session
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Unauthorized' 
      }), { 
        status: 401 
      });
    }

    const body = await req.json();
    const productData: ProductData = ProductSchema.parse(body);

    const product = await prisma.product.create({
      data: {
        name: productData.name,
        price: productData.price,
        isFree: productData.isFree,
        shortDescription: productData.shortDescription,
        fullDescription: productData.fullDescription,
        category: productData.category,
        displayImage: productData.displayImage,
        sizes: {
          set: productData.sizes.map(size => ({ name: size }))
        },
        colors: {
          set: productData.colors.map(color => ({ name: color }))
        },
        inventory: {
          set: Object.entries(productData.inventory).map(([size, quantity]) => ({
            size,
            quantity,
          }))
        },
        galleryImages: {
          set: productData.galleryImages.map(url => ({ url }))
        },
        coupons: {
          set: productData.coupons
        },
        user: {
          connect: {
            id: session.user.id
          }
        }
      },
    });

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Product created successfully', 
      data: product 
    }), { 
      status: 201 
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({ 
        success: false,
        message: 'Validation failed', 
        errors: error.errors 
      }), { 
        status: 400 
      });
    }

    console.error('Error creating product:', error);
    return new Response(JSON.stringify({ 
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    }), { 
      status: 500 
    });
  }
}