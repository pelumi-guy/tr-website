// components/layout/FloatingWhatsAppButton.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// We'll use react-icons for a clean WhatsApp icon
import { FaWhatsapp } from 'react-icons/fa';

interface FloatingWhatsAppButtonProps {
  /**
   * Your WhatsApp number in international format, without '+', '-', or spaces.
   * e.g., '2348012345678'
   */
  phoneNumber: string;
  /**
   * The default message that will pre-populate the WhatsApp chat.
   */
  defaultMessage?: string;
  /**
   * The text that appears on hover.
   */
  tooltipText?: string;
  /**
   * How far down the user should scroll (in pixels) before the button appears.
   */
  showAtScrollY?: number;
}

const FloatingWhatsAppButton: React.FC<FloatingWhatsAppButtonProps> = ({
  phoneNumber,
  defaultMessage = "Hello! I'm interested in a property from your website.",
  tooltipText = "Chat with us",
  showAtScrollY = 200,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  // Effect to show/hide the button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > showAtScrollY) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Add event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showAtScrollY]); // Re-run effect if the showAtScrollY prop changes

  if (!phoneNumber) {
    console.warn("FloatingWhatsAppButton: phoneNumber prop is missing.");
    return null;
  }

  // Construct the WhatsApp "Click to Chat" URL
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <Link href={whatsappUrl} passHref legacyBehavior>
      <a
        target="_blank"
        rel="noopener noreferrer"
        className={`floating-whatsapp-btn ${isVisible ? 'visible' : ''}`}
        aria-label="Chat with us on WhatsApp"
      >
        <span className="tooltip-text">{tooltipText}</span>
        <FaWhatsapp size={32} />
      </a>
    </Link>
  );
};

export default FloatingWhatsAppButton;