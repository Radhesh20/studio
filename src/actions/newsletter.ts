'use server';

import { z } from 'zod';

const emailSchema = z.string().email({ message: 'Please enter a valid email address.' });

export async function subscribeToNewsletter(prevState: any, formData: FormData) {
  const email = formData.get('email');
  
  const validatedEmail = emailSchema.safeParse(email);

  if (!validatedEmail.success) {
    return {
      message: validatedEmail.error.errors[0].message,
    };
  }
  
  console.log(`New newsletter subscription: ${validatedEmail.data}`);

  // Here you would typically add the email to your mailing list
  // e.g., using an API call to a service like Mailchimp, ConvertKit, etc.

  return {
    message: `Thank you for subscribing! A confirmation has been sent to ${validatedEmail.data}.`,
    success: true,
  };
}
