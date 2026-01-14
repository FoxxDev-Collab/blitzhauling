import { NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validations';
import { sendContactEmail } from '@/lib/email';
import { ZodError } from 'zod';

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate with Zod schema
    const validatedData = contactFormSchema.parse(body);

    // Send email via Nodemailer
    await sendContactEmail(validatedData);

    // Return success response
    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    // Handle validation errors
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.issues
        },
        { status: 400 }
      );
    }

    // Handle other errors
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}
