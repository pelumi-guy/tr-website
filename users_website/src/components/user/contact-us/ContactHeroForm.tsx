'use client'

import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'; // Using react-bootstrap for form
// Assuming you have icons, e.g., react-icons
import { FiMapPin, FiPhone, FiMail, FiSend } from 'react-icons/fi';

interface ContactInfoItem {
    id: string;
    icon: React.ReactNode;
    title: string;
    lines: string[];
    href?: string; // For making phone/email clickable
}

interface ContactFormData {
    name: string;
    surname: string;
    email: string;
    message: string;
}

interface ContactHeroFormProps {
    // backgroundImageUrl?: string;
    // title?: string;
    // subtitle?: string;
    // contactInfo?: ContactInfoItem[];
    onSubmitForm?: (data: ContactFormData) => Promise<void> | void;
}

const defaultContactInfo: ContactInfoItem[] = [
    { id: 'address', icon: <FiMapPin size={24} />, title: 'Address', lines: ['123 Realty Street, Lekki Phase 1,', 'Lagos, Nigeria'] },
    { id: 'phone', icon: <FiPhone size={24} />, title: 'Phone', lines: ['333-444-6667'], href: 'tel:3334446667' },
    { id: 'email', icon: <FiMail size={24} />, title: 'Email', lines: ['info@transcendentrealty.com'], href: 'mailto:info@transcendentrealty.com' },
];

const ContactHeroForm: React.FC<ContactHeroFormProps> = ({
    onSubmitForm
}) => {

    const backgroundImageUrl = "/images/PropertyImagePlaceholder3.png";
    const title = "Contact Us";
    const subtitle = "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien."
    const contactInfo = defaultContactInfo;

    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        surname: '',
        email: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!onSubmitForm) {
            console.warn("No onSubmitForm handler provided to ContactHeroForm");
            setSubmitMessage("Form submission is not configured.");
            return;
        }
        setIsSubmitting(true);
        setSubmitMessage(null);
        try {
            await onSubmitForm(formData);
            setSubmitMessage("Message sent successfully!");
            setFormData({ name: '', surname: '', email: '', message: '' }); // Reset form
        } catch (error) {
            console.error("Form submission error:", error);
            setSubmitMessage("Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            className="contact-hero-form-section"
            style={{ '--contact-bg-image': `url(${backgroundImageUrl})` }}
        >
            <div className="contact-hero-overlay"></div>
            <div className="container contact-content-container"> {/* Manages max-width and padding */}
                <div className="row align-items-center justify-content-between g-md-5"> {/* g-5 for ~64px gap */}

                    {/* Left Column: Text and Contact Info */}
                    <div className="col-lg-6 col-md-12 text-white contact-info-column">
                        <h1 className="display-3 fw-bold mb-3 contact-title">{title}</h1>
                        <p className="lead mb-4 contact-subtitle">{subtitle}</p>
                        <div className="d-flex flex-column justify-content-start">
                            {contactInfo.map(item => (
                                <div key={item.id} className="d-flex contact-detail-item mb-3 align-items-start">
                                    <div className="contact-icon me-3 mt-1 flex-shrink-0">{item.icon}</div>
                                    <div>
                                        <h5 className="mb-0 fw-medium contact-detail-title">{item.title}</h5>
                                        {item.lines.map((line, index) =>
                                            item.href && index === 0 ? (
                                                <a key={index} href={item.href} className="d-block text-white contact-detail-line">
                                                    {line}
                                                </a>
                                            ) : (
                                                <p key={index} className="mb-0 contact-detail-line">{line}</p>
                                            )
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="col-lg-5 col-md-12">
                        <div className="contact-form-card card shadow-lg">
                            <div className="card-body p-4 p-md-5">
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="contactFormName">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control type="text" name="firstname" value={formData.name} onChange={handleChange} placeholder="Enter your first name" required />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="contactFormSurname">
                                        <Form.Label>Surname</Form.Label>
                                        <Form.Control type="text" name="surname" value={formData.surname} onChange={handleChange} placeholder="Enter your surname" required />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="contactFormEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="contactFormMessage">
                                        <Form.Label>Message</Form.Label>
                                        <Form.Control as="textarea" name="message" value={formData.message} onChange={handleChange} rows={4} placeholder="Your message..." required />
                                    </Form.Group>

                                    <Button variant="dark" type="submit" className="w-100 submit-btn" disabled={isSubmitting}>
                                        {isSubmitting ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Submitting...
                                            </>
                                        ) : (
                                            <>Submit <FiSend size={16} className="ms-1" /></>
                                        )}
                                    </Button>
                                    {submitMessage && (
                                        <div className={`mt-3 small ${submitMessage.includes("successfully") ? 'text-success' : 'text-danger'}`}>
                                            {submitMessage}
                                        </div>
                                    )}
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactHeroForm;