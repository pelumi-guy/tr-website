// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import ContactUsEmailTemplate from '@/components/user/fragments/ContactUsEmailTemplate';

// Initialize Resend with your API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);
const emailTo = process.env.CONTACT_FORM_EMAIL_TO;

export async function POST(request: Request) {
  // Ensure the destination email is configured
  if (!emailTo) {
    console.error("CONTACT_FORM_EMAIL_TO is not set in environment variables.");
    return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
  }

  try {
    // 1. Parse the form data from the request body
    const body = await request.json();
    const { firstname, surname, email, phone, message } = body;

    // 2. Basic validation
    if (!firstname || !surname || !email || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // 3. Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Lagos Property Center <noreply@aaronstapleton.org>',
      to: [emailTo, 'one.pelumi.guy@gmail.com'],
      subject: `New Contact Form Submission from ${firstname} ${surname}`,
      html: `<div><h1>New Inquiry from your Website</h1><p>You have received a new message from the contact form.</p><hr /><p><strong>Name:</strong> ${firstname} ${surname}</p><p><strong>Email:</strong> <a href={mailto:${email}}>${email}</a></p><p><strong>Phone:</strong> ${phone}</p><p><strong>Message:</strong> ${message}</p><hr /><p><em>This email was sent from the Lagos Property Center contact form.</em></p></div>`,
      // react: ContactUsEmailTemplate({firstname: firstname, surname: surname, email: email, message: message})
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
    }

    // 4. Send a success response back to the client
    return NextResponse.json({ success: true, message: 'Message sent successfully!' });

  } catch (err) {
    console.error("API Route Error:", err);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}