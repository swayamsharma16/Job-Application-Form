

import * as z from 'zod';


export const schema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string().min(10),
  position: z.enum(["Developer", "Designer", "Manager"]),
  relevantExperience: z.optional(z.number().min(1).max(20)),
  portfolioUrl: z.optional(z.string().url()),
  managementExperience: z.optional(z.string()),
  additionalSkills: z.array(z.string()),
  preferredInterviewDate: z.string(),
  preferredInterviewTime: z.string(),
});

export type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
  fullName: '',
  email: '',
  phoneNumber: '',
  position: 'Developer',
  relevantExperience: undefined,
  portfolioUrl: undefined,
  managementExperience: undefined,
  additionalSkills: [],
  preferredInterviewDate: '',
  preferredInterviewTime: '',
};