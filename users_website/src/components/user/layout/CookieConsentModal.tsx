// components/layout/CookieConsentModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { getCookie, setCookie } from 'cookies-next';
import Link from 'next/link';

const CookieConsentModal = () => {
  // State to control the visibility of the modal
  const [show, setShow] = useState(false);

  // When the component mounts, check if the consent cookie exists
  useEffect(() => {
    const consentCookie = getCookie('lpc-cookie-consent');
    // If the cookie is not set, show the modal
    if (!consentCookie) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    // Set a cookie to remember the user's consent for 1 year
    setCookie('lpc-cookie-consent', 'true', {
      maxAge: 60 * 60 * 24 * 365, // 1 year in seconds
      path: '/',
    });
    setShow(false);
  };

  const handleDecline = () => {
    // Set a cookie to remember the user's choice for 1 year
    setCookie('lpc-cookie-consent', 'false', {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    });
    setShow(false);
  };

  if (!show) {
    return null; // Don't render anything if the modal shouldn't be visible
  }

  return (
    <Modal show={show} onHide={handleDecline} backdrop="static" keyboard={false} centered>
      <Modal.Header>
        <Modal.Title>We Value Your Privacy</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          We use cookies to enhance your browsing experience, remember your preferences like saved properties, and analyze our site traffic. By clicking &quot;Accept All&quot;, you consent to our use of these non-essential cookies.
        </p>
        <p className="small text-muted">
          You can change your mind at any time. For more details, please see our{' '}
          <Link href="/privacy-policy" passHref legacyBehavior>
            <a onClick={() => setShow(false)} className="text-primary">Privacy Policy</a>
          </Link>.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleDecline}>
          Decline
        </Button>
        <Button variant="primary" onClick={handleAccept}>
          Accept All
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CookieConsentModal;