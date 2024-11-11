'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

interface UpdateUserProfileData {
    userId: string;
    brandName?: string;
    brandDescription?: string;
    address?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    phone?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    website?: string;
    operatingHours?: string;
    businessCategory?: string;
    taxId?: string;

}

export async function updateUserProfile(unboardingData: UpdateUserProfileData) {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: unboardingData.userId,
      },
      data: {
        onboarding: true,
        brandName: unboardingData.brandName,
        brandDescription: unboardingData.brandDescription,
        address: unboardingData.address,
        city: unboardingData.city,
        state: unboardingData.state,
        postalCode: unboardingData.postalCode,
        phone: unboardingData.phone,
        instagram: unboardingData.instagram,
        facebook: unboardingData.facebook,
        twitter: unboardingData.twitter,
        linkedin: unboardingData.linkedin,
        website: unboardingData.website,
        operatingHours: unboardingData.operatingHours,
        businessCategory: unboardingData.businessCategory,
        taxId: unboardingData.taxId
      },
    })

    revalidatePath('/dashboard') // Adjust the path as needed
    
    return { success: true, user: updatedUser }
  } catch (error) {
    console.error('Error updating user profile:', error)
    return { success: false, error: 'Failed to update user profile' }
  }
}