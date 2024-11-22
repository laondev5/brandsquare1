 import { UserRole } from "./next-auth"

 export interface User {
    id: string;
    email: string;
    password: string;
    role: UserRole;
    name: string;
    phoneNumber: string;
    isVerified: boolean;
    refreshToken?: string;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
    createdAt: Date;
    updatedAt: Date;
    emailVerificationToken?: string;
    emailVerificationExpires?: Date;
    otpToken?: string;
    otpExpires?: Date;
    businessName?: string;
    businessDescription?: string;
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
