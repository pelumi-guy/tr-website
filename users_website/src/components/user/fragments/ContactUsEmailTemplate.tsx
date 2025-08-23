import React from 'react'

interface ContactUsEmailTemplateProps {
    firstname: string;
    surname: string;
    email: string;
    message: string;
}

const ContactUsEmailTemplate = ({ firstname, surname, email, message }: ContactUsEmailTemplateProps) => {
    return (
        <div>
            <h1>New Inquiry from your Website</h1>
            <p>You have received a new message from the contact form.</p>
            <hr />
            <p><strong>Name:</strong> {firstname} {surname}</p>
            <p><strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a></p>
            <p><strong>Message:</strong></p>
            <p>{message}</p>
            <hr />
            <p><em>This email was sent from the Lagos Property Center contact form.</em></p>
        </div>
    )
}

export default ContactUsEmailTemplate