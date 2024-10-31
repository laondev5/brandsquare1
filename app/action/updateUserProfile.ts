'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

interface UpdateUserProfileData {
  userId: string;
  basicInfo?: {
    brandName?: string;
    brandDescription?: string;
  };
  contactInfo?: {
    address?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    phone?: string;
    email?: string;
  };
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  additionalDetails?: {
    operatingHours?: string;
    businessCategory?: string;
    taxId?: string;
  };
  terms?: {
    agreedToTerms: boolean;
  };
}

export async function updateUserProfile(data: UpdateUserProfileData) {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: data.userId,
      },
      data: {
        onboarding: true,
        basicInfo: data.basicInfo || undefined,
        contactInfo: data.contactInfo || undefined,
        socialMedia: data.socialMedia || undefined,
        additionalDetails: data.additionalDetails || undefined,
        terms: data.terms || undefined,
      },
    })

    revalidatePath('/dashboard') // Adjust the path as needed
    
    return { success: true, user: updatedUser }
  } catch (error) {
    console.error('Error updating user profile:', error)
    return { success: false, error: 'Failed to update user profile' }
  }
}