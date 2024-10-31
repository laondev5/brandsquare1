'use server';


import { type User } from '@prisma/client';
import { prisma } from '@/lib/prisma'


interface GetUserDataResponse {
  user: User | null;
  error?: string;
}

/**
 * Server action to fetch user data by ID
 * @param id - The user's unique identifier
 */
export async function getUserData(
  id: string
): Promise<GetUserDataResponse> {
  try {
    const userData = await prisma.user.findUnique({
      where: { id },
    });

    return {
      user: userData,
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    return {
      user: null,
      error: 'Failed to fetch user data',
    };
  }
}