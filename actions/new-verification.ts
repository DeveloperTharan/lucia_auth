import { z } from "zod";
import { verification_schema } from '@/schema/auth-schema'

export const newVerification = (data: z.infer<typeof verification_schema>) => {
    
}