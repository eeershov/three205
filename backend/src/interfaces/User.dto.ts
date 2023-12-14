import z from 'zod';

export const userSchema = z.object({
  email: z.string({'required_error': 'Email is required'}).email({'message': 'Email is not valid'}),
  number: z.number({'invalid_type_error': 'Number is not valid'}).optional(),
});

export type User = z.infer<typeof userSchema>;
