import { z } from 'zod';

export const articleSchema = z.object({
	title: z.string().min(1, { message: 'Title is required' }),
	section: z.string().min(1, { message: 'Section is required' }),
	imageUrl: z.string().url({ message: 'Please enter a valid URL' }).optional().or(z.literal('')),
	trailText: z.string().min(1, { message: 'Summary is required' }),
	body: z.string().min(1, { message: 'Content is required' }),
});

export type ArticleFormValues = z.infer<typeof articleSchema>;